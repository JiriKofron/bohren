<script setup lang="ts">
import data from '@/data/menuItem.json'
import type { MenuItem } from '~/types/types'

const { locale } = useI18n()
const localePath = useLocalePath()

const menuItems: MenuItem[] = data
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="absolute left-0 top-0 flex flex-col w-full h-screen z-30 bg-black">
    <button
      class="font-heading text-2xl self-end outline outline-1 outline-white outline-offset-1 px-3 mr-5"
      @click="$emit('update:modelValue', false)"
    >
      CLOSE
    </button>

    <nav class="flex flex-col h-screen gap-y-20 items-center justify-center gap-y-4 text-2xl font-heading text-gray-500">
      <NuxtLink
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        :to="localePath(menuItem.to, locale)"
      >
        {{ $t(menuItem.name) }}
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">

</style>
