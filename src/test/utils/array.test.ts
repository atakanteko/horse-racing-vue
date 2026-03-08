import { describe, it, expect } from 'vitest'
import { getRandomElements } from '@/utils/array'

describe('getRandomElements', () => {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  it('should return empty array when count is 0', () => {
    const result = getRandomElements(testArray, 0)
    expect(result).toEqual([])
  })

  it('should return empty array when count is negative', () => {
    const result = getRandomElements(testArray, -1)
    expect(result).toEqual([])
  })

  it('should return all elements when count >= array length', () => {
    const result = getRandomElements(testArray, 10)
    expect(result.length).toBe(10)
    expect(result.sort()).toEqual(testArray.sort())
  })

  it('should return exactly count number of elements', () => {
    const result = getRandomElements(testArray, 3)
    expect(result.length).toBe(3)
  })

  it('should return unique elements (no duplicates)', () => {
    const result = getRandomElements(testArray, 5)
    const unique = new Set(result)
    expect(unique.size).toBe(result.length)
  })

  it('should not mutate the original array', () => {
    const original = [...testArray]
    getRandomElements(testArray, 3)
    expect(testArray).toEqual(original)
  })
})
