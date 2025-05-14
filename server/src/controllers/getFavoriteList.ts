import { Request, Response, NextFunction } from 'express'
import { MediaContent } from '../types/interface/MediaContent'
import { transformMediaToCard } from '../helpers/index'
import { UserModel } from '../models/userSchema'

export async function getFavoriteList(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { localDataState } = res.locals
  const { error, user } = localDataState

  if (error) {
    return next()
  }

  const userData = await UserModel.findById(user._id).populate<{ favoritList: MediaContent[] }>('userActionsData.favoritList')

  if (!userData) {
    return next()
  }

  const content = userData.userActionsData.favoritList.map(item => transformMediaToCard(item as MediaContent))

  localDataState.content = content

  return next()
}
