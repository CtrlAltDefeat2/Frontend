'use client'
import { useWatchList } from '@/features/watch-list/useWatchList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Film, Lightbulb, X, Bookmark, ExternalLink, Clapperboard } from 'lucide-react'
import { motion } from 'framer-motion'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import AuthGuard from '@/components/common/AuthGuard'

export default function WatchListPage() {
  const { items, remove, clear, isLoading, isError } = useWatchList()

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground">
        Loading your watch list…
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground">
        Failed to load watch list.
      </main>
    )
  }

  return (
    <AuthGuard>
      <main className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card">
              <Clapperboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Your watch list</h1>
              <p className="text-sm text-muted-foreground">
                Movies you have saved based on your Spotify vibe.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Back to dashboard
              </Button>
            </Link>

            {items.length > 0 && (
              <ConfirmDialog
                title="Clear all saved movies?"
                message="This action will remove every movie from your watch list. You won’t be able to undo this."
                onConfirm={() => clear()}
                trigger={
                  <Button variant="outline" size="sm">
                    Clear all
                  </Button>
                }
              />
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((m, i) => (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 120, damping: 18 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm ring-1 ring-black/0 transition-all duration-300 hover:shadow-md hover:ring-black/5"
              >
                {/* Remove movie */}
                <ConfirmDialog
                  title="Remove this movie?"
                  message={`You're about to remove "${m.title}" from your watch list.`}
                  onConfirm={() => remove(m.id)}
                  trigger={
                    <button
                      aria-label={`Remove ${m.title}`}
                      className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-md shadow-sm border border-border/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  }
                />

                {/* Cover */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
                  {m.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.cover}
                      alt={m.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      No poster
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
                    <Bookmark className="h-3.5 w-3.5" />
                    Watchlist
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-md font-semibold leading-snug line-clamp-2">{m.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground line-clamp-1">{m.director}</p>
                    {m.year && (
                      <span className="text-[12px] text-muted-foreground border px-1.5 rounded">
                        {m.year}
                      </span>
                    )}
                  </div>

                  {m.url && (
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block"
                    >
                      <Button size="sm" className="w-full">
                        View <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </main>
    </AuthGuard>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent">
        <Film className="h-14 w-14 text-primary" strokeWidth={1.5} />
      </div>

      <h2 className="text-3xl font-bold tracking-tight">Your watch list is empty</h2>
      <p className="mt-3 max-w-md text-base text-muted-foreground">
        Generate movie recommendations from your playlists and save them here for your next movie
        night.
      </p>

      <Link href="/dashboard">
        <Button className="mt-8 px-8 py-2.5 text-base font-medium">Discover movies</Button>
      </Link>

      <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4 text-primary" strokeWidth={1.5} />
        <p>Switch to Movies in the dashboard to get started.</p>
      </div>
    </div>
  )
}
