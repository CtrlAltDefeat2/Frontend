'use client'
import { useMutation } from '@tanstack/react-query'
import { fetchRecommendationsByPlaylists, type BookRecommendation } from '@/lib/api/recommendations'

export function useRecommendations() {
  return useMutation<BookRecommendation[], Error, { playlistIds: string[] }>({
    mutationFn: async ({ playlistIds }) => fetchRecommendationsByPlaylists(playlistIds),
  })
}
