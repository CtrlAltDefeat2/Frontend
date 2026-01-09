'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/store/ui.store'
import { initiateSpotifyLogin } from '@/lib/api/spotify-login'
import { Loader2 } from 'lucide-react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { spotifyAccessToken } = useUIStore()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && !spotifyAccessToken) {
      if (pathname && pathname !== '/') {
        sessionStorage.setItem('return_to', pathname)
      }

      initiateSpotifyLogin()
    }
  }, [isMounted, spotifyAccessToken, pathname])

  if (!isMounted || !spotifyAccessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Redirecting to Spotify...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
