import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RacingLanes from '@/components/racing/RacingLanes.vue'
import type { Horse } from '@/types/store/racing'
import { createMockRacingStore } from '@/test/helpers/store'

const mockHorse: Horse = {
  id: '1',
  name: 'Andromeda',
  color: '#ff0000',
  condition: 80,
}

describe('RacingLanes', () => {
  it('should render "No active race" message when no active race', () => {
    const store = createMockRacingStore({
      activeRace: null,
    })
    const wrapper = mount(RacingLanes, {
      global: {
        plugins: [store],
      },
    })

    const noActiveRaceMessage = wrapper.find('[data-testid="racing-lanes-no-active-race-message"]')
    expect(noActiveRaceMessage.text()).toContain(
      'No active race. Generate a program and start racing!',
    )
  })

  it('should render lanes when active race exists', () => {
    const store = createMockRacingStore({
      activeRace: {
        horsePositions: [{ horseId: '1', position: 0 }],
        programIndex: 0,
        program: {
          horses: [{ lane: 1, horse: mockHorse }],
          raceLength: 1200,
        },
      },
    })
    const wrapper = mount(RacingLanes, {
      global: {
        plugins: [store],
      },
    })
    const lanes = wrapper.findAll('[data-testid="racing-lanes-lane"]')
    expect(lanes.length).toBe(1)
    expect(lanes[0]?.text()).toContain('Andromeda')
  })
  it('should calculate position percentage correctly', () => {
    const store = createMockRacingStore({
      activeRace: {
        horsePositions: [{ horseId: '1', position: 500 }],
        programIndex: 0,
        program: {
          horses: [{ lane: 1, horse: mockHorse }],
          raceLength: 1600,
        },
      },
    })
    const wrapper = mount(RacingLanes, {
      global: {
        plugins: [store],
      },
    })
    const horseElement = wrapper.find('[data-testid="racing-lanes-horse-name"]')
    const style = horseElement.attributes('style')
    expect(style).toContain('left: 31.25%')
  })
})
