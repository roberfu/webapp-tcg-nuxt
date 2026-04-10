<script setup lang="ts">
useSeoMeta({
  title: 'Collage Pokémon TCG — TCG Collage',
  description: 'Genera collages visuales de tus cartas de Pokémon TCG. Compatible con listas de PTCGO y PTCGL.',
  ogTitle: 'Collage Pokémon TCG — TCG Collage',
  ogDescription: 'Genera collages de tus cartas de Pokémon en segundos.',
  ogImage: 'https://tcgcollage.vercel.app/og-image.png',
  ogUrl: 'https://tcgcollage.vercel.app/collage-pokemon',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const { t } = useLocale()
const { searchCards } = usePokemonTcgApi()
const { generate, download } = useCollageGenerator()

const deckList = ref('')
const deck = ref<{ id: string; name: string; imageUrl: string; quantity: number }[]>([])
const canvasRef = ref<HTMLCanvasElement | null>(null)
const status = ref('')
const loading = ref(false)
const collageReady = ref(false)
const notFound = ref<string[]>([])
const apiErrors = ref<string[]>([])

const cols = ref(3)
const gap = ref(12)
const bg = ref('#1a1a1a')
const badgeColor = ref('#c0392b')
const borderColor = ref('#ffffff')
const badgeShape = ref<'circle' | 'diamond' | 'hexagon'>('hexagon')

interface ParsedCard {
  quantity: number
  name: string
  setId: string | null
  number: string | null
}

const parseDeckList = (text: string): ParsedCard[] => {
  const lines = text.trim().split('\n').filter(l => l.trim())
  return lines.map(line => {
    const parts = line.trim().split(/\s+/)
    if (parts.length < 3) return null
    const quantity = parseInt(parts[0])
    if (isNaN(quantity)) return null
    const setCode = parts[parts.length - 2]
    const numberWithZeros = parts[parts.length - 1]
    const number = String(parseInt(numberWithZeros))
    const name = parts.slice(1, parts.length - 2).join(' ')
    return { quantity, name, setId: setCode, number }
  }).filter(Boolean) as ParsedCard[]
}

const processDeckList = async () => {
  if (!deckList.value.trim()) return

  loading.value = true
  collageReady.value = false
  status.value = t('processing')
  notFound.value = []
  apiErrors.value = []
  deck.value = []

  try {
    const parsed = parseDeckList(deckList.value)
    const total = parsed.length
    let processed = 0

    for (let i = 0; i < parsed.length; i += 4) {
      const batch = parsed.slice(i, i + 4)
      await Promise.all(batch.map(async (item) => {
        try {
          const cards = await searchCards(item.name, item.setId || undefined, item.number || undefined)
          if (cards && cards.length > 0) {
            const card = cards[0]
            const existing = deck.value.find(c => c.id === card.id)
            if (existing) {
              existing.quantity = Math.min(4, existing.quantity + item.quantity)
            } else {
              deck.value.push({ id: card.id, name: card.name, imageUrl: card.imageUrl, quantity: Math.min(4, item.quantity) })
            }
          } else {
            notFound.value.push(item.name)
          }
        } catch (e) {
          apiErrors.value.push(item.name)
        } finally {
          processed++
          status.value = t('processing_progress', { processed, total })
        }
      }))
    }

    status.value = t('cards_loaded', { count: deck.value.length })
    if (notFound.value.length > 0) {
      status.value += `, ${t('not_found_count', { count: notFound.value.length })}`
    }
  } catch (e) {
    status.value = t('error_processing')
  } finally {
    loading.value = false
  }
}

const removeCard = (id: string) => {
  deck.value = deck.value.filter(c => c.id !== id)
}

const onGenerate = async () => {
  if (!canvasRef.value || deck.value.length === 0) return
  status.value = t('generating')
  await generate(canvasRef.value, deck.value, {
    cols: cols.value, gap: gap.value, bg: bg.value,
    badgeColor: badgeColor.value, borderColor: borderColor.value, badgeShape: badgeShape.value
  })
  collageReady.value = true
  status.value = t('collage_ready')
}

const onDownload = () => {
  if (canvasRef.value) download(canvasRef.value, 'pokemon')
}
</script>

<template>
  <div class="flex-1 p-4 sm:p-6">
    <div class="max-w-6xl mx-auto">

      <div class="flex items-center gap-4 mb-6">
        <NuxtLink to="/" class="text-gray-400 hover:text-white">{{ t('home') }}</NuxtLink>
        <h1 class="text-2xl font-bold">{{ t('collage_pokemon_title') }}</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div class="space-y-4">
          <div class="bg-gray-800 rounded-xl p-4">
            <p class="text-sm text-gray-400 mb-3">{{ t('enter_cards') }}</p>
            <p class="text-xs text-gray-500 mb-2">{{ t('format_pokemon') }}</p>
            <textarea
              v-model="deckList"
              placeholder='4 Teal Mask Ogerpon ex TWM 25
1 Meowth ex POR 62
1 Fezandipiti ex ASC 142'
              class="w-full h-48 bg-gray-700 rounded-lg px-3 py-2 text-sm outline-none font-mono"
            />
            <button
              class="mt-3 w-full py-2 bg-green-600 rounded-lg text-sm hover:bg-green-700 disabled:opacity-40"
              :disabled="loading || !deckList.trim()"
              @click="processDeckList"
            >
              {{ loading ? t('processing') : t('process_list') }}
            </button>
          </div>

          <div class="bg-gray-800 rounded-xl p-4">
            <p class="text-sm text-gray-400 mb-3">{{ t('deck_title') }} ({{ deck.length }} {{ t('cards_unique') }})</p>
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
            <p class="text-sm text-gray-400 mb-3">{{ t('settings') }}</p>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <label class="flex flex-col gap-1">
                <span class="text-gray-400">{{ t('columns') }}</span>
                <input v-model.number="cols" type="number" min="2" max="10" class="w-16 bg-gray-700 rounded px-2 py-1" />
                <span class="text-xs text-gray-500">{{ t('columns_hint') }}</span>
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">{{ t('gap') }} (px)</span>
                <input v-model.number="gap" type="number" min="0" max="40" class="w-16 bg-gray-700 rounded px-2 py-1" />
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">{{ t('background') }}</span>
                <input v-model="bg" type="color" class="w-10 h-8 rounded cursor-pointer" />
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">{{ t('circle') }}</span>
                <input v-model="badgeColor" type="color" class="w-10 h-8 rounded cursor-pointer" />
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">{{ t('border') }}</span>
                <input v-model="borderColor" type="color" class="w-10 h-8 rounded cursor-pointer" />
              </label>
              <label class="flex items-center gap-2">
                <span class="text-gray-400">{{ t('badge') }}</span>
                <select v-model="badgeShape" class="bg-gray-700 rounded px-2 py-1">
                  <option value="circle">{{ t('circle') }}</option>
                  <option value="diamond">{{ t('diamond') }}</option>
                  <option value="hexagon">{{ t('hexagon') }}</option>
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
              {{ t('generate_collage') }}
            </button>
            <button
              class="flex-1 py-3 bg-blue-600 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-40"
              :disabled="!collageReady"
              @click="onDownload"
            >
              {{ t('download_png') }}
            </button>
          </div>

          <p class="text-sm text-gray-400">{{ status }}</p>
          <div v-if="notFound.length > 0" class="text-sm text-red-400">
            {{ t('not_found_label') }}: {{ notFound.join(', ') }}
          </div>
          <div v-if="apiErrors.length > 0" class="text-sm text-yellow-400">
            {{ t('api_error_label') }}: {{ apiErrors.join(', ') }}
          </div>
        </div>

        <div class="bg-gray-800 rounded-xl p-4 overflow-auto">
          <p class="text-sm text-gray-400 mb-3">
            {{ t('preview') }} — {{ Math.min(cols, deck.length || 1) }} col{{ Math.min(cols, deck.length || 1) !== 1 ? 's' : '' }}, {{ Math.ceil(deck.length / Math.min(cols, deck.length || 1)) }} {{ t('row') }}{{ Math.ceil(deck.length / Math.min(cols, deck.length || 1)) !== 1 ? 's' : '' }}
          </p>
          <canvas ref="canvasRef" class="rounded max-w-full" />
        </div>

      </div>
    </div>
  </div>
</template>
