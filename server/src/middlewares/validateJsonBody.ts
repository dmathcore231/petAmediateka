import { Request, Response, NextFunction } from "express"
import { formDataWithoutFile } from '../utils/multerConfit'
import { MediaContentModel } from "../models/mediaContentSchema"
import { ErrorMain } from "../types/classes/ErrorMain"
import { MongooseError } from "mongoose"
import { IErrorMainOptions } from "../types/IErrorMainOptions"

export const validateJsonBody = (req: Request, res: Response, next: NextFunction): void => {
  formDataWithoutFile(req, res, async (err) => {
    const { id } = req.body
    const { localDataState } = res.locals
    const { error, token, user } = localDataState

    if (error) return next()

    try {
      if (!id) {
        throw new ErrorMain({
          status: 400,
          numberError: 102,
          message: "Request body is missing or empty"
        })
      }

      const content = await MediaContentModel.findById(id)

      localDataState.content = content

      return next()
    } catch (err: unknown) {
      if (err instanceof ErrorMain) {
        localDataState.error = err
      }

      if (err instanceof MongooseError) {
        const errorName = err.name

        if (errorName === "CastError") {
          const error: IErrorMainOptions = {
            status: 404,
            numberError: 107,
            message: "Content not found"
          }

          localDataState.error = error
        }
      }

      return next()
    }
  })
}
