import { useMemo, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ListMusic, Loader2, Sparkles, Clapperboard, Film, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import PlaylistCarousel from '@/components/ui/PlaylistCarousel/PlaylistCarousel'
import RecommendationCarousel from '@/components/ui/RecommendationCarousel'
import { useUIStore } from '@/store/ui.store'
import { initiateSpotifyLogin } from '@/lib/api/spotify-login'
import { usePlaylists } from '@/features/playlists/usePlaylists'
import { useRecommendations } from '@/features/recommendations/useRecommendations'
import { useReadingList } from '@/features/reading-list/useReadingList'
import { useMovieRecommendations } from '@/features/recommendations/useMovieRecommendations'
import { useWatchList } from '@/features/watch-list/useWatchList'
import type { Playlist } from '@/lib/api/spotify'
import type { ReadingItem } from '@/lib/api/reading-list'
import type { BookRecommendation, MovieRecommendation } from '@/lib/api/recommendations'
import { DASHBOARD_CONSTANTS } from '@/resources/resources'
import { Mode } from 'fs'
import { dashboardStyles } from './Dashboard.styles'
import { PlaylistSelection } from './Dashboard.types'
import { Button } from '@/components/ui/Button/Button'

export function DashboardContent() {
  const { data: playlists, isError, isLoading } = usePlaylists()
  const [selected, setSelected] = useState<PlaylistSelection>({})
  const [mode, setMode] = useState<Mode>('books')

  const clearTokens: () => void = useUIStore((s) => s.clearTokens)
  const onErrorClick = () => {
    clearTokens()
    try {
      initiateSpotifyLogin()
    } catch {
      toast.error(DASHBOARD_CONSTANTS.TOAST_MESSAGES.RECONNECT_ERROR)
    }
  }

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

  const selectedIds: string[] = useMemo(
    (): string[] =>
      Object.entries(selected)
        .filter(([, v]) => v)
        .map(([k]) => k),
    [selected],
  )

  const handleGenerate: () => void = () => {
    if (mode === 'books') {
      resetMovies()
      generateBooks({ playlistIds: selectedIds })
      return
    }

    resetBooks()
    generateMovies({ playlistIds: selectedIds })
  }

  const isPending: boolean = mode === 'books' ? isPendingBooks : isPendingMovies
  const results = (mode === 'books' ? bookRecs : movieRecs) as
    | BookRecommendation[]
    | MovieRecommendation[]
  const hasResults: boolean | undefined = results && results.length > 0

  if (isLoading) {
    return (
      <main className={dashboardStyles.loading.container}>
        <div className={dashboardStyles.loading.spinner.wrapper}>
          <div className={dashboardStyles.loading.spinner.element} />
        </div>
        <h2 className={dashboardStyles.loading.title}>{DASHBOARD_CONSTANTS.TEXTS.LOADING.TITLE}</h2>
        <p className={dashboardStyles.loading.description}>
          {DASHBOARD_CONSTANTS.TEXTS.LOADING.DESCRIPTION}
        </p>
      </main>
    )
  }

  if (isError || !playlists?.length) {
    return (
      <main className={dashboardStyles.error.container}>
        <p className={dashboardStyles.error.title}>{DASHBOARD_CONSTANTS.TEXTS.ERROR.TITLE}</p>
        <p className={dashboardStyles.error.description}>
          {DASHBOARD_CONSTANTS.TEXTS.ERROR.DESCRIPTION}
        </p>
        <Button className={dashboardStyles.error.button} onClick={onErrorClick}>
          {DASHBOARD_CONSTANTS.TEXTS.ERROR.BUTTON}
        </Button>
      </main>
    )
  }

  return (
    <main className={dashboardStyles.main}>
      {/* HEADER & NAV */}
      <div className={dashboardStyles.header.wrapper}>
        <div className={dashboardStyles.header.left.container}>
          <div className={dashboardStyles.header.left.icon.wrapper}>
            <ListMusic className={dashboardStyles.header.left.icon.element} />
          </div>
          <div>
            <h1 className={dashboardStyles.header.left.title}>
              {DASHBOARD_CONSTANTS.TEXTS.HEADER.TITLE}
            </h1>
            <p className={dashboardStyles.header.left.description}>
              {DASHBOARD_CONSTANTS.TEXTS.HEADER.DESCRIPTION}
            </p>
          </div>
        </div>

        <div className={dashboardStyles.header.right.container}>
          <Link href={DASHBOARD_CONSTANTS.ROUTES.READING_LIST}>
            <Button variant="outline" size="sm" className={dashboardStyles.header.right.button}>
              <BookOpen className={dashboardStyles.header.right.buttonIcon} />
              {DASHBOARD_CONSTANTS.TEXTS.HEADER.READING_LIST}{' '}
              <span className={dashboardStyles.header.right.count}>({readingList.length})</span>
            </Button>
          </Link>

          <Link href={DASHBOARD_CONSTANTS.ROUTES.WATCH_LIST}>
            <Button variant="outline" size="sm" className={dashboardStyles.header.right.button}>
              <Film className={dashboardStyles.header.right.buttonIcon} />
              {DASHBOARD_CONSTANTS.TEXTS.HEADER.WATCH_LIST}{' '}
              <span className={dashboardStyles.header.right.count}>({watchList.length})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* MODE SWITCHER */}
      <div className={dashboardStyles.modeSwitcher.container}>
        <div className={dashboardStyles.modeSwitcher.wrapper}>
          <button
            onClick={() => setMode('books')}
            className={cn(
              dashboardStyles.modeSwitcher.button.base,
              mode === 'books'
                ? dashboardStyles.modeSwitcher.button.active
                : dashboardStyles.modeSwitcher.button.inactive,
            )}
          >
            <BookOpen className={dashboardStyles.modeSwitcher.icon} />
            Books
          </button>
          <button
            onClick={() => setMode('movies')}
            className={cn(
              dashboardStyles.modeSwitcher.button.base,
              mode === 'movies'
                ? dashboardStyles.modeSwitcher.button.active
                : dashboardStyles.modeSwitcher.button.inactive,
            )}
          >
            <Clapperboard className={dashboardStyles.modeSwitcher.icon} />
            Movies
          </button>
        </div>
      </div>

      {/* PLAYLISTS CAROUSEL */}
      <PlaylistCarousel data={playlists} selected={selected} toggle={togglePlaylist} />

      {/* ACTIONS BAR */}
      <div className={dashboardStyles.actionsBar.container}>
        <Button
          onClick={handleGenerate}
          disabled={selectedIds.length === 0 || isPending}
          className={dashboardStyles.actionsBar.generateButton}
        >
          {isPending ? (
            <span className={dashboardStyles.actionsBar.buttonContent}>
              <Loader2 className={dashboardStyles.actionsBar.spinner} />
              {DASHBOARD_CONSTANTS.TEXTS.ACTIONS.GENERATING}
            </span>
          ) : (
            <span className={dashboardStyles.actionsBar.buttonContent}>
              <Sparkles className={dashboardStyles.actionsBar.icon} />
              {DASHBOARD_CONSTANTS.TEXTS.ACTIONS.GENERATE} {mode}
            </span>
          )}
        </Button>

        <span className={dashboardStyles.actionsBar.info}>
          {selectedIds.length === 0
            ? DASHBOARD_CONSTANTS.TEXTS.ACTIONS.NO_SELECTION
            : `${DASHBOARD_CONSTANTS.TEXTS.ACTIONS.SELECTED} ${selectedIds.length} ${DASHBOARD_CONSTANTS.TEXTS.ACTIONS.PLAYLISTS}`}
        </span>

        {hasResults && mode === 'books' && (
          <Button
            variant="ghost"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className={dashboardStyles.actionsBar.jumpButton}
          >
            {DASHBOARD_CONSTANTS.TEXTS.ACTIONS.JUMP_TO_RESULTS}
          </Button>
        )}
      </div>

      {/* RECOMMENDATIONS SECTION */}
      <section className={dashboardStyles.recommendations.section}>
        <div className={dashboardStyles.recommendations.header.container}>
          {mode === 'books' ? (
            <BookOpen className={dashboardStyles.recommendations.header.icon} />
          ) : (
            <Clapperboard className={dashboardStyles.recommendations.header.icon} />
          )}
          <h2 className={dashboardStyles.recommendations.header.title}>
            {mode} {DASHBOARD_CONSTANTS.TEXTS.RECOMMENDATIONS.BOOKS.split(' ')[1]}
          </h2>
        </div>

        {/* Loading Skeletons */}
        {isPending && (
          <div className={dashboardStyles.recommendations.loading.grid}>
            {Array.from({ length: DASHBOARD_CONSTANTS.SKELETON_COUNT }).map((_, i) => (
              <div key={i} className={dashboardStyles.recommendations.loading.card}>
                <div className={dashboardStyles.recommendations.loading.image} />
                <div className={dashboardStyles.recommendations.loading.title} />
                <div className={dashboardStyles.recommendations.loading.subtitle} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isPending && !hasResults && (
          <div className={dashboardStyles.recommendations.empty.container}>
            <p className={dashboardStyles.recommendations.empty.text}>
              {DASHBOARD_CONSTANTS.TEXTS.RECOMMENDATIONS.EMPTY_PREFIX}{' '}
              <strong className={dashboardStyles.recommendations.empty.highlight}>
                {DASHBOARD_CONSTANTS.TEXTS.ACTIONS.GENERATE} {mode}
              </strong>
              {DASHBOARD_CONSTANTS.TEXTS.RECOMMENDATIONS.EMPTY_SUFFIX}
            </p>
          </div>
        )}

        {/* RESULTS DISPLAY */}
        {!isPending && hasResults && (
          <>
            {mode === 'movies' ? (
              <RecommendationCarousel
                items={results}
                mode="movies"
                isSaved={(id) => watchList.some((item) => item.id === id)}
                onSave={(item) => {
                  addMovie(item as MovieRecommendation)
                  toast.success(DASHBOARD_CONSTANTS.TOAST_MESSAGES.SAVED_MOVIE)
                }}
              />
            ) : (
              <RecommendationCarousel
                items={results}
                mode="books"
                isSaved={(id) => readingList.some((item) => item.id === id)}
                onSave={(item) => {
                  addBook(item as ReadingItem)
                  toast.success(DASHBOARD_CONSTANTS.TOAST_MESSAGES.SAVED_BOOK)
                }}
              />
            )}
          </>
        )}
      </section>
    </main>
  )
}
