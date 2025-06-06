import { Request, Response, Router } from 'express'
import { checkAccessTokenMiddleware } from '../middlewares/checkAccessTokenMiddleware'
import { checkRefreshTokenMiddleware } from '../middlewares/checkRefreshTokenMiddleware'
import { validateJsonBody } from '../middlewares/validateJsonBody'
import { toggleFavorite } from '../controllers/toggleFavorite'
import { getFavoriteList } from '../controllers/getFavoriteList'
import { ResponseWithoutPayload } from '../types/interface/Response'
import { ResponseWithPayload } from '../types/interface/Response'
import { User } from '../types/interface/User'
import { Content } from '../types/interface/Content'

const myRouter = Router()

const setResponseAddFavorite = (req: Request, res: Response): void => {
  const { localDataState } = res.locals
  const { error, user, token } = localDataState

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

    const response: ResponseWithPayload<Omit<User, 'password' | '__v' | 'userCard'>> = {
      status: 200,
      error: null,
      message: "Success",
      value: user,
      token: token.accessToken.value
    }

    res.status(response.status).send(response)
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

const setResponseGetFavoriteList = (req: Request, res: Response): void => {
  const { localDataState } = res.locals
  const { error, content } = localDataState

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

    const response: ResponseWithPayload<Content> = {
      status: 200,
      error: null,
      message: "Accept",
      value: content
    }

    res.status(response.status).send(response)
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

myRouter.get('/my/getFavoriteList',
  checkAccessTokenMiddleware,
  checkRefreshTokenMiddleware,
  getFavoriteList,
  setResponseGetFavoriteList)

export { myRouter }
