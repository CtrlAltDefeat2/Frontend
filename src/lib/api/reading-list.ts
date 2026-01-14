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
  const updatedItems = items.map((item) => (item.id === id ? { ...item, read: !item.read } : item))
  writeStore(updatedItems)

  const rawStorage = localStorage.getItem('app-storage')
  const token = rawStorage ? JSON.parse(rawStorage).state?.backendToken : null

  if (!token) return
  try {
    const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL
    await fetch(`${backendBase}/api/books/toggle-read?bookId=${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Sync error:', error)
  }
}

export async function removeFromReadingList(id: string): Promise<void> {
  const next = readStore().filter((b) => b.id !== id)
  writeStore(next)
}

export async function clearReadingList(): Promise<void> {
  writeStore([])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapBookToReadingItem = (book: any, localItems: ReadingItem[] = []): ReadingItem => {
  const localMatch = localItems.find((li) => li.id === book.id.toString())
  return {
    id: book.id.toString(),
    title: book.title,
    authors: book.authors || 'Autor necunoscut',
    cover: book.imageUrl,
    matchScore: book.match,
    url: '', //  pentru implementare view details
    read: localMatch ? localMatch.read : false,
  }
}
