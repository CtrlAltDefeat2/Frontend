import { z } from 'zod'

const schema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default('Spotify Recs'),
  NEXT_PUBLIC_SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string().optional(),
  SPOTIFY_REDIRECT_URI: z.string().url(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
})

export const env = schema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
})

export const SPOTIFY_CLIENT_ID = env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export const SPOTIFY_REDIRECT_URI = env.SPOTIFY_REDIRECT_URI
export const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
