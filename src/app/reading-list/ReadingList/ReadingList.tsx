import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpenText,
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
import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog'
import { useReadingList } from '@/features/reading-list/useReadingList'
import { READING_LIST_CONSTANTS } from '@/resources/resources'
import { readingListStyles } from './ReadingList.styles'
import { SortOrder } from './ReadingList.types'
import { ReadingItem } from '@/lib/api/reading-list'
import { EmptyState } from '@/components/common/EmptyState/EmptyState'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'

export default function ReadingList() {
  const { items, remove, clear, isLoading, isError, toggleRead } = useReadingList()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(false)

  const filteredItems: ReadingItem[] = useMemo((): ReadingItem[] => {
    return items
      .filter((book: ReadingItem): boolean => {
        const query: string = searchQuery.toLowerCase()
        const matchesSearch: boolean = (book.title || '').toLowerCase().includes(query)
        const matchesStatus: boolean = showUnreadOnly ? !book.read : true
        return matchesSearch && matchesStatus
      })
      .sort((a: ReadingItem, b: ReadingItem): number => {
        const titleA: string = a.title || ''
        const titleB: string = b.title || ''
        return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA)
      })
  }, [items, searchQuery, sortOrder, showUnreadOnly])

  const handleClearFilters: () => void = () => {
    setSearchQuery('')
    setShowUnreadOnly(false)
  }

  const toggleSort: () => void = () => {
    setSortOrder((prev: SortOrder): 'asc' | 'desc' => (prev === 'asc' ? 'desc' : 'asc'))
  }

  if (isLoading) {
    return (
      <main className={readingListStyles.loading.container}>
        {READING_LIST_CONSTANTS.TEXTS.LOADING}
      </main>
    )
  }

  if (isError) {
    return (
      <main className={readingListStyles.error.container}>
        {READING_LIST_CONSTANTS.TEXTS.ERROR}
      </main>
    )
  }

  return (
    <main className={readingListStyles.main}>
      {/* HEADER */}
      <div className={readingListStyles.header.wrapper}>
        <div className={readingListStyles.header.left.container}>
          <div className={readingListStyles.header.left.icon.wrapper}>
            <BookOpenText className={readingListStyles.header.left.icon.element} />
          </div>
          <div>
            <h1 className={readingListStyles.header.left.title}>
              {READING_LIST_CONSTANTS.TEXTS.HEADER.TITLE}
            </h1>
            <p className={readingListStyles.header.left.description}>
              {READING_LIST_CONSTANTS.TEXTS.HEADER.DESCRIPTION}
            </p>
          </div>
        </div>

        <div className={readingListStyles.header.right.container}>
          <Link href={READING_LIST_CONSTANTS.ROUTES.DASHBOARD}>
            <Button variant="outline" size="sm">
              {READING_LIST_CONSTANTS.TEXTS.HEADER.BACK_BUTTON}
            </Button>
          </Link>

          {items.length > 0 && (
            <ConfirmDialog
              title={READING_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.CLEAR_ALL.TITLE}
              message={READING_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.CLEAR_ALL.MESSAGE}
              onConfirm={clear}
              trigger={
                <Button variant="outline" size="sm">
                  {READING_LIST_CONSTANTS.TEXTS.HEADER.CLEAR_ALL}
                </Button>
              }
            />
          )}
        </div>
      </div>

      {items.length > 0 ? (
        <>
          {/* TOOLBAR */}
          <div className={readingListStyles.toolbar.container}>
            {/* Search */}
            <div className={readingListStyles.toolbar.search.wrapper}>
              <Search className={readingListStyles.toolbar.search.icon} />
              <Input
                placeholder={READING_LIST_CONSTANTS.TEXTS.TOOLBAR.SEARCH_PLACEHOLDER}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={readingListStyles.toolbar.search.input}
              />
            </div>

            {/* Controls Group */}
            <div className={readingListStyles.toolbar.controls.container}>
              {/* Sort Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSort}
                title={
                  sortOrder === 'asc'
                    ? READING_LIST_CONSTANTS.TEXTS.TOOLBAR.SORT_ASC
                    : READING_LIST_CONSTANTS.TEXTS.TOOLBAR.SORT_DESC
                }
              >
                {sortOrder === 'asc' ? (
                  <ArrowDownAZ className={readingListStyles.toolbar.controls.sortIcon} />
                ) : (
                  <ArrowUpAZ className={readingListStyles.toolbar.controls.sortIcon} />
                )}
              </Button>

              {/* Filter Unread Toggle */}
              <Button
                variant={showUnreadOnly ? 'secondary' : 'outline'}
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={cn(
                  readingListStyles.toolbar.controls.filterButton,
                  showUnreadOnly && readingListStyles.toolbar.controls.filterActive,
                )}
              >
                <Filter className={readingListStyles.toolbar.controls.filterIcon} />
                {showUnreadOnly
                  ? READING_LIST_CONSTANTS.TEXTS.TOOLBAR.FILTER_UNREAD
                  : READING_LIST_CONSTANTS.TEXTS.TOOLBAR.FILTER_ALL}
              </Button>
            </div>
          </div>

          {/* BOOKS LIST */}
          {filteredItems.length === 0 ? (
            <div className={readingListStyles.emptyFiltered.container}>
              <p>{READING_LIST_CONSTANTS.TEXTS.EMPTY_FILTERED.MESSAGE}</p>
              <Button variant="link" onClick={handleClearFilters}>
                {READING_LIST_CONSTANTS.TEXTS.EMPTY_FILTERED.CLEAR_BUTTON}
              </Button>
            </div>
          ) : (
            <ul className={readingListStyles.booksList.grid}>
              <AnimatePresence mode="popLayout">
                {filteredItems.map((book) => (
                  <motion.li
                    layout
                    key={book.id}
                    initial={READING_LIST_CONSTANTS.ANIMATION.INITIAL}
                    animate={READING_LIST_CONSTANTS.ANIMATION.ANIMATE}
                    exit={READING_LIST_CONSTANTS.ANIMATION.EXIT}
                    className={cn(
                      readingListStyles.booksList.card.base,
                      book.read
                        ? readingListStyles.booksList.card.read
                        : readingListStyles.booksList.card.unread,
                    )}
                  >
                    {/* Remove Button */}
                    <ConfirmDialog
                      title={READING_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.REMOVE_BOOK.TITLE}
                      message={`${READING_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.REMOVE_BOOK.MESSAGE_PREFIX}${book.title}${READING_LIST_CONSTANTS.TEXTS.CONFIRM_DIALOG.REMOVE_BOOK.MESSAGE_SUFFIX}`}
                      onConfirm={() => remove(book.id)}
                      trigger={
                        <button className={readingListStyles.booksList.removeButton}>
                          <X className={readingListStyles.booksList.removeIcon} />
                        </button>
                      }
                    />

                    {/* Read Toggle */}
                    <button
                      onClick={() => toggleRead(book.id)}
                      title={
                        book.read
                          ? READING_LIST_CONSTANTS.TEXTS.BOOK_CARD.MARK_UNREAD
                          : READING_LIST_CONSTANTS.TEXTS.BOOK_CARD.MARK_READ
                      }
                      className={cn(
                        readingListStyles.booksList.readToggle.base,
                        book.read
                          ? readingListStyles.booksList.readToggle.read
                          : readingListStyles.booksList.readToggle.unread,
                      )}
                    >
                      {book.read ? (
                        <>
                          <CheckCircle2 className={readingListStyles.booksList.readToggle.icon} />
                          {READING_LIST_CONSTANTS.TEXTS.BOOK_CARD.READ_LABEL}
                        </>
                      ) : (
                        <>
                          <Circle className={readingListStyles.booksList.readToggle.icon} />
                          {READING_LIST_CONSTANTS.TEXTS.BOOK_CARD.MARK_READ_LABEL}
                        </>
                      )}
                    </button>

                    {/* Cover */}
                    <div className={readingListStyles.booksList.cover.wrapper}>
                      {book.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.cover}
                          alt={book.title}
                          className={cn(
                            readingListStyles.booksList.cover.image.base,
                            book.read && readingListStyles.booksList.cover.image.read,
                          )}
                        />
                      ) : (
                        <div className={readingListStyles.booksList.cover.placeholder}>
                          {READING_LIST_CONSTANTS.TEXTS.BOOK_CARD.NO_COVER}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={readingListStyles.booksList.content.wrapper}>
                      <h3
                        className={cn(
                          readingListStyles.booksList.content.title.base,
                          book.read && readingListStyles.booksList.content.title.read,
                        )}
                      >
                        {book.title}
                      </h3>
                      <p className={readingListStyles.booksList.content.author}>{book.authors}</p>

                      <div className={readingListStyles.booksList.content.actions}>
                        <a href={book.url} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            variant="outline"
                            className={readingListStyles.booksList.content.button}
                          >
                            {READING_LIST_CONSTANTS.TEXTS.BOOK_CARD.VIEW_DETAILS}
                            <ExternalLink
                              className={readingListStyles.booksList.content.buttonIcon}
                            />
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
        <EmptyState variant="books" />
      )}
    </main>
  )
}
