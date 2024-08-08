import { CardData, CardStyles } from "../Card"
import { SliderSettings } from "../Slider"

export interface SliderProps {
  sliderSettings: SliderSettings
  slidesData: Array<CardData>
  cardStyles: CardStyles
}
