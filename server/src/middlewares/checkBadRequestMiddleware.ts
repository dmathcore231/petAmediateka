import { Request, Response, NextFunction } from 'express'
import { formDataWithoutFile } from '../utils/multerConfit'
import { ErrorMain } from '../types/classes/ErrorMain'

export function checkBadRequestMiddleware(req: Request, res: Response, next: NextFunction): void {

  formDataWithoutFile(req, res, (err) => {
    try {
      const { type, email, password } = req.body

      if (!type) {
        throw new ErrorMain({
          status: 400,
          numberError: 102,
          message: 'Bad request: type is required',
          value: null
        })
      }

      switch (type) {
        case "authSignUpEmail": {
          if (!email) {
            const error = new ErrorMain({
              status: 400,
              numberError: 102,
              message: 'Bad request: email is required',
              value: null
            })

            throw error
          }
          break
        }
        case "authSignUp": {
          if (!email || !password) {
            const error = new ErrorMain({
              status: 400,
              numberError: 102,
              message: 'Bad request: email and password are required',
              value: null
            })

            throw error
          }
          break
        }
        case "authSignInEmail": {
          if (!email) {
            const error = new ErrorMain({
              status: 400,
              numberError: 102,
              message: 'Bad request: email is required',
              value: null
            })

            throw error
          }
          break
        }
        case "authSignIn": {
          if (!email || !password) {
            const error = new ErrorMain({
              status: 400,
              numberError: 102,
              message: 'Bad request: email and password are required',
              value: null
            })

            throw error
          }
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
  })
}
