import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Playlist } from '@/lib/api/spotify'
import PlaylistCard from './PlaylistCard'

interface PlaylistCarouselProps {
  data: Playlist[]
  selected: Record<string, boolean>
  toggle: (playlist: Playlist) => void
}

export default function PlaylistCarousel({ data, selected, toggle }: PlaylistCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardsPerPage, setCardsPerPage] = useState(1)
  const [page, setPage] = useState(0)

  const CARD_WIDTH = 176
  const GAP = 20

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateCardsPerPage = () => {
      const width = container.clientWidth
      const count = Math.floor((width + GAP) / (CARD_WIDTH + GAP))
      setCardsPerPage(Math.max(1, count))
    }

    updateCardsPerPage()
    const resizeObserver = new ResizeObserver(updateCardsPerPage)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  const pageCount = Math.ceil(data.length / cardsPerPage)
  const start = page * cardsPerPage
  const end = start + cardsPerPage
  const visibleItems = data.slice(start, end)

  return (
    <div className="relative w-full" ref={containerRef}>
      <ul className="flex gap-5 justify-center">
        <AnimatePresence initial={false}>
          {visibleItems.map((p) => {
            const active = !!selected[p.id]
            return (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex-shrink-0 w-44 "
              >
                <button
                  onClick={() => toggle(p)}
                  className={`group relative block w-full h-full text-left rounded-xl border border-border/60 bg-card shadow-sm 
                      ${active ? 'ring-2 ring-primary/70 border-primary/40' : ''}
                    `}
                >
                  {active && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -4 }}
                      className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary ring-1 ring-primary/30"
                    >
                      Selected
                    </motion.span>
                  )}

                  <PlaylistCard playlist={p} active={active} />
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>

      {page > 0 && (
        <button
          onClick={() => setPage(page - 1)}
          className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background/90 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>
      )}
      {page < pageCount - 1 && (
        <button
          onClick={() => setPage(page + 1)}
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background/90 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
      )}
    </div>
  )
}
