export const MIN_SEARCH_LENGTH = 3

const normalizeChar = (char: string) => char.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() || char

export const normalize = (text: string) => [...text].map(normalizeChar).join('')

export const matchesSearch = (text: string, query: string) => normalize(text).includes(normalize(query.trim()))

export function splitByMatch(text: string, query: string) {
  const term = normalize(query.trim())
  if (!term) return [{ text, match: false }]

  const normalized = normalize(text)
  const parts: { text: string, match: boolean }[] = []
  let cursor = 0
  let index = normalized.indexOf(term)

  while (index !== -1) {
    if (index > cursor) parts.push({ text: text.slice(cursor, index), match: false })
    parts.push({ text: text.slice(index, index + term.length), match: true })
    cursor = index + term.length
    index = normalized.indexOf(term, cursor)
  }

  if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false })
  return parts
}
