'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchReadingList,
  addToReadingList,
  removeFromReadingList,
  clearReadingList,
  toggleReadStatus,
  type ReadingItem,
} from '@/lib/api/reading-list'

const KEY = ['reading-list']

export function useReadingList() {
  const qc = useQueryClient()

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: KEY,
    queryFn: fetchReadingList,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const add = useMutation({
    mutationFn: addToReadingList,
    onMutate: async (item: ReadingItem) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData<ReadingItem[]>(KEY) || []
      const next = prev.find((b) => b.id === item.id) ? prev : [item, ...prev]
      qc.setQueryData(KEY, next)
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })

  const remove = useMutation({
    mutationFn: removeFromReadingList,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData<ReadingItem[]>(KEY) || []
      qc.setQueryData(
        KEY,
        prev.filter((b) => b.id !== id),
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })

  const clear = useMutation({
    mutationFn: clearReadingList,
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData<ReadingItem[]>(KEY) || []
      qc.setQueryData(KEY, [])
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })

  const toggleRead = useMutation({
    mutationFn: toggleReadStatus,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData<ReadingItem[]>(KEY) || []

      const next = prev.map((b) => (b.id === id ? { ...b, read: !b.read } : b))

      qc.setQueryData(KEY, next)
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })

  return {
    items: data,
    isLoading,
    isError,
    add: add.mutate,
    remove: remove.mutate,
    clear: clear.mutate,
    toggleRead: toggleRead.mutate,
  }
}
