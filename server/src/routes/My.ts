import { Request, Response, Router } from 'express'
import { checkAccessTokenMiddleware } from '../middlewares/checkAccessTokenMiddleware'
import { checkRefreshTokenMiddleware } from '../middlewares/checkRefreshTokenMiddleware'
import { validateJsonBody } from '../middlewares/validateJsonBody'
import { toggleFavorite } from '../controllers/toggleFavorite'
import { ResponseWithoutPayload } from '../types/interface/Response'

const myRouter = Router()

const setResponseAddFavorite = (req: Request, res: Response): void => {
  const { localDataState } = res.locals
  const { error } = localDataState

  try {
    if (error) {
      const response: ResponseWithoutPayload = {
        status: error.status,
        error: {
          numberError: error.numberError,
          message: error.message,
          value: error.value
        },
        message: "Reject",
        value: null
      }

      res.status(error.status).json(response)
    }
  } catch (error: unknown) {
    const response: ResponseWithoutPayload = {
      status: 500,
      error: null,
      message: "Error",
      value: null
    }

    res.status(response.status).json(response)
  }
}

myRouter.post('/my/addFavorite',
  checkAccessTokenMiddleware,
  checkRefreshTokenMiddleware,
  validateJsonBody,
  toggleFavorite,
  setResponseAddFavorite)

export { myRouter }
