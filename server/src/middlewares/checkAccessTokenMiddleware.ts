import { Request, Response, NextFunction } from 'express'
import { JwtPayload, TokenExpiredError, JsonWebTokenError, verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../helpers/constants'
import { ErrorMain } from '../types/Error'
import { UserModel } from '../models/userSchema'

export function checkAccessTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { localDataState } = res.locals
  const { token, error } = localDataState
  const accessTokenInHeader = req.headers.authorization?.split(' ')[1]

  console.log(accessTokenInHeader)

  try {
    if (error) {
      return next()
    }

    if (!accessTokenInHeader) {
      localDataState.token = {
        ...token,
        accessToken: {
          value: null,
          expirated: false,
          error: false
        },
      }

      return next()
    }

    const decodeAccessToken = verify(accessTokenInHeader, SECRET_KEY) as JwtPayload

    if (decodeAccessToken) {
      const user = UserModel.findById(decodeAccessToken.id)
      localDataState.token = {
        accessToken: {
          value: accessTokenInHeader,
          expirated: false,
          error: false
        },
        refreshToken: {
          value: null,
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
        localDataState.token = {
          accessToken: {
            value: null,
            expirated: true,
            error: true
          },
          refreshToken: {
            value: null,
            expirated: false,
            error: false
          }
        }
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
}
