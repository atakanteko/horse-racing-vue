<script setup lang="ts">
import { useHorseList } from '@/composables/useHorseList'
import { onMounted } from 'vue'
import { RacingHorseList, RacingLanes, RacingBoard } from '@/components/racing'

const { generateHorseList } = useHorseList()

onMounted(() => {
  generateHorseList()
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-1 h-full overflow-hidden">
    <aside class="md:col-span-3 h-full overflow-hidden">
      <RacingHorseList />
    </aside>

    <section class="md:col-span-5 h-full overflow-hidden">
      <RacingLanes />
    </section>

    <aside class="md:col-span-4 h-full overflow-hidden">
      <RacingBoard />
    </aside>
  </div>
</template>
