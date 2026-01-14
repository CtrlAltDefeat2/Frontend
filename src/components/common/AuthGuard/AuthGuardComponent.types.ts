export interface AuthGuardProps {
  children: React.ReactNode
}

export interface AuthGuardState {
  isMounted: boolean
  isAuthenticated: boolean
}
