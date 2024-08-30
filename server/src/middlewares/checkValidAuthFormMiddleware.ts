import { Request, Response, NextFunction } from 'express'
import { formDataWithoutFile } from '../utils/multerConfit'
import { UserModel } from '../models/userSchema'
import { ErrorMain } from '../types/Error'

export function checkValidAuthFormMiddleware(req: Request, res: Response, next: NextFunction): void {
  formDataWithoutFile(req, res, async (err) => {
    const { type, email, password } = req.body

    try {
      switch (type) {
        case "authSignUpEmail": {
          const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })

          if (!existingEmail) {

            return next()
          } else {
            const error: ErrorMain = {
              status: 409,
              numberError: 101,
              message: 'User with this email already exists'
            }

            throw error
          }
        }
        case "authSignUp": {
          const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })

          if (!existingEmail && email && password) {

            return next()
          } else if (!email || !password) {
            const error: ErrorMain = {
              status: 400,
              numberError: 102,
              message: "Bad request: email or password is empty"
            }

            throw error
          } else {
            const error: ErrorMain = {
              status: 409,
              numberError: 101,
              message: 'User with this email already exists'
            }

            throw error
          }
        }
      }
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
  })
}
