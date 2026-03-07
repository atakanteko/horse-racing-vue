<script setup lang="ts">
import { useStore } from 'vuex'
import { RacingProgramCard } from './index'
import { computed } from 'vue'

const store = useStore()
const programs = computed(() => store.getters['racing/getPrograms'])
const finishedRaces = computed(() => store.getters['racing/getFinishedRaces'])
</script>

<template>
  <div class="h-full flex flex-row gap-1 overflow-hidden">
    <RacingProgramCard :programs="programs" title="Program" />
    <RacingProgramCard
      :programs="finishedRaces"
      title="Results"
      :headerColor="'bg-results-background'"
    />
  </div>
</template>
