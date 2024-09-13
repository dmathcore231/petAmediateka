import { Request, Response, NextFunction } from 'express'
import { JwtPayload, TokenExpiredError, JsonWebTokenError, verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../helpers/constants'
import { ErrorMain } from '../types/Error'

export function checkAccessTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { localDataState } = res.locals
  const accessTokenInHeader = req.headers.authorization?.split(' ')[1]

  try {
    if (!accessTokenInHeader) {
      const error: ErrorMain = {
        status: 401,
        numberError: 105,
        message: 'Unauthorized',
        value: null
      }

      throw error
    }

    const decodeAccessToken = verify(accessTokenInHeader, SECRET_KEY) as JwtPayload

    if (decodeAccessToken) {
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

      default: {
        const error = err as ErrorMain

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
      }
    }

    return next()
  }
}
