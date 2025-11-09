'use client'
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_TOKEN_ENDPOINT } from '../env'

const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'

export function generateRandomString(length = 64) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((x) => possible[x % possible.length])
    .join('')
}

export async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier)
  const hash = await window?.crypto?.subtle?.digest('SHA-256', data)
  const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  return base64
}

export async function getToken(code: string, codeVerifier: string) {
  const body = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_verifier: codeVerifier,
  })

  const res = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  return res.json()
}

export async function refreshToken(refresh_token: string) {
  const body = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: 'refresh_token',
    refresh_token,
  })

  const res = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  return res.json()
}

export async function getUserData(access_token: string) {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${access_token}` },
  })
  return res.json()
}

export async function initiateSpotifyLogin() {
  if (typeof window === 'undefined') return
  const codeVerifier = generateRandomString(64)
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  sessionStorage.setItem('code_verifier', codeVerifier)

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    scope: 'user-read-private user-read-email playlist-read-private',
  })

  window.location.href = `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`
}
