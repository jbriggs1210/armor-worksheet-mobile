// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/ionic", "@pinia/nuxt"],
  ssr: false,
  css: ["~/assets/css/ionic.css"],
  runtimeConfig: {
    public: {
      DB_URL: process.env.TURSO_CONNECTION_URL!,
      DB_SECRET: process.env.TURSO_AUTH_TOKEN
    }
  }
})