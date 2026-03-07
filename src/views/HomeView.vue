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
  <div class="grid grid-cols-12 gap-3 h-full overflow-hidden">
    <aside class="col-span-2 h-full overflow-hidden">
      <RacingHorseList />
    </aside>

    <section class="col-span-5 h-full overflow-hidden">
      <RacingLanes />
    </section>

    <aside class="col-span-5 h-full overflow-hidden">
      <RacingBoard />
    </aside>
  </div>
</template>
