<script setup lang="ts">

interface Locale {
  code: string
  iso: string
  file: string
}

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value as Array<Locale>).filter((i:Locale) => i.code !== locale.value)
})

console.log(availableLocales.value)
</script>

<template>
  <div>
    <template v-for="(l, index) in availableLocales" :key="l.code">
      <template v-if="index">
        |
      </template>
      <NuxtLink :to="switchLocalePath(l.code)">
        {{ l.code }}
      </NuxtLink>
    </template>
  </div>
</template>
