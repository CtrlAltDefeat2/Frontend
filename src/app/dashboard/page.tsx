'use client'

import AuthGuard from '@/components/common/AuthGuard'
import { DashboardContent } from './Dashboard/Dashboard'

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
