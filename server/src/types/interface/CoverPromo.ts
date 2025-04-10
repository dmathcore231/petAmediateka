import { ObjectId } from "mongoose"
import { CardData } from "./CardData";

export interface CoverPromo extends Document {
  mediaContentData: ObjectId
  bgItems: string[]
}
