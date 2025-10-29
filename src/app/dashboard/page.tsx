'use client'

import { Card, CardContent } from '@/components/ui/card'
import { usePlaylists } from '@/features/playlists/usePlaylists'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { data, isError, isLoading } = usePlaylists()

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <Card
            key={p.id}
            className="group overflow-hidden rounded-xl border border-border/60 shadow-sm transition hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="mb-3 h-32 w-full rounded-lg bg-muted group-hover:bg-muted/80 transition" />
              <div className="text-base font-medium leading-tight">{p.name}</div>
              <div className="text-sm text-muted-foreground">{p.tracksTotal ?? 0} tracks</div>
              <p className="mt-2 text-xs text-muted-foreground">Used to inspire book matches.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
