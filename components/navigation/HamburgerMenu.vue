<script setup lang="ts">
import data from '@/data/menuItem.json'
import type { MenuItem } from '~/types/types'

const { locale } = useI18n()
const localePath = useLocalePath()

const menuItems: MenuItem[] = data
</script>

<template>
  <div class="flex flex-col z-30">
    header menu
    <nav class="flex flex-col items-center justify-center gap-y-4">
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
