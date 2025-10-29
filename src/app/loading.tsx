export default function Loading() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Spinner */}
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>

      <h2 className="text-xl font-semibold tracking-tight">Preparing your vibes…</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Fetching playlists and getting recommendations ready.
      </p>

      {/* Subtle skeleton preview */}
      <div className="mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-border/60 bg-card p-4 shadow-sm"
          >
            <div className="h-32 w-full animate-pulse rounded-lg bg-muted/80" />
            <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-muted/70" />
          </div>
        ))}
      </div>
    </main>
  )
}
