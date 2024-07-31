import { Banner } from "../../components/Banner"
import { Slider } from "../../components/Slider"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { BannerProps } from "../../types/interfaces/BannerProps"
import { temporarySlide, temporaryBannerListItem, temporarySlideWatchingNow, temporartSlideNewRelease } from "../../helpers"

export function Home(): JSX.Element {

  const sliderProps: SliderProps = {
    typeSlider: "default",
    dataSlide: temporarySlide,
    slideSize: "lg",
    scaleHover: false,
    pagenation: true,
    autoSwipe: true,
    playbacBgHover: false,
    lastSwipe: false,
    quantityListItems: 1
  }

  const bannerProps: BannerProps = {
    title: "Мировые премьеры и любимые сериалы",
    bannerListItem: temporaryBannerListItem,
    img: "/bannerImg.png",
    titleBtn: "Попробовать за 1₽",
    ageRestriction: 18
  }

  const sliderPropsWatchingNow: SliderProps = {
    typeSlider: "multi",
    dataSlide: temporarySlideWatchingNow,
    slideSize: "sm",
    scaleHover: true,
    pagenation: false,
    autoSwipe: false,
    playbacBgHover: false,
    lastSwipe: true,
    quantityListItems: 5
  }

  const sliderPropsNewRelease: SliderProps = {
    typeSlider: "multi",
    dataSlide: temporartSlideNewRelease,
    slideSize: "md",
    scaleHover: false,
    pagenation: false,
    autoSwipe: false,
    playbacBgHover: true,
    lastSwipe: true,
    quantityListItems: 4
  }

  return (
    <div className="home">
      <Slider {...sliderProps} />
      <section className="home-item container">
        <Banner {...bannerProps} />
      </section>
      <section className="home-item">
        <div className="home-item__title container">
          <h2>Сейчас смотрят</h2>
        </div>
        <Slider {...sliderPropsWatchingNow} />
      </section>
      <section className="home-item">
        <div className="home-item__title container">
          <h2>Новое в Амедиатеке</h2>
        </div>
        <Slider {...sliderPropsNewRelease} />
      </section>
    </div>
  )
}
