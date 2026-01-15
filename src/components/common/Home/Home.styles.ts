export const homeStyles = {
  main: 'min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-background to-background/60',

  hero: {
    section: 'mx-auto max-w-6xl px-6 py-16 lg:py-24',
    grid: 'grid items-center gap-10 lg:grid-cols-12',
    content: {
      wrapper: 'lg:col-span-7',
      badge: 'inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground',
      title: 'mt-4 text-4xl font-bold tracking-tight sm:text-5xl',
      titleBreak: 'hidden sm:block',
      titleHighlight: 'text-primary',
      description: 'mt-4 max-w-2xl text-base text-muted-foreground',
      actions: 'mt-6 flex flex-wrap gap-3',
      features: 'mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground',
    },
    preview: {
      wrapper: 'lg:col-span-5',
      card: 'rounded-2xl border bg-card p-4 shadow-sm',
      grid: 'grid grid-cols-3 gap-3',
      actionBar:
        'sticky bottom-4 z-20 flex items-center gap-3 rounded-xl border border-border/60 bg-card/80 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/60',
      button: 'min-w-[6px] px-3 py-1.5 text-sm transition-all',
      buttonContent: 'inline-flex items-center gap-2',
      buttonIcon: 'h-4 w-4',
      buttonText: 'text-sm text-muted-foreground',
    },
  },

  features: {
    section: 'mx-auto max-w-6xl px-6 pb-16',
    grid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
    card: {
      wrapper: 'h-full',
      content: 'p-5',
      title: 'mb-2 text-base font-semibold',
      description: 'text-sm text-muted-foreground',
    },
  },

  howItWorks: {
    section: 'mx-auto max-w-6xl px-6 pb-20',
    title: 'mb-6 text-2xl font-semibold',
    grid: 'grid gap-4 sm:grid-cols-3',
    card: {
      wrapper: 'h-full',
      content: 'p-5',
      badge:
        'mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary',
      title: 'text-base font-medium',
      description: 'mt-1 text-sm text-muted-foreground',
    },
  },

  cta: {
    section: 'border-t bg-background/40',
    wrapper: 'mx-auto max-w-6xl px-6 py-12 text-center',
    title: 'text-2xl font-semibold',
    description: 'mt-2 text-muted-foreground',
    actions: 'mt-6',
    button: 'px-8',
  },
} as const
