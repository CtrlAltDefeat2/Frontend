'use client'
import { useMutation } from '@tanstack/react-query'
import { generateMovieRecommendations } from '@/lib/api/recommendations'
import { toast } from 'sonner'

export function useMovieRecommendations() {
  return useMutation({
    mutationFn: async ({ playlistIds }: { playlistIds: string[] }) => {
      return await generateMovieRecommendations(playlistIds)
    },
    onSuccess: (data) => {
      console.log('Generated movie recommendations:', data)
    },
    onError: (error) => {
      toast.error('Failed to generate movie recommendations')
      console.error(error)
    },
  })
}
