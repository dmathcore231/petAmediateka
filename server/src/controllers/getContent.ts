import { Request, Response, NextFunction } from 'express'
import { ContentModel } from '../models/contentSchema'
import { SeriesModel } from '../models/seriesSchema'

export async function getContent(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { localDataState } = res.locals
  const { error } = localDataState
  const { query } = req
  const { type, limit, offset, getAll } = query

  if (error) {
    return next()
  }

  if (type === 'mainSlider') {
    const series = await ContentModel.findOne({ type: 'mainSlider' }).populate('data', null, SeriesModel)
    localDataState.content = series

    return next()
  }
}