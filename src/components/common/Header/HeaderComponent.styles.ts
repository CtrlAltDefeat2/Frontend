export const headerStyles = {
  container:
    'sticky top-0 z-30 flex items-center justify-between border-b border-border/40 bg-background/60 px-6 py-3 backdrop-blur-md',
  logo: {
    link: 'flex items-center gap-2',
    icon: 'h-5 w-5 text-primary',
    text: 'text-lg font-semibold tracking-tight',
  },
  actions: 'flex items-center gap-3',
  themeButton: 'transition-colors hover:bg-muted',
  themeIcon: 'h-5 w-5',
} as const
