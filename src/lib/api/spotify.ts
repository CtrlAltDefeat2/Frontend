export type Playlist = { id: string; name: string; image?: string; tracksTotal?: number }

export async function fetchUserPlaylists(): Promise<Playlist[]> {
  await new Promise((r) => setTimeout(r, 250))
  return [
    { id: '1', name: 'Daily Mix', tracksTotal: 50 },
    { id: '2', name: 'Chill Vibes', tracksTotal: 73 },
    { id: '3', name: 'Focus Beats', tracksTotal: 42 },
  ]
}
