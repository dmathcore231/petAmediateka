import { Request, Response, NextFunction } from 'express'
import { ContentModel } from '../models/contentSchema'
import { MediaContentModel } from '../models/mediaContentSchema'
import { BannerModel } from '../models/bannerSchema'
import { CardData } from '../types/interface/CardData'
import { MediaContent } from '../types/interface/MediaContent'
import { formationLink } from '../helpers'
import { PromoLineModel } from '../models/promoLineSchema'

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
      const result: Array<CardData> = data.map((item) => {
        return {
          _id: item._id as string,
          type: item.type,
          title: item.data.title,
          badge: item.data.badge,
          ageRestriction: item.data.ageRestriction,
          description: item.data.description.prewiewDescription,
          bg: item.bg,
          logoImg: item.logoImg,
          link: formationLink(item.type, item._id as string, item.data.title.linkTitle)
        }
      })

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

    res.locals.localDataState.content = series
  } else if (type === 'watchingNow') {
    const content = await ContentModel.findOne({ type: 'watchingNow' }).populate({
      path: 'data',
      model: MediaContentModel
    })

    if (content) {
      const data = content.data as unknown as MediaContent[]
      const result: Array<CardData> = data.map((item) => {
        return {
          _id: item._id as string,
          type: item.type,
          title: item.data.title,
          badge: item.data.badge,
          ageRestriction: item.data.ageRestriction,
          description: item.data.description.prewiewDescription,
          bg: item.bg,
          logoImg: item.logoImg,
          link: formationLink(item.type, item._id as string, item.data.title.linkTitle)
        }
      })

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
      const result: Array<CardData> = data.map((item) => {
        return {
          _id: item._id as string,
          type: item.type,
          title: item.data.title,
          badge: item.data.badge,
          ageRestriction: item.data.ageRestriction,
          description: item.data.description.prewiewDescription,
          bg: item.bg,
          logoImg: item.logoImg,
          link: formationLink(item.type, item._id as string, item.data.title.linkTitle)
        }
      })

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

      if (promoData && promoData.data) {
        const mediaContent = promoData.data as unknown as MediaContent

        const cardData: CardData = {
          _id: mediaContent._id as string,
          type: mediaContent.type,
          title: mediaContent.data.title,
          badge: mediaContent.data.badge,
          ageRestriction: mediaContent.data.ageRestriction,
          description: mediaContent.data.description.prewiewDescription,
          bg: mediaContent.bg,
          logoImg: mediaContent.logoImg,
          link: formationLink(mediaContent.type, mediaContent._id as string, mediaContent.data.title.linkTitle)
        }

        promoData.data = cardData
        localDataState.content = content
      }
    }
  }

  return next()
}
