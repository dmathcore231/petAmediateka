import { useEffect, JSX } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector, useCheckBreakpoint } from "../../hooks"
import { fetchContent } from "../../redux/contentSlice"
import { Banner } from "../../components/Banner"
import { Slider } from "../../components/Slider"
import { SeoBlock } from "../../components/SeoBlock"
import { PromoLine } from "../../components/PromoLine"
import { CoverPromo } from "../../components/CoverPromo"
import { PopularGenres } from "../../components/PopularGenres"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { BannerProps } from "../../types/interfaces/BannerProps"
import { SeoBlockProps } from "../../types/interfaces/SeoBlockProps"
import { PromoLineProps } from "../../types/interfaces/PromoLineProps"
import { ContentTypeEnum } from "../../types/interfaces/Content"
import { defaultBannerData, defaultPromoLineData } from "../../helpers"
import { CardData } from "../../types/Card"
import { PromoLineData } from "../../types/interfaces/PromoLineData"
import { CoverPromoProps } from "../../types/interfaces/CoverPromoProps"

export function Home(): JSX.Element {
  const dispatch = useAppDispatch()
  const { mainSlider, banner, watchingNow, newRelease, promoLine, coverPromo } = useAppSelector((state) => state.content)
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const BREAKPOINT_SM = useCheckBreakpoint(576)
  const setQuantityListItems = (maxSize: boolean) => {
    if (BREAKPOINT_SM) return 1

    if (BREAKPOINT_MD) return 2

    if (BREAKPOINT_XL) return maxSize ? 4 : 3

    return maxSize ? 5 : 4
  }

  useEffect(() => {
    dispatch(fetchContent({ type: ContentTypeEnum.MainSlider }))
    dispatch(fetchContent({ type: ContentTypeEnum.Banner }))
    dispatch(fetchContent({ type: ContentTypeEnum.WatchingNow }))
    dispatch(fetchContent({ type: ContentTypeEnum.NewRelease }))
    dispatch(fetchContent({ type: ContentTypeEnum.PromoLine }))
    dispatch(fetchContent({ type: ContentTypeEnum.CoverPromo }))
  }, [dispatch])


  const formCardDataFromPromoLine = (data: PromoLineData): Array<CardData> => {
    const result = data.promoLineItem.map(item => ({
      ...data.data,
      bg: {
        ...(data.data as CardData).bg,
        imgResizeUrl: item
      }
    }))

    return result
  }

  const sliderProps: SliderProps = {
    sliderSettings: {
      typeSlider: "default",
      pagenation: !mainSlider.loading,
      autoSwipe: false,
      lastSwipe: false,
      quantityListItems: 1,
      mediaPlayerHandler: false
    },
    sliderData: {
      data: mainSlider.content ? mainSlider.content.data as CardData[] : null,
      cardStyles: {
        cardSize: 'lg',
        flex: {
          body: {
            justifyContent: 'space-between'
          }
        },
        clipPath: {
          value: false,
          type: null
        },
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
          titleLogoImg: true,
          titleLogoImgIndex: null
        },
        badgeVisible: true,
        link: {
          linkType: 'title',
          linkDisabled: false
        },
        descriptionVisible: true,
        tags: null,
        cardSeries: false
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
      quantityListItems: setQuantityListItems(true),
      mediaPlayerHandler: false
    },
    sliderData: {
      data: watchingNow.content ? watchingNow.content.data as CardData[] : null,
      cardStyles: {
        cardSize: 'md',
        flex: {
          body: {
            justifyContent: 'space-between'
          }
        },
        clipPath: {
          value: false,
          type: null
        },
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
          titleLogoImg: false,
          titleLogoImgIndex: null
        },
        badgeVisible: false,
        link: {
          linkType: 'allCard',
          linkDisabled: false
        },
        descriptionVisible: false,
        tags: null,
        cardSeries: false
      },
      loadingData: mainSlider.loading,
      errorData: false
    },
  }

  const bannerProps: BannerProps = banner.content
    ? banner.content.data as BannerProps
    : defaultBannerData

  const sliderPropsNewRelease: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagenation: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: setQuantityListItems(false),
      mediaPlayerHandler: false
    },
    sliderData: {
      data: newRelease.content ? newRelease.content.data as CardData[] : null,
      cardStyles: {
        cardSize: 'lm',
        flex: {
          body: {
            justifyContent: 'space-between'
          }
        },
        clipPath: {
          value: true,
          type: 'main'
        },
        ageRestrictionBadge: {
          position: 'right',
          size: 'sm'
        },
        boxShadow: false,
        btnGroup: false,
        hover: {
          scale: false,
          playBack: {
            value: true,
            type: 'default'
          },
          shadow: false
        }
      },
      settings: {
        title: {
          titleOutside: false,
          titleLogoImg: true,
          titleLogoImgIndex: null
        },
        badgeVisible: false,
        link: {
          linkType: 'allCard',
          linkDisabled: false
        },
        descriptionVisible: false,
        tags: null,
        cardSeries: false
      },
      loadingData: newRelease.loading,
      errorData: false
    },
  }

  const seoBlockProps: SeoBlockProps = {
    title: "Смотреть лучшие фильмы и сериалы онлайн — Amediatekа",
    text: "Новинки кино и сериалов в HD-качестве в онлайн-кинотеатре Амедиатека. Смотреть лучшие сериалы и фильмы по подписке."
  }

  const sliderProprsDetectiveSeries: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagenation: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: setQuantityListItems(true),
      mediaPlayerHandler: false
    },
    sliderData: {
      data: newRelease.content ? newRelease.content.data as CardData[] : null,
      cardStyles: {
        cardSize: 'md',
        flex: {
          body: {
            justifyContent: 'space-between'
          }
        },
        clipPath: {
          value: false,
          type: null
        },
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
          titleLogoImg: false,
          titleLogoImgIndex: null
        },
        badgeVisible: false,
        link: {
          linkType: 'allCard',
          linkDisabled: false
        },
        descriptionVisible: false,
        tags: null,
        cardSeries: false
      },
      loadingData: newRelease.loading,
      errorData: false
    },
  }

  const sliderProrsPromoLine: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagenation: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: setQuantityListItems(false),
      mediaPlayerHandler: false
    },
    sliderData: {
      data: promoLine.content ? formCardDataFromPromoLine(promoLine.content.data as PromoLineData) : null,
      cardStyles: {
        cardSize: 'lm',
        flex: {
          body: {
            justifyContent: 'space-between'
          }
        },
        clipPath: {
          value: true,
          type: 'main'
        },
        ageRestrictionBadge: {
          position: 'right',
          size: 'sm'
        },
        boxShadow: false,
        btnGroup: false,
        hover: {
          scale: false,
          playBack: {
            value: true,
            type: 'default'
          },
          shadow: false
        }
      },
      settings: {
        title: {
          titleOutside: false,
          titleLogoImg: false,
          titleLogoImgIndex: 0
        },
        badgeVisible: false,
        link: {
          linkType: 'allCard',
          linkDisabled: false
        },
        descriptionVisible: false,
        tags: null,
        cardSeries: false
      },
      loadingData: promoLine.loading,
      errorData: false
    },
  }

  const promoLineProps: PromoLineProps = {
    promoLineData: promoLine.content
      ? promoLine.content.data as PromoLineData
      : defaultPromoLineData,
    sliderProps: sliderProrsPromoLine
  }

  const coverPromoProps: CoverPromoProps = {
    coverPromoData: coverPromo.content
      ? coverPromo.content.data as CardData[]
      : null
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
        <PopularGenres />
      </section>
      <section className="home-item container">
        <CoverPromo {...coverPromoProps} />
      </section>
    </div >
  )
}
