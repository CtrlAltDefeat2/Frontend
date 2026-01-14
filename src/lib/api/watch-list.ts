import { apiRequest } from './api-client'

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
  const data = await apiRequest('/movies')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((m: any) => ({
    id: m.id.toString(),
    title: m.title,
    director: m.director,
    year: m.year,
    cover: m.cover,
    watched: m.watched,
  }))
}

export async function addToWatchList(item: WatchItem): Promise<void> {
  await apiRequest('/movies', {
    method: 'POST',
    body: JSON.stringify({
      title: item.title,
      director: item.director,
      year: item.year,
      cover: item.cover,
    }),
  })
}

export async function toggleWatchedStatus(id: string): Promise<void> {
  const items = readStore()
  const item = items.find((m) => m.id === id)
  if (item) {
    item.watched = !item.watched
    writeStore(items)
  }

  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8081'
  const rawStorage = localStorage.getItem('app-storage')

  let token = null
  try {
    if (rawStorage) {
      const storageJson = JSON.parse(rawStorage)
      token = storageJson.state?.backendToken
    }
  } catch (e) {
    console.error('Eroare la parsarea local storage-ului:', e)
  }

  if (!token || token === 'undefined') {
    console.warn(
      'Utilizatorul nu este autentificat la backend. Statusul nu a fost trimis la server.',
    )
    return
  }

  try {
    const response = await fetch(`${backendBase}/api/movies/toggle-watched?movieId=${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Eroare backend la toggle-watch:', errorData)
    } else {
      console.log(`Statusul filmului ${id} a fost actualizat pe server.`)
    }
  } catch (error) {
    console.error('Eroare de rețea la comunicarea cu backend-ul:', error)
  }
}

export async function removeFromWatchList(id: string): Promise<void> {
  await apiRequest(`/movies/${id}`, {
    method: 'DELETE',
  })
}

export async function clearWatchList(): Promise<void> {
  await apiRequest('/movies/all', {
    method: 'DELETE',
  })
}
