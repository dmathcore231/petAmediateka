import { HistoryList } from "../HistoryList"
import { UserPurchase } from "../UserPurchase"

export interface UserActionsData {
  liked: string[] | [],
  disliked: string[] | [],
  favoritList: string[] | [],
  historyList: HistoryList[] | [],
  purchase: UserPurchase[] | [],
}
