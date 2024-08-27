import { Request, Response, NextFunction } from 'express'
import { formDataWithoutFile } from '../utils/multerConfit'

export function checkValidAuthFormMiddleware(req: Request, res: Response, next: NextFunction): void {
  formDataWithoutFile(req, res, (err) => {
    try {
      console.log(req.body)
    } catch (err: any) {

    }
  })
  return next()
}
