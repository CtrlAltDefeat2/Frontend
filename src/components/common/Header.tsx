'use client'

import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/ui.store'
import { Sun, Moon, Music2 } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const { theme, toggleTheme } = useUIStore()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/40 bg-background/60 px-6 py-3 backdrop-blur-md">
      {/* Logo and app name */}
      <Link href="/" className="flex items-center gap-2">
        <Music2 className="h-5 w-5 text-primary" />
        <span className="text-lg font-semibold tracking-tight">Spotify Recs</span>
      </Link>

      {/* Theme button */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="transition-colors hover:bg-muted"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}
