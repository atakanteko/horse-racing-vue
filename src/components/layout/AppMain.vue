<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex-1 w-full mx-auto overflow-hidden">
    <RouterView v-slot="{ Component, route }">
      <Transition
        name="fade"
        mode="out-in"
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
</template>
