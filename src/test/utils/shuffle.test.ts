import { describe, it, expect } from 'vitest'
import { shuffle } from '@/utils/shuffle'

describe('shuffle', () => {
  it('should return an array with the same length', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffle(original)
    expect(shuffled.length).toBe(original.length)
  })

  it('should not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5]
    const originalCopy = [...original]
    shuffle(original)
    expect(original).toEqual(originalCopy)
  })

  it('should contain all original elements', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffle(original)
    original.forEach((item) => {
      expect(shuffled).toContain(item)
    })
  })

  it('should handle empty array', () => {
    const result = shuffle([])
    expect(result).toEqual([])
  })

  it('should handle single element array', () => {
    const result = shuffle([42])
    expect(result).toEqual([42])
  })
})
