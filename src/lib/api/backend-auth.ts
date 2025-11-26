const API_BASE_URL = 'http://localhost:8080'

export async function loginToBackend(spotifyAccessToken: string, spotifyRefreshToken: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/spotify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: spotifyAccessToken,
        refreshToken: spotifyRefreshToken, // Trimitem și refresh token
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      // Aici e important să aruncăm eroarea ca să o prindă CallbackPage
      throw new Error(`Backend login failed: ${res.status} ${errorText}`)
    }

    return await res.json()
  } catch (error) {
    console.error('Error logging into backend:', error)
    throw error // Retrimitem eroarea sus, către pagina de callback
  }
}
