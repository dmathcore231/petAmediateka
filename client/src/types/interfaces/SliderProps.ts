import { CardStyles, CardSetting } from "../Card"
import { SliderSettings } from "../Slider"
import { MediaContent } from "./MediaContent"

export interface SliderProps {
  sliderSettings: SliderSettings
  sliderData: {
    data: Array<MediaContent> | null
    cardStyles: CardStyles
    settings: CardSetting
    loadingData: boolean
    errorData: boolean
  }
}
