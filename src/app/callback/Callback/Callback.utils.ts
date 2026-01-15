import { CALLBACK_CONSTANTS } from '@/resources/resources'

export function getErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return CALLBACK_CONSTANTS.TOAST_MESSAGES.ERRORS.UNKNOWN_ERROR
  }

  const errorMessage = error.message

  if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
    return CALLBACK_CONSTANTS.TOAST_MESSAGES.ERRORS.NETWORK_ERROR
  }

  return errorMessage
}

export function getReturnPath(): string {
  const returnTo = sessionStorage.getItem(CALLBACK_CONSTANTS.STORAGE_KEYS.RETURN_TO)

  if (returnTo) {
    sessionStorage.removeItem(CALLBACK_CONSTANTS.STORAGE_KEYS.RETURN_TO)
    return returnTo
  }

  return CALLBACK_CONSTANTS.ROUTES.DASHBOARD
}
