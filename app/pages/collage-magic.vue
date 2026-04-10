<script setup lang="ts">
useHead({
  title: 'TCG collage - Magic'
})

const { searchCards } = useScryfallApi()
const { generate, download } = useCollageGenerator()

const deckList = ref('')
const results = ref<any[]>([])
const deck = ref<{ id: string; name: string; imageUrl: string; quantity: number }[]>([])
const canvasRef = ref<HTMLCanvasElement | null>(null)
const status = ref('')
const loading = ref(false)
const notFound = ref<string[]>([])

const cols = ref(3)
const gap = ref(12)
const bg = ref('#1a1a1a')
const badgeColor = ref('#c0392b')
const borderColor = ref('#ffffff')
const badgeShape = ref<'circle' | 'diamond' | 'hexagon'>('hexagon')

const parseDeckList = (text: string) => {
  const lines = text.trim().split('\n').filter(l => l.trim())
  return lines.map(line => {
    let match: RegExpMatchArray | null
    
    const withQuotes = line.match(/(\d+),\s*"([^"]+)"(?:\s*,\s*(\S+))?/)
    if (withQuotes) {
      match = withQuotes
    } else {
      match = line.match(/^(\d+)\s+(.+)$/)
    }
    
    if (!match) return null
    
    return {
      quantity: parseInt(match[1]),
      name: match[2]
    }
  }).filter(Boolean) as { quantity: number; name: string }[]
}

const processDeckList = async () => {
  if (!deckList.value.trim()) return
  
  loading.value = true
  status.value = 'Procesando...'
  notFound.value = []
  deck.value = []
  
  try {
    const parsed = parseDeckList(deckList.value)
    let foundCount = 0
    
    for (const item of parsed) {
      try {
        const cards = await searchCards(item.name)
        if (cards && cards.length > 0) {
          const card = cards[0]
          const existing = deck.value.find(c => c.id === card.id)
          if (existing) {
            existing.quantity = Math.min(4, existing.quantity + item.quantity)
          } else {
            deck.value.push({
              id: card.id,
              name: card.name,
              imageUrl: card.imageUrl,
              quantity: Math.min(4, item.quantity)
            })
          }
          foundCount++
        } else {
          notFound.value.push(item.name)
        }
      } catch (e) {
        notFound.value.push(item.name)
      }
    }
    
    status.value = `${deck.value.length} cartas cargadas`
    if (notFound.value.length > 0) {
      status.value += `, ${notFound.value.length} no encontradas`
    }
  } catch (e) {
    status.value = 'Error al procesar'
  } finally {
    loading.value = false
  }
}

const addCard = (card: any) => {
  const existing = deck.value.find(c => c.id === card.id)
  if (existing) {
    existing.quantity = Math.min(4, existing.quantity + 1)
  } else {
    deck.value.push({
      id: card.id,
      name: card.name,
      imageUrl: card.imageUrl,
      quantity: 1
    })
  }
}

const removeCard = (id: string) => {
  deck.value = deck.value.filter(c => c.id !== id)
}

const onGenerate = async () => {
  if (!canvasRef.value || deck.value.length === 0) return
  status.value = 'Generando...'
  await generate(canvasRef.value, deck.value, {
    cols: cols.value,
    gap: gap.value,
    bg: bg.value,
    badgeColor: badgeColor.value,
    borderColor: borderColor.value,
    badgeShape: badgeShape.value
  })
  status.value = 'Collage listo'
}

const onDownload = () => {
  if (canvasRef.value) download(canvasRef.value, 'magic')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <div class="max-w-6xl mx-auto">

      <div class="flex items-center gap-4 mb-6">
        <NuxtLink to="/" class="text-gray-400 hover:text-white">← Home</NuxtLink>
        <h1 class="text-2xl font-bold">Collage Generator - Magic</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div class="space-y-4">
          <div class="bg-gray-800 rounded-xl p-4">
            <p class="text-sm text-gray-400 mb-3">Ingresa tu lista de cartas</p>
            <p class="text-xs text-gray-500 mb-2">Formatos: cantidad nombre / cantidad,"nombre"</p>
            <textarea
              v-model="deckList"
              placeholder='1 Get Out
2 Lightning Bolt
1,"Counterspell"'
              class="w-full h-48 bg-gray-700 rounded-lg px-3 py-2 text-sm outline-none font-mono"
            />
            <button
              class="mt-3 w-full py-2 bg-green-600 rounded-lg text-sm hover:bg-green-700 disabled:opacity-40"
              :disabled="loading || !deckList.trim()"
              @click="processDeckList"
            >
              {{ loading ? 'Procesando...' : 'Procesar lista' }}
            </button>
          </div>

          <div class="bg-gray-800 rounded-xl p-4">
            <p class="text-sm text-gray-400 mb-3">Deck ({{ deck.length }} cartas únicas)</p>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <div v-for="card in deck" :key="card.id" class="flex items-center gap-3">
                <img :src="card.imageUrl" :alt="card.name" class="w-10 rounded" />
                <span class="flex-1 text-sm">{{ card.name }}</span>
                <div class="flex items-center gap-2">
                  <button class="w-6 h-6 bg-gray-700 rounded text-xs" @click="card.quantity = Math.max(1, card.quantity - 1)">-</button>
                  <span class="text-sm w-4 text-center">{{ card.quantity }}</span>
                  <button class="w-6 h-6 bg-gray-700 rounded text-xs" @click="card.quantity = Math.min(4, card.quantity + 1)">+</button>
                  <button class="w-6 h-6 bg-red-800 rounded text-xs" @click="removeCard(card.id)">x</button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-xl p-4">
            <p class="text-sm text-gray-400 mb-3">Configuración</p>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <label class="flex flex-col gap-1">
                <span class="text-gray-400">Columnas</span>
                <input v-model.number="cols" type="number" min="2" max="10" class="w-16 bg-gray-700 rounded px-2 py-1" />
                <span class="text-xs text-gray-500">Recomendacion para Móvil: 3 columnas</span>
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">Gap (px)</span>
                <input v-model.number="gap" type="number" min="0" max="40" class="w-16 bg-gray-700 rounded px-2 py-1" />
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">Fondo</span>
                <input v-model="bg" type="color" class="w-10 h-8 rounded cursor-pointer" />
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">Círculo</span>
                <input v-model="badgeColor" type="color" class="w-10 h-8 rounded cursor-pointer" />
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">Borde</span>
                <input v-model="borderColor" type="color" class="w-10 h-8 rounded cursor-pointer" />
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">Badge</span>
                <select v-model="badgeShape" class="bg-gray-700 rounded px-2 py-1">
                  <option value="circle">Círculo</option>
                  <option value="diamond">Diamante</option>
                  <option value="hexagon">Hexágono</option>
                </select>
              </label>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              class="flex-1 py-3 bg-green-600 rounded-xl font-medium hover:bg-green-700 disabled:opacity-40"
              :disabled="deck.length === 0"
              @click="onGenerate"
            >
              Generar collage
            </button>
            <button
              class="flex-1 py-3 bg-blue-600 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-40"
              :disabled="status !== 'Collage listo'"
              @click="onDownload"
            >
              Descargar PNG
            </button>
          </div>

          <p class="text-sm text-gray-400">{{ status }}</p>
          <div v-if="notFound.length > 0" class="text-sm text-red-400">
            No encontradas: {{ notFound.join(', ') }}
          </div>
        </div>

        <div class="bg-gray-800 rounded-xl p-4 overflow-auto">
          <p class="text-sm text-gray-400 mb-3">
            Preview — {{ cols }} col{{ cols !== 1 ? 's' : '' }}, {{ Math.ceil(deck.length / cols) }} fila{{ Math.ceil(deck.length / cols) !== 1 ? 's' : '' }}
          </p>
          <canvas ref="canvasRef" class="rounded max-w-full" />
        </div>

      </div>
    </div>
  </div>
</template>