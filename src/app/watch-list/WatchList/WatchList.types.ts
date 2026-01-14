export type SortOrder = 'asc' | 'desc'

export interface WatchListFilters {
  searchQuery: string
  sortOrder: SortOrder
  showUnwatchedOnly: boolean
}

export type WatchListState = WatchListFilters
