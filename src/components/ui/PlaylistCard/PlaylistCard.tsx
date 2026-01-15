import Image from 'next/image'
import { Card, CardContent } from '../Card/Card'
import { PlaylistCardProps } from './PlaylistCard.types'
import { playlistCardStyles } from './PlaylistCard.styles'
import { PLAYLIST_CARD_CONSTANTS } from '@/resources/resources'

export default function PlaylistCard({ playlist, active }: PlaylistCardProps) {
  const description = active
    ? PLAYLIST_CARD_CONSTANTS.LABELS.SELECTED
    : PLAYLIST_CARD_CONSTANTS.LABELS.DEFAULT_DESCRIPTION

  return (
    <Card className={playlistCardStyles.card}>
      <CardContent className={playlistCardStyles.content}>
        <div className={playlistCardStyles.imageContainer}>
          {playlist.image ? (
            <Image
              src={playlist.image}
              alt={PLAYLIST_CARD_CONSTANTS.ALT_TEXT.getCoverAlt(playlist.name)}
              className={playlistCardStyles.image}
              width={300}
              height={300}
              unoptimized={playlist.image.startsWith('http')}
              loading="eager"
            />
          ) : (
            <div className={playlistCardStyles.placeholder}>
              {PLAYLIST_CARD_CONSTANTS.LABELS.NO_IMAGE}
            </div>
          )}
        </div>
        <div className={playlistCardStyles.title}>{playlist.name}</div>
        <div className={playlistCardStyles.trackCount}>
          {playlist.tracksTotal} {PLAYLIST_CARD_CONSTANTS.LABELS.TRACKS_SUFFIX}
        </div>
        <p className={playlistCardStyles.description}>{description}</p>
      </CardContent>
    </Card>
  )
}
