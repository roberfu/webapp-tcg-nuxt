<script setup lang="ts">
const { t } = useLocale()

useSeoMeta({
  title: 'Sobre nosotros — TCG Collage',
  description: 'Conoce al equipo detrás de TCG Collage, una herramienta gratuita para jugadores de Magic: The Gathering y Pokémon TCG.',
  ogTitle: 'Sobre nosotros — TCG Collage',
  ogDescription: 'Herramienta gratuita creada por aficionados a los juegos de cartas coleccionables.',
  ogImage: 'https://tcgcollage.vercel.app/og-image.png',
  ogUrl: 'https://tcgcollage.vercel.app/about',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const credits = [
  {
    name: 'Scryfall',
    url: 'https://scryfall.com',
    desc_es: 'API e imágenes de cartas de Magic: The Gathering. Una de las mejores bases de datos de cartas del mundo.',
    desc_en: 'Magic: The Gathering card API and images. One of the best card databases in the world.',
  },
  {
    name: 'Scrydex',
    url: 'https://scrydex.com',
    desc_es: 'Imágenes de alta calidad de cartas Magic utilizadas en los collages.',
    desc_en: 'High quality Magic card images used in the collages.',
  },
  {
    name: 'Pokémon TCG API',
    url: 'https://pokemontcg.io',
    desc_es: 'API e imágenes de cartas del juego de cartas Pokémon. Gratuita y muy completa.',
    desc_en: 'Pokémon TCG card API and images. Free and very comprehensive.',
  },
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    desc_es: 'Plataforma que aloja y despliega esta aplicación de forma gratuita.',
    desc_en: 'Platform that hosts and deploys this application for free.',
  },
  {
    name: 'Nuxt',
    url: 'https://nuxt.com',
    desc_es: 'Framework de Vue.js con el que está construida la app.',
    desc_en: 'Vue.js framework that powers this app.',
  },
  {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    desc_es: 'Framework de estilos CSS que da vida al diseño de la interfaz.',
    desc_en: 'CSS framework that brings the UI design to life.',
  },
  {
    name: 'html-to-image',
    url: 'https://github.com/bubkoo/html-to-image',
    desc_es: 'Librería open source que permite exportar el collage como imagen PNG.',
    desc_en: 'Open source library that enables exporting the collage as a PNG image.',
  },
]

const { locale } = useLocale()
</script>

<template>
  <div class="flex-1 p-4 sm:p-6">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <NuxtLink to="/" class="text-gray-400 hover:text-white">{{ t('home') }}</NuxtLink>
        <h1 class="text-2xl font-bold">{{ t('about') }}</h1>
      </div>

      <div class="space-y-8">
        <!-- Quiénes somos -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h2 class="text-lg font-bold mb-3 text-purple-400">{{ t('about_who_title') }}</h2>
          <p class="text-gray-300 leading-relaxed">{{ t('about_who_desc') }}</p>
        </div>

        <!-- Agradecimientos -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h2 class="text-lg font-bold mb-2 text-yellow-400">{{ t('about_thanks_title') }}</h2>
          <p class="text-gray-400 text-sm mb-5">{{ t('about_thanks_intro') }}</p>
          <div class="space-y-4">
            <div
              v-for="credit in credits"
              :key="credit.name"
              class="flex items-start gap-3 border-t border-gray-700 pt-4 first:border-0 first:pt-0"
            >
              <div class="flex-1">
                <a
                  :href="credit.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-white hover:text-purple-400 transition-colors"
                >{{ credit.name }} ↗</a>
                <p class="text-gray-400 text-sm mt-0.5">
                  {{ locale === 'es' ? credit.desc_es : credit.desc_en }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
