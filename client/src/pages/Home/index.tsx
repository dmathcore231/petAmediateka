import { JSX } from "react"
import { BannerContainer } from "./BannerContainer"
import { HeaderContainer } from "./HeaderContainer"
import { WatchingNowContainer } from "./WatchingNowContainer"
import { NewReleaseContainer } from "./NewReleaseContainer"
import { PromoLineContainer } from "./PromoLineContainer"
import { CoverPromoContainer } from "./CoverPromoContainer"
import { SeoBlock } from "../../components/SeoBlock"
import { PopularGenres } from "../../components/PopularGenres"
import { SeoBlockProps } from "../../types/interfaces/SeoBlockProps"

export function Home(): JSX.Element {
  const seoBlockProps: SeoBlockProps = {
    title: "Смотреть лучшие фильмы и сериалы онлайн — Amediatekа",
    text: "Новинки кино и сериалов в HD-качестве в онлайн-кинотеатре Амедиатека. Смотреть лучшие сериалы и фильмы по подписке."
  }

  return (
    <div className="home" >
      <HeaderContainer />
      <BannerContainer />
      <WatchingNowContainer />
      <NewReleaseContainer />
      <section className="home-item container">
        <SeoBlock {...seoBlockProps} />
      </section>
      <PromoLineContainer />
      <section className="home-item">
        <PopularGenres />
      </section>
      <CoverPromoContainer />
    </div >
  )
}
