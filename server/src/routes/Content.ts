import { Request, Response, Router } from 'express'
import { checkValidQueryParamsContentMiddleware } from "../middlewares/checkValidQueryParamsContentMiddleware"

const contentRouter = Router()

const setResponseContent = (req: Request, res: Response) => {

}

contentRouter.get('/content', checkValidQueryParamsContentMiddleware, setResponseContent)

export { contentRouter }
