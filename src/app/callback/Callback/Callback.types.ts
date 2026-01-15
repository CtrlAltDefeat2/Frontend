export interface SpotifyAuthResponse {
  access_token: string
  refresh_token: string
  error?: string
  error_description?: string
}

export interface BackendAuthResponse {
  token: string
}

export type AuthErrorType =
  | 'authorization_failed'
  | 'missing_code'
  | 'missing_verifier'
  | 'spotify_error'
  | 'backend_error'
  | 'network_error'
  | 'unknown_error'
