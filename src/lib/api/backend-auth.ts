const API_BASE_URL = 'http://127.0.0.1:8081'

export async function loginToBackend(spotifyAccessToken: string, spotifyRefreshToken: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/spotify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: spotifyAccessToken,
        refreshToken: spotifyRefreshToken,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Backend login failed: ${res.status} ${errorText}`)
    }
    console.log(res)

    const data = await res.json()

    if (data.token) {
      localStorage.setItem('auth_token', data.token)
    }

    return data
  } catch (error) {
    console.error('Error logging into backend:', error)
    throw error
  }
}
