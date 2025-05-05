import { Request, Response, NextFunction } from 'express'
import { ErrorMain } from '../types/classes/ErrorMain'

export function logoutUserMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { localDataState } = res.locals
  const { token, error } = localDataState

  if (error) {
    return next()
  }

  try {
    if (token.accessToken.value && token.refreshToken.value) {
      localDataState.user = null
      localDataState.token = null

      return next()
    }

    throw new ErrorMain({
      status: 401,
      numberError: 105,
      message: 'Unauthorized',
      value: null
    })

  } catch (err: unknown) {
    if (err instanceof ErrorMain) {
      localDataState.error = err
    }

    return next()
  }
}
