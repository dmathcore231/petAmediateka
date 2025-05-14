import { Types } from "mongoose"
import { MediaContent } from "./MediaContent"
import { HistoryList } from "../HistoryList"
import { UserPurchase } from "../UserPurchase"

export interface UserActionsData {
  liked: string[] | [],
  disliked: string[] | [],
  favoritList: Types.ObjectId[] | MediaContent[] | [],
  historyList: HistoryList[] | [],
  purchase: UserPurchase[] | [],
}


