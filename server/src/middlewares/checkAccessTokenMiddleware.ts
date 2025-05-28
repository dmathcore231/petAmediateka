import { Request, Response, NextFunction } from 'express'
import { JwtPayload, TokenExpiredError, JsonWebTokenError, verify } from 'jsonwebtoken'
import { ErrorMain } from '../types/classes/ErrorMain'
import { SECRET_KEY } from '../helpers/constants'
import { UserModel } from '../models/userSchema'

export function checkAccessTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { localDataState } = res.locals
  const { error } = localDataState
  const accessTokenInHeader = req.headers.authorization?.split(' ')[1]

  try {
    if (error) {
      return next()
    }

    if (!accessTokenInHeader) {
      throw new ErrorMain({
        status: 401,
        numberError: 105,
        message: 'Unauthorized',
        value: null
      })
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
    if (err instanceof TokenExpiredError) {
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
    }

    if (err instanceof JsonWebTokenError) {
      const error = new ErrorMain({
        status: 401,
        numberError: 105,
        message: 'Unauthorized',
        value: null
      })

      localDataState.user = null
      localDataState.token = null
      localDataState.error = error
    }

    if (err instanceof ErrorMain) {
      const error = new ErrorMain({
        status: 401,
        numberError: 105,
        message: 'Unauthorized',
        value: null
      })

      localDataState.user = null
      localDataState.token = null
      localDataState.error = error
    }

    return next()
  }
}
