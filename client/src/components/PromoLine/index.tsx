import { Slider } from "../Slider"
import { PromoLineProps } from "../../types/interfaces/PromoLineProps"


export function PromoLine({ title, subtitle, sliderProps }: PromoLineProps): JSX.Element {
  return (
    <div className="promo-line">
      <div className="promo-line__bg"></div>
      <div className="promo-line__item container">
        <div className="promo-line__title">
          <h2>{title}</h2>
        </div>
        <div className="promo-line__subtitle title title_color_gray">
          {subtitle}
        </div>
      </div>
      <div className="promo-line__item">
        <Slider {...sliderProps} />
      </div>
    </div>
  )
}
