// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@formkit/nuxt"],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
});
