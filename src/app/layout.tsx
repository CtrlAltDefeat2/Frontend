import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/common/Header'
import AppProviders from '@/components/app-providers'

export const metadata: Metadata = {
  title: 'Spotify Recs',
  description: 'Generate playlist recommendations using Spotify API',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
