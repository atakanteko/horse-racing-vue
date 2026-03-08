import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/layout/AppHeader.vue'
import { createMockRacingStore } from '../helpers/store'

describe('AppHeader', () => {
  it('should render', () => {
    const store = createMockRacingStore()
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="app-header-title"]').text()).toBe('Horse Racing')
  })
  it('should render GENERATE PROGRAM button', () => {
    const store = createMockRacingStore()
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    })
    const button = wrapper.find('button')
    expect(button.text()).toBe('GENERATE PROGRAM')
  })
  it('should call generateProgram when GENERATE PROGRAM button is clicked', async () => {
    const setProgramSpy = vi.fn()
    const store = createMockRacingStore({
      horses: [{ id: '1', name: 'Test', color: '#000', condition: 50 }],
      mockActions: {
        setProgram: setProgramSpy,
      },
    })
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    })
    const generateButton = wrapper.find('[data-testid="app-header-start-button"]')
    await generateButton.trigger('click')
    expect(setProgramSpy).toHaveBeenCalled()
  })
  it('should disable GENERATE PROGRAM button when race is running', () => {
    const store = createMockRacingStore({
      isRunning: true,
    })
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    })
    const generateButton = wrapper.find('[data-testid="app-header-start-button"]')
    expect(generateButton.attributes('disabled')).toBeDefined()
  })
  it('should show START button when race is not running', () => {
    const store = createMockRacingStore({
      isRunning: false,
    })
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    })
    const startButton = wrapper.find('[data-testid="app-header-toggle-button"]')
    expect(startButton.text()).toBe('START')
  })
  it('should show STOP button when race is running', () => {
    const store = createMockRacingStore({
      isRunning: true,
    })
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    })
    const stopButton = wrapper.find('[data-testid="app-header-toggle-button"]')
    expect(stopButton.text()).toBe('STOP')
  })
})
