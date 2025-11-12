export type ReadingItem = {
  id: string
  title: string
  authors: string
  emotionsJson: string
  emotions: {
    Fear: number
    Anger: number
    Anticipation: number
    Trust: number
    Surprise: number
    Sadness: number
    Joy: number
    Disgust: number
    Positive: number
    Negative: number
  }
}

const STORAGE_KEY = 'reading-list-v1'

function readStore(): ReadingItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeStore(items: ReadingItem[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export async function fetchReadingList(): Promise<ReadingItem[]> {
  const response = await fetch('http://localhost:8081/api/books')
  console.log(response.json())
  return await response.json()
}

export async function addToReadingList(item: ReadingItem): Promise<void> {
  const items = readStore()
  if (!items.find((b) => b.id === item.id)) {
    items.unshift(item)
    writeStore(items)
  }
}

export async function removeFromReadingList(id: string): Promise<void> {
  const next = readStore().filter((b) => b.id !== id)
  writeStore(next)
}

export async function clearReadingList(): Promise<void> {
  writeStore([])
}
