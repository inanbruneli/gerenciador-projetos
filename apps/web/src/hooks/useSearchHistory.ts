import { useState } from 'react'
import { normalize } from '../utils/search'

const STORAGE_KEY = 'search-history'
const MAX_ITEMS = 5

function readHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useSearchHistory() {
  const [history, setHistory] = useState(readHistory)

  const save = (items: string[]) => {
    setHistory(items)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }

  const add = (term: string) => {
    const value = term.trim()
    const key = normalize(value)
    const rest = history.filter(item => {
      const itemKey = normalize(item)
      return !key.startsWith(itemKey) && !itemKey.startsWith(key)
    })
    save([value, ...rest].slice(0, MAX_ITEMS))
  }

  const remove = (term: string) => save(history.filter(item => item !== term))

  return { history, add, remove }
}
