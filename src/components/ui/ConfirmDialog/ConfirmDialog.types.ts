export interface ConfirmDialogProps {
  title: string
  message: string
  onConfirm: () => void
  trigger: React.ReactNode
}
