// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },

  // Include your modules here
  modules: [["@storyblok/nuxt", { accessToken: "rNPzA9OYKH7bTADlOhVuWQtt" }]],

  // Any other configuration options go here
});
