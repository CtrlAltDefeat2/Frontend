'use client'

import AuthGuard from '@/components/common/AuthGuard'
import ReadingList from './ReadingList/ReadingList'

export default function ReadingListPage() {
  return (
    <AuthGuard>
      <ReadingList />
    </AuthGuard>
  )
}
