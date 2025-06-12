import { JSX } from "react"
import { Slider } from "../Slider"
import { SkeletonTitle } from "../Skeletons/Title"
import { PromoLineProps } from "../../types/interfaces/PromoLineProps"

export function PromoLine({ promoLineData, sliderProps, loadingData }: PromoLineProps): JSX.Element {
  const setTitle = (loading: boolean): JSX.Element => {
    return !loading ? (
      <div className="promo-line__title">
        <h2>{promoLineData.titleData.title}</h2>
      </div>
    ) : (
      <SkeletonTitle />
    )
  }

  return (
    <div className="promo-line">
      <div className="promo-line__bg" />
      <div className="promo-line__item container">
        {setTitle(loadingData)}
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
