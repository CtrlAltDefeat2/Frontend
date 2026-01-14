import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { buttonVariants } from './Button.styles'
import { ButtonProps } from './Button.types'
import { BUTTON_CONSTANTS } from '@/resources/resources'

function Button({
  className,
  variant,
  size,
  asChild = BUTTON_CONSTANTS.DEFAULT_AS_CHILD,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot={BUTTON_CONSTANTS.DATA_SLOT}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
