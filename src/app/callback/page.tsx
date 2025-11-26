'use client'
import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getToken } from '@/lib/api/spotify-login'
import { loginToBackend } from '@/lib/api/backend-auth' // Asigură-te că ai fișierul creat anterior
import { useUIStore } from '@/store/ui.store'
import { toast } from 'sonner'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // FIX TS2339: Folosim noile denumiri din store
  const { setSpotifyTokens, setBackendToken } = useUIStore()

  // FIX LOADING STUCK: Folosim un ref pentru a preveni rularea de 2 ori in dev mode
  const hasRun = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      // Dacă a rulat deja o dată, ne oprim. Asta previne erorile de "Invalid code".
      if (hasRun.current) return

      const code = searchParams.get('code')
      const error = searchParams.get('error')

      if (error) {
        toast.error('Authorization failed', { description: error })
        router.push('/')
        return
      }

      if (!code) {
        // Dacă nu e cod, probabil userul a intrat direct pe link, îl trimitem acasă
        // Nu dăm eroare aici ca să nu apară toast-uri inutile
        router.push('/')
        return
      }

      // Marcam ca a inceput procesarea
      hasRun.current = true

      const codeVerifier = sessionStorage.getItem('code_verifier')
      if (!codeVerifier) {
        toast.error('Missing code verifier')
        router.push('/')
        return
      }

      try {
        // 1. Obținem token-urile de la Spotify
        const spotifyData = await getToken(code, codeVerifier)

        if (spotifyData.error) {
          throw new Error(spotifyData.error_description || spotifyData.error)
        }

        // Salvăm în store token-urile de Spotify
        setSpotifyTokens(spotifyData.access_token, spotifyData.refresh_token)
        sessionStorage.removeItem('code_verifier')

        // 2. Trimitem token-urile la Backend-ul Java
        // Dacă serverul Java nu merge, codul va sări în catch block
        const backendData = await loginToBackend(
          spotifyData.access_token,
          spotifyData.refresh_token,
        )

        // 3. Salvăm token-ul primit de la Java (JWT)
        if (backendData && backendData.token) {
          setBackendToken(backendData.token)
          toast.success('Login successful!')
          router.push('/dashboard')
        } else {
          throw new Error('Backend did not return a token')
        }
      } catch (error) {
        console.error('Authentication flow failed:', error)

        let message = 'Unknown error'
        if (error instanceof Error) {
          // Detectăm dacă Java e oprit
          if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            message = 'Could not connect to server. Is the Java Backend running?'
          } else {
            message = error.message
          }
        }

        toast.error('Login Failed', {
          description: message,
          duration: 5000,
        })

        // IMPORTANT: Ne întoarcem acasă chiar și la eroare, ca să nu rămânem blocați pe loading
        router.push('/')
      }
    }

    handleCallback()
  }, [searchParams, router, setSpotifyTokens, setBackendToken])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        {/* Un spinner simplu și un text */}
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <div>
          <h2 className="text-lg font-semibold">Finalizing Login...</h2>
          <p className="text-muted-foreground">Connecting your Spotify account to our servers.</p>
        </div>
      </div>
    </div>
  )
}
