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

// Aici ar trebui sa ramana doar return de fetchPlaylists(token) si restu ar trebui adaugat intr o functie ce e apelata cand e generate books de playlist selectat in ui
// Restu functiei face astfel => ia song features din playlist => trimite la ai andrei => asteapta raspuns => trimite raspuns baza de date => asteapta carti
export async function fetchUserPlaylists(): Promise<Playlist[]> {
  const token = useUIStore.getState().accessToken

  if (!token) {
    console.warn('No access token found in UI store')
    return []
  }

  try {
    const playlists = await fetchPlaylists(token)

    if (playlists.length > 0) {
      const first = playlists[0]

      try {
        const songsFeatures = await fetchSongs(token, first.id, first.tracksTotal) // 1. Playlist => song features
        console.log('Songs features for first playlist:', songsFeatures)

        const aiApiBase = process.env.NEXT_PUBLIC_AI_API_URL

        if (!aiApiBase) {
          console.warn('NEXT_PUBLIC_AI_API_URL is not defined')
        } else {
          // 2. Trimitem la Andrei
          const aiResponse = await fetch(`${aiApiBase}/predict`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              playlistId: first.id,
              playlistName: first.name,
              tracksTotal: first.tracksTotal,
              features: songsFeatures,
            }),
          })

          if (!aiResponse.ok) {
            const errorText = await aiResponse.text().catch(() => '')
            console.error(
              'AI API /predict error',
              aiResponse.status,
              aiResponse.statusText,
              errorText,
            )
          } else {
            const aiData = await aiResponse.json()
            console.log('AI /predict response:', aiData)

            // 3. De la Andrei la Backend
            const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL

            if (!backendBase) {
              console.warn('NEXT_PUBLIC_BACKEND_URL is not defined')
            } else {
              try {
                const backendResponse = await fetch(backendBase, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    playlistId: first.id,
                    playlistName: first.name,
                    tracksTotal: first.tracksTotal,
                    aiResult: aiData,
                  }),
                })

                if (!backendResponse.ok) {
                  const backendErrorText = await backendResponse.text().catch(() => '')
                  console.error(
                    'Backend POST error',
                    backendResponse.status,
                    backendResponse.statusText,
                    backendErrorText,
                  )
                } else {
                  const backendData = await backendResponse.json().catch(() => null)
                  console.log('Backend response:', backendData)
                  // 4. Acest backend data ar fi lista de carti sugerate, candva chiar va fi
                }
              } catch (err) {
                console.error('Error while calling BACKEND endpoint:', err)
              }
            }
          }
        }
      } catch (err) {
        console.error('Error while fetching songs features or calling AI / BACKEND:', err)
      }
    }

    return playlists
  } catch (err) {
    console.error('Error while fetching user playlists:', err)
    return []
  }
}
