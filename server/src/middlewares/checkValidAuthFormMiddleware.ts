import { Request, Response, NextFunction } from 'express'
import { compare } from 'bcrypt'
import { UserModel } from '../models/userSchema'
import { ErrorMain } from '../types/classes/ErrorMain'

export async function checkValidAuthFormMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { type, email, password } = req.body
    const signUpTypes = ['authSignUpEmail', 'authSignUp']
    const signInTypes = ['authSignInEmail', 'authSignIn']

    if (signUpTypes.includes(type)) {
      const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })

      if (existingEmail) {
        throw new ErrorMain({
          status: 409,
          numberError: 101,
          message: 'User with this email already exists',
          ...(type === 'authSignUpEmail' && { value: email })
        })
      }
    }

    if (signInTypes.includes(type)) {
      const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })

      if (!existingEmail) {
        throw new ErrorMain({
          status: 404,
          numberError: 103,
          message: 'User with this email does not exist',
          value: email
        })
      }

      if (type === 'authSignIn') {
        const isPasswordValid = await compare(password, existingEmail.userPersonalData!.password)
        if (!isPasswordValid) {
          throw new ErrorMain({
            status: 401,
            numberError: 104,
            message: 'Wrong password',
            value: password
          })
        }

        res.locals.localDataState.user = await UserModel.findOne({
          'userPersonalData.email': email
        })
          .select('-userPersonalData.userCard')
          .select('-userPersonalData.password')
      }
    }

    return next()
  } catch (err: unknown) {
    if (err instanceof ErrorMain) {
      res.locals.localDataState = {
        user: null,
        token: null,
        error: err
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
}
