import { useQuery } from '@tanstack/react-query'
import { fetchUserPlaylists } from '@/lib/api/spotify'

export function usePlaylists() {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: fetchUserPlaylists,
    staleTime: 5 * 60 * 1000,
  })
}
