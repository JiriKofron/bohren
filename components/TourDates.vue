<script setup lang="ts">
const config = useRuntimeConfig()

const concerts = ref()
const { data } = useAsyncData('venues', () => $fetch(`${config.strapiUrl}/api/concerts`, {
  headers: {
    Authorization: `Bearer ${config.publicToken}`
  }
}))

concerts.value = data.value?.data
</script>

<template>
  <section>
    <h1>
      Tour dates
    </h1>

    {{ concerts }}

    <article v-for="concert in concerts" :key="concert.id">
      {{ concert.attributes.Name }}
    </article>
  </section>
</template>

<style scoped lang="scss">

</style>
