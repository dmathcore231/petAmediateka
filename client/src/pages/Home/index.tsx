import { Slider } from "../../components/Slider"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { temporarySlide } from "../../helpers"

export function Home(): JSX.Element {

  const sliderProps: SliderProps = {
    dataSlide: temporarySlide,
    scaleHover: false,
    pagenation: true,
    autoSwipe: true,
    playbacBgHover: false,
    lastSwipe: true
  }

  return (
    <div className="home">
      <Slider {...sliderProps} />
    </div>
  )
}
