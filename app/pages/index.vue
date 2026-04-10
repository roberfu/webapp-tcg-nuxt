<script setup lang="ts">
const { t } = useLocale()

useSeoMeta({
  title: 'TCG Collage — Generador de collages de Magic y Pokémon',
  description: 'Genera collages visuales de tus mazos de Magic: The Gathering y Pokémon TCG de forma rápida y bonita. Pega tu lista de cartas y descarga la imagen en PNG.',
  ogTitle: 'TCG Collage — Generador de collages de Magic y Pokémon',
  ogDescription: 'Genera collages visuales de tus mazos de Magic: The Gathering y Pokémon TCG de forma rápida y bonita. Pega tu lista de cartas y descarga la imagen en PNG.',
  ogImage: 'https://tcgcollage.vercel.app/og-image.png',
  ogUrl: 'https://tcgcollage.vercel.app',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex-1 flex items-center justify-center p-4 sm:p-6">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">TCG collage</h1>

      <p class="text-gray-300 text-base sm:text-lg mb-4 max-w-md mx-auto">{{ t('home_description') }}</p>

      <p class="text-gray-400 text-sm mb-10">
        {{ t('home_help_hint') }}
        <NuxtLink to="/help" class="text-green-400 hover:text-green-300 underline">{{ t('help') }}</NuxtLink>.
      </p>

      <div class="flex flex-col sm:flex-row gap-8 sm:gap-16 justify-center items-center">
        <div class="flex flex-col items-center border-2 border-white rounded-xl p-6">
          <NuxtLink to="/collage-magic" class="w-32 h-32 sm:w-48 sm:h-48 mb-4">
            <img src="/magic-logo.png" alt="Magic" class="w-full h-full object-contain" />
          </NuxtLink>
          <div class="flex flex-col gap-2">
            <NuxtLink to="/collage-magic" class="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 border border-white">{{ t('collage') }}</NuxtLink>
          </div>
        </div>

        <div class="flex flex-col items-center border-2 border-white rounded-xl p-6">
          <NuxtLink to="/collage-pokemon" class="w-32 h-32 sm:w-48 sm:h-48 mb-4">
            <img src="/pokemon-logo.png" alt="Pokémon" class="w-full h-full object-contain" />
          </NuxtLink>
          <div class="flex flex-col gap-2">
            <NuxtLink to="/collage-pokemon" class="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 border border-white">{{ t('collage') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
