'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Film,
  BookMarked,
  ExternalLink,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type BookRecommendation, type MovieRecommendation } from '@/lib/api/recommendations'

type RecommendationItem = BookRecommendation | MovieRecommendation

interface RecommendationCarouselProps {
  items: RecommendationItem[]
  mode: 'books' | 'movies'
  onSave: (item: RecommendationItem) => void
  isSaved: (id: string) => boolean
}

export default function RecommendationCarousel({
  items,
  mode,
  onSave,
  isSaved,
}: RecommendationCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardsPerPage, setCardsPerPage] = useState(1)

  // State pentru paginare și pentru detectarea schimbărilor în items
  const [page, setPage] = useState(0)
  const [prevItems, setPrevItems] = useState(items)

  // FIX ESLint: Resetăm pagina direct în render loop (Derived State Pattern)
  // Dacă lista de itemi s-a schimbat față de ultima randare, resetăm pagina la 0.
  if (items !== prevItems) {
    setPrevItems(items)
    setPage(0)
  }

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

  const pageCount = Math.ceil(items.length / cardsPerPage)
  const start = page * cardsPerPage
  const end = start + cardsPerPage
  const visibleItems = items.slice(start, end)

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* items-start e critic aici ca să nu întindă cardurile pe înălțime */}
      <ul className="flex gap-5 justify-center items-start min-h-[350px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item) => {
            const saved = isSaved(item.id)
            const isBook = mode === 'books'

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-shrink-0 w-44" // 176px
              >
                {/* CONTAINER PRINCIPAL */}
                <div className="group relative flex flex-col w-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  {/* Match Score Badge */}
                  <div className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md shadow-sm border border-white/10">
                    <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                    {item.matchScore}%
                  </div>

                  {/* ZONA IMAGINE (Flush top) */}
                  <div className="relative aspect-[2/3] w-full bg-muted">
                    {item.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground bg-muted/50">
                        {isBook ? (
                          <BookMarked className="h-8 w-8 opacity-20" />
                        ) : (
                          <Film className="h-8 w-8 opacity-20" />
                        )}
                        <span className="text-[10px]">No cover</span>
                      </div>
                    )}

                    {/* Gradient subtil */}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  {/* ZONA CONȚINUT */}
                  <div className="flex flex-col p-3 gap-3">
                    {/* Header: Titlu + Autor/An */}
                    <div>
                      <h3
                        className="text-sm font-semibold leading-tight line-clamp-1 text-foreground"
                        title={item.title}
                      >
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {isBook
                            ? (item as BookRecommendation).author
                            : (item as MovieRecommendation).director}
                        </p>
                        {!isBook && (item as MovieRecommendation).year && (
                          <span className="text-[12px] text-muted-foreground/80 font-mono">
                            &apos;{(item as MovieRecommendation).year.slice(-2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer: Link + Buton */}
                    <div className="flex flex-col gap-3">
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 text-[12px] text-muted-foreground hover:text-primary transition-colors"
                        >
                          <span>View details</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}

                      <Button
                        size="sm"
                        variant={saved ? 'secondary' : 'default'}
                        className={cn(
                          'w-full h-8 text-xs font-medium shadow-none',
                          saved && 'bg-muted/80 text-muted-foreground hover:bg-muted',
                        )}
                        disabled={saved}
                        onClick={() => onSave(item)}
                      >
                        {saved ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                            Saved
                          </>
                        ) : (
                          <>
                            {isBook ? (
                              <BookMarked className="h-3.5 w-3.5 mr-1.5" />
                            ) : (
                              <Film className="h-3.5 w-3.5 mr-1.5" />
                            )}
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>

      {/* Navigation Arrows */}
      {page > 0 && (
        <button
          onClick={() => setPage(page - 1)}
          className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background/90 z-20 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>
      )}
      {page < pageCount - 1 && (
        <button
          onClick={() => setPage(page + 1)}
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background/90 z-20 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
      )}
    </div>
  )
}
