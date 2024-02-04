<script setup lang="ts">
const { width } = useWindowSize()
const screenWidth = ref()
console.log(width.value)

onMounted(() => {
  screenWidth.value = width.value
})

</script>
<template>
  <div class="flex flex-col items-center relative mt-24 h-[800px]">
    <h1 class="mx-auto text-clamp font-heading z-20 mt-8">
      Next show
    </h1>
    <video
      src="./../assets/bohren_clip.mov"
      class="absolute inset-0 pt-70 z-10"
      :width="screenWidth"
      autoplay
      muted
      loop
      disablepictureinpicture
    />
  </div>
</template>

<style scoped lang="scss">

</style>
