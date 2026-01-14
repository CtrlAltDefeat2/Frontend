import { Playlist } from '@/lib/api/spotify'

export interface PlaylistCarouselProps {
  data: Playlist[]
  selected: Record<string, boolean>
  toggle: (playlist: Playlist) => void
}
