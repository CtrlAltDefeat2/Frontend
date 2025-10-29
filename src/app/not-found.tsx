import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Music2, Home, LayoutGrid } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="mb-8 flex items-center justify-center rounded-full bg-primary/10 p-5">
        <Music2 className="h-10 w-10 text-primary" strokeWidth={1.8} />
      </div>

      <h1 className="text-3xl font-bold tracking-tight">Oops — nothing’s playing here</h1>
      <p className="mt-3 max-w-md text-base text-muted-foreground">
        Looks like the page you’re looking for doesn’t exist. <br />
        Let’s get you back to your playlists.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/">
          <Button size="lg" className="px-6">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button size="lg" variant="outline" className="px-6">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Open Dashboard
          </Button>
        </Link>
      </div>

      {/* Soft blurred background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[420px] w-[420px] rounded-full bg-primary/5 blur-3xl" />
      </div>
    </main>
  )
}
