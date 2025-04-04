import { Request, Response, NextFunction } from 'express'
import { ErrorMain } from '../types/Error'
import { typeGuardQueryCotentType } from '../types/TypeGuards'
import { MediaContentModel } from '../models/mediaContentSchema'

export async function checkValidQueryParamsContentMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { query } = req
  const { type, limit, offset, getAll, id } = query

  try {
    if (!type) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param type is required',
        value: null
      }

      throw error
    } else if (typeof type !== 'string') {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param type is invalid',
        value: null
      }

      throw error
    } else if (!typeGuardQueryCotentType(type)) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param type is invalid',
        value: null
      }

      throw error
    }

    if (limit && typeof limit !== 'string') {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: '!Bad request: query param limit is invalid',
        value: null
      }

      throw error
    } else if (limit && !Number.isInteger(Number(limit))) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param limit is invalid',
        value: null
      }

      throw error
    } else if (limit && Number(limit) < 0) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param limit is invalid',
        value: null
      }

      throw error
    }

    if (offset && typeof offset !== 'string') {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param limit is invalid',
        value: null
      }

      throw error
    } else if (offset && !Number.isInteger(Number(offset))) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: '!Bad request: query param limit is invalid',
        value: null
      }

      throw error
    } else if (offset && Number(offset) < 0) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param offset is invalid',
        value: null
      }

      throw error
    }

    if (getAll && typeof getAll !== 'string') {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param getAll is invalid',
        value: null
      }

      throw error
    } else if (getAll && getAll !== 'true') {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param getAll is invalid',
        value: null
      }

      throw error
    } else if (getAll && limit && offset) {
      const error: ErrorMain = {
        status: 400,
        numberError: 102,
        message: 'Bad request: query param getAll is not allowed with query params limit and offset',
        value: null
      }

      throw error
    }

    if (type === 'series' && id) {
      if (typeof id !== 'string') {
        const error: ErrorMain = {
          status: 400,
          numberError: 102,
          message: 'Bad request: query param id is invalid',
          value: null
        }

        throw error
      }

      const data = await MediaContentModel.findById(id)

      if (!data) {
        const error: ErrorMain = {
          status: 404,
          numberError: 101,
          message: 'Not found',
          value: null
        }

        throw error
      }
    }

    return next()
  } catch (err: unknown) {
    const error = err as ErrorMain

    if (error && error.status) {
      res.locals.localDataState = {
        ...res.locals.localDataState,
        error
      }
    }

    return next()
  }
}
