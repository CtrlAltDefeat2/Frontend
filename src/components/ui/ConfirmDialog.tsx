'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function ConfirmDialog({
  title,
  message,
  onConfirm,
  trigger,
}: {
  title: string
  message: string
  onConfirm: () => void
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-card/95 p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="transition-all duration-200 hover:saturate-110 hover:brightness-95 hover:shadow-md hover:ring-1 hover:ring-destructive/40"
                onClick={() => {
                  onConfirm()
                  setOpen(false)
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
