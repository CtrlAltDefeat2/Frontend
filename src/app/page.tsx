'use client'
import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getToken } from '@/lib/api/spotify-login'
import { loginToBackend } from '@/lib/api/backend-auth'
import { useUIStore } from '@/store/ui.store'
import { toast } from 'sonner'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { setSpotifyTokens, setBackendToken } = useUIStore()

  const processedRef = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      if (processedRef.current) return

      const code = searchParams.get('code')
      const error = searchParams.get('error')

      if (error) {
        toast.error('Authorization failed', { description: error })
        router.push('/')
        return
      }

      if (!code) {
        return
      }

      processedRef.current = true

      const codeVerifier = sessionStorage.getItem('code_verifier')
      if (!codeVerifier) {
        toast.error('Missing code verifier')
        router.push('/')
        return
      }

      try {
        const spotifyData = await getToken(code, codeVerifier)

        if (spotifyData.error) {
          throw new Error(spotifyData.error_description || spotifyData.error)
        }

        setSpotifyTokens(spotifyData.access_token, spotifyData.refresh_token)
        sessionStorage.removeItem('code_verifier')

        const backendData = await loginToBackend(spotifyData.access_token)

        if (backendData.token) {
          setBackendToken(backendData.token)
          toast.success(`Welcome, ${backendData.displayName || 'User'}!`)
        } else {
          throw new Error('Backend did not return a token')
        }

        router.push('/dashboard')
      } catch (error) {
        console.error('Authentication flow failed:', error)
        toast.error('Failed to authenticate', {
          description: error instanceof Error ? error.message : 'Unknown error',
        })
        router.push('/')
      }
    }

    handleCallback()
  }, [searchParams, router, setSpotifyTokens, setBackendToken])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <div>
          <h2 className="text-lg font-semibold">Finalizing Login...</h2>
          <p className="text-muted-foreground">Connecting your Spotify account to our servers.</p>
        </div>
      </div>
    </div>
  )
}
