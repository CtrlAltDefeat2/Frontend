export const playlistCardStyles = {
  card: 'h-full border-0',
  content: 'p-3 flex flex-col h-full',
  imageContainer:
    'relative mb-2 aspect-square w-full overflow-hidden rounded-md bg-muted flex-shrink-0',
  image: 'h-full w-full object-cover transition group-hover:scale-[1.02]',
  placeholder: 'flex h-full w-full items-center justify-center text-[10px] text-muted-foreground',
  title: 'text-sm font-medium leading-tight line-clamp-1 flex-shrink-0',
  trackCount: 'text-xs text-muted-foreground flex-shrink-0',
  description: 'mt-1 text-[11px] text-muted-foreground',
} as const
