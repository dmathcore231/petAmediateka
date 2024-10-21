import { Schema, model } from 'mongoose'
import { Content } from '../types/interface/Content'

const contentSchema = new Schema<Content>({
  type: {
    type: String,
    required: true,
    _id: false
  },
  data: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: ['Movie', 'Series'],
    }],
    required: true,
    _id: false
  }
})

export const ContentModel = model<Content>('Contents', contentSchema)
