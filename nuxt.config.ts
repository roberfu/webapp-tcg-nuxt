export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  future: {
    v4: true
  },
  app: {
    head: {
      title: 'TCG collage',
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' }
      ]
    }
  }
})