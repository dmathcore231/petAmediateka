import { Schema, model } from 'mongoose'
import { Banner } from '../types/interface/Banner'

const bannerSchema = new Schema<Banner>({
  title: {
    type: String,
    required: true
  },
  bannerListItem: {
    type: [String],
    required: true
  },
  img: {
    type: {
      url: {
        type: String,
        required: true
      },
      resizeUrl: {
        type: String,
        required: true
      },
      sourceUrls: {
        type: [String],
        required: true
      }
    },
    required: true,
    _id: false
  },
  titleBtn: {
    type: String,
    required: true
  },
  ageRestriction: {
    type: Number,
    required: true
  },
})

export const BannerModel = model<Banner>('Banners', bannerSchema)
