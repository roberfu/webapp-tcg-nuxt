<script setup lang="ts">
const { t } = useLocale()

useSeoMeta({
  title: 'Ayuda — TCG Collage',
  description: 'Aprende a usar TCG Collage paso a paso. Guía para generar collages de Magic: The Gathering y Pokémon TCG.',
  ogTitle: 'Ayuda — TCG Collage',
  ogDescription: 'Guía paso a paso para generar collages de cartas TCG.',
  ogImage: 'https://tcgcollage.com/og-image.png',
  ogUrl: 'https://tcgcollage.com/help',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const gameSections = computed(() => [
  {
    id: 'magic',
    title: t('help_magic_section_title'),
    linkTitle: t('help_magic_section_link'),
    color: 'purple',
    steps: [
      { img: '/help/magic-step1.png', title: t('help_magic_step1_title'), desc: t('help_magic_step1_desc') },
      { img: '/help/magic-step2.png', title: t('help_magic_step2_title'), desc: t('help_magic_step2_desc') },
      { img: '/help/magic-step3.png', title: t('help_magic_step3_title'), desc: t('help_magic_step3_desc') },
    ],
  },
  {
    id: 'pokemon',
    title: t('help_pokemon_section_title'),
    linkTitle: t('help_pokemon_section_link'),
    color: 'yellow',
    steps: [
      { img: '/help/pokemon-step1.png', title: t('help_pokemon_step1_title'), desc: t('help_pokemon_step1_desc') },
      { img: '/help/pokemon-step2.png', title: t('help_pokemon_step2_title'), desc: t('help_pokemon_step2_desc') },
      { img: '/help/pokemon-step3.png', title: t('help_pokemon_step3_title'), desc: t('help_pokemon_step3_desc') },
    ],
  },
])

const colorClasses = {
  purple: {
    text: 'text-purple-400',
    border: 'from-purple-500',
  },
  yellow: {
    text: 'text-yellow-400',
    border: 'from-yellow-500',
  },
}
</script>

<template>
  <div class="flex-1 p-4 sm:p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <NuxtLink to="/" class="text-brand-400 hover:text-white">{{ t('home') }}</NuxtLink>
        <h1 class="text-2xl font-bold">{{ t('help') }}</h1>
      </div>

      <nav class="mb-8 pb-4 border-b border-brand-800">
        <ul class="space-y-2">
          <li v-for="section in gameSections" :key="section.id">
            <a
              :href="`#${section.id}`"
              :class="[
                'flex items-center gap-2 text-sm font-medium transition-colors',
                colorClasses[section.color as keyof typeof colorClasses].text,
                'hover:underline'
              ]"
            >
              <span>{{ section.linkTitle }}</span>
              <span class="text-brand-600">→</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="space-y-16">
        <section
          v-for="section in gameSections"
          :key="section.id"
          :id="section.id"
        >
          <h2 :class="['text-2xl font-bold mb-1', colorClasses[section.color as keyof typeof colorClasses].text]">
            {{ section.title }}
          </h2>
          <div :class="['h-0.5 w-full bg-gradient-to-r mb-8', colorClasses[section.color as keyof typeof colorClasses].border, 'to-transparent']"></div>

          <div class="space-y-6">
            <div
              v-for="(step, index) in section.steps"
              :key="index"
              class="bg-brand-900 rounded-xl overflow-hidden border border-brand-800"
            >
              <div class="p-5">
                <h3 class="font-semibold text-white mb-1">{{ step.title }}</h3>
                <p class="text-brand-400 text-sm">{{ step.desc }}</p>
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
