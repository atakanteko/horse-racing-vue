import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { createMockRacingStore } from '../helpers/store'

describe('HomeView', () => {
  it('should render', () => {
    const store = createMockRacingStore()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [store],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should call generateHorseList on mount', () => {
    const setHorseListSpy = vi.fn()
    const store = createMockRacingStore({
      mockActions: {
        setHorseList: setHorseListSpy,
      },
    })

    mount(HomeView, {
      global: {
        plugins: [store],
      },
    })

    expect(setHorseListSpy).toHaveBeenCalled()
  })

  it('should render all child components', () => {
    const store = createMockRacingStore()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.findComponent({ name: 'RacingHorseList' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'RacingLanes' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'RacingBoard' }).exists()).toBe(true)
  })
})
