import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { UserModel } from '../models/userSchema'
import { SECRET_KEY } from '../helpers/constants'
import { ErrorMain } from '../types/Error'

export function checkRefreshTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  cookieParser()(req, res, async () => {
    const { localDataState } = res.locals
    const { user, token, error } = localDataState

    if (error) {
      return next()
    }

    const refreshTokenInCookie = req.cookies.refreshToken

    try {
      if (!refreshTokenInCookie) {
        const error: ErrorMain = {
          status: 401,
          numberError: 105,
          message: 'Unauthorized',
          value: null
        }

        throw error
      }

      const decodeRefreshToken = verify(refreshTokenInCookie, SECRET_KEY) as JwtPayload

      if (decodeRefreshToken) {
        //need to add processing of expired access token
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
      if (error && error.status) {
        res.locals.localDataState = {
          user: null,
          token: null,
          error
        }
      } else {
        res.locals.localDataState = {
          user: null,
          token: null,
          error: {
            status: 500,
            numberError: 500,
            message: 'Internal server error'
          }
        }
      }

      return next()
    }
  })
}
