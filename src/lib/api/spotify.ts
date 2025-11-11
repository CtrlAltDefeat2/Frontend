import { useUIStore } from '@/store/ui.store'

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

async function fetchPlaylists(token: string | null): Promise<Playlist[]> {
  if (token === null) return Promise.resolve([])
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.items.map(
    (item: {
      id: string
      name: string
      images: { url: string }[]
      tracks: { total: number; href: string }
    }) => ({
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
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

export async function fetchSongs(token: string | null, playlistId: string): Promise<Track[]> {
  if (token === null) return []

  // 1) get tracks from spotify playlist
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  // extract ONLY spotify track ids (strings)
  const spotifyIds: string[] = data.items
    .map((item: { track?: { id?: string | null } }) => item.track?.id ?? null)
    .filter((id: string | null): id is string => id !== null)

  // 2) call reccobeats in batches to translate spotify ids -> recco track objects
  const batchSize = 40
  const spotifyIdBatches = chunkArray(spotifyIds, batchSize)

  // we collect ALL reccobeats ids here
  const allReccoIds: string[] = []

  for (const batch of spotifyIdBatches) {
    // batch is string[]
    const idsParam = encodeURIComponent(batch.join(','))
    const r = await fetch(`https://api.reccobeats.com/v1/track?ids=${idsParam}`)
    if (!r.ok) {
      throw new Error(`Fetch error: ${r.status} ${r.statusText}`)
    }
    const reccoList = await r.json()
    // assuming response shape: { items: [{ id: string, ... }] }
    const idsFromThisBatch: string[] = (reccoList.items ?? []).map((it: { id: string }) => it.id)
    allReccoIds.push(...idsFromThisBatch)
  }

  // 3) NOW: make ONE (batched) fetch for audio features from reccobeats
  // if the API supports ?ids= like spotify:
  const featureBatches = chunkArray(allReccoIds, batchSize)
  const allTracks: Track[] = []

  for (const batch of featureBatches) {
    const idsParam = encodeURIComponent(batch.join(','))
    const f = await fetch(`https://api.reccobeats.com/v1/track/audio-features?ids=${idsParam}`)
    if (!f.ok) {
      throw new Error(`Fetch error: ${f.status} ${f.statusText}`)
    }
    const featuresJson = await f.json()
    // assuming: { items: [ { id, href, acousticness, ... } ] }
    const cleaned: Track[] = (featuresJson.items ?? []).map(
      // type the param, then drop id & href, then cast
      ({
        id: _id,
        href: _href,
        ...rest
      }: {
        id: string
        href: string
      } & Track) => rest as Track,
    )

    allTracks.push(...cleaned)
  }
  console.log(allTracks)
  return allTracks
}

export async function fetchUserPlaylists(): Promise<Playlist[]> {
  const token = useUIStore.getState().accessToken
  const playlists = await fetchPlaylists(token)
  await fetchSongs(token, playlists[0].id)
  return playlists
}
