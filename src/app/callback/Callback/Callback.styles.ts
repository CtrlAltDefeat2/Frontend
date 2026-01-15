export const callbackStyles = {
  container: 'flex min-h-screen items-center justify-center bg-background',

  content: {
    wrapper: 'text-center space-y-4',
    spinner:
      'mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent',
    title: 'text-lg font-semibold',
    description: 'text-muted-foreground',
  },
} as const
