<script setup lang="ts">
const { t } = useLocale()

useSeoMeta({
  title: 'Ayuda — TCG Collage',
  description: 'Aprende a usar TCG Collage paso a paso. Guía para generar collages de Magic: The Gathering y Pokémon TCG.',
  ogTitle: 'Ayuda — TCG Collage',
  ogDescription: 'Guía paso a paso para generar collages de cartas TCG.',
  ogImage: 'https://tcgcollage.vercel.app/og-image.png',
  ogUrl: 'https://tcgcollage.vercel.app/help',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const magicSteps = computed(() => [
  { img: '/help/magic-step1.png', title: t('help_magic_step1_title'), desc: t('help_magic_step1_desc') },
  { img: '/help/magic-step2.png', title: t('help_magic_step2_title'), desc: t('help_magic_step2_desc') },
  { img: '/help/magic-step3.png', title: t('help_magic_step3_title'), desc: t('help_magic_step3_desc') },
])

const pokemonSteps = computed(() => [
  { img: '/help/pokemon-step1.png', title: t('help_pokemon_step1_title'), desc: t('help_pokemon_step1_desc') },
  { img: '/help/pokemon-step2.png', title: t('help_pokemon_step2_title'), desc: t('help_pokemon_step2_desc') },
  { img: '/help/pokemon-step3.png', title: t('help_pokemon_step3_title'), desc: t('help_pokemon_step3_desc') },
])
</script>

<template>
  <div class="flex-1 p-4 sm:p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <NuxtLink to="/" class="text-gray-400 hover:text-white">{{ t('home') }}</NuxtLink>
        <h1 class="text-2xl font-bold">{{ t('help') }}</h1>
      </div>

      <div class="space-y-14">
        <!-- Magic Section -->
        <section>
          <h2 class="text-xl font-bold mb-6 text-purple-400">{{ t('help_magic_title') }}</h2>
          <div class="space-y-6">
            <div
              v-for="(step, index) in magicSteps"
              :key="index"
              class="bg-gray-800 rounded-xl overflow-hidden border border-white"
            >
              <div class="p-5">
                <h3 class="font-semibold text-white mb-1">{{ step.title }}</h3>
                <p class="text-gray-400 text-sm">{{ step.desc }}</p>
              </div>
              <img
                :src="step.img"
                :alt="step.title"
                class="w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <!-- Pokémon Section -->
        <section>
          <h2 class="text-xl font-bold mb-6 text-yellow-400">{{ t('help_pokemon_title') }}</h2>
          <div class="space-y-6">
            <div
              v-for="(step, index) in pokemonSteps"
              :key="index"
              class="bg-gray-800 rounded-xl overflow-hidden border border-white"
            >
              <div class="p-5">
                <h3 class="font-semibold text-white mb-1">{{ step.title }}</h3>
                <p class="text-gray-400 text-sm">{{ step.desc }}</p>
              </div>
              <img
                :src="step.img"
                :alt="step.title"
                class="w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
