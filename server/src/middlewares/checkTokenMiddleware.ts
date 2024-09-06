import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

export function checkTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  cookieParser()(req, res, () => {

  })
}
