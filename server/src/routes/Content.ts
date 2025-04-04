import { Request, Response, Router } from 'express'
import { checkValidQueryParamsContentMiddleware } from "../middlewares/checkValidQueryParamsContentMiddleware"
import { getContent } from '../controllers/getContent'
import { ResponseWithoutPayload, ResponseWithPayload } from '../types/interface/Response'
import { Content } from '../types/interface/Content'
import { MediaContent } from '../types/interface/MediaContent'

const contentRouter = Router()

const setResponseContent = async (req: Request, res: Response): Promise<void> => {
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

    const response: ResponseWithPayload<Content | MediaContent> = {
      status: 200,
      error: null,
      message: "Accept",
      value: content
    }

    res.status(response.status).json(response)
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

contentRouter.get(`/content`, checkValidQueryParamsContentMiddleware, getContent, setResponseContent)

export { contentRouter }
