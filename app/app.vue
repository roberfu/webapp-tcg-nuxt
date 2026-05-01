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
        url: 'https://tcgcollage.com',
        description: 'Genera collages visuales de tus cartas y mazos de forma rápida y bonita, para compartir con la comunidad.',
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
  <div class="flex flex-col min-h-screen bg-brand-950 text-white">

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

    <footer class="text-center text-xs text-brand-600 py-3 border-t border-brand-800 space-y-1">
      <p>tcgcollage.com v{{ version }}</p>
      <p class="flex items-center justify-center gap-3">
        <NuxtLink to="/" class="text-brand-300 hover:text-white underline">{{ t('home') }}</NuxtLink>
        <span class="text-brand-700">·</span>
        <NuxtLink to="/help" class="text-brand-300 hover:text-white underline">{{ t('help') }}</NuxtLink>
        <span class="text-brand-700">·</span>
        <NuxtLink to="/about" class="text-brand-300 hover:text-white underline">{{ t('about') }}</NuxtLink>
        <span class="text-brand-700">·</span>
        <NuxtLink to="/terms" class="text-brand-300 hover:text-white underline">{{ t('terms') }}</NuxtLink>
        <span class="text-brand-700">·</span>
        <a
          href="https://discord.gg/tfZFbett"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-300 hover:text-white underline flex items-center justify-center gap-1"
        >{{ t('footer_discord') }}<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>
        <span class="text-brand-700">·</span>
        <a
          href="https://ko-fi.com/E1E31XUPEC"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-300 hover:text-amber-400 underline flex items-center justify-center gap-1"
        >{{ t('footer_donate') }}<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>
      </p>
    </footer>
  </div>
</template>
