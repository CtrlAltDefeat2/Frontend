export const confirmDialogStyles = {
  overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm',
  content:
    'w-full max-w-sm rounded-2xl border border-border/60 bg-card/95 p-6 shadow-xl backdrop-blur-md',
  title: 'text-lg font-semibold tracking-tight',
  message: 'mt-2 text-sm text-muted-foreground',
  actions: 'mt-5 flex justify-end gap-2',
  confirmButton:
    'transition-all duration-200 hover:saturate-110 hover:brightness-95 hover:shadow-md hover:ring-1 hover:ring-destructive/40',
} as const
