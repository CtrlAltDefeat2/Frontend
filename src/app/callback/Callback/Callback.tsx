'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { getToken } from '@/lib/api/spotify-login'
import { loginToBackend } from '@/lib/api/backend-auth'
import { useUIStore } from '@/store/ui.store'
import { CALLBACK_CONSTANTS } from '@/resources/resources'
import { callbackStyles } from './Callback.styles'
import { getReturnPath, getErrorMessage } from './Callback.utils'

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setSpotifyTokens, setBackendToken } = useUIStore()

  // Prevent double execution in dev mode (React Strict Mode)
  const hasRun = useRef(false)

  useEffect((): void => {
    const handleCallback: () => Promise<void> = async () => {
      if (hasRun.current) return

      const code: string | null = searchParams.get(CALLBACK_CONSTANTS.QUERY_PARAMS.CODE)
      const error: string | null = searchParams.get(CALLBACK_CONSTANTS.QUERY_PARAMS.ERROR)
      const codeVerifier: string | null = sessionStorage.getItem(
        CALLBACK_CONSTANTS.STORAGE_KEYS.CODE_VERIFIER,
      )

      // Handle authorization error
      if (error) {
        toast.error(CALLBACK_CONSTANTS.TOAST_MESSAGES.ERRORS.AUTHORIZATION_FAILED, {
          description: error,
        })
        router.push(CALLBACK_CONSTANTS.ROUTES.HOME)
        return
      }

      // Handle missing code
      if (!code) {
        router.push(CALLBACK_CONSTANTS.ROUTES.HOME)
        return
      }

      hasRun.current = true

      if (!codeVerifier) {
        toast.error(CALLBACK_CONSTANTS.TOAST_MESSAGES.ERRORS.MISSING_VERIFIER)
        router.push(CALLBACK_CONSTANTS.ROUTES.HOME)
        return
      }

      try {
        // Step 1: Get Spotify tokens
        const spotifyData = await getToken(code, codeVerifier)

        if (spotifyData.error) {
          throw new Error(spotifyData.error_description || spotifyData.error)
        }

        setSpotifyTokens(spotifyData.access_token, spotifyData.refresh_token)
        sessionStorage.removeItem(CALLBACK_CONSTANTS.STORAGE_KEYS.CODE_VERIFIER)

        // Step 2: Authenticate with backend
        const backendData = await loginToBackend(
          spotifyData.access_token,
          spotifyData.refresh_token,
        )

        if (!backendData?.token) {
          throw new Error(CALLBACK_CONSTANTS.TOAST_MESSAGES.ERRORS.BACKEND_NO_TOKEN)
        }

        setBackendToken(backendData.token)
        toast.success(CALLBACK_CONSTANTS.TOAST_MESSAGES.SUCCESS)

        // Redirect to saved path or dashboard
        const returnPath: string = getReturnPath()
        router.push(returnPath)
      } catch (error) {
        console.error('Authentication flow failed:', error)

        const errorMessage: string = getErrorMessage(error)

        toast.error(CALLBACK_CONSTANTS.TOAST_MESSAGES.ERRORS.LOGIN_FAILED, {
          description: errorMessage,
          duration: CALLBACK_CONSTANTS.TOAST_DURATION.ERROR,
        })

        router.push(CALLBACK_CONSTANTS.ROUTES.HOME)
      }
    }

    handleCallback()
  }, [searchParams, router, setSpotifyTokens, setBackendToken])

  return (
    <div className={callbackStyles.container}>
      <div className={callbackStyles.content.wrapper}>
        <div className={callbackStyles.content.spinner} />
        <div>
          <h2 className={callbackStyles.content.title}>{CALLBACK_CONSTANTS.TEXTS.LOADING.TITLE}</h2>
          <p className={callbackStyles.content.description}>
            {CALLBACK_CONSTANTS.TEXTS.LOADING.DESCRIPTION}
          </p>
        </div>
      </div>
    </div>
  )
}
