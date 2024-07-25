import { Banner } from "../../components/Banner"
import { Slider } from "../../components/Slider"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { BannerProps } from "../../types/interfaces/BannerProps"
import { temporarySlide, temporaryBannerListItem } from "../../helpers"

export function Home(): JSX.Element {

  const sliderProps: SliderProps = {
    dataSlide: temporarySlide,
    scaleHover: false,
    pagenation: true,
    autoSwipe: true,
    playbacBgHover: false,
    lastSwipe: true
  }

  const bannerProps: BannerProps = {
    title: "Мировые премьеры и любимые сериалы",
    bannerListItem: temporaryBannerListItem,
    img: "/bannerImg.png",
    titleBtn: "Попробовать за 1₽",
    ageRestriction: 18
  }

  return (
    <div className="home">
      <Slider {...sliderProps} />
      <section className="home__item container">
        <Banner {...bannerProps} />
      </section>
    </div>
  )
}
