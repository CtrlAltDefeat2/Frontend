import { create } from 'zustand'

interface UIStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void

  accessToken: string | null
  refreshToken: string | null
  setTokens: (accessToken: string, refreshToken: string) => void
  clearTokens: () => void
}

function getInitialTokens() {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null }
  }

  try {
    const accessToken = window.localStorage.getItem('spotify_access_token')
    const refreshToken = window.localStorage.getItem('spotify_refresh_token')
    return {
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
    }
  } catch {
    return { accessToken: null, refreshToken: null }
  }
}

export const useUIStore = create<UIStore>((set) => {
  const initialTokens =
    typeof window !== 'undefined' ? getInitialTokens() : { accessToken: null, refreshToken: null }

  return {
    theme: 'dark',
    toggleTheme: () =>
      set((state) => {
        const next = state.theme === 'dark' ? 'light' : 'dark'
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', next === 'dark')
        }
        return { theme: next }
      }),

    accessToken: initialTokens.accessToken,
    refreshToken: initialTokens.refreshToken,

    setTokens: (accessToken, refreshToken) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('spotify_access_token', accessToken)
        window.localStorage.setItem('spotify_refresh_token', refreshToken)
      }
      set({ accessToken, refreshToken })
    },

    clearTokens: () => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('spotify_access_token')
        window.localStorage.removeItem('spotify_refresh_token')
      }
      set({ accessToken: null, refreshToken: null })
    },
  }
})
