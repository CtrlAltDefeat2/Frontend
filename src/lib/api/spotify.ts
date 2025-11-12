import { useUIStore } from '@/store/ui.store'
import { ApiError } from 'next/dist/server/api-utils'

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
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const r = await apiFetch<{ content?: { id: string }[] }>(url)
    const idsFromThisBatch = (r.content ?? []).map((it) => it.id)
    allReccoIds.push(...idsFromThisBatch)
  }

  if (allReccoIds.length === 0) return []

  const featurePromises = allReccoIds.map(async (id): Promise<Track | null> => {
    const url = `https://api.reccobeats.com/v1/track/${id}/audio-features`
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const raw: Record<string, number> = await apiFetch(url)
      const {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        key,
        liveness,
        loudness,
        mode,
        speechiness,
        tempo,
        valence,
      } = raw
      return {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        key,
        liveness,
        loudness,
        mode,
        speechiness,
        tempo,
        valence,
      }
    } catch {
      return null
    }
  })

  return (await Promise.all(featurePromises)).filter((t): t is Track => t !== null)
}

export async function fetchUserPlaylists(): Promise<Playlist[]> {
  const token = useUIStore.getState().accessToken
  console.log(token)
  try {
    const playlists = await fetchPlaylists(token)
    if (playlists.length > 0) {
      const first = playlists[0]
      const songsFeatures = await fetchSongs(token, first.id, first.tracksTotal)
      console.log(songsFeatures)
    } // asta trebuie scoasa de aici dupa ce se modifica butonu pe dashboard. also nu face fata api la toate requesturile
    return playlists
  } catch {
    return []
  }
}
