import { CardStyles, CardSetting, CardData } from "../Card"
import { SliderSettings } from "../Slider"

export interface SliderProps {
  sliderSettings: SliderSettings
  sliderData: {
    data: Array<CardData> | null
    cardStyles: CardStyles
    settings: CardSetting
    loadingData: boolean
    errorData: boolean
  }
}
