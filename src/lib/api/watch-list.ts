export type WatchItem = {
  id: string
  title: string
  director: string
  year?: string
  cover?: string
  matchScore?: number
  reason?: string
  url?: string
  watched?: boolean
}

const STORAGE_KEY = 'watch-list-v1'

function readStore(): WatchItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeStore(items: WatchItem[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export async function fetchWatchList(): Promise<WatchItem[]> {
  await new Promise((r) => setTimeout(r, 200)) // simulare delay
  return readStore()
}

export async function addToWatchList(item: WatchItem): Promise<void> {
  const items = readStore()
  if (!items.find((m) => m.id === item.id)) {
    items.unshift({ ...item, watched: false })
    writeStore(items)
  }
}

export async function toggleWatchedStatus(id: string): Promise<void> {
  const items = readStore()
  const item = items.find((m) => m.id === id)
  if (item) {
    item.watched = !item.watched
    writeStore(items)
  }
}

export async function removeFromWatchList(id: string): Promise<void> {
  const next = readStore().filter((m) => m.id !== id)
  writeStore(next)
}

export async function clearWatchList(): Promise<void> {
  writeStore([])
}
