'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-background to-background/60">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
              Playlist recommendations from your own taste
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Turn your Spotify playlists
              <br className="hidden sm:block" />
              into smarter <span className="text-primary">recommendations</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              Pick one or more of your playlists as seeds, tweak energy/tempo/valence filters,
              preview tracks, and save a brand-new mix to your library.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg" className="px-6">
                  Connect with Spotify
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  toast('Demo mode', {
                    description:
                      'This is a preview. After auth is connected, you can generate real recommendations.',
                  })
                }
              >
                Try a quick demo
              </Button>
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <li>• Secure connection with Spotify</li>
              <li>• Your data stays private</li>
              <li>• Save playlists directly to your account</li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border bg-card p-4 shadow-sm">
              {/* simple mock preview */}
              <div className="grid grid-cols-3 gap-3">
                {['Chill Vibes', 'Focus Beats', 'Daily Mix 1'].map((name, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-muted/70 ring-1 ring-border/50"
                  />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-3/4 rounded bg-muted" />
                <div className="h-2 w-1/2 rounded bg-muted" />
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1">Generate</Button>
                <Button variant="outline" className="flex-1">
                  Save playlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Seed with your playlists"
            desc="Pick 1–3 of your own playlists to anchor recommendations."
          />
          <Feature
            title="Audio features filters"
            desc="Tune energy, danceability, valence, tempo, popularity and year."
          />
          <Feature
            title="One-click save"
            desc="Review, tweak, and save as a new Spotify playlist."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-6 text-2xl font-semibold">How it works</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            ['Connect', 'Sign in with Spotify (secure PKCE).'],
            ['Select seeds', 'Choose playlists to represent your taste.'],
            ['Generate & save', 'Preview tracks, adjust filters, save to library.'],
          ].map(([title, desc], i) => (
            <Card key={i} className="h-full">
              <CardContent className="p-5">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </div>
                <div className="text-base font-medium">{title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="border-t bg-background/40">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h3 className="text-2xl font-semibold">Ready to build your next mix?</h3>
          <p className="mt-2 text-muted-foreground">
            Start with your own playlists and let the recommendations flow.
          </p>
          <div className="mt-6">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                Open dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="mb-2 text-base font-semibold">{title}</div>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  )
}
