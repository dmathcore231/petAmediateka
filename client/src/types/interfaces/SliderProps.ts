import { CardData, CardStyles } from "../Card"
import { SliderSettings } from "../Slider"

export interface SliderProps {
  sliderSettings: SliderSettings
  slidesData: Array<CardData> | null // null будет равен ошибки и нужен тип для loading
  cardStyles: CardStyles
}
