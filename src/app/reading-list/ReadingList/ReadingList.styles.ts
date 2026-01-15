export const readingListStyles = {
  main: 'mx-auto max-w-7xl px-8 py-12',

  loading: {
    container: 'flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground',
  },

  error: {
    container: 'flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground',
  },

  header: {
    wrapper: 'mb-8 flex flex-wrap items-center justify-between gap-3',
    left: {
      container: 'flex items-center gap-3',
      icon: {
        wrapper:
          'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card',
        element: 'h-5 w-5',
      },
      title: 'text-2xl font-semibold tracking-tight',
      description: 'text-sm text-muted-foreground',
    },
    right: {
      container: 'flex gap-2',
    },
  },

  toolbar: {
    container:
      'mb-8 flex flex-col gap-4 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center',
    search: {
      wrapper: 'relative flex-1',
      icon: 'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
      input: 'pl-9 bg-background/50',
    },
    controls: {
      container: 'flex items-center gap-2',
      sortIcon: 'h-4 w-4',
      filterButton: 'gap-2',
      filterIcon: 'h-4 w-4',
      filterActive: 'border-primary/50 bg-primary/10 text-primary',
    },
  },

  emptyFiltered: {
    container: 'py-20 text-center text-muted-foreground',
  },

  booksList: {
    grid: 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    card: {
      base: 'group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg',
      read: 'border-border/40 opacity-75',
      unread: 'border-border/60 shadow-sm',
    },
    removeButton:
      'absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 hover:bg-red-600',
    removeIcon: 'h-4 w-4',
    readToggle: {
      base: 'absolute left-2 top-2 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md transition-all cursor-pointer',
      read: 'bg-green-500/90 text-white shadow-sm',
      unread: 'bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-primary',
      icon: 'h-3 w-3',
    },
    cover: {
      wrapper: 'relative aspect-[2/3] w-full bg-muted',
      image: {
        base: 'h-full w-full object-cover transition-all',
        read: 'grayscale-[0.5]',
      },
      placeholder: 'flex h-full items-center justify-center text-xs text-muted-foreground',
    },
    content: {
      wrapper: 'flex flex-1 flex-col p-4',
      title: {
        base: 'line-clamp-2 text-sm font-semibold leading-tight',
        read: 'text-muted-foreground line-through decoration-border',
      },
      author: 'mt-1 line-clamp-1 text-xs text-muted-foreground',
      actions: 'mt-auto pt-4',
      button: 'w-full text-xs h-8',
      buttonIcon: 'ml-2 h-3 w-3',
    },
  },
} as const
