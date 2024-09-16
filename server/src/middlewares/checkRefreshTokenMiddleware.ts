import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { UserModel } from '../models/userSchema'
import { SECRET_KEY } from '../helpers/constants'
import { ErrorMain } from '../types/Error'

export function checkRefreshTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  cookieParser()(req, res, async () => {
    const { localDataState } = res.locals
    const { token, error } = localDataState

    if (error) {
      return next()
    }

    const refreshTokenInCookie = req.cookies.refreshToken

    if (!refreshTokenInCookie) {
      localDataState.token = null

      return next()
    }

    try {
      const decodeRefreshToken = verify(refreshTokenInCookie, SECRET_KEY) as JwtPayload

      if (decodeRefreshToken) {
        const user = await UserModel.findById(decodeRefreshToken.id)
        localDataState.token = {
          ...token,
          refreshToken: {
            value: refreshTokenInCookie,
            expirated: false,
            error: false
          }
        }
        localDataState.user = user
      }

      return next()
    } catch (err: unknown) {
      switch (true) {
        case err instanceof TokenExpiredError: {
          const error: ErrorMain = {
            status: 401,
            numberError: 106,
            message: 'Refresh token expired. Please, re-authenticate.'
          }

          localDataState.user = null
          localDataState.token = null
          localDataState.error = error
          break
        }
        case err instanceof JsonWebTokenError: {
          const error: ErrorMain = {
            status: 401,
            numberError: 105,
            message: 'Unauthorized',
            value: null
          }

          localDataState.user = null
          localDataState.token = null
          localDataState.error = error
          break
        }
      }

      return next()
    }
  })
}
