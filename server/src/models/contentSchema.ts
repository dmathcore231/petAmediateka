import { Schema, model } from 'mongoose'
import { Content } from '../types/interface/Content'

const contentSchema = new Schema<Content>({
  type: {
    type: String,
    enum: ["mainSlider", "watchingNow", "banner", "newRelease"],
    required: true,
    _id: false
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
    _id: false
  }
})

export const ContentModel = model<Content>('Contents', contentSchema)
