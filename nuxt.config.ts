import pkg from './package.json'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'TCG collage',
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
        { rel: 'canonical', href: 'https://tcgcollage.vercel.app' }
      ]
    }
  }
})