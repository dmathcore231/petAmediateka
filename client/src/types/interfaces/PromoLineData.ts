import { CardData } from "../Card"

export interface PromoLineData {
  titleData: {
    originalTitle: string,
    title: string
  }
  subtitle: string
  data: CardData
  promoLineItem: Array<string>
}
