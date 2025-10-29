import { create } from 'zustand'

type UIState = { theme: 'light' | 'dark'; toggleTheme: () => void }

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === 'dark' ? 'light' : 'dark'
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next === 'dark')
      }
      return { theme: next }
    }),
}))
