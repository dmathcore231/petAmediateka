import { JSX } from "react"
import { Slider } from "../Slider"
import { temporaryBlog } from "../../helpers"
import { SliderProps } from "../../types/interfaces/SliderProps"

export function Blog(): JSX.Element {
  const sliderProps: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagenation: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: 5,
      mediaPlayerHandler: false
    },
    slidesData: temporaryBlog,
    cardStyles: {
      cardSize: 'md',
      flex: {
        body: {
          justifyContent: 'flex-end'
        }
      },
      clipPath: false,
      ageRestrictionBadge: {
        position: 'left',
        size: 'sm'
      },
      boxShadow: true,
      btnGroup: false,
      titleOutside: false,
      hover: {
        scale: true,
        playBack: {
          value: false,
          type: null
        },
        shadow: true
      }
    }
  }
  return (
    <div className="blog">
      <Slider {...sliderProps} />
    </div>
  )
}
