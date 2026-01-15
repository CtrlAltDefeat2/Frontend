export const dashboardStyles = {
  main: 'mx-auto max-w-[1600px] px-10 py-12',

  loading: {
    container: 'flex min-h-[70vh] flex-col items-center justify-center px-6 text-center',
    spinner: {
      wrapper:
        'mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30',
      element: 'h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent',
    },
    title: 'text-xl font-semibold tracking-tight',
    description: 'mt-2 max-w-md text-sm text-muted-foreground',
  },

  error: {
    container:
      'flex min-h-[60vh] flex-col items-center justify-center text-center text-muted-foreground',
    title: 'text-lg font-medium',
    description: 'mt-1 text-sm max-w-sm',
    button: 'mt-5',
  },

  header: {
    wrapper: 'mb-8 flex flex-wrap items-center justify-between gap-6',
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
      container: 'flex gap-3',
      button: 'gap-2',
      buttonIcon: 'h-4 w-4',
      count: 'text-muted-foreground',
    },
  },

  modeSwitcher: {
    container: 'mb-6 flex justify-center',
    wrapper: 'inline-flex items-center rounded-lg border border-border/50 bg-muted/40 p-1',
    button: {
      base: 'flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all',
      active: 'bg-background text-foreground shadow-sm ring-1 ring-border/50',
      inactive: 'text-muted-foreground hover:text-foreground cursor-pointer',
    },
    icon: 'h-4 w-4',
  },

  actionsBar: {
    container:
      'sticky bottom-4 z-20 mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card/80 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/60',
    generateButton: 'min-w-[160px] px-5 transition-all',
    buttonContent: 'inline-flex items-center gap-2',
    spinner: 'h-4 w-4 animate-spin',
    icon: 'h-4 w-4',
    info: 'text-sm text-muted-foreground',
    jumpButton: 'ml-auto',
  },

  recommendations: {
    section: 'mt-10 min-h-[300px]',
    header: {
      container: 'mb-4 flex items-center gap-2',
      icon: 'h-5 w-5 text-primary',
      title: 'text-lg font-semibold tracking-tight capitalize',
    },
    loading: {
      grid: 'grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
      card: 'overflow-hidden rounded-xl border border-border/60 bg-card p-3',
      image: 'mb-2 h-40 w-full animate-pulse rounded-md bg-muted/80',
      title: 'h-3 w-2/3 animate-pulse rounded bg-muted/70',
      subtitle: 'mt-2 h-3 w-1/2 animate-pulse rounded bg-muted/60',
    },
    empty: {
      container:
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/10 py-12 text-center',
      text: 'text-sm text-muted-foreground',
      highlight: 'text-foreground',
    },
  },
} as const
