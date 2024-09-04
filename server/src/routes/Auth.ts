import express, { Request, Response } from 'express'
import { checkBadRequestMiddleware } from "../middlewares/checkBadRequestMiddleware"
import { checkValidAuthFormMiddleware } from "../middlewares/checkValidAuthFormMiddleware"
import { createUser } from "../controllers/createUser"
import { ResponseWithoutPayload, ResponseWithUPayload } from "../types/interface/Response"

const authRouter = express.Router()

const setResponseSignUp = (req: Request, res: Response) => {
  const { type, email } = req.body
  const { error, user, } = res.locals.localDataState

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

      return res.status(response.status).send(response)
    }

    if (type === "authSignUpEmail") {
      const response: ResponseWithoutPayload = {
        status: 200,
        error: null,
        message: "Success",
        value: null
      }
      return res.status(response.status).send(response)
    }

    const response: ResponseWithUPayload = {
      status: 201,
      error: null,
      message: "Success",
      value: user
    }

    return res.status(response.status).send(response)
  } catch (error: unknown) {
    const response: ResponseWithoutPayload = {
      status: 500,
      error: {
        numberError: 500,
        message: "Internal server error"
      },
      message: "Reject",
      value: null
    }

    return res.status(response.status).send(response)
  }
}

const setResponseSignIn = (req: Request, res: Response) => {
  const { error, user } = res.locals.localDataState

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

      return res.status(response.status).send(response)
    }

    const response: ResponseWithoutPayload = {
      status: 200,
      error: null,
      message: "Success",
      value: user
    }

    return res.status(response.status).send(response)
  } catch (error: unknown) {
    const response: ResponseWithoutPayload = {
      status: 500,
      error: {
        numberError: 500,
        message: "Internal server error"
      },
      message: "Reject",
      value: null
    }

    return res.status(response.status).send(response)
  }
}

authRouter.post("/auth/sign_up", checkBadRequestMiddleware, checkValidAuthFormMiddleware, createUser, setResponseSignUp)
authRouter.post("/auth/sign_in", checkBadRequestMiddleware, checkValidAuthFormMiddleware, setResponseSignIn)

export { authRouter }
