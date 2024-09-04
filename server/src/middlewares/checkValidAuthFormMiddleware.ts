import { Request, Response, NextFunction } from 'express'
import { compare } from 'bcrypt'
import { UserModel } from '../models/userSchema'

import { ErrorMain } from '../types/Error'

export async function checkValidAuthFormMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { type, email, password } = req.body
    switch (type) {
      case "authSignUpEmail": {
        const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })

        if (existingEmail) {
          const error: ErrorMain = {
            status: 409,
            numberError: 101,
            message: 'User with this email already exists',
            value: email
          }

          throw error
        }

        break
      }
      case "authSignUp": {
        const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })

        if (existingEmail) {
          const error: ErrorMain = {
            status: 409,
            numberError: 101,
            message: 'User with this email already exists'
          }

          throw error
        }

        break
      }
      case "authSignInEmail": {
        const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })

        if (!existingEmail) {
          const error: ErrorMain = {
            status: 404,
            numberError: 103,
            message: 'User with this email does not exist',
            value: email
          }

          throw error
        }

        break
      }
      case "authSignIn": {
        const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })

        if (!existingEmail) {
          const error: ErrorMain = {
            status: 404,
            numberError: 103,
            message: 'User with this email does not exist',
            value: email
          }

          throw error
        }

        const isPasswordValid = await compare(password, existingEmail.userPersonalData!.password)

        if (!isPasswordValid) {
          const error: ErrorMain = {
            status: 401,
            numberError: 104,
            message: 'Wrong password',
            value: password
          }

          throw error
        }
        res.locals.localDataState.user = await UserModel.findOne({ 'userPersonalData.email': email }).select('-userPersonalData.userCard').select('-userPersonalData.password')

        break
      }
    }

    return next()
  } catch (err: unknown) {
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

    return next()
  }
}
