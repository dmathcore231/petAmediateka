import { Schema, model } from 'mongoose'
import { PromoLine } from '../types/interface/PromoLine'

const promoLineSchema = new Schema<PromoLine>({
  titleData: {
    type: {
      originalTitle: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
    _id: false
  },
  promoLineItem: {
    type: [String],
    required: true
  }
})

export const PromoLineModel = model<PromoLine>('PromoLines', promoLineSchema)
