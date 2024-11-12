import { Document, ObjectId } from "mongoose"

export interface Content extends Document {
  type: "mainSlider" | "watchingNow" | "banner"
  data: Array<{ type: ObjectId, ref: string[] }> | { type: ObjectId, ref: string[] }
}
