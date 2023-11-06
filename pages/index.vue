<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const raindrops = ref(null)

const { width, height } = useWindowSize()

onMounted(() => {
  setInterval(createRaindrop, 600)
})

const createRaindrop = () => {
  if(raindrops.value) {
    const ctx = (raindrops.value as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
      ctx.beginPath()
      let x = Math.floor(Math.random() * (width.value / 2))
      let y = Math.floor(Math.random() * (height.value / 2))
      let radius = Math.floor(Math.random() * 10)

      console.log(x, y)

      ctx.arc(x, y, radius, 0, 360)
      ctx.fill()
  }
}

</script>

<template>
  <main class="relative w-full h-screen">
    <div class="absolute left-0 top-0 w-full h-screen landing bg-origin-border bg-center bg-no-repeat bg-cover blur-sm z-1" >
      <canvas ref="raindrops" class="w-full h-screen"></canvas>
    </div>
    <section class="absolute left-0 top-0 w-full h-screen z-100 flex items-center justify-center">
      BOHREN
    </section>
  </main>
</template>

<style lang="scss" scoped>
  .landing {
    background-image: url('/img/midnight_bg.jpeg');
  }
</style>
