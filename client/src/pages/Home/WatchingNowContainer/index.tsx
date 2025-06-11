import { JSX, memo, useEffect } from "react"
import { useCheckBreakpoint, useAppSelector, useAppDispatch } from "../../../hooks"
import { fetchContent } from "../../../redux/contentSlice"
import { Slider } from "../../../components/Slider"
import { SliderProps } from "../../../types/interfaces/SliderProps"
import { CardData } from "../../../types/Card"
import { ContentTypeEnum } from "../../../types/interfaces/Content"

function WatchingNowComponent(): JSX.Element {
  const dispatch = useAppDispatch()
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const BREAKPOINT_SM = useCheckBreakpoint(576)
  const { content, loading } = useAppSelector(state => state.content.watchingNow)

  const baseClass = "home-item"
  const titleClass = `${baseClass}__title`
  const containerClass = "container"
  const TEXT: Record<string, string> = {
    title: "Смотрите сейчас",
  }

  useEffect(() => {
    dispatch(fetchContent({ type: ContentTypeEnum.WatchingNow }))
  }, [dispatch])

  const setQuantityListItems = (maxSize: boolean) => {
    if (BREAKPOINT_SM) return 1

    if (BREAKPOINT_MD) return 2

    if (BREAKPOINT_XL) return maxSize ? 4 : 3

    return maxSize ? 5 : 4
  }

  const sliderPropsWatchingNow: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagination: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: setQuantityListItems(true),
      mediaPlayerHandler: false
    },
    sliderData: {
      data: content ? content.data as CardData[] : null,
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
      loadingData: loading,
      errorData: false
    },
    userState: {
      user: null
    },
  }

  return (
    <section className={baseClass}>
      <div className={`${titleClass} ${containerClass}`}>
        <h2>{TEXT.title}</h2>
      </div>
      <Slider {...sliderPropsWatchingNow} />
    </section>
  )
}

export const WatchingNowContainer = memo(WatchingNowComponent)
