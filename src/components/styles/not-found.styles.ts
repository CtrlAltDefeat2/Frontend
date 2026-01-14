export const notFoundStyles = {
  main: 'relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center',

  icon: {
    wrapper: 'mb-8 flex items-center justify-center rounded-full bg-primary/10 p-5',
    element: 'h-10 w-10 text-primary',
  },

  title: 'text-3xl font-bold tracking-tight',

  description: 'mt-3 max-w-md text-base text-muted-foreground',

  actions: {
    wrapper: 'mt-10 flex flex-wrap items-center justify-center gap-4',
    button: 'px-6',
    buttonIcon: 'mr-2 h-4 w-4',
  },

  background: {
    wrapper: 'pointer-events-none absolute inset-0 -z-10 flex items-center justify-center',
    blur: 'h-[420px] w-[420px] rounded-full bg-primary/5 blur-3xl',
  },
} as const
