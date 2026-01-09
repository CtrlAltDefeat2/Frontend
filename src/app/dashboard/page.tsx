'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import AuthGuard from '@/components/common/AuthGuard'
import {
  ListMusic,
  Loader2,
  BookMarked,
  Sparkles,
  ExternalLink,
  Clapperboard,
  Film,
  BookOpen,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Store & Auth
import { useUIStore } from '@/store/ui.store'
import { initiateSpotifyLogin } from '@/lib/api/spotify-login'
import type { Playlist } from '@/lib/api/spotify'

// Features - Books
import { usePlaylists } from '@/features/playlists/usePlaylists'
import { useRecommendations } from '@/features/recommendations/useRecommendations'
import { useReadingList } from '@/features/reading-list/useReadingList'
import type { ReadingItem } from '@/lib/api/reading-list'

// Features - Movies
import { useMovieRecommendations } from '@/features/recommendations/useMovieRecommendations'
import { useWatchList } from '@/features/watch-list/useWatchList'

// Components
import PlaylistCarousel from '@/components/ui/PlaylistCarousel'
import RecommendationCarousel from '@/components/ui/RecommendationCarousel'

// Types
import { type BookRecommendation, type MovieRecommendation } from '@/lib/api/recommendations'

type Mode = 'books' | 'movies'
type RecommendationItem = BookRecommendation | MovieRecommendation

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}

function DashboardContent() {
  const { data: playlists, isError, isLoading } = usePlaylists()
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [mode, setMode] = useState<Mode>('books')

  const clearTokens = useUIStore((s) => s.clearTokens)

  // Books Logic
  const {
    mutate: generateBooks,
    data: bookRecs,
    isPending: isPendingBooks,
    reset: resetBooks,
  } = useRecommendations()
  const { add: addBook, items: readingList } = useReadingList()

  // Movies Logic
  const {
    mutate: generateMovies,
    data: movieRecs,
    isPending: isPendingMovies,
    reset: resetMovies,
  } = useMovieRecommendations()
  const { add: addMovie, items: watchList } = useWatchList()

  // Shared Logic
  const togglePlaylist = (p: Playlist) => setSelected((s) => ({ ...s, [p.id]: !s[p.id] }))

  const selectedIds = useMemo(
    () =>
      Object.entries(selected)
        .filter(([, v]) => v)
        .map(([k]) => k),
    [selected],
  )

  const handleGenerate = () => {
    if (mode === 'books') {
      resetMovies()
      generateBooks({ playlistIds: selectedIds })
    } else {
      resetBooks()
      generateMovies({ playlistIds: selectedIds })
    }
  }

  // determine current active states
  const isPending = mode === 'books' ? isPendingBooks : isPendingMovies
  const results = mode === 'books' ? bookRecs : movieRecs
  const hasResults = results && results.length > 0

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">Preparing your vibes…</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Fetching playlists and getting recommendations ready.
        </p>
      </main>
    )
  }

  if (isError || !playlists?.length) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center text-center text-muted-foreground">
        <p className="text-lg font-medium">No playlists found</p>
        <p className="mt-1 text-sm max-w-sm">
          Try reconnecting your Spotify account or creating a few playlists — they’re the base for
          your recommendations.
        </p>
        <Button
          className="mt-5"
          onClick={() => {
            clearTokens()
            try {
              initiateSpotifyLogin()
            } catch {
              toast.error('Failed to reconnect. Please try again.')
            }
          }}
        >
          Reconnect Spotify
        </Button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[1600px] px-10 py-12">
      {/* HEADER & NAV */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card">
            <ListMusic className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your Spotify Playlists</h1>
            <p className="text-sm text-muted-foreground">
              Select playlists to influence your recommendations.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/reading-list">
            <Button variant="outline" size="sm" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Reading list <span className="text-muted-foreground">({readingList.length})</span>
            </Button>
          </Link>

          <Link href="/watch-list">
            <Button variant="outline" size="sm" className="gap-2">
              <Film className="h-4 w-4" />
              Watch list <span className="text-muted-foreground">({watchList.length})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* MODE SWITCHER */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex items-center rounded-lg border border-border/50 bg-muted/40 p-1">
          <button
            onClick={() => setMode('books')}
            className={cn(
              'flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all',
              mode === 'books'
                ? 'bg-background text-foreground shadow-sm ring-1 ring-border/50'
                : 'text-muted-foreground hover:text-foreground cursor-pointer',
            )}
          >
            <BookOpen className="h-4 w-4" />
            Books
          </button>
          <button
            onClick={() => setMode('movies')}
            className={cn(
              'flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all',
              mode === 'movies'
                ? 'bg-background text-foreground shadow-sm ring-1 ring-border/50'
                : 'text-muted-foreground hover:text-foreground cursor-pointer',
            )}
          >
            <Clapperboard className="h-4 w-4" />
            Movies
          </button>
        </div>
      </div>

      {/* PLAYLISTS CAROUSEL */}
      <PlaylistCarousel data={playlists} selected={selected} toggle={togglePlaylist} />

      {/* ACTIONS BAR */}
      <div className="sticky bottom-4 z-20 mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card/80 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <Button
          onClick={handleGenerate}
          disabled={selectedIds.length === 0 || isPending}
          className="min-w-[160px] px-5 transition-all"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generate {mode}
            </span>
          )}
        </Button>

        <span className="text-sm text-muted-foreground">
          {selectedIds.length === 0
            ? 'Pick at least one playlist.'
            : `Selected: ${selectedIds.length} playlists`}
        </span>

        {hasResults && mode === 'books' && (
          <Button
            variant="ghost"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="ml-auto"
          >
            Jump to results
          </Button>
        )}
      </div>

      {/* RECOMMENDATIONS SECTION */}
      <section className="mt-10 min-h-[300px]">
        <div className="mb-4 flex items-center gap-2">
          {mode === 'books' ? (
            <BookOpen className="h-5 w-5 text-primary" />
          ) : (
            <Clapperboard className="h-5 w-5 text-primary" />
          )}
          <h2 className="text-lg font-semibold tracking-tight capitalize">
            {mode} Recommendations
          </h2>
        </div>

        {/* Loading Skeletons */}
        {isPending && (
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border/60 bg-card p-3"
              >
                <div className="mb-2 h-40 w-full animate-pulse rounded-md bg-muted/80" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted/70" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted/60" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isPending && !hasResults && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/10 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No recommendations yet. Select playlists above and click{' '}
              <strong className="text-foreground">Generate {mode}</strong>.
            </p>
          </div>
        )}

        {/* RESULTS DISPLAY */}
        {!isPending && hasResults && (
          <>
            {mode === 'movies' ? (
              // MODE: MOVIES (CAROUSEL)
              <RecommendationCarousel
                items={results}
                mode="movies"
                isSaved={(id) => watchList.some((item) => item.id === id)}
                onSave={(item) => {
                  addMovie(item as MovieRecommendation)
                  toast.success('Saved to watch list')
                }}
              />
            ) : (
              // MODE: BOOKS
              <RecommendationCarousel
                items={results}
                mode="books"
                isSaved={(id) => readingList.some((item) => item.id === id)}
                onSave={(item) => {
                  addBook(item as ReadingItem)
                  toast.success('Saved to watch list')
                }}
              />
            )}
          </>
        )}
      </section>
    </main>
  )
}
