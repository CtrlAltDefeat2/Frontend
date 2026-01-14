export const emptyStateStyles = {
  container: 'flex min-h-[60vh] flex-col items-center justify-center text-center',

  icon: {
    wrapper:
      'relative mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent',
    element: 'h-14 w-14 text-primary',
  },

  title: 'text-3xl font-bold tracking-tight',

  description: 'mt-3 max-w-md text-base text-muted-foreground',

  button: 'mt-8 px-8 py-2.5 text-base font-medium',

  hint: {
    container: 'mt-10 flex items-center gap-2 text-sm text-muted-foreground',
    icon: 'h-4 w-4 text-primary',
  },
} as const
