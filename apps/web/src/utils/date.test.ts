import { describe, expect, it } from 'vitest'
import { maskDate, parseDisplayDate, toIsoDate } from './date'

describe('maskDate', () => {
  it('formats digits as dd/mm/aaaa and drops anything else', () => {
    expect(maskDate('1')).toBe('1')
    expect(maskDate('1003')).toBe('10/03')
    expect(maskDate('10a03b2026999')).toBe('10/03/2026')
  })
})

describe('parseDisplayDate', () => {
  it('parses a complete date', () => {
    expect(toIsoDate(parseDisplayDate('10/03/2026')!)).toBe('2026-03-10')
  })

  it('rejects incomplete or impossible dates', () => {
    expect(parseDisplayDate('10/03/20')).toBeUndefined()
    expect(parseDisplayDate('31/02/2026')).toBeUndefined()
  })
})
