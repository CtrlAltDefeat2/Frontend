export const playlistCarouselStyles = {
  container: 'relative w-full',
  list: 'flex gap-5 justify-center',
  listItem: 'flex-shrink-0 w-44',
  card: {
    button:
      'group relative block w-full h-full text-left rounded-xl border border-border/60 bg-card shadow-sm',
    active: 'ring-2 ring-primary/70 border-primary/40',
  },
  badge:
    'absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary ring-1 ring-primary/30',
  navigation: {
    button:
      'absolute top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background/90 cursor-pointer',
    left: 'left-0',
    right: 'right-0',
    icon: 'h-5 w-5 text-primary',
  },
} as const
