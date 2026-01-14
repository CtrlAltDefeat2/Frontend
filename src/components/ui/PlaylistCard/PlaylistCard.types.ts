import { Playlist } from '@/lib/api/spotify'

export interface PlaylistCardProps {
  playlist: Playlist
  active?: boolean
}
