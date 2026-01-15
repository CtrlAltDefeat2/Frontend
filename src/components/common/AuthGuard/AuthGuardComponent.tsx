'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import { initiateSpotifyLogin } from '@/lib/api/spotify-login'
import { AUTH_GUARD_CONSTANTS } from '@/resources/resources'
import { AuthGuardStyles } from './AuthGuardComponent.styles'
import { AuthGuardProps } from './AuthGuardComponent.types'

export default function AuthGuardComponent({ children }: AuthGuardProps) {
  const { spotifyAccessToken } = useUIStore()
  const pathname: string = usePathname()

  useEffect((): void => {
    if (spotifyAccessToken) {
      return
    }

    if (pathname !== AUTH_GUARD_CONSTANTS.HOME_PATH) {
      sessionStorage.setItem(AUTH_GUARD_CONSTANTS.STORAGE_KEY, pathname)
    }

    initiateSpotifyLogin()
  }, [spotifyAccessToken, pathname])

  if (!spotifyAccessToken) {
    return (
      <div className={AuthGuardStyles.container}>
        <div className={AuthGuardStyles.content}>
          <Loader2 className={AuthGuardStyles.spinner} />
          <p className={AuthGuardStyles.text}>{AUTH_GUARD_CONSTANTS.REDIRECT_MESSAGE}</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
