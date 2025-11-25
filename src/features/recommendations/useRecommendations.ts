'use client'
import { useMutation } from '@tanstack/react-query'
import { generateBookRecommendations } from '@/lib/api/spotify'
import { toast } from 'sonner'

export function useRecommendations() {
  return useMutation({
    mutationFn: async ({ playlistIds }: { playlistIds: string[] }) => {
      return await generateBookRecommendations(playlistIds)
    },
    onSuccess: (data) => {
      console.log('Generated recommendations:', data)
    },
    onError: (error) => {
      toast.error('Failed to generate recommendations')
      console.error(error)
    },
  })
}
