// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-27',
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
    '@nuxtjs/mdc'
  ],

  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true }
})