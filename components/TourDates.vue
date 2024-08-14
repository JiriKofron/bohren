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

console.log('config', config)

const concerts: Ref<Concert[] | null> = ref(null)
const { data } = useAsyncData('venues', () => $fetch(`${config.strapiLocalUrl}/api/concerts?populate=*`, {
  headers: {
    Authorization: `Bearer ${config.publicBearerToken}`
  }
}))

console.log('dataa', data)

concerts.value = data.value?.data
</script>

<template>
  <section>
    <h1>
      Tour dates
    </h1>

    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Date
          </th>
          <th>
            Place
          </th>
          <th>
            Tickets
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="concert in concerts"
          :key="concert.id"
        >
          <th>{{ concert.attributes.Name }}</th>
          <td>
            {{ new Date(concert.attributes.Date).toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }) }}
          </td>

          <td>
            {{ concert.attributes.venues.data[0].attributes.Name }}
          </td>
          <td>
            <button>Tickets</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">

</style>
