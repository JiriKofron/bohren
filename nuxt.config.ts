// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    publicBearerToken: process.env.PUBLIC_BEARER_TOKEN,
    strapiLocalUrl: process.env.STRAPI_LOCAL_URL
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@hypernym/nuxt-gsap',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],

  i18n: {
    strategy: 'prefix_except_default',
    langDir: './locales',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json'
      },
      {
        code: 'de',
        iso: 'de-DE',
        file: 'de.json'
      }
    ],
    vueI18n: './i18n.config.ts'
  }
})
