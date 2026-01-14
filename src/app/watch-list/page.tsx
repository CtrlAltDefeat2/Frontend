'use client'

import AuthGuard from '@/components/common/AuthGuard'
import WatchList from './WatchList/WatchList'

export default function WatchListPage() {
  return (
    <AuthGuard>
      <WatchList />
    </AuthGuard>
  )
}
