export type ReadingItem = {
  id: string
  title: string
  authors: string
  cover?: string
  matchScore?: number
  url?: string
  read?: boolean
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
  await new Promise((r) => setTimeout(r, 200))
  return readStore()
}

export async function addToReadingList(item: ReadingItem): Promise<void> {
  const items = readStore()
  if (!items.find((b) => b.id === item.id)) {
    items.unshift({ ...item, read: false })
    writeStore(items)
  }
}

export async function toggleReadStatus(id: string): Promise<void> {
  const items = readStore()
  const item = items.find((b) => b.id === id)
  if (item) {
    item.read = !item.read
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
