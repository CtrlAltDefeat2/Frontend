export interface EmptyStateProps {
  variant?: 'movies' | 'books'
}

export interface EmptyStateConfig {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  description: string
  buttonText: string
  hint: string
  dashboardRoute: string
}
