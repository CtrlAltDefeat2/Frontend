'use client'

import { Card, CardContent } from '@/components/ui/card'
import { usePlaylists } from '@/features/playlists/usePlaylists'

export default function DashboardPage() {
  const { data, isError } = usePlaylists()

  if (isError || !data?.length) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center text-center text-muted-foreground">
        <p className="text-lg font-medium">No playlists found</p>
        <p className="mt-1 text-sm">
          Try reconnecting your Spotify account or adding some playlists.
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-[70vh] p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Your Playlists</h1>
        <p className="text-sm text-muted-foreground">
          These are playlists fetched from your Spotify account.
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
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
