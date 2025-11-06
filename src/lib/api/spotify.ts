export type Playlist = { id: string; name: string; image?: string; tracksTotal?: number }

export async function fetchUserPlaylists(): Promise<Playlist[]> {
  await new Promise((r) => setTimeout(r, 250))
  return [
    {
      id: '1',
      name: 'Daily Mix',
      tracksTotal: 50,
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Chill Vibes',
      tracksTotal: 73,
      image:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '3',
      name: 'Focus Beats',
      tracksTotal: 42,
      image:
        'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '4',
      name: 'Indie Waves',
      tracksTotal: 64,
      image:
        'https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '5',
      name: 'Lo-Fi Study',
      tracksTotal: 58,
      image:
        'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '6',
      name: 'Midnight Jazz',
      tracksTotal: 39,
      image:
        'https://images.unsplash.com/photo-1525093485273-34834413e1ba?q=80&w=800&auto=format&fit=crop',
    },
  ]
}
