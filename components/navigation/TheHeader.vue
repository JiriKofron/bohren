<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

interface MenuItem {
  id: number
  name: string,
  to: string
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'menu.news',
    to: ''
  },
  {
    id: 2,
    name: 'menu.biography',
    to: '/biography'
  },
  {
    id: 3,
    name: 'menu.discography',
    to: '/discography'
  },
  {
    id: 4,
    name: 'menu.videos',
    to: '/media'
  },
  {
    id: 5,
    name: 'menu.contact',
    to: '/contact'
  }
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-default-red font-heading p-6">
    <div class="flex flex-col justify-center">
      <div class="text-5xl">
        BOHREN
      </div>
      <div class="text-base">
        & DER CLUB OF GORE
      </div>
    </div>
    <div class="flex flex-auto items-center justify-around max-w-lg">
      <NuxtLink
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        :to="localePath(menuItem.to, locale)"
      >
        {{ $t(menuItem.name) }}
      </NuxtLink>
    </div>

    <LangSwitch />

    <div>
      merch
    </div>
  </nav>
</template>

<style scoped lang="scss">

</style>
