'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { usePlaylists } from '@/features/playlists/usePlaylists'
import { useRecommendations } from '@/features/recommendations/useRecommendations'
import type { Playlist } from '@/lib/api/spotify'
import { useReadingList } from '@/features/reading-list/useReadingList'
import { motion } from 'framer-motion'
import { ListMusic, Loader2, BookMarked, Sparkles, Music2, ExternalLink } from 'lucide-react'
import PlaylistCarousel from '@/components/ui/PlaylistCarousel'

export default function DashboardPage() {
  const { data, isError, isLoading } = usePlaylists()
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const { mutate, data: recs, isPending, reset } = useRecommendations()
  const { add, items } = useReadingList()

  const toggle = (p: Playlist) => setSelected((s) => ({ ...s, [p.id]: !s[p.id] }))

  const selectedIds = useMemo(
    () =>
      Object.entries(selected)
        .filter(([, v]) => v)
        .map(([k]) => k),
    [selected],
  )

  const generate = () => {
    reset()
    mutate({ playlistIds: selectedIds })
  }

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

  if (isError || !data?.length) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center text-center text-muted-foreground">
        <p className="text-lg font-medium">No playlists found</p>
        <p className="mt-1 text-sm max-w-sm">
          Try reconnecting your Spotify account or creating a few playlists — they’re the base for
          your book recommendations.
        </p>
        <Button className="mt-5" onClick={() => window.location.reload()}>
          Reconnect Spotify
        </Button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[1600px] px-10 py-12">
      {/* header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card">
            <ListMusic className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your Spotify Playlists</h1>
            <p className="text-sm text-muted-foreground">
              Select one or more playlists to generate personalized book recommendations based on
              your listening mood.
            </p>
          </div>
        </div>

        <Link href="/reading-list">
          <Button variant="outline" size="sm">
            View reading list ({items.length})
          </Button>
        </Link>
      </div>

      {/* playlists – COMPACT */}

      <PlaylistCarousel data={data} selected={selected} toggle={toggle} />

      {/* actions bar */}
      <div className="sticky bottom-4 mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card/80 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <Button
          onClick={generate}
          disabled={selectedIds.length === 0 || isPending}
          className="px-5"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating…
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generate books
            </span>
          )}
        </Button>

        <span className="text-sm text-muted-foreground">
          {selectedIds.length === 0
            ? 'Pick at least one playlist.'
            : `Selected: ${selectedIds.length}`}
        </span>

        {recs && recs.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="ml-auto"
          >
            Jump to results
          </Button>
        )}
      </div>

      {/* recommendations – COMPACT */}
      <section className="mt-8">
        <div className="mb-2 flex items-center gap-2">
          <Music2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Recommendations</h2>
        </div>

        {/* skeletons */}
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

        {/* empty */}
        {!isPending && (!recs || recs.length === 0) && (
          <p className="text-sm text-muted-foreground">
            No recommendations yet. Select some playlists and click <strong>Generate books</strong>.
          </p>
        )}

        {/* results */}
        {!isPending && recs && recs.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recs.map((b, idx) => {
              const isSaved = items.some((it) => it.id === b.id)
              return (
                <motion.li
                  key={b.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-[3/4] w-full bg-muted">
                    {b.cover && (
                      <img
                        src={b.cover}
                        alt={`Cover ${b.title}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}

                    <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground/80 ring-1 ring-border/60 backdrop-blur">
                      Match: <span className="font-semibold">{b.matchScore}%</span>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-semibold leading-snug line-clamp-2">{b.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{b.author}</p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded-full border px-2 py-0.5 text-[10px]">
                        From playlists
                      </span>

                      {b.url && (
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:underline"
                        >
                          View <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{b.reason}</p>

                    <CardFooter className="mt-3 px-0">
                      <Button
                        size="sm"
                        className="w-full"
                        disabled={isSaved}
                        onClick={() => {
                          add({
                            id: b.id,
                            title: b.title,
                            author: b.author,
                            cover: b.cover,
                            url: b.url,
                          })
                          toast.success(`Saved "${b.title}" to your reading list`)
                        }}
                      >
                        {isSaved ? (
                          <span className="inline-flex items-center gap-2">
                            <BookMarked className="h-4 w-4" />
                            Saved
                          </span>
                        ) : (
                          'Save to reading list'
                        )}
                      </Button>
                    </CardFooter>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}
