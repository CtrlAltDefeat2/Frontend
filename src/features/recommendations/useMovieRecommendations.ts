'use client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { generateMovieRecommendations } from '@/lib/api/spotify'

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
