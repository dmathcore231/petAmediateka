import { Request, Response, Router } from 'express'
import { checkBadRequestMiddleware } from "../middlewares/checkBadRequestMiddleware"
import { checkValidAuthFormMiddleware } from "../middlewares/checkValidAuthFormMiddleware"
import { createJwtMiddleware } from '../middlewares/createJwtMiddleware'
import { logoutUserMiddleware } from "../middlewares/logoutUserMiddleware"
import { createUser } from "../controllers/createUser"
import { ResponseWithoutPayload, ResponseWithPayload } from "../types/interface/Response"
import { User } from '../types/interface/User'
import { checkAccessTokenMiddleware } from '../middlewares/checkAccessTokenMiddleware'
import { checkRefreshTokenMiddleware } from '../middlewares/checkRefreshTokenMiddleware'
import { refrechAcccessTokenMiddleware } from '../middlewares/refrechAcccessTokenMiddleware'

const authRouter = Router()

const setResponseSignUp = (req: Request, res: Response): void => {
  const { type, email } = req.body
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
      res.status(response.status).send(response)
    }

    if (type === "authSignUpEmail") {
      const response: ResponseWithoutPayload = {
        status: 200,
        error: null,
        message: "Success",
        value: null
      }
      res.status(response.status).send(response)
    }

    const response: ResponseWithPayload<Omit<User, 'password' | '__v' | 'userCard'>> = {
      status: 201,
      error: null,
      message: "Success",
      value: user,
      token: token.accessToken.value
    }

    res.cookie('refreshToken', token.refreshToken.value, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      httpOnly: false,
      secure: true
    }).status(response.status).send(response)

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

    res.status(response.status).send(response)
  }
}

const setResponseSignIn = (req: Request, res: Response): void => {
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

      res.status(response.status).send(response)
    }

    const response: ResponseWithPayload<Omit<User, 'password' | '__v' | 'userCard'>> = {
      status: 200,
      error: null,
      message: "Success",
      value: user,
      token: type === 'authSignInEmail'
        ? null
        : token.accessToken.value
    }

    res.cookie('refreshToken', token.refreshToken.value, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      httpOnly: false,
      secure: true
    }).status(response.status).send(response)

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

    res.status(response.status).send(response)
  }
}

const setResponseLogout = (req: Request, res: Response): void => {
  const { error } = res.locals.localDataState

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
    }

    const response: ResponseWithoutPayload = {
      status: 200,
      error: null,
      message: "Success",
      value: null
    }

    res.clearCookie('refreshToken')
    res.status(response.status).send(response)

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

    res.status(response.status).send(response)
  }
}

const setResponseRefreshAccessToken = (req: Request, res: Response): void => {
  const { token, error, user } = res.locals.localDataState

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

      res.clearCookie('refreshToken')
      res.status(response.status).send(response)
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
      error: {
        numberError: 500,
        message: "Internal server error"
      },
      message: "Reject",
      value: null
    }

    res.status(response.status).send(response)
  }
}

authRouter.post("/auth/sign_up", checkBadRequestMiddleware, checkValidAuthFormMiddleware, createUser, createJwtMiddleware, setResponseSignUp)
authRouter.post("/auth/sign_in", checkBadRequestMiddleware, checkValidAuthFormMiddleware, createJwtMiddleware, setResponseSignIn)

authRouter.get("/auth/refresh_access_token", checkRefreshTokenMiddleware, refrechAcccessTokenMiddleware, setResponseRefreshAccessToken)
authRouter.get("/auth/logout", checkAccessTokenMiddleware, checkRefreshTokenMiddleware, logoutUserMiddleware, setResponseLogout)

export { authRouter }
