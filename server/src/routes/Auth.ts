import express, { Request, Response } from 'express'
import { checkValidAuthFormMiddleware } from "../middlewares/checkValidAuthFormMiddleware"
import { createUser } from "../controllers/createUser"
import { ResponseWithoutPayload, ResponseWithUPayload } from "../types/interface/Response"

const authRouter = express.Router()

const setResponseSignUpEmail = (req: Request, res: Response) => {
  const { type, email } = req.body
  const { error, user, } = res.locals.localDataState

  try {
    if (error) {
      const response: ResponseWithoutPayload = {
        status: error.status,
        error: {
          numberError: error.numberError,
          message: error.message,
          value: email
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

authRouter.post("/auth/sign_up", checkValidAuthFormMiddleware, createUser, setResponseSignUpEmail)

export { authRouter }
