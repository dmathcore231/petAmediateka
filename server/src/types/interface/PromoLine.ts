import { ObjectId } from "mongoose"

export interface PromoLine extends Document {
  titleData: {
    originalTitle: string,
    title: string
  },
  subtitle: string,
  data: ObjectId
  promoLineItem: Array<string>
}
