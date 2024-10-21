import { Request, Response, Router } from 'express'
import { checkValidQueryParamsContentMiddleware } from "../middlewares/checkValidQueryParamsContentMiddleware"
import { getContent } from '../controllers/getContent'
import { ResponseWithoutPayload } from '../types/interface/Response'

const contentRouter = Router()

const setResponseContent = async (req: Request, res: Response) => {
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

      return res.status(error.status).json(response)
    }

    const response: ResponseWithoutPayload = {
      status: 200,
      error: null,
      message: "Accept",
      value: content
    }

    return res.status(response.status).json(response)
  } catch (error: unknown) {
    const response: ResponseWithoutPayload = {
      status: 500,
      error: null,
      message: "Error",
      value: null
    }

    return res.status(response.status).json(response)
  }
}

contentRouter.get(`/content`, checkValidQueryParamsContentMiddleware, getContent, setResponseContent)

export { contentRouter }
