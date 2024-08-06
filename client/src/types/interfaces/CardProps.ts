import { CardData } from "../CardData"

export interface CardProps {
  size: "lg" | "md" | "sm"
  cardLinkType: "allCard" | "title"
  data: CardData
}
