/// <reference types="vitest" />
/// <reference types="vitest/globals" />

declare module '@vue/test-utils' {
  import type { Component, Plugin } from 'vue'

  export interface ComponentMountingOptions {
    global?: {
      stubs?: Record<string, boolean | Component>
      mocks?: Record<string, unknown>
      plugins?: Plugin[]
    }
  }
}
