import { useState, useEffect } from "react"
import { Link, useFetcher } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchContent } from "../../redux/contentSlice"
import { Banner } from "../../components/Banner"
import { Slider } from "../../components/Slider"
import { SeoBlock } from "../../components/SeoBlock"
import { PromoLine } from "../../components/PromoLine"
import { CoverPromo } from "../../components/CoverPromo"
import { Blog } from "../../components/Blog"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { BannerProps } from "../../types/interfaces/BannerProps"
import { SeoBlockProps } from "../../types/interfaces/SeoBlockProps"
import { PromoLineProps } from "../../types/interfaces/PromoLineProps"
import { MediaContent } from "../../types/interfaces/MediaContent"
import { ContentTypeEnum } from "../../types/interfaces/Content"
import { defaultBannerData } from "../../helpers"

export function Home(): JSX.Element {
  const dispatch = useAppDispatch()
  const { mainSlider, banner } = useAppSelector((state) => state.content)

  const [activeLinkPopularGenres, setActiveLinkPopularGenres] = useState<number>(0)

  useEffect(() => {
    dispatch(fetchContent({ type: ContentTypeEnum.MainSlider }))
    dispatch(fetchContent({ type: ContentTypeEnum.Banner }))
  }, [dispatch])

  const sliderProps: SliderProps = {
    sliderSettings: {
      typeSlider: "default",
      pagenation: !mainSlider.loading,
      autoSwipe: true,
      lastSwipe: false,
      quantityListItems: 1
    },
    sliderData: {
      data: mainSlider.content ? mainSlider.content.data as MediaContent[] : null,
      cardStyles: {
        cardSize: 'lg',
        flex: {
          body: {
            justifyContent: 'flex-start'
          }
        },
        clipPath: false,
        ageRestrictionBadge: {
          position: 'left',
          size: 'lg'
        },
        boxShadow: false,
        btnGroup: true,
        hover: {
          scale: false,
          playBack: {
            value: false,
            type: null
          },
          shadow: false
        }
      },
      settings: {
        title: {
          titleOutside: false,
          titleLogoImg: true
        },
        badgeVisible: true,
        link: {
          linkType: 'title',
        },
        descriptionVisible: true,
        tags: null
      },
      loadingData: mainSlider.loading,
      errorData: false
    },
  }

  const sliderPropsWatchingNow: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagenation: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: 5
    },
    sliderData: {
      data: mainSlider.content ? mainSlider.content.data as MediaContent[] : null,
      cardStyles: {
        cardSize: 'md',
        flex: {
          body: {
            justifyContent: 'space-between'
          }
        },
        clipPath: false,
        ageRestrictionBadge: {
          position: 'left',
          size: 'sm'
        },
        boxShadow: false,
        btnGroup: false,
        hover: {
          scale: true,
          playBack: {
            value: false,
            type: null
          },
          shadow: true
        }
      },
      settings: {
        title: {
          titleOutside: true,
          titleLogoImg: false
        },
        badgeVisible: false,
        link: {
          linkType: 'allCard',
        },
        descriptionVisible: false,
        tags: null
      },
      loadingData: mainSlider.loading,
      errorData: false
    },
  }

  const bannerProps: BannerProps = banner.content ? banner.content.data as BannerProps : defaultBannerData

  // const sliderPropsNewRelease: SliderProps = {
  //   sliderSettings: {
  //     typeSlider: 'multi',
  //     pagenation: false,
  //     autoSwipe: false,
  //     lastSwipe: true,
  //     quantityListItems: 4
  //   },
  //   slidesData: temporarySlidesNewRelease,
  //   cardStyles: {
  //     cardSize: 'lm',
  //     flex: {
  //       body: {
  //         justifyContent: 'space-between'
  //       }
  //     },
  //     clipPath: true,
  //     ageRestrictionBadge: {
  //       position: 'right',
  //       size: 'lm'
  //     },
  //     boxShadow: true,
  //     btnGroup: false,
  //     titleOutside: false,
  //     hover: {
  //       scale: false,
  //       playBack: {
  //         value: true,
  //         type: 'default'
  //       },
  //       shadow: false
  //     }
  //   }
  // }

  // const seoBlockProps: SeoBlockProps = {
  //   title: "Смотреть лучшие фильмы и сериалы онлайн — Amediatekа",
  //   text: "Новинки кино и сериалов в HD-качестве в онлайн-кинотеатре Амедиатека. Смотреть лучшие сериалы и фильмы по подписке."
  // }

  // const sliderProprsDetectiveSeries: SliderProps = {
  //   sliderSettings: {
  //     typeSlider: 'multi',
  //     pagenation: false,
  //     autoSwipe: false,
  //     lastSwipe: true,
  //     quantityListItems: 5
  //   },
  //   slidesData: temporarySlidesDetectiveSeries,
  //   cardStyles: {
  //     cardSize: 'md',
  //     flex: {
  //       body: {
  //         justifyContent: 'space-between'
  //       }
  //     },
  //     clipPath: false,
  //     ageRestrictionBadge: {
  //       position: 'left',
  //       size: 'sm'
  //     },
  //     boxShadow: false,
  //     btnGroup: false,
  //     titleOutside: false,
  //     hover: {
  //       scale: true,
  //       playBack: {
  //         value: false,
  //         type: null
  //       },
  //       shadow: true
  //     }
  //   }
  // }

  // const sliderProrsPromoLine: SliderProps = {
  //   sliderSettings: {
  //     typeSlider: 'multi',
  //     pagenation: false,
  //     autoSwipe: false,
  //     lastSwipe: true,
  //     quantityListItems: 4
  //   },
  //   slidesData: temporaryThoseAboutToDie,
  //   cardStyles: {
  //     cardSize: 'lm',
  //     flex: {
  //       body: {
  //         justifyContent: 'space-between'
  //       }
  //     },
  //     clipPath: true,
  //     ageRestrictionBadge: {
  //       position: 'right',
  //       size: 'sm'
  //     },
  //     boxShadow: false,
  //     btnGroup: false,
  //     titleOutside: false,
  //     hover: {
  //       scale: false,
  //       playBack: {
  //         value: true,
  //         type: 'default'
  //       },
  //       shadow: false
  //     }
  //   }
  // }
  // const promoLineProps: PromoLineProps = {
  //   title: "Историческая драма «Обреченные на славу»",
  //   subtitle: "Погрузитесь в суровый мир гладиаторских боев и дворцовых интриг, где борьба за власть идет не на жизнь, а на смерть.",
  //   sliderProps: sliderProrsPromoLine
  // }

  // const sliderPropsPopularGenres: SliderProps = {
  //   sliderSettings: {
  //     typeSlider: 'multi',
  //     pagenation: false,
  //     autoSwipe: false,
  //     lastSwipe: true,
  //     quantityListItems: 5
  //   },
  //   slidesData: activeLinkPopularGenres === 0 ? temporaryPopularGenresSeries : temporaryPopularGenresMovies,
  //   cardStyles: {
  //     cardSize: 'sm',
  //     flex: {
  //       body: {
  //         justifyContent: 'space-between'
  //       }
  //     },
  //     clipPath: true,
  //     ageRestrictionBadge: {
  //       position: 'right',
  //       size: 'sm'
  //     },
  //     boxShadow: false,
  //     btnGroup: false,
  //     titleOutside: false,
  //     hover: {
  //       scale: false,
  //       playBack: {
  //         value: true,
  //         type: 'default'
  //       },
  //       shadow: false
  //     }
  //   }
  // }

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
      {/* <section className="home-item">
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
      <section className="home-item container">
        <CoverPromo />
      </section>
      <section className="home-item">
        <div className="home-item__title container">
          <h2>Блог Амедиатеки</h2>
          <Link to="/#" className="link link_primary">Показать еще</Link>
        </div>
        <Blog />
      </section> */}
    </div >
  )
}
