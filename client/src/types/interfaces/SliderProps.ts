import { CardStyles, CardSetting, CardData } from "../Card"
import { SliderSettings } from "../Slider"
import { UserData } from "./User"

export interface SliderProps {
  sliderSettings: SliderSettings
  sliderData: {
    data: Array<CardData> | null
    cardStyles: CardStyles
    settings: CardSetting
    loadingData: boolean
    errorData: boolean
  }
  userState: {
    user: UserData | null
  }
}
