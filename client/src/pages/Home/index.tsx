import { useState } from "react"
import { Link } from "react-router-dom"
import { Banner } from "../../components/Banner"
import { Slider } from "../../components/Slider"
import { SeoBlock } from "../../components/SeoBlock"
import { PromoLine } from "../../components/PromoLine"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { BannerProps } from "../../types/interfaces/BannerProps"
import { SeoBlockProps } from "../../types/interfaces/SeoBlockProps"
import { temporarySlide, temporaryBannerListItem, temporarySlidesWatchingNow, temporarySlidesNewRelease, temporarySlidesDetectiveSeries, temporaryThoseAboutToDie, temporaryPopularGenresSeries, temporaryPopularGenresMovies } from "../../helpers"
import { PromoLineProps } from "../../types/interfaces/PromoLineProps"

export function Home(): JSX.Element {

  const [activeLinkPopularGenres, setActiveLinkPopularGenres] = useState<number>(0)

  const sliderProps: SliderProps = {
    typeSlider: "default",
    dataSlide: temporarySlide,
    slideSize: "lg",
    scaleHover: false,
    pagenation: true,
    autoSwipe: true,
    playbacBgHover: false,
    lastSwipe: false,
    quantityListItems: 1,
    boxShadow: false
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
    dataSlide: temporarySlidesWatchingNow,
    slideSize: "sm",
    scaleHover: true,
    pagenation: false,
    autoSwipe: false,
    playbacBgHover: false,
    lastSwipe: true,
    quantityListItems: 5,
    boxShadow: false
  }

  const sliderPropsNewRelease: SliderProps = {
    typeSlider: "multi",
    dataSlide: temporarySlidesNewRelease,
    slideSize: "md",
    scaleHover: false,
    pagenation: false,
    autoSwipe: false,
    playbacBgHover: true,
    lastSwipe: true,
    quantityListItems: 4,
    boxShadow: true
  }

  const sliderProrsPromoLine: SliderProps = {
    typeSlider: "multi",
    dataSlide: temporaryThoseAboutToDie,
    slideSize: "md",
    scaleHover: false,
    pagenation: false,
    autoSwipe: false,
    playbacBgHover: true,
    lastSwipe: true,
    quantityListItems: 4,
    boxShadow: false
  }
  const sliderProprsDetectiveSeries: SliderProps = {
    typeSlider: "multi",
    dataSlide: temporarySlidesDetectiveSeries,
    slideSize: "sm",
    scaleHover: true,
    pagenation: false,
    autoSwipe: false,
    playbacBgHover: false,
    lastSwipe: true,
    quantityListItems: 5,
    boxShadow: false
  }

  const seoBlockProps: SeoBlockProps = {
    title: "Смотреть лучшие фильмы и сериалы онлайн — Amediatekа",
    text: "Новинки кино и сериалов в HD-качестве в онлайн-кинотеатре Амедиатека. Смотреть лучшие сериалы и фильмы по подписке."
  }

  const promoLineProps: PromoLineProps = {
    title: "Историческая драма «Обреченные на славу»",
    subtitle: "Погрузитесь в суровый мир гладиаторских боев и дворцовых интриг, где борьба за власть идет не на жизнь, а на смерть.",
    sliderProps: sliderProrsPromoLine
  }

  const sliderPropsPopularGenres: SliderProps = {
    typeSlider: "multi",
    dataSlide: activeLinkPopularGenres === 0 ? temporaryPopularGenresSeries : temporaryPopularGenresMovies,
    slideSize: "md",
    scaleHover: false,
    pagenation: false,
    autoSwipe: false,
    playbacBgHover: true,
    lastSwipe: true,
    quantityListItems: 5,
    boxShadow: true
  }

  return (
    <div className="home" >
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
          <Link to="/#" className="link link_primary">Показать еще</Link>
        </div>
        <Slider {...sliderPropsNewRelease} />
      </section>
      <section className="home-item container">
        <SeoBlock {...seoBlockProps} />
      </section>
      <section className="home-item">
        <div className="home-item__title container">
          <h2>Детективные сериалы</h2>
          <Link to="/#" className="link link_primary">Показать еще</Link>
        </div>
        <Slider {...sliderProprsDetectiveSeries} />
      </section>
      <section className="home-item">
        <PromoLine {...promoLineProps} />
      </section>
      <section className="home-item">
        <div className="home-item__title container">
          <h2>Популярные жанры</h2>
          <div className="home-item__title-wrapper">
            <span className={`link link_primary ${activeLinkPopularGenres === 0 ? 'link_active' : ''}`}
              onClick={() => setActiveLinkPopularGenres(0)}
            >
              Сериалы
            </span>
            <span className={`link link_primary ${activeLinkPopularGenres === 1 ? 'link_active' : ''}`}
              onClick={() => setActiveLinkPopularGenres(1)}
            >
              Фильмы
            </span>
          </div>
        </div>
        <Slider {...sliderPropsPopularGenres} />
      </section>
    </div >
  )
}
