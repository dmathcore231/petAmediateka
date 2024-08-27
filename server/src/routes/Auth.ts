import express from 'express'
import { checkValidAuthFormMiddleware } from "../middlewares/checkValidAuthFormMiddleware"

const authRouter = express.Router()

authRouter.post("/auth/sign_in", checkValidAuthFormMiddleware)

export { authRouter }
