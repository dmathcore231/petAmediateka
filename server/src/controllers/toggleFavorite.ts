import { Request, Response, NextFunction } from 'express'
import { MediaContentModel } from '../models/mediaContentSchema'
import { UserModel } from '../models/userSchema'

export const toggleFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.body
  const { localDataState } = res.locals
  const { error, user, token } = localDataState

  if (error) return next()

  try {
    const userId = user._id
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      user.userActionsData.favoritList.includes(id)
        ? { $pull: { "userActionsData.favoritList": id } }
        : { $addToSet: { "userActionsData.favoritList": id } },
      { new: true }
    )

    localDataState.user = updatedUser

    return next()
  } catch (error: unknown) {
    console.log(error)
    return next()
  }
}
