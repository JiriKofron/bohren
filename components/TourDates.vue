<script setup lang="ts">
import type { Ref } from 'vue'

const config = useRuntimeConfig()

interface Concert {
  Id: string
  attributes: {
    Name: string
    Date: string
    Description: string
  }
}

const concerts: Ref<Concert[] | null> = ref(null)
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

    <article v-for="concert in concerts" :key="concert.id">
      {{ concert.attributes.Name }}
    </article>
  </section>
</template>

<style scoped lang="scss">

</style>
