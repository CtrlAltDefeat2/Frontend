import { useUIStore } from '@/store/ui.store'

export type Playlist = {
  id: string
  name: string
  image: string
  tracksTotal: number
  tracksLink: string
}

async function fetchPlaylists(token: string | null): Promise<Playlist[]> {
  console.log('TOKEN ' + token)
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
      tracksLink: item.tracks.href, // pt legarea cu backend, aici se face fetch pt. melodiile fiecarui playlist
      // apoi se foloseste items -> track -> trackObject -> id ca sa se faca fetch
      // in reccobeats
    }),
  )
}

export async function fetchUserPlaylists(): Promise<Playlist[]> {
  const token = useUIStore.getState().accessToken
  return await fetchPlaylists(token)
}
