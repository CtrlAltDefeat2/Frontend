'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sun, Moon, Music2 } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import { HEADER_CONSTANTS } from '@/resources/resources'
import { headerStyles } from './HeaderComponent.styles'
import { Button } from '@/components/ui/Button/Button'

export default function HeaderComponent() {
  const { theme, toggleTheme } = useUIStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <header className={headerStyles.container}>
      <Link href={HEADER_CONSTANTS.HOME_PATH} className={headerStyles.logo.link}>
        <Music2 className={headerStyles.logo.icon} />
        <span className={headerStyles.logo.text}>{HEADER_CONSTANTS.APP_NAME}</span>
      </Link>

      <div className={headerStyles.actions}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={HEADER_CONSTANTS.ARIA_LABELS.TOGGLE_THEME}
          className={headerStyles.themeButton}
          suppressHydrationWarning
        >
          {!mounted || theme === 'dark' ? (
            <Sun className={headerStyles.themeIcon} />
          ) : (
            <Moon className={headerStyles.themeIcon} />
          )}
        </Button>
      </div>
    </header>
  )
}
