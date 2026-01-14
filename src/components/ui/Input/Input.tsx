import { cn } from '@/lib/utils'
import { InputProps } from './Input.types'
import { inputStyles } from './Input.styles'
import { INPUT_CONSTANTS } from '@/resources/resources'

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot={INPUT_CONSTANTS.DATA_SLOT}
      className={cn(inputStyles.base, inputStyles.focusVisible, inputStyles.invalid, className)}
      {...props}
    />
  )
}

export { Input }
