import { Schema, model } from 'mongoose'
import { CoverPromo } from '../types/interface/CoverPromo'

const coverPromoSchema = new Schema<CoverPromo>({
  mediaContentData: {
    type: Schema.Types.ObjectId,
    required: true,
    _id: false,
  },
  bgItems: {
    type: [String],
    required: true,
    _id: false,
  }
})

export const CoverPromoModel = model<CoverPromo>('CoverPromo', coverPromoSchema)
