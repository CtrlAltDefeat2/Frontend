'use client'
import { useMemo, useState } from 'react'
import { useReadingList } from '@/features/reading-list/useReadingList'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import AuthGuard from '@/components/common/AuthGuard'
import {
  BookOpenText,
  Lightbulb,
  X,
  ExternalLink,
  Search,
  ArrowDownAZ,
  ArrowUpAZ,
  CheckCircle2,
  Circle,
  Filter,
  BookOpen,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { cn } from '@/lib/utils'

export default function ReadingListPage() {
  const { items, remove, clear, isLoading, isError, toggleRead } = useReadingList()

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const filteredItems = useMemo(() => {
    return items
      .filter((book) => {
        const query = searchQuery.toLowerCase()

        const matchesSearch = (book.title || '').toLowerCase().includes(query)

        const matchesStatus = showUnreadOnly ? !book.read : true

        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        const titleA = a.title || ''
        const titleB = b.title || ''
        return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA)
      })
  }, [items, searchQuery, sortOrder, showUnreadOnly])

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground">
        Loading your reading list…
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground">
        Failed to load reading list.
      </main>
    )
  }

  return (
    <AuthGuard>
      <main className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Your reading list</h1>
              <p className="text-sm text-muted-foreground">
                All the books you’ve saved from your Spotify-inspired recommendations.
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
                title="Clear all saved books?"
                message="This action will remove every book from your reading list. You won’t be able to undo this."
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

        {items.length > 0 ? (
          <>
            {/* TOOLBAR */}
            <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background/50"
                />
              </div>

              {/* Controls Group */}
              <div className="flex items-center gap-2">
                {/* Sort Toggle */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
                  title={`Sort: ${sortOrder === 'asc' ? 'A-Z' : 'Z-A'}`}
                >
                  {sortOrder === 'asc' ? (
                    <ArrowDownAZ className="h-4 w-4" />
                  ) : (
                    <ArrowUpAZ className="h-4 w-4" />
                  )}
                </Button>

                {/* Filter Unread Toggle */}
                <Button
                  variant={showUnreadOnly ? 'secondary' : 'outline'}
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                  className={cn(
                    'gap-2',
                    showUnreadOnly && 'border-primary/50 bg-primary/10 text-primary',
                  )}
                >
                  <Filter className="h-4 w-4" />
                  {showUnreadOnly ? 'Unread only' : 'All books'}
                </Button>
              </div>
            </div>

            {/* BOOKS LIST */}
            {filteredItems.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <p>No books match your filters.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery('')
                    setShowUnreadOnly(false)
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((b) => (
                    <motion.li
                      layout
                      key={b.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={cn(
                        'group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg',
                        b.read ? 'border-border/40 opacity-75' : 'border-border/60 shadow-sm',
                      )}
                    >
                      {/* Remove Button */}
                      <ConfirmDialog
                        title="Remove book?"
                        message={`Remove "${b.title}" from your list?`}
                        onConfirm={() => remove(b.id)}
                        trigger={
                          <button className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 hover:bg-red-600">
                            <X className="h-4 w-4" />
                          </button>
                        }
                      />

                      {/* Read Toggle */}
                      <button
                        onClick={() => toggleRead(b.id)}
                        title={b.read ? 'Mark as unread' : 'Mark as read'}
                        className={cn(
                          'absolute left-2 top-2 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md transition-all cursor-pointer',
                          b.read
                            ? 'bg-green-500/90 text-white shadow-sm'
                            : 'bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-primary',
                        )}
                      >
                        {b.read ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" /> Read
                          </>
                        ) : (
                          <>
                            <Circle className="h-3 w-3" /> Mark read
                          </>
                        )}
                      </button>

                      {/* Cover */}
                      <div className="relative aspect-[2/3] w-full bg-muted">
                        {b.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={b.cover}
                            alt={b.title}
                            className={cn(
                              'h-full w-full object-cover transition-all',
                              b.read && 'grayscale-[0.5]',
                            )}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            No cover
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-4">
                        <h3
                          className={cn(
                            'line-clamp-2 text-sm font-semibold leading-tight',
                            b.read && 'text-muted-foreground line-through decoration-border',
                          )}
                        >
                          {b.title}
                        </h3>
                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                          {b.authors}
                        </p>

                        <div className="mt-auto pt-4">
                          <a href={b.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="w-full text-xs h-8">
                              View details <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </main>
    </AuthGuard>
  )
}

export function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent">
        <BookOpen className="h-14 w-14 text-primary" strokeWidth={1.5} />
      </div>

      <h2 className="text-3xl font-bold tracking-tight">Your reading list is empty</h2>
      <p className="mt-3 max-w-md text-base text-muted-foreground">
        Start exploring Spotify-inspired book recommendations — save your favorites and build your
        personalized reading list.
      </p>

      <Link href="/dashboard">
        <Button className="mt-8 px-8 py-2.5 text-base font-medium">Discover books</Button>
      </Link>

      <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4 text-primary" strokeWidth={1.5} />
        <p>You can save any book from your recommendations with one click.</p>
      </div>
    </div>
  )
}
