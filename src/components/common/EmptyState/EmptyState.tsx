import Link from 'next/link'
import { Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { EMPTY_STATE_CONSTANTS } from '@/resources/resources'
import { emptyStateStyles } from './EmptyState.styles'
import { EmptyStateProps } from './EmptyState.types'

export function EmptyState({ variant = 'movies' }: EmptyStateProps) {
  const config =
    EMPTY_STATE_CONSTANTS.VARIANTS[
      variant.toUpperCase() as keyof typeof EMPTY_STATE_CONSTANTS.VARIANTS
    ]
  const Icon = config.icon

  return (
    <div className={emptyStateStyles.container}>
      <div className={emptyStateStyles.icon.wrapper}>
        <Icon
          className={emptyStateStyles.icon.element}
          strokeWidth={EMPTY_STATE_CONSTANTS.ICON_STROKE_WIDTH}
        />
      </div>

      <h2 className={emptyStateStyles.title}>{config.title}</h2>

      <p className={emptyStateStyles.description}>{config.description}</p>

      <Link href={config.dashboardRoute}>
        <Button className={emptyStateStyles.button}>{config.buttonText}</Button>
      </Link>

      <div className={emptyStateStyles.hint.container}>
        <Lightbulb
          className={emptyStateStyles.hint.icon}
          strokeWidth={EMPTY_STATE_CONSTANTS.ICON_STROKE_WIDTH}
        />
        <p>{config.hint}</p>
      </div>
    </div>
  )
}
