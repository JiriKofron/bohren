<script setup lang="ts">
import data from '@/data/menuItem.json'
import type { MenuItem } from '~/types/types'
import HamburgerMenu from '~/components/navigation/HamburgerMenu.vue'

const { locale } = useI18n()
const localePath = useLocalePath()

const menuItems: MenuItem[] = data
const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex flex-col items-center ">
    <nav class="w-full flex items-center justify-between bg-default-red font-heading p-6">
      <div class="flex flex-col justify-center">
        <div class="text-5xl">
          BOHREN
        </div>
        <div class="text-base">
          & DER CLUB OF GORE
        </div>
      </div>
      <div
        class="hidden md:flex flex-auto items-center text-2xl justify-around max-w-xl gap-x-8 mr-8"
      >
        <NuxtLink
          v-for="menuItem in menuItems"
          :key="menuItem.id"
          :to="localePath(menuItem.to, locale)"
        >
          {{ $t(menuItem.name) }}
        </NuxtLink>
      </div>

      <!--      <LangSwitch />-->

      <button
        class=" md:hidden font-heading text-2xl outline outline-1 outline-white outline-offset-1 px-3"
        @click="toggleMenu"
      >
        MENU
      </button>
    </nav>

    <HamburgerMenu
      v-if="showMenu"
      v-model="showMenu"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
