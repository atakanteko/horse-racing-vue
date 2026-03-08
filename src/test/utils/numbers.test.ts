import { describe, it, expect } from 'vitest'
import { randomNumber } from '@/utils/numbers'

describe('randomNumber', () => {
  it('should return a number', () => {
    const result = randomNumber()
    console.log(result)
    expect(result).toBeTypeOf('number')
  })
  it('should return a number between 1 and 100', () => {
    const result = randomNumber()
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(100)
  })
  it('should return the same number when min equals max', () => {
    const result = randomNumber(5, 5)
    expect(result).toBe(5)
  })
})
