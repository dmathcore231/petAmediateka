import { Request, Response, NextFunction } from 'express'
import { ErrorMain } from '../types/classes/ErrorMain'
import { typeGuardQueryCotentType } from '../types/TypeGuards'
import { MediaContentModel } from '../models/mediaContentSchema'

export async function checkValidQueryParamsContentMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { query } = req
  const { type, limit, offset, getAll, id } = query

  try {
    if (!type) {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param type is required',
        value: null
      })
    } else if (typeof type !== 'string') {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param type is invalid',
        value: null
      })
    } else if (!typeGuardQueryCotentType(type)) {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param type is invalid',
        value: null
      })
    }

    if (limit && typeof limit !== 'string') {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: '!Bad request: query param limit is invalid',
        value: null
      })
    } else if (limit && !Number.isInteger(Number(limit))) {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param limit is invalid',
        value: null
      })
    } else if (limit && Number(limit) < 0) {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param limit is invalid',
        value: null
      })
    }

    if (offset && typeof offset !== 'string') {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param limit is invalid',
        value: null
      })
    } else if (offset && !Number.isInteger(Number(offset))) {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: '!Bad request: query param limit is invalid',
        value: null
      })
    } else if (offset && Number(offset) < 0) {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param offset is invalid',
        value: null
      })
    }

    if (getAll && typeof getAll !== 'string') {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param getAll is invalid',
        value: null
      })
    } else if (getAll && getAll !== 'true') {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param getAll is invalid',
        value: null
      })
    } else if (getAll && limit && offset) {
      throw new ErrorMain({
        status: 400,
        numberError: 102,
        message: 'Bad request: query param getAll is not allowed with query params limit and offset',
        value: null
      })
    }

    if (type === 'series' && id) {
      if (typeof id !== 'string') {
        throw new ErrorMain({
          status: 400,
          numberError: 102,
          message: 'Bad request: query param id is invalid',
          value: null
        })
      }

      const data = await MediaContentModel.findById(id)

      if (!data) {
        throw new ErrorMain({
          status: 404,
          numberError: 101,
          message: 'Not found',
          value: null
        })
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
