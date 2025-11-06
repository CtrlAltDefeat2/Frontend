'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePlaylists } from '@/features/playlists/usePlaylists'
import { useRecommendations } from '@/features/recommendations/useRecommendations'
import type { Playlist } from '@/lib/api/spotify'

export default function DashboardPage() {
  const { data, isError, isLoading } = usePlaylists()
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const { mutate, data: recs, isPending, reset } = useRecommendations()

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
    <main className="min-h-[70vh] p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Your Spotify Playlists</h1>
        <p className="text-sm text-muted-foreground">
          Select one or more playlists below to generate personalized book recommendations based on
          your listening mood and taste.
        </p>
      </div>

      {/* PLAYLISTS */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((p) => {
          const active = !!selected[p.id]
          return (
            <button
              key={p.id}
              onClick={() => toggle(p)}
              className={[
                'group text-left',
                'rounded-xl border border-border/60 shadow-sm transition hover:shadow-md focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none',
                active ? 'ring-2 ring-primary border-primary/50' : '',
              ].join(' ')}
              aria-pressed={active}
            >
              <Card className="h-full overflow-hidden rounded-xl border-0">
                <CardContent className="p-4">
                  <div className="mb-3 aspect-square w-full overflow-hidden rounded-lg bg-muted">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.name} cover`}
                        className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      // fallback daca nu exista imagine
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="text-base font-medium leading-tight">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.tracksTotal ?? 0} tracks</div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {active ? 'Selected ✓' : 'Used to inspire book matches.'}
                  </p>
                </CardContent>
              </Card>
            </button>
          )
        })}
      </div>

      {/* ACTIONS */}
      <div className="sticky bottom-4 mt-6 flex flex-wrap items-center gap-3 rounded-xl border bg-card/80 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <Button
          onClick={generate}
          disabled={selectedIds.length === 0 || isPending}
          className="px-6"
        >
          {isPending ? 'Generating…' : 'Generate books'}
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
          >
            Jump to results
          </Button>
        )}
      </div>

      {/* RECOMMENDATIONS */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold tracking-tight">Recommendations</h2>
        {isPending && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-4">
                <div className="mb-3 h-40 w-full animate-pulse rounded-lg bg-muted/80" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted/70" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted/60" />
              </div>
            ))}
          </div>
        )}

        {!isPending && (!recs || recs.length === 0) && (
          <p className="text-sm text-muted-foreground">
            No recommendations yet. Select some playlists and click <strong>Generate books</strong>.
          </p>
        )}

        {!isPending && recs && recs.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {recs.map((b) => (
              <article
                key={b.id}
                className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
              >
                <div className="aspect-[3/4] w-full bg-muted">
                  {b.cover && (
                    <img
                      src={b.cover}
                      alt={`Cover ${b.title}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold leading-snug">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.author}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Match: <strong>{b.matchScore}%</strong>
                    </span>
                    <span className="rounded-full border px-2 py-0.5 text-xs">From playlists</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{b.reason}</p>
                  <CardFooter className="mt-4 px-0">
                    <Button size="sm" className="w-full">
                      Save to reading list
                    </Button>
                  </CardFooter>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
