import express, { Request, Response } from 'express'
import { checkBadRequestMiddleware } from "../middlewares/checkBadRequestMiddleware"
import { checkValidAuthFormMiddleware } from "../middlewares/checkValidAuthFormMiddleware"
import { createJwtMiddleware } from '../middlewares/createJwtMiddleware'
import { createUser } from "../controllers/createUser"
import { ResponseWithoutPayload, ResponseWithPayload } from "../types/interface/Response"

const authRouter = express.Router()

const setResponseSignUp = (req: Request, res: Response) => {
  const { type, email, } = req.body
  const { error, user, token } = res.locals.localDataState

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

    const response: ResponseWithPayload = {
      status: 201,
      error: null,
      message: "Success",
      value: user,
      token: token.accessToken.value
    }

    return res.status(response.status).send(response)
  } catch (error: unknown) {
    console.log(error)
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
  const { error, user, token } = res.locals.localDataState
  const { type } = req.body

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

    const response: ResponseWithPayload = {
      status: 200,
      error: null,
      message: "Success",
      value: user,
      token: type === 'authSignInEmail'
        ? null
        : token.accessToken.value
    }

    if (type === 'authSignIn') {
      res.cookie('refreshToken',
        token.refreshToken.value,
        {
          maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'strict',
          httpOnly: false,
          secure: true
        })
    }

    return res.status(response.status).send(response)
  } catch (error: unknown) {
    console.log(error)
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

authRouter.post("/auth/sign_up", checkBadRequestMiddleware, checkValidAuthFormMiddleware, createUser, createJwtMiddleware, setResponseSignUp)
authRouter.post("/auth/sign_in", checkBadRequestMiddleware, checkValidAuthFormMiddleware, createJwtMiddleware, setResponseSignIn)

export { authRouter }
