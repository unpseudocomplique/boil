// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxt/ui-pro'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE
  }
})
