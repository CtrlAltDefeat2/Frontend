import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clapperboard,
  X,
  ExternalLink,
  Search,
  ArrowDownAZ,
  ArrowUpAZ,
  CheckCircle2,
  Circle,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Components
import { Input } from '@/components/ui/Input/Input'
import AuthGuard from '@/components/common/AuthGuard/AuthGuardComponent'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog'
import { EmptyState } from '../../../components/common/EmptyState/EmptyState'

// Features
import { useWatchList } from '@/features/watch-list/useWatchList'
import { WATCH_LIST_CONSTANTS } from '@/resources/resources'
import { watchListStyles } from './WatchList.styles'
import { SortOrder } from './WatchList.types'
import { Button } from '@/components/ui/Button/Button'

// Configuration

export default function WatchList() {
  const { items, remove, clear, isLoading, isError, toggleWatched } = useWatchList()

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [showUnwatchedOnly, setShowUnwatchedOnly] = useState(false)

  const filteredItems = useMemo(() => {
    return items
      .filter((movie) => {
        const query = searchQuery.toLowerCase()
        const matchesSearch = (movie.title || '').toLowerCase().includes(query)
        const matchesStatus = showUnwatchedOnly ? !movie.watched : true
        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        const titleA = a.title || ''
        const titleB = b.title || ''
        return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA)
      })
  }, [items, searchQuery, sortOrder, showUnwatchedOnly])

  const handleClearFilters = () => {
    setSearchQuery('')
    setShowUnwatchedOnly(false)
  }

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const searchMovieDetails = (title: string, authors: string): void => {
    const query: string = `${title} by ${authors}`
    const url: string = `https://www.google.com/search?q=${query}`

    window.open(url, '_blank')
  }

  if (isLoading) {
    return (
      <main className={watchListStyles.loading.container}>
        {WATCH_LIST_CONSTANTS.TEXTS.LOADING}
      </main>
    )
  }

  if (isError) {
    return (
      <main className={watchListStyles.error.container}>{WATCH_LIST_CONSTANTS.TEXTS.ERROR}</main>
    )
  }

  return (
    <AuthGuard>
      <main className={watchListStyles.main}>
        {/* HEADER */}
        <div className={watchListStyles.header.wrapper}>
          <div className={watchListStyles.header.left.container}>
            <div className={watchListStyles.header.left.icon.wrapper}>
              <Clapperboard className={watchListStyles.header.left.icon.element} />
            </div>
            <div>
              <h1 className={watchListStyles.header.left.title}>
                {WATCH_LIST_CONSTANTS.TEXTS.HEADER.TITLE}
              </h1>
              <p className={watchListStyles.header.left.description}>
                {WATCH_LIST_CONSTANTS.TEXTS.HEADER.DESCRIPTION}
              </p>
            </div>
          </div>

          <div className={watchListStyles.header.right.container}>
            <Link href={WATCH_LIST_CONSTANTS.ROUTES.DASHBOARD}>
              <Button variant="outline" size="sm">
                {WATCH_LIST_CONSTANTS.TEXTS.HEADER.BACK_BUTTON}
              </Button>
            </Link>

            {items.length > 0 && (
              <ConfirmDialog
                title={WATCH_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.CLEAR_ALL.TITLE}
                message={WATCH_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.CLEAR_ALL.MESSAGE}
                onConfirm={clear}
                trigger={
                  <Button variant="outline" size="sm">
                    {WATCH_LIST_CONSTANTS.TEXTS.HEADER.CLEAR_ALL}
                  </Button>
                }
              />
            )}
          </div>
        </div>

        {items.length > 0 ? (
          <>
            {/* TOOLBAR */}
            <div className={watchListStyles.toolbar.container}>
              {/* Search */}
              <div className={watchListStyles.toolbar.search.wrapper}>
                <Search className={watchListStyles.toolbar.search.icon} />
                <Input
                  placeholder={WATCH_LIST_CONSTANTS.TEXTS.TOOLBAR.SEARCH_PLACEHOLDER}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={watchListStyles.toolbar.search.input}
                />
              </div>

              {/* Controls Group */}
              <div className={watchListStyles.toolbar.controls.container}>
                {/* Sort Toggle */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSort}
                  title={
                    sortOrder === 'asc'
                      ? WATCH_LIST_CONSTANTS.TEXTS.TOOLBAR.SORT_ASC
                      : WATCH_LIST_CONSTANTS.TEXTS.TOOLBAR.SORT_DESC
                  }
                >
                  {sortOrder === 'asc' ? (
                    <ArrowDownAZ className={watchListStyles.toolbar.controls.sortIcon} />
                  ) : (
                    <ArrowUpAZ className={watchListStyles.toolbar.controls.sortIcon} />
                  )}
                </Button>

                {/* Filter Unwatched Toggle */}
                <Button
                  variant={showUnwatchedOnly ? 'secondary' : 'outline'}
                  onClick={() => setShowUnwatchedOnly(!showUnwatchedOnly)}
                  className={cn(
                    watchListStyles.toolbar.controls.filterButton,
                    showUnwatchedOnly && watchListStyles.toolbar.controls.filterActive,
                  )}
                >
                  <Filter className={watchListStyles.toolbar.controls.filterIcon} />
                  {showUnwatchedOnly
                    ? WATCH_LIST_CONSTANTS.TEXTS.TOOLBAR.FILTER_UNWATCHED
                    : WATCH_LIST_CONSTANTS.TEXTS.TOOLBAR.FILTER_ALL}
                </Button>
              </div>
            </div>

            {/* MOVIE LIST */}
            {filteredItems.length === 0 ? (
              <div className={watchListStyles.emptyFiltered.container}>
                <p>{WATCH_LIST_CONSTANTS.TEXTS.EMPTY_FILTERED.MESSAGE}</p>
                <Button variant="link" onClick={handleClearFilters}>
                  {WATCH_LIST_CONSTANTS.TEXTS.EMPTY_FILTERED.CLEAR_BUTTON}
                </Button>
              </div>
            ) : (
              <ul className={watchListStyles.moviesList.grid}>
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((movie) => (
                    <motion.li
                      layout
                      key={movie.id}
                      initial={WATCH_LIST_CONSTANTS.ANIMATION.INITIAL}
                      animate={WATCH_LIST_CONSTANTS.ANIMATION.ANIMATE}
                      exit={WATCH_LIST_CONSTANTS.ANIMATION.EXIT}
                      className={cn(
                        watchListStyles.moviesList.card.base,
                        movie.watched
                          ? watchListStyles.moviesList.card.watched
                          : watchListStyles.moviesList.card.unwatched,
                      )}
                    >
                      {/* Remove Button */}
                      <ConfirmDialog
                        title={WATCH_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.REMOVE_MOVIE.TITLE}
                        message={`${WATCH_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.REMOVE_MOVIE.MESSAGE_PREFIX}${movie.title}${WATCH_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.REMOVE_MOVIE.MESSAGE_SUFFIX}`}
                        onConfirm={() => remove(movie.id)}
                        trigger={
                          <button className={watchListStyles.moviesList.removeButton}>
                            <X className={watchListStyles.moviesList.removeIcon} />
                          </button>
                        }
                      />

                      {/* Watched Toggle */}
                      <button
                        onClick={() => toggleWatched(movie.id)}
                        title={
                          movie.watched
                            ? WATCH_LIST_CONSTANTS.TEXTS.MOVIE_CARD.MARK_UNWATCHED
                            : WATCH_LIST_CONSTANTS.TEXTS.MOVIE_CARD.MARK_WATCHED
                        }
                        className={cn(
                          watchListStyles.moviesList.watchedToggle.base,
                          movie.watched
                            ? watchListStyles.moviesList.watchedToggle.watched
                            : watchListStyles.moviesList.watchedToggle.unwatched,
                        )}
                      >
                        {movie.watched ? (
                          <>
                            <CheckCircle2
                              className={watchListStyles.moviesList.watchedToggle.icon}
                            />
                            {WATCH_LIST_CONSTANTS.TEXTS.MOVIE_CARD.WATCHED_LABEL}
                          </>
                        ) : (
                          <>
                            <Circle className={watchListStyles.moviesList.watchedToggle.icon} />
                            {WATCH_LIST_CONSTANTS.TEXTS.MOVIE_CARD.MARK_WATCHED_LABEL}
                          </>
                        )}
                      </button>

                      {/* Cover */}
                      <div className={watchListStyles.moviesList.cover.wrapper}>
                        {movie.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={movie.cover}
                            alt={movie.title}
                            className={cn(
                              watchListStyles.moviesList.cover.image.base,
                              movie.watched && watchListStyles.moviesList.cover.image.watched,
                            )}
                          />
                        ) : (
                          <div className={watchListStyles.moviesList.cover.placeholder}>
                            {WATCH_LIST_CONSTANTS.TEXTS.MOVIE_CARD.NO_POSTER}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className={watchListStyles.moviesList.content.wrapper}>
                        <h3
                          className={cn(
                            watchListStyles.moviesList.content.title.base,
                            movie.watched && watchListStyles.moviesList.content.title.watched,
                          )}
                        >
                          {movie.title}
                        </h3>

                        <div className={watchListStyles.moviesList.content.meta.container}>
                          <p className={watchListStyles.moviesList.content.meta.director}>
                            {movie.director}
                          </p>
                          {movie.year && (
                            <span className={watchListStyles.moviesList.content.meta.year}>
                              {movie.year}
                            </span>
                          )}
                        </div>

                        <div className={watchListStyles.moviesList.content.actions}>
                          <Button
                            size="sm"
                            variant="outline"
                            className={watchListStyles.moviesList.content.button}
                            onClick={() => searchMovieDetails(movie.title, movie.director)}
                          >
                            {WATCH_LIST_CONSTANTS.TEXTS.MOVIE_CARD.VIEW_DETAILS}
                            <ExternalLink
                              className={watchListStyles.moviesList.content.buttonIcon}
                            />
                          </Button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </>
        ) : (
          <EmptyState variant="movies" />
        )}
      </main>
    </AuthGuard>
  )
}
