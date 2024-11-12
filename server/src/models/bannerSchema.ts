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
    type: String,
    required: true
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
