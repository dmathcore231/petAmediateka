import { CardStyles, CardSetting, CardData } from "../Card"
import { UserCardProps } from "../UserCardProps"

export interface CardProps {
  data: CardData
  loading: boolean
  user: UserCardProps
  error: boolean
  styles: CardStyles
  settings: CardSetting
}
