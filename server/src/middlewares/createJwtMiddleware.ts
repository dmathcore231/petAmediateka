import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/userSchema'
import { SECRET_KEY, EXP_IN_ACCESS_TOKEN, EXP_IN_REFRESH_TOKEN } from '../helpers/constants'
import { TokenState } from '../types/Token'

export async function createJwtMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { localDataState } = res.locals
  const { error } = localDataState
  const { type, email } = req.body

  if (error || type !== 'authSignIn' && type !== 'authSignUp') {
    return next()
  }

  const user = await UserModel.findOne({ 'userPersonalData.email': email })

  if (user) {
    const setAccess = jwt.sign({ id: user._id },
      SECRET_KEY,
      { expiresIn: EXP_IN_ACCESS_TOKEN }
    )

    const setRefresh = jwt.sign({ id: user._id, userRole: user.userRole },
      SECRET_KEY,
      { expiresIn: EXP_IN_REFRESH_TOKEN }
    )

    const tokens: TokenState = {
      accessToken: {
        value: setAccess,
        expirated: false,
        error: false
      },
      refreshToken: {
        value: setRefresh,
        expirated: false,
        error: false
      }
    }

    localDataState.token = tokens
  }

  return next()
}
