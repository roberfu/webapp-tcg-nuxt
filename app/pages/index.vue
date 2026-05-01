<script setup lang="ts">
const { t } = useLocale()

useSeoMeta({
  title: 'TCG Collage — Generador de collages de Magic y Pokémon',
  description: 'Genera collages visuales de tus cartas y mazos de forma rápida y bonita, para compartir con la comunidad.',
  ogTitle: 'TCG Collage — Generador de collages de Magic y Pokémon',
  ogDescription: 'Genera collages visuales de tus cartas y mazos de forma rápida y bonita, para compartir con la comunidad.',
  ogImage: 'https://tcgcollage.com/og-image.png',
  ogUrl: 'https://tcgcollage.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex-1 flex items-center justify-center p-4 sm:p-6">
    <div class="text-center">
      <img src="/logo.png" alt="TCG Collage" class="w-64 sm:w-80 mx-auto mb-4" />

      <p class="text-brand-300 text-base sm:text-lg mb-4 max-w-md mx-auto">{{ t('home_description') }}</p>

      <p class="text-brand-400 text-sm mb-10">
        {{ t('home_help_hint') }}
        <NuxtLink to="/help" class="text-emerald-400 hover:text-emerald-300 underline">{{ t('help') }}</NuxtLink>.
      </p>

      <div class="flex flex-col sm:flex-row gap-8 sm:gap-16 justify-center items-center">
        <div class="flex flex-col items-center border-2 border-brand-500 rounded-xl p-6">
          <NuxtLink to="/collage-magic" class="w-32 h-32 sm:w-48 sm:h-48">
            <img src="/magic-logo.png" alt="Magic" class="w-full h-full object-contain" />
          </NuxtLink>
        </div>

        <div class="flex flex-col items-center border-2 border-brand-500 rounded-xl p-6">
          <NuxtLink to="/collage-pokemon" class="w-32 h-32 sm:w-48 sm:h-48">
            <img src="/pokemon-logo.png" alt="Pokémon" class="w-full h-full object-contain" />
          </NuxtLink>
        </div>

        <div class="relative flex flex-col items-center border-2 border-brand-700 rounded-xl p-6 opacity-60 cursor-not-allowed">
          <div class="w-32 h-32 sm:w-48 sm:h-48 relative">
            <img src="/one-piece-logo.png" alt="One Piece" class="w-full h-full object-contain" />
            <div class="absolute bottom-1 inset-x-0 flex items-end justify-center">
              <span class="text-white font-bold text-sm sm:text-base tracking-widest drop-shadow">{{ t('coming_soon') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
