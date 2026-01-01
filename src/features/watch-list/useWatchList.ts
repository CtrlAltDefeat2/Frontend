'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchWatchList,
  addToWatchList,
  removeFromWatchList,
  clearWatchList,
  toggleWatchedStatus,
  type WatchItem,
} from '@/lib/api/watch-list'

const KEY = ['watch-list']

export function useWatchList() {
  const qc = useQueryClient()

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: KEY,
    queryFn: fetchWatchList,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const add = useMutation({
    mutationFn: addToWatchList,
    onMutate: async (item: WatchItem) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData<WatchItem[]>(KEY) || []
      const next = prev.find((m) => m.id === item.id)
        ? prev
        : [{ ...item, watched: false }, ...prev]
      qc.setQueryData(KEY, next)
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })

  const remove = useMutation({
    mutationFn: removeFromWatchList,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData<WatchItem[]>(KEY) || []
      qc.setQueryData(
        KEY,
        prev.filter((m) => m.id !== id),
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })

  const clear = useMutation({
    mutationFn: clearWatchList,
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData<WatchItem[]>(KEY) || []
      qc.setQueryData(KEY, [])
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })

  const toggleWatched = useMutation({
    mutationFn: toggleWatchedStatus,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData<WatchItem[]>(KEY) || []

      const next = prev.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m))

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
    toggleWatched: toggleWatched.mutate,
  }
}
