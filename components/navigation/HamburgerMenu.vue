<script setup lang="ts">
import data from '@/data/menuItem.json'
import type { MenuItem } from '~/types/types'
import { cancelSmokeAnimation, runSmokeAnimation } from '~/data/animations/smokeAnimation'

const { locale } = useI18n()
const localePath = useLocalePath()

const menuItems: MenuItem[] = data
const emit = defineEmits(['update:modelValue'])

const threeCanvas = ref()

const closeMenu = () => {
  emit('update:modelValue', false)
  cancelSmokeAnimation()
}

onMounted(() => {
  runSmokeAnimation(threeCanvas.value)
})
</script>

<template>
  <div class="absolute left-0 top-0 flex flex-col w-full h-screen z-30 bg-white">
    <button
      class="font-heading text-2xl text-white self-end outline outline-1 outline-white outline-offset-1 px-3 mr-6 mt-11 z-50"
      @click="closeMenu"
    >
      CLOSE
    </button>

    <canvas
      id="c"
      ref="threeCanvas"
      class="absolute left-0 right-0 top-0 bottom-0 w-full h-auto z-40"
    />

    <nav class="flex flex-col h-screen items-center gap-y-10 text-3xl font-heading text-gray-400 mt-24 z-50">
      <NuxtLink
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        :to="localePath(menuItem.to, locale)"
        class="hover:text-white"
        @click="emit('update:modelValue', false)"
      >
        {{ $t(menuItem.name) }}
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.menuitem__text {
  backdrop-filter: hue-rotate(120deg);
}
</style>
