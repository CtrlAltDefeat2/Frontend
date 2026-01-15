'use client'

import AuthGuardComponent from './AuthGuard/AuthGuardComponent'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  return <AuthGuardComponent>{children}</AuthGuardComponent>
}
