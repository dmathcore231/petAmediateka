import { CardStyles, CardSetting, CardData } from "../Card"

export interface CardProps {
  data: CardData
  loadingCardData: boolean
  error: boolean
  styles: CardStyles
  settings: CardSetting
}
