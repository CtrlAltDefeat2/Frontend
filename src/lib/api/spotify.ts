import { useUIStore } from '@/store/ui.store'
import { ApiError } from 'next/dist/server/api-utils'
import { BookRecommendation } from '@/lib/api/recommendations'

export type Playlist = {
  id: string
  name: string
  image: string
  tracksTotal: number
  tracksLink: string
}

export type Track = {
  acousticness: number
  danceability: number
  energy: number
  instrumentalness: number
  key: number
  liveness: number
  loudness: number
  mode: number
  speechiness: number
  tempo: number
  valence: number
}

export type ReccobeatsAudioFeatures = {
  id: string
  href: string
  acousticness: number
  danceability: number
  energy: number
  instrumentalness: number
  key: number
  liveness: number
  loudness: number
  mode: number
  speechiness: number
  tempo: number
  valence: number
}

type ApiFetchOptions = {
  token?: string | null
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: string | null
}

async function apiFetch<T>(url: string, opts: ApiFetchOptions = {}): Promise<T> {
  const { token = null, method = 'GET', headers = {}, body = null } = opts
  const finalHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  }
  if (token) finalHeaders['Authorization'] = `Bearer ${token}`

  const response = await fetch(url, { method, headers: finalHeaders, body })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`Fetch error: ${response.status} ${response.statusText} — ${text}`)
  }
  if (response.status === 204) return {} as T
  return (await response.json()) as T
}

async function fetchPlaylists(token: string | null): Promise<Playlist[]> {
  if (!token) return []
  const data = await apiFetch<{ items: [] }>('https://api.spotify.com/v1/me/playlists', { token })
  return (data.items ?? []).map(
    (item: {
      id: string
      name: string
      images: { url: string }[]
      tracks: { total: number; href: string }
    }): Playlist => ({
      id: item.id,
      name: item.name,
      image: item.images?.[0]?.url,
      tracksTotal: item.tracks.total,
      tracksLink: item.tracks.href,
    }),
  )
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

async function fetchAllSpotifyTracks(
  token: string,
  playlistId: string,
  total: number,
): Promise<string[]> {
  const limit = 50
  let offset = 0
  const ids: string[] = []

  while (offset < total) {
    const url = `https://api.spotify.com/v1/playlists/${encodeURIComponent(
      playlistId,
    )}/tracks?limit=${limit}&offset=${offset}`
    const response = await apiFetch<{ items: { track?: { id?: string } }[] }>(url, { token })
    const batchIds = (response.items ?? [])
      .map((item) => item.track?.id)
      .filter((id): id is string => !!id)
    ids.push(...batchIds)
    if (batchIds.length < limit) break
    offset += limit
  }

  return ids
}

export async function fetchSongs(
  token: string | null,
  playlistId: string,
  total: number,
): Promise<Track[]> {
  if (!token) return []

  const spotifyIds = await fetchAllSpotifyTracks(token, playlistId, total)
  if (spotifyIds.length === 0) return []

  const batchSize = 40
  const spotifyIdBatches = chunkArray(spotifyIds, batchSize)
  const allReccoIds: string[] = []

  for (const batch of spotifyIdBatches) {
    const idsParam = encodeURIComponent(batch.join(','))
    const url = `https://api.reccobeats.com/v1/track?ids=${idsParam}`

    const r = await apiFetch<{ content?: { id: string }[] }>(url)
    const idsFromBatch = (r.content ?? []).map((it) => it.id)

    allReccoIds.push(...idsFromBatch)
  }

  if (allReccoIds.length === 0) return []

  const reccoIdBatches = chunkArray(allReccoIds, 40)
  const allFeatures: Track[] = []

  for (const batch of reccoIdBatches) {
    const idsParam = encodeURIComponent(batch.join(','))
    const url = `https://api.reccobeats.com/v1/audio-features?ids=${idsParam}`

    const r = await apiFetch<{ content?: ReccobeatsAudioFeatures[] }>(url)

    for (const f of r.content ?? []) {
      allFeatures.push({
        acousticness: f.acousticness,
        danceability: f.danceability,
        energy: f.energy,
        instrumentalness: f.instrumentalness,
        key: f.key,
        liveness: f.liveness,
        loudness: f.loudness,
        mode: f.mode,
        speechiness: f.speechiness,
        tempo: f.tempo,
        valence: f.valence,
      })
    }
  }

  return allFeatures
}

// Aici ar trebui sa ramana doar return de fetchPlaylists(token) si restu ar trebui adaugat intr o functie ce e apelata cand e generate books de playlist selectat in ui
// Restu functiei face astfel => ia song features din playlist => trimite la ai andrei => asteapta raspuns => trimite raspuns baza de date => asteapta carti
export async function fetchUserPlaylists(): Promise<Playlist[]> {
  const token = useUIStore.getState().spotifyAccessToken

  if (!token) {
    console.warn('No access token found in UI store')
    return []
  }

  try {
    return await fetchPlaylists(token)
  } catch (err) {
    console.error('Error while fetching user playlists:', err)
    return []
  }
}

export async function generateBookRecommendations(
  playlistIds: string[],
): Promise<BookRecommendation[]> {
  const token = useUIStore.getState().spotifyAccessToken
  if (!token) throw new Error('No access token')

  const allBooks: BookRecommendation[] = []

  const playlists = await fetchPlaylists(token)
  const selectedPlaylists = playlists.filter((p) => playlistIds.includes(p.id))

  for (const playlist of selectedPlaylists) {
    try {
      const songsFeatures = await fetchSongs(token, playlist.id, playlist.tracksTotal)
      console.log(`Songs features for "${playlist.name}":`, songsFeatures)

      const aiApiBase = process.env.NEXT_PUBLIC_AI_API_URL
      if (!aiApiBase) throw new Error('AI_API_URL not configured')

      // 2. Trimitem la Andrei
      const aiResponse = await fetch(`${aiApiBase}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playlistId: playlist.id,
          playlistName: playlist.name,
          tracksTotal: playlist.tracksTotal,
          features: songsFeatures,
        }),
      })

      if (!aiResponse.ok) {
        throw new Error(`AI API error: ${aiResponse.status}`)
      }

      const aiData = await aiResponse.json()
      console.log('AI response:', aiData)

      // 3. De la Andrei la Backend
      const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL
      if (!backendBase) throw new Error('BACKEND_URL not configured')

      const backendResponse = await fetch(backendBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playlistId: playlist.id,
          playlistName: playlist.name,
          tracksTotal: playlist.tracksTotal,
          aiResult: aiData,
        }),
      })

      if (!backendResponse.ok) {
        throw new Error(`Backend error: ${backendResponse.status}`)
      }

      const books = await backendResponse.json()
      // 4. Acest backend data ar fi lista de carti sugerate, candva chiar va fi
      allBooks.push(...(Array.isArray(books) ? books : [books]))
    } catch (err) {
      console.error(`Error processing playlist "${playlist.name}":`, err)
    }
  }

  return allBooks
}
