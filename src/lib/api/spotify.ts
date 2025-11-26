import { useUIStore } from '@/store/ui.store'

// --- 1. TIPURI DE DATE ---

// Tipul pentru playlist-ul final folosit în aplicație
export type Playlist = {
  id: string
  name: string
  image: string
  tracksTotal: number
  tracksLink: string
}

// Tipul pentru o carte
export type Book = {
  isbn: string
  title: string
  author: string
  description: string
  coverUrl: string
  genre: string
  matchScore: number
}

// [NOU] Interfața pentru datele brute care vin de la Spotify API
// Asta rezolvă eroarea de "unexpected any"
interface SpotifyApiPlaylist {
  id: string
  name: string
  images: { url: string }[]
  tracks: {
    total: number
    href: string
  }
}

// --- 2. DATE FALSE (MOCK) ---
const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'mock-1',
    name: 'Vibes de Vară',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&dpr=2&q=80',
    tracksTotal: 42,
    tracksLink: 'mock-link-1',
  },
  {
    id: 'mock-2',
    name: 'Focus & Coding',
    image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=300&dpr=2&q=80',
    tracksTotal: 128,
    tracksLink: 'mock-link-2',
  },
  {
    id: 'mock-3',
    name: 'Antrenament Intens',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&dpr=2&q=80',
    tracksTotal: 15,
    tracksLink: 'mock-link-3',
  },
]

const MOCK_BOOKS: Book[] = [
  {
    isbn: '9780441013593',
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'O capodoperă SF care se potrivește cu intensitatea playlist-ului tău.',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/81ym3QUd3KL.jpg',
    genre: 'Sci-Fi',
    matchScore: 95,
  },
  {
    isbn: '9781400079278',
    title: 'Pădurea Norvegiană',
    author: 'Haruki Murakami',
    description: 'O poveste nostalgică și melancolică.',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg',
    genre: 'Romance / Drama',
    matchScore: 88,
  },
]

// --- 3. FUNCȚIILE DE FETCH ---

async function fetchPlaylists(token: string | null): Promise<Playlist[]> {
  if (!token) return Promise.resolve([])

  // Mock check
  if (token === 'fake-token') {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return MOCK_PLAYLISTS
  }

  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) throw new Error(`Fetch error: ${response.status}`)

  const data = await response.json()

  // AICI AM REPARAT EROAREA:
  // În loc de (item: any), folosim (item: SpotifyApiPlaylist)
  return data.items.map((item: SpotifyApiPlaylist) => ({
    id: item.id,
    name: item.name,
    image: item.images?.[0]?.url || '',
    tracksTotal: item.tracks.total,
    tracksLink: item.tracks.href,
  }))
}

export async function fetchUserPlaylists(): Promise<Playlist[]> {
  const token = useUIStore.getState().spotifyAccessToken
  return await fetchPlaylists(token)
}

export async function generateBookRecommendations(selectedPlaylistIds: string[]): Promise<Book[]> {
  const token = useUIStore.getState().backendToken

  if (!token) throw new Error('User not authenticated with backend')

  if (token === 'fake-jwt') {
    console.log('📚 Generating MOCK Book Recommendations...')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return MOCK_BOOKS
  }

  const response = await fetch('http://localhost:8080/api/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ playlistIds: selectedPlaylistIds }),
  })

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`)
  }

  return await response.json()
}
