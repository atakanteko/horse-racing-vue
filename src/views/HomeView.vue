<script setup lang="ts">
import { useHorseList } from '@/composables/useHorseList'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const horses = computed(() => store.getters['racing/getHorses'])

const { generateHorseList } = useHorseList()

onMounted(() => {
  generateHorseList()
})


</script>

<template>
  <main class="">
    <p class="text-3xl font-bold text-white">Horse Racing</p>
    <div v-for="horse in horses" :key="horse.id">
      <div class="w-16 h-16 rounded-full flex items-center justify-center" :style="{ backgroundColor: horse.color }">
        <p class="text-white">{{ horse.name }}</p>
      </div>
    </div>
    <button @click="generateHorseList">Generate Horses</button>
  </main>
</template>
