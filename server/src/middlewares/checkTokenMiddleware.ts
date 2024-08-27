import { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'

export function checkTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  cookieParser()(req, res, async () => {
    return next()
  })
}
