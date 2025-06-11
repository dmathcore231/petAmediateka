import { CardData } from '../Card'

export interface CoverPromoProps {
  coverPromoData: CardData[] | null
  loading: boolean
  error: boolean
}
