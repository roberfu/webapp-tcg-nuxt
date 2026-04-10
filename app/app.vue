<script setup lang="ts">
const { public: { version } } = useRuntimeConfig()
const { locale, setLocale, t } = useLocale()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'TCG Collage',
        url: 'https://tcgcollage.vercel.app',
        description: 'Genera collages visuales de mazos de Magic: The Gathering y Pokémon TCG.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        inLanguage: ['es', 'en'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      }),
    },
  ],
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">

    <div class="fixed top-3 right-3 z-50 flex gap-2">
      <button
        @click="setLocale('es')"
        :class="locale === 'es' ? 'opacity-100' : 'opacity-35'"
        class="transition-opacity hover:opacity-100"
        title="Español"
      ><img src="https://flagcdn.com/24x18/cl.png" alt="Español" width="24" height="18" /></button>
      <button
        @click="setLocale('en')"
        :class="locale === 'en' ? 'opacity-100' : 'opacity-35'"
        class="transition-opacity hover:opacity-100"
        title="English"
      ><img src="https://flagcdn.com/24x18/us.png" alt="English" width="24" height="18" /></button>
    </div>

    <main class="flex-1 flex flex-col">
      <NuxtPage />
    </main>

    <footer class="text-center text-xs text-gray-600 py-3 border-t border-gray-800 space-y-1">
      <p>tcg-collage v{{ version }}</p>
      <p class="flex items-center justify-center gap-3">
        <NuxtLink to="/help" class="text-gray-400 hover:text-white underline">{{ t('help') }}</NuxtLink>
        <span class="text-gray-700">·</span>
        <NuxtLink to="/about" class="text-gray-400 hover:text-white underline">{{ t('about') }}</NuxtLink>
      </p>
      <p>
        {{ t('footer_report') }}
        <a
          href="https://github.com/roberfg/webapp-tcg-nuxt/issues"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-white underline"
        >GitHub</a>.
        {{ t('footer_thanks') }}
      </p>
    </footer>
  </div>
</template>
