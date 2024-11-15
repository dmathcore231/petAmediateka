import { Request, Response, NextFunction } from 'express'
import { ErrorMain } from '../types/Error'

export function logoutUserMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { localDataState } = res.locals
  const { token, error } = localDataState

  if (error) {
    return next()
  }

  if (token.accessToken.value && token.refreshToken.value) {
    localDataState.user = null
    localDataState.token = null

    return next()
  } else {
    const error: ErrorMain = {
      status: 401,
      numberError: 105,
      message: 'Unauthorized',
      value: null
    }

    localDataState.error = error
    return next()
  }
}
