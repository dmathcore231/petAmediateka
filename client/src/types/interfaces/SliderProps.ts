import { CardData } from "../CardData"

export interface SliderProps {
  size: "lg" | "md" | "sm" | "xsm"
  dataSlide: Array<CardData>
  scaleHover: boolean
  pagenation: boolean
  autoSwipe: boolean
  playbacBgHover: boolean
  lastSwipe: boolean
}
