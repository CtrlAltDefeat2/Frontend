'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { ConfirmDialogProps } from './ConfirmDialog.types'
import { confirmDialogStyles } from './ConfirmDialog.styles'
import { CONFIRM_DIALOG_CONSTANTS } from '@/resources/resources'

export function ConfirmDialog({ title, message, onConfirm, trigger }: ConfirmDialogProps) {
  const [open, setOpen] = useState<boolean>(false)

  const handleConfirm: () => void = () => {
    onConfirm()
    setOpen(false)
  }

  const handleCancel: () => void = () => {
    setOpen(false)
  }

  const handleTriggerClick: () => void = () => {
    setOpen(true)
  }

  return (
    <>
      <span onClick={handleTriggerClick}>{trigger}</span>
      {open && (
        <div className={confirmDialogStyles.overlay}>
          <div className={confirmDialogStyles.content}>
            <h3 className={confirmDialogStyles.title}>{title}</h3>
            <p className={confirmDialogStyles.message}>{message}</p>
            <div className={confirmDialogStyles.actions}>
              <Button variant="ghost" onClick={handleCancel}>
                {CONFIRM_DIALOG_CONSTANTS.BUTTON_LABELS.CANCEL}
              </Button>
              <Button
                variant="destructive"
                className={confirmDialogStyles.confirmButton}
                onClick={handleConfirm}
              >
                {CONFIRM_DIALOG_CONSTANTS.BUTTON_LABELS.CONFIRM}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
