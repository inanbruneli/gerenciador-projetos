import { describe, expect, it } from 'vitest'
import { matchesSearch, splitByMatch } from './search'

describe('matchesSearch', () => {
  it('ignores case and accents', () => {
    expect(matchesSearch('Integração Jurídica', 'JURIDICA')).toBe(true)
    expect(matchesSearch('Portal de RH', 'integra')).toBe(false)
  })
})

describe('splitByMatch', () => {
  it('marks every occurrence keeping the original text', () => {
    expect(splitByMatch('Ação e ação', 'acao')).toEqual([
      { text: 'Ação', match: true },
      { text: ' e ', match: false },
      { text: 'ação', match: true },
    ])
  })

  it('returns the whole text when the query is empty', () => {
    expect(splitByMatch('Portal', '  ')).toEqual([{ text: 'Portal', match: false }])
  })
})
