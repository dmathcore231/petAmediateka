import { Request, Response, NextFunction } from 'express'

export function logoutUserMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { localDataState } = res.locals
  const { user, token, error } = localDataState

  if (error) {
    return next()
  }

  localDataState.user = null
  localDataState.token = null

  return next()
}
