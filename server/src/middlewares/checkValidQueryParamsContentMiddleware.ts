import { Request, Response, NextFunction } from 'express'
import { ErrorMain } from '../types/Error'
import { isQueryParameterContentType } from '../types/TypeGuards'

export function checkValidQueryParamsContentMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { query } = req
  const { contentType } = query

  try {
    if (!contentType) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param contentType is required',
        value: null
      }

      throw error
    } else if (typeof contentType !== 'string') {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param contentType is invalid',
        value: null
      }

      throw error
    } else if (!isQueryParameterContentType(contentType)) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param contentType is invalid',
        value: null
      }

      throw error
    }

    return next()
  } catch (err: unknown) {
    console.log(err)
    return next()
  }
}
