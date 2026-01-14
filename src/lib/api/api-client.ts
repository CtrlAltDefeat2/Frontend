const BASE_URL = 'http://127.0.0.1:8081/api'

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })

  if (response.status === 401) {
    localStorage.removeItem('auth_token')
  }

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'API Request failed')
  }

  if (response.status === 204) return null
  return response.json()
}
