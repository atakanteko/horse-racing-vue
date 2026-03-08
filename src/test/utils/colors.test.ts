import { describe, it, expect } from 'vitest'
import { generateUniqueHexColor } from '@/utils/colors'

describe('generateUniqueHexColor', () => {
  it('should return a string starting with #', () => {
    const result = generateUniqueHexColor()
    expect(result).toMatch('#')
  })
  it('should return a valid hex color format', () => {
    const result = generateUniqueHexColor()
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('should return different colors on multiple calls', () => {
    const color1 = generateUniqueHexColor()
    const color2 = generateUniqueHexColor()
    const color3 = generateUniqueHexColor()

    const allSame = color1 === color2 && color2 === color3
    expect(allSame).toBe(false)
  })
})
