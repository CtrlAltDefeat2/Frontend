export const loadingStyles = {
  main: 'flex min-h-[70vh] flex-col items-center justify-center px-6 text-center',

  spinner: {
    wrapper:
      'mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30',
    element: 'h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent',
  },

  title: 'text-xl font-semibold tracking-tight',

  description: 'mt-2 max-w-md text-sm text-muted-foreground',

  skeleton: {
    grid: 'mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3',
    card: 'overflow-hidden rounded-xl border border-border/60 bg-card p-4 shadow-sm',
    image: 'h-32 w-full animate-pulse rounded-lg bg-muted/80',
    text: 'mt-3 h-3 w-2/3 animate-pulse rounded bg-muted/70',
  },
} as const
