import { Request, Response, NextFunction } from 'express'
import { ContentModel } from '../models/contentSchema'
import { MediaContentModel } from '../models/mediaContentSchema'
import { BannerModel } from '../models/bannerSchema'

export async function getContent(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { localDataState } = res.locals
  const { error } = localDataState
  const { query } = req
  const { type, limit, offset, getAll, id } = query

  if (error) {
    return next()
  }

  if (type === 'mainSlider') {
    const series = await ContentModel.findOne({ type: 'mainSlider' }).populate({
      path: 'data',
      model: MediaContentModel
    })

    localDataState.content = series
  } else if (type === 'banner') {
    const data = await ContentModel.findOne({ type: 'banner' }).populate({
      path: 'data',
      model: BannerModel
    })

    localDataState.content = data
  }

  return next()
}
