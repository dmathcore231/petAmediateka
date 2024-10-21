import { Document, ObjectId } from "mongoose"

export interface Content extends Document {
  type: "mainSlider" | "watchingNow"
  data: Array<{ type: ObjectId, ref: string[] }>
}
