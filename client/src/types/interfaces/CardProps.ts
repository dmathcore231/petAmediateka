import { CardStyles, CardSetting } from "../Card"
import { MediaContent } from "./MediaContent"

export interface CardProps {
  data: MediaContent
  loadingCardData: boolean
  error: boolean
  styles: CardStyles
  settings: CardSetting
}
