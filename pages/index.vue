<script setup lang="ts">
import { useElementSize } from '@vueuse/core'

const canvasWrapper = ref()
const raindrops = ref()

const { width, height } = useElementSize(canvasWrapper)

onMounted(() => {
  const ctx = (raindrops.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D

  /* setTimeout(() => {
    createRaindrop(ctx)
  }, 200) */

  setInterval(createRaindrop, 200, ctx)
})

const createRaindrop = (ctx: CanvasRenderingContext2D) => {
  const x = Math.floor(Math.random() * width.value)
  let y = Math.floor(Math.random() * height.value)
  const radius = Math.floor(Math.random() * (11 - 3) + 3)

  const drop = () => {
    window.requestAnimationFrame(drop)
    ctx.filter = 'contrast(1.7) brightness(1.7) saturate(1.5) drop-shadow(0 2px 1px white)'
    ctx.fillStyle = 'transparent'

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 1.5 * Math.PI)
    ctx.closePath()
    ctx.fill()

    const img = new Image()
    img.classList.add('rain')
    img.src = '/img/midnight_rain3.png'

    img.addEventListener('load', function () {
      ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2)

      ctx.drawImage(img, x - 2, y - 2, radius - 1, radius - 1)
    }, true)

    y += 1
  }

  window.requestAnimationFrame(drop)
}

</script>

<template>
  <main class="relative w-full h-screen">
    <div ref="canvasWrapper" class="absolute left-0 top-0 w-full h-screen landing bg-origin-border bg-center bg-no-repeat bg-cover blur-sm z-1" />
    <div ref="canvasWrapper" class="absolute left-0 top-0 w-full h-screen">
      <canvas ref="raindrops" :width="width" :height="height" class="h-screen" />
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
