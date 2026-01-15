export type SortOrder = 'asc' | 'desc'

export interface ReadingListFilters {
  searchQuery: string
  sortOrder: SortOrder
  showUnreadOnly: boolean
}

export type ReadingListState = ReadingListFilters
