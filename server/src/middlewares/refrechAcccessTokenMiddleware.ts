import { Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'
import { SECRET_KEY, EXP_IN_ACCESS_TOKEN } from '../helpers/constants'

export function refrechAcccessTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { localDataState } = res.locals
  const { user, error, token } = localDataState

  if (error || !token) {
    return next()
  }

  if (token.accessToken.expirated && user) {
    const setAccessToken = sign({ id: user._id },
      SECRET_KEY,
      { expiresIn: EXP_IN_ACCESS_TOKEN }
    )

    localDataState.token = {
      ...token,
      accessToken: {
        value: setAccessToken,
        expirated: false,
        error: false
      },
    }
  }

  return next()
}
