<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const horses = computed(() => store.getters['racing/getHorses'])
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden">
    <h2 class="text-2xl font-bold mb-2 shrink-0 text-center bg-yellow-300">Horse List {{ `1-${horses.length}` }}</h2>
    <div class="flex-1 overflow-y-auto">
      <table class="w-full bg-white border border-gray-300">
        <thead class="bg-gray-300 sticky top-0">
          <tr>
            <th class="text-center border border-gray-400 p-2">Name</th>
            <th class="text-center border border-gray-400 p-2">Condition</th>
            <th class="text-center border border-gray-400 p-2">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(horse, index) in horses" :key="`${index}-${horse.id}`">
            <td class="border border-gray-300 p-2 text-center">{{ horse.name }}</td>
            <td class="border border-gray-300 p-2 text-center">{{ horse.condition }}</td>
            <td
              class="border border-gray-300 p-2 text-center"
              :style="{ backgroundColor: horse.color }"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
