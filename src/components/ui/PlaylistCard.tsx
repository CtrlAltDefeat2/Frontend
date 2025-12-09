import { Playlist } from '@/lib/api/spotify'
import { Card, CardContent } from './card'

interface PlaylistCardProps {
  playlist: Playlist
  active?: boolean
}

export default function PlaylistCard({ playlist, active }: PlaylistCardProps) {
  return (
    <Card className="h-full border-0">
      <CardContent className="p-3 flex flex-col h-full">
        <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-md bg-muted flex-shrink-0">
          {playlist.image ? (
            <img
              src={playlist.image}
              alt={`${playlist.name} cover`}
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <div className="text-sm font-medium leading-tight line-clamp-1 flex-shrink-0">
          {playlist.name}
        </div>
        <div className="text-xs text-muted-foreground flex-shrink-0">
          {playlist.tracksTotal} tracks
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground ">
          {active ? 'Selected ✓' : 'Used to inspire book and movie matches.'}
        </p>
      </CardContent>
    </Card>
  )
}
