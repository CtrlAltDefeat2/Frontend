// src/lib/api/recommendations.ts
export type BookRecommendation = {
  id: string
  title: string
  authors: string
  imageUrl?: string
  match?: number // 0-100
  cover?: string
  matchScore?: number
}

export type MovieRecommendation = {
  id: string
  title: string
  director: string
  year: string
  cover?: string
  match?: number
  imageUrl?: string
  matchScore?: number
}
