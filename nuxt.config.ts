// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/ionic", "@pinia/nuxt"],
  ssr: false,
  css: ["~/assets/css/ionic.css"],
})