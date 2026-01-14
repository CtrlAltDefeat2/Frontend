import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/common/Header'
import AppProviders from '@/components/app-providers'
import { ROOT_LAYOUT_CONSTANTS } from '@/resources/resources'
import { rootLayoutStyles } from '../components/styles/layout.styles'

export const metadata: Metadata = {
  title: ROOT_LAYOUT_CONSTANTS.METADATA.title,
  description: ROOT_LAYOUT_CONSTANTS.METADATA.description,
}

export interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={ROOT_LAYOUT_CONSTANTS.LOCALE}
      className={rootLayoutStyles.html.className}
      suppressHydrationWarning={ROOT_LAYOUT_CONSTANTS.HTML_ATTRIBUTES.suppressHydrationWarning}
    >
      <body className={rootLayoutStyles.body}>
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
