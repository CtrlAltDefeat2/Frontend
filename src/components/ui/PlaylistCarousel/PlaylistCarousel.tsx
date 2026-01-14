import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PlaylistCarouselProps } from './PlaylistCarousel.types'
import { playlistCarouselStyles } from './PlaylistCarousel.styles'
import { PLAYLIST_CAROUSEL_CONSTANTS } from '@/resources/resources'
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import { Playlist } from '@/lib/api/spotify'

export default function PlaylistCarousel({ data, selected, toggle }: PlaylistCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardsPerPage, setCardsPerPage] = useState<number>(
    PLAYLIST_CAROUSEL_CONSTANTS.DIMENSIONS.MIN_CARDS_PER_PAGE,
  )
  const [page, setPage] = useState<number>(0)

  const { CARD_WIDTH, GAP, MIN_CARDS_PER_PAGE } = PLAYLIST_CAROUSEL_CONSTANTS.DIMENSIONS

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateCardsPerPage: () => void = () => {
      const width: number = container.clientWidth
      const count: number = Math.floor((width + GAP) / (CARD_WIDTH + GAP))
      setCardsPerPage(Math.max(MIN_CARDS_PER_PAGE, count))
    }

    updateCardsPerPage()
    const resizeObserver: ResizeObserver = new ResizeObserver(updateCardsPerPage)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [CARD_WIDTH, GAP, MIN_CARDS_PER_PAGE])

  const pageCount: number = Math.ceil(data.length / cardsPerPage)
  const start: number = page * cardsPerPage
  const end: number = start + cardsPerPage
  const visibleItems: Playlist[] = data.slice(start, end)

  const handlePreviousPage: () => void = () => setPage(page - 1)
  const handleNextPage: () => void = () => setPage(page + 1)

  const canNavigatePrevious: boolean = page > 0
  const canNavigateNext: boolean = page < pageCount - 1

  return (
    <div className={playlistCarouselStyles.container} ref={containerRef}>
      <ul className={playlistCarouselStyles.list}>
        <AnimatePresence initial={false}>
          {visibleItems.map((playlist: Playlist) => {
            const active: boolean = !!selected[playlist.id]
            const cardClassName: string = `${playlistCarouselStyles.card.button} ${
              active ? playlistCarouselStyles.card.active : ''
            }`

            return (
              <motion.li
                key={playlist.id}
                initial={PLAYLIST_CAROUSEL_CONSTANTS.ANIMATION.INITIAL}
                animate={PLAYLIST_CAROUSEL_CONSTANTS.ANIMATION.ANIMATE}
                exit={PLAYLIST_CAROUSEL_CONSTANTS.ANIMATION.EXIT}
                className={playlistCarouselStyles.listItem}
              >
                <button onClick={() => toggle(playlist)} className={cardClassName}>
                  {active && (
                    <motion.span
                      initial={PLAYLIST_CAROUSEL_CONSTANTS.ANIMATION.BADGE_INITIAL}
                      animate={PLAYLIST_CAROUSEL_CONSTANTS.ANIMATION.BADGE_ANIMATE}
                      exit={PLAYLIST_CAROUSEL_CONSTANTS.ANIMATION.BADGE_EXIT}
                      className={playlistCarouselStyles.badge}
                    >
                      {PLAYLIST_CAROUSEL_CONSTANTS.LABELS.SELECTED_BADGE}
                    </motion.span>
                  )}

                  <PlaylistCard playlist={playlist} active={active} />
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>

      {canNavigatePrevious && (
        <button
          onClick={handlePreviousPage}
          className={`${playlistCarouselStyles.navigation.button} ${playlistCarouselStyles.navigation.left}`}
        >
          <ChevronLeft className={playlistCarouselStyles.navigation.icon} />
        </button>
      )}

      {canNavigateNext && (
        <button
          onClick={handleNextPage}
          className={`${playlistCarouselStyles.navigation.button} ${playlistCarouselStyles.navigation.right}`}
        >
          <ChevronRight className={playlistCarouselStyles.navigation.icon} />
        </button>
      )}
    </div>
  )
}
