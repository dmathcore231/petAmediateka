import { CardData } from "../CardData"

export interface SliderProps {
  typeSlider: "default" | "multi"
  dataSlide: Array<CardData>
  slideSize: "lg" | "md" | "sm" | "xsm"
  scaleHover: boolean
  pagenation: boolean
  autoSwipe: boolean
  playbacBgHover: boolean
  lastSwipe: boolean
  quantityListItems: number
  boxShadow: boolean
}
