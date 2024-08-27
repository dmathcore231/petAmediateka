import { Request, Response, NextFunction } from 'express'
import { LocalDataState } from '../types/LocalDataState'

export function initLocalDataState(req: Request, res: Response, next: NextFunction): void {
  const localData: LocalDataState = {
    user: null,
    token: null,
    error: null
  }

  res.locals.localDataState = localData

  return next()
}
