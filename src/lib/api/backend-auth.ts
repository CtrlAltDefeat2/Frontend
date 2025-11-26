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
        refreshToken: spotifyRefreshToken,
      }),
    })

    // --- DEBUGGING ---
    if (!res.ok) {
      console.log('Status:', res.status) // Vedem daca e 403, 500 sau 400
      const errorText = await res.text()
      console.log('Error body:', errorText) // Vedem mesajul de eroare de la Java
      throw new Error(`Backend login failed: ${res.status} ${errorText}`)
    }
    // -----------------

    return await res.json()
  } catch (error) {
    console.error('Error logging into backend:', error)
    throw error
  }
}
