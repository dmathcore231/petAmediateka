import { Slider } from "../Slider"
import { PromoLineProps } from "../../types/interfaces/PromoLineProps"

export function PromoLine({ promoLineData, sliderProps }: PromoLineProps): JSX.Element {
  return (
    <div className="promo-line">
      <div className="promo-line__bg"></div>
      <div className="promo-line__item container">
        <div className="promo-line__title">
          <h2>{promoLineData.titleData.title}</h2>
        </div>
        <div className="promo-line__subtitle title title_color_gray">
          {promoLineData.subtitle}
        </div>
      </div>
      <div className="promo-line__item">
        <Slider {...sliderProps} />
      </div>
    </div>
  )
}
