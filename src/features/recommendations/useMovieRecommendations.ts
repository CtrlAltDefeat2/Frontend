import { useMutation } from '@tanstack/react-query'
import { fetchMovieRecommendations } from '@/lib/api/recommendations'

export function useMovieRecommendations() {
  return useMutation({
    mutationFn: ({ playlistIds }: { playlistIds: string[] }) =>
      fetchMovieRecommendations(playlistIds),
  })
}
