import { Request, Response, NextFunction } from 'express'
import { ContentModel } from '../models/contentSchema'
import { MediaContentModel } from '../models/mediaContentSchema'
import { BannerModel } from '../models/bannerSchema'
import { CardData } from '../types/interface/CardData'
import { MediaContent } from '../types/interface/MediaContent'
import { CoverPromo } from '../types/interface/CoverPromo'
import { mapMediaContentToCardData } from '../helpers'
import { PromoLineModel } from '../models/promoLineSchema'
import { CoverPromoModel } from '../models/coverPromoSchema'

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

    if (series) {
      const data = series.data as unknown as MediaContent[]
      const result: CardData[] = data.map(items => mapMediaContentToCardData(items))

      localDataState.content = {
        ...series.toObject(),
        data: result
      }
    }
  } else if (type === 'banner') {
    const data = await ContentModel.findOne({ type: 'banner' }).populate({
      path: 'data',
      model: BannerModel
    })

    localDataState.content = data
  } else if (type === 'series') {
    const series = await MediaContentModel.findById(id)

    localDataState.content = series
  } else if (type === 'watchingNow') {
    const content = await ContentModel.findOne({ type: 'watchingNow' }).populate({
      path: 'data',
      model: MediaContentModel
    })

    if (content) {
      const data = content.data as unknown as MediaContent[]
      const result: CardData[] = data.map(items => mapMediaContentToCardData(items))

      localDataState.content = {
        ...content.toObject(),
        data: result
      }
    }
  } else if (type === 'newRelease') {
    const content = await ContentModel.findOne({ type: 'newRelease' }).populate({
      path: 'data',
      model: MediaContentModel
    })

    if (content) {
      const data = content.data as unknown as MediaContent[]
      const result: CardData[] = data.map(items => mapMediaContentToCardData(items))

      localDataState.content = {
        ...content.toObject(),
        data: result
      }
    }
  } else if (type === 'promoLine') {
    const content = await ContentModel.findOne({ type: 'promoLine' }).populate({
      path: 'data',
      model: PromoLineModel,
      populate: {
        path: 'data',
        model: MediaContentModel
      }
    })

    if (content && content.data) {
      const promoData = content.data as any
      const mediaContent = promoData.data as unknown as MediaContent
      const cardData: CardData = mapMediaContentToCardData(mediaContent)

      promoData.data = cardData
      localDataState.content = content

    }
  } else if (type === 'coverPromo') {
    const content = await ContentModel.findOne({ type: 'coverPromo' }).populate({
      path: 'data',
      model: CoverPromoModel,
      populate: {
        path: 'mediaContentData',
        model: MediaContentModel
      }
    })

    if (content && content.data) {
      const promoData = content.data as unknown as CoverPromo
      const mediaContent = promoData.mediaContentData as unknown as MediaContent
      const cardData: CardData = mapMediaContentToCardData(mediaContent)
      const result: CardData[] = [
        {
          ...cardData,
          bg: {
            ...cardData.bg,
            imgUrl: promoData.bgItems[0],
            imgResizeUrl: promoData.bgItems[0]
          }
        },
        {
          ...cardData,
          bg: {
            ...cardData.bg,
            imgUrl: promoData.bgItems[1],
            imgResizeUrl: promoData.bgItems[1]
          }
        }
      ]

      localDataState.content = {
        ...content.toObject(),
        data: result
      }
    }
  }

  return next()
}
