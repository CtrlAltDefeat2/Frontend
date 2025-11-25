import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Playlist } from '@/lib/api/spotify'

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

                  <Card className="h-full border-0">
                    <CardContent className="p-3 flex flex-col h-full">
                      <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-md bg-muted flex-shrink-0">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={`${p.name} cover`}
                            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-medium leading-tight line-clamp-1 flex-shrink-0">
                        {p.name}
                      </div>
                      <div className="text-xs text-muted-foreground flex-shrink-0">
                        {p.tracksTotal} tracks
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground ">
                        {active ? 'Selected ✓' : 'Used to inspire book matches.'}
                      </p>
                    </CardContent>
                  </Card>
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>

      {page > 0 && (
        <button
          onClick={() => setPage(page - 1)}
          className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background/90"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>
      )}
      {page < pageCount - 1 && (
        <button
          onClick={() => setPage(page + 1)}
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background/90"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
      )}
    </div>
  )
}
