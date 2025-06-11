import { JSX, memo, useEffect } from "react"
import { useAppDispatch, useAppSelector, useCheckBreakpoint } from "../../../hooks"
import { fetchContent } from "../../../redux/contentSlice"
import { PromoLine } from "../../../components/PromoLine"
import { SliderProps } from "../../../types/interfaces/SliderProps"
import { PromoLineData } from "../../../types/interfaces/PromoLineData"
import { CardData } from "../../../types/Card"
import { PromoLineProps } from "../../../types/interfaces/PromoLineProps"
import { ContentTypeEnum } from "../../../types/interfaces/Content"
import { defaultPromoLineData } from "../../../helpers"

function PromoLineComponent(): JSX.Element {
  const dispatch = useAppDispatch()
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const BREAKPOINT_SM = useCheckBreakpoint(576)
  const { content, loading } = useAppSelector(state => state.content.promoLine)

  useEffect(() => {
    dispatch(fetchContent({ type: ContentTypeEnum.PromoLine }))
  }, [dispatch])

  const setQuantityListItems = (maxSize: boolean) => {
    if (BREAKPOINT_SM) return 1

    if (BREAKPOINT_MD) return 2

    if (BREAKPOINT_XL) return maxSize ? 4 : 3

    return maxSize ? 5 : 4
  }
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

  const sliderPropsPromoLine: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagination: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: setQuantityListItems(false),
      mediaPlayerHandler: false
    },
    sliderData: {
      data: content ? formCardDataFromPromoLine(content.data as PromoLineData) : null,
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
      loadingData: loading,
      errorData: false
    },
    userState: {
      user: null
    }
  }

  const promoLineProps: PromoLineProps = {
    promoLineData: content
      ? content.data as PromoLineData
      : defaultPromoLineData,
    sliderProps: sliderPropsPromoLine,
    loadingData: true
  }

  return (
    <section className="home-item">
      <PromoLine {...promoLineProps} />
    </section>
  )
}

export const PromoLineContainer = memo(PromoLineComponent)
