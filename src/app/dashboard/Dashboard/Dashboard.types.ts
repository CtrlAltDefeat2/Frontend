import type { BookRecommendation, MovieRecommendation } from '@/lib/api/recommendations'

export type Mode = 'books' | 'movies'

export type RecommendationItem = BookRecommendation | MovieRecommendation

export interface PlaylistSelection {
  [playlistId: string]: boolean
}

export interface DashboardState {
  selected: PlaylistSelection
  mode: Mode
}
