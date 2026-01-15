import Link from 'next/link'
import { Music2 } from 'lucide-react'
import { NOT_FOUND_CONSTANTS } from '@/resources/resources'
import { notFoundStyles } from '../components/styles/not-found.styles'
import { Button } from '@/components/ui/Button/Button'

export interface NotFoundAction {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  variant?: 'default' | 'outline'
}

export default function NotFound() {
  return (
    <main className={notFoundStyles.main}>
      {/* Icon */}
      <div className={notFoundStyles.icon.wrapper}>
        <Music2
          className={notFoundStyles.icon.element}
          strokeWidth={NOT_FOUND_CONSTANTS.ICON_STROKE_WIDTH}
        />
      </div>

      <h1 className={notFoundStyles.title}>{NOT_FOUND_CONSTANTS.TEXTS.TITLE}</h1>

      <p className={notFoundStyles.description}>
        {NOT_FOUND_CONSTANTS.TEXTS.DESCRIPTION.LINE_1}
        <br />
        {NOT_FOUND_CONSTANTS.TEXTS.DESCRIPTION.LINE_2}
      </p>

      <div className={notFoundStyles.actions.wrapper}>
        {NOT_FOUND_CONSTANTS.ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.href} href={action.href}>
              <Button size="lg" variant={action.variant} className={notFoundStyles.actions.button}>
                <Icon className={notFoundStyles.actions.buttonIcon} />
                {action.label}
              </Button>
            </Link>
          )
        })}
      </div>

      <div className={notFoundStyles.background.wrapper}>
        <div className={notFoundStyles.background.blur} />
      </div>
    </main>
  )
}
