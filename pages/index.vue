<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { vIntersectionObserver } from '@vueuse/components'
import { definePageMeta } from '#imports'

const canvasWrapper = ref()
const raindrops = ref()
const drops = ref()
const landingPage = ref()
const raindropInterval = ref()
const dropInterval = ref()

const { width, height } = useElementSize(canvasWrapper)

definePageMeta({
  layout: 'default'
})

onMounted(() => {
  const rainDropsCtx = (raindrops.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  const dropCtx = (drops.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D

  raindropInterval.value = setInterval(createRaindrop, Math.floor(Math.random() * (200 - 100) + 100), rainDropsCtx)
  dropInterval.value = setInterval(createDrop, Math.floor(Math.random() * (16700 - 9000) + 9000), dropCtx)

  setTimeout(() => {
    rainDropsCtx.reset()
    dropCtx.reset()
  }, 90 * 1000)

  setTimeout(() => {
    clearInterval(raindropInterval.value)
    clearInterval(dropInterval.value)
  }, 2 * 60 * 1000)
})

onUnmounted(() => {
  clearInterval(raindropInterval.value)
  clearInterval(dropInterval.value)
})

const createRaindrop = (ctx: CanvasRenderingContext2D) => {
  const x = Math.floor(Math.random() * width.value)
  const y = Math.floor(Math.random() * height.value)
  const radius = Math.floor(Math.random() * (12 - 5) + 5)

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
    ctx.setTransform(1, 0, 0, 1, x, y)
    ctx.rotate(Math.floor(Math.random() * 360) * Math.PI / 180)
    ctx.drawImage(img, x - 2, y - 2, radius - 1, radius - 1)
  }, true)
}

const createDrop = (ctx: CanvasRenderingContext2D) => {
  let x = Math.floor(Math.random() * width.value)
  let y = Math.floor(Math.random() * height.value)
  const radius = Math.floor(Math.random() * (15 - 7) + 7)
  let dropTime = 0

  const drop = () => {
    if (dropTime < Math.random() * (4000 - 800) + 800) {
      window.requestAnimationFrame(drop)
    } else {
      ctx.clearRect(x - radius, y - radius, radius * 10, radius * 10)
    }

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

    x += (Math.random() * 0.2) * (Math.round(Math.random()) ? 1 : -1)
    y += Math.random() * 0.7

    dropTime += 1
  }

  window.requestAnimationFrame(drop)
}

const stopAnimation = ([{ isIntersecting }]: [{isIntersecting: boolean}]) => {
  if (!isIntersecting) {
    clearInterval(raindropInterval.value)
    clearInterval(dropInterval.value)
  }
}

</script>

<template>
  <main class="w-full bg-black text-white">
    <section ref="landingPage" v-intersection-observer="stopAnimation" class="relative w-full h-screen">
      <div class="absolute left-0 top-0 w-full h-screen landing bg-origin-border bg-center bg-no-repeat bg-cover bg-fixed blur-sm z-1" />
      <div ref="canvasWrapper" class="absolute left-0 top-0 w-full h-screen">
        <canvas ref="raindrops" :width="width" :height="height" class="h-screen" />
      </div>
      <div class="absolute left-0 top-0 w-full h-screen">
        <canvas ref="drops" :width="width" :height="height" class="h-screen" />
      </div>
      <section class="absolute left-0 top-0 w-full h-screen z-100 flex items-center justify-center">
        BOHREN {{ $t('welcome') }}
      </section>
    </section>

    <section class="h-[1000px]">
      <TourDates />
    </section>
  </main>
</template>

<style lang="scss" scoped>
  .landing {
    background-image: url('/img/midnight_bg.jpeg');
  }
</style>
