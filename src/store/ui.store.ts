import React from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UIStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void

  spotifyAccessToken: string | null
  spotifyRefreshToken: string | null

  backendToken: string | null

  setSpotifyTokens: (accessToken: string, refreshToken: string) => void
  setBackendToken: (token: string) => void
  clearTokens: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark'
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', next === 'dark')
          }
          return { theme: next }
        }),

      spotifyAccessToken: null,
      spotifyRefreshToken: null,
      backendToken: null,

      setSpotifyTokens: (accessToken, refreshToken) =>
        set({ spotifyAccessToken: accessToken, spotifyRefreshToken: refreshToken }),

      setBackendToken: (token) => set({ backendToken: token }),

      clearTokens: () =>
        set({ spotifyAccessToken: null, spotifyRefreshToken: null, backendToken: null }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        spotifyAccessToken: state.spotifyAccessToken,
        spotifyRefreshToken: state.spotifyRefreshToken,
        backendToken: state.backendToken,
      }),
    },
  ),
)

export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = useUIStore.persist.onFinishHydration(() => {
      setHasHydrated(true)
    })

    if (useUIStore.persist.hasHydrated()) {
      setHasHydrated(true)
    }

    return unsubscribe
  }, [])

  return hasHydrated
}
