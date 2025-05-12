import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { UserModel } from '../models/userSchema'
import { SECRET_KEY } from '../helpers/constants'
import { ErrorMain } from '../types/classes/ErrorMain'

export function checkRefreshTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  cookieParser()(req, res, async () => {
    const { localDataState } = res.locals
    const { token, error } = localDataState
    const refreshTokenInCookie = req.cookies.refreshToken

    if (error) {
      return next()
    }

    try {
      if (!refreshTokenInCookie) {
        throw new ErrorMain({
          status: 401,
          numberError: 105,
          message: 'Unauthorized',
          value: null
        })
      }

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
      if (err instanceof TokenExpiredError) {
        const error = new ErrorMain({
          status: 401,
          numberError: 106,
          message: 'Refresh token expired. Please, re-authenticate.'
        })

        localDataState.user = null
        localDataState.token = null
        localDataState.error = error

        return next()
      } else if (err instanceof JsonWebTokenError) {
        const error = new ErrorMain({
          status: 401,
          numberError: 105,
          message: 'Unauthorized',
          value: null
        })

        localDataState.user = null
        localDataState.token = null
        localDataState.error = error

        return next()
      } else if (err instanceof ErrorMain && err.numberError === 105) {
        localDataState.user = null
        localDataState.token = null
        localDataState.error = err

        return next()
      }
    }
  })
}
