import { apiRequest } from './api-client'

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
  const data = await apiRequest('/books/me')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((book: any) => mapBookToReadingItem(book, readStore()))
}

export async function addToReadingList(item: ReadingItem): Promise<void> {
  await apiRequest('/books', {
    method: 'POST',
    body: JSON.stringify({
      title: item.title,
      authors: item.authors,
      cover: item.cover,
    }),
  })
}

export async function toggleReadStatus(id: string): Promise<void> {}

export async function removeFromReadingList(id: string): Promise<void> {
  await apiRequest(`/books/${id}`, {
    method: 'DELETE',
  })
}

export async function clearReadingList(): Promise<void> {
  await apiRequest('/books/all', {
    method: 'DELETE',
  })
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
