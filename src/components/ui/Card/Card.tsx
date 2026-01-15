import { cn } from '@/lib/utils'
import { CARD_CONSTANTS } from '@/resources/resources'
import { cardStyles } from './Card.styles'
import {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
} from './Card.types'

function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot={CARD_CONSTANTS.DATA_SLOTS.CARD}
      className={cn(cardStyles.card, className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot={CARD_CONSTANTS.DATA_SLOTS.HEADER}
      className={cn(cardStyles.header, className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot={CARD_CONSTANTS.DATA_SLOTS.TITLE}
      className={cn(cardStyles.title, className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot={CARD_CONSTANTS.DATA_SLOTS.DESCRIPTION}
      className={cn(cardStyles.description, className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot={CARD_CONSTANTS.DATA_SLOTS.ACTION}
      className={cn(cardStyles.action, className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot={CARD_CONSTANTS.DATA_SLOTS.CONTENT}
      className={cn(cardStyles.content, className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot={CARD_CONSTANTS.DATA_SLOTS.FOOTER}
      className={cn(cardStyles.footer, className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
