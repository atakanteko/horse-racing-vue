<script setup lang="ts">
import { getRandomElements } from '@/utils/array'
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Horse } from '@/types/store/racing'

const store = useStore()
const horses = computed(() => store.getters['racing/getHorses'])
</script>

<template>
  <div class="rounded-lg p-4 shadow-sm h-full">
    <h2 class="text-lg font-semibold mb-4">Lanes</h2>
    <div v-for="(item, index) in getRandomElements<Horse>(horses, 10)" :key="index">
      <div class="h-10 w-10 bg-red-500">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
