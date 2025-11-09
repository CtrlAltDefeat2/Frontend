'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getToken } from '@/lib/api/spotify-login'
import { useUIStore } from '@/store/ui.store'
import { toast } from 'sonner'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setTokens } = useUIStore()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const error = searchParams.get('error')

      if (error) {
        toast.error('Authorization failed', {
          description: error,
        })
        router.push('/')
        return
      }

      if (!code) {
        toast.error('No authorization code received')
        router.push('/')
        return
      }

      const codeVerifier = sessionStorage.getItem('code_verifier')
      if (!codeVerifier) {
        toast.error('Missing code verifier')
        router.push('/')
        return
      }

      try {
        const data = await getToken(code, codeVerifier)

        if (data.error) {
          throw new Error(data.error_description || data.error)
        }

        setTokens(data.access_token, data.refresh_token)
        sessionStorage.removeItem('code_verifier')

        toast.success('Connected successfully!')
        router.push('/dashboard')
      } catch (error) {
        console.error('Token exchange failed:', error)
        toast.error('Failed to authenticate', {
          description: error instanceof Error ? error.message : 'Unknown error',
        })
        router.push('/')
      }
    }

    handleCallback()
  }, [searchParams, router, setTokens])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground">Connecting to Spotify...</p>
      </div>
    </div>
  )
}
