import { JSX, memo, useRef } from "react"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch, useCheckBreakpoint, useLazyLoad } from "../../../hooks"
import { fetchContent } from "../../../redux/contentSlice"
import { Slider } from "../../../components/Slider"
import { SkeletonTitle } from "../../../components/Skeletons/Title"
import { SliderProps } from "../../../types/interfaces/SliderProps"
import { CardData } from "../../../types/Card"
import { ContentTypeEnum } from "../../../types/interfaces/Content"

function NewReleaseComponent(): JSX.Element {
  const dispatch = useAppDispatch()
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const BREAKPOINT_SM = useCheckBreakpoint(576)
  const { content, loading } = useAppSelector(state => state.content.newRelease)
  const sectionElement = useRef<HTMLDivElement>(null)
  const baseClass = "home-item"
  const titleClass = `${baseClass}__title`
  const containerClass = "container"
  const linkClasses = "link link_primary"
  const TEXT: Record<string, string> = {
    title: "Новое в Амедиатеке",
    link: "Показать еще",
  }
  useLazyLoad(
    sectionElement,
    () => dispatch(fetchContent({ type: ContentTypeEnum.NewRelease })),
    0.7
  )

  const setQuantityListItems = (maxSize: boolean) => {
    if (BREAKPOINT_SM) return 1

    if (BREAKPOINT_MD) return 2

    if (BREAKPOINT_XL) return maxSize ? 4 : 3

    return maxSize ? 5 : 4
  }

  const setTitle = (loading: boolean): JSX.Element => {
    return !loading ? (
      <h2>{TEXT.title}</h2>
    ) : (
      <SkeletonTitle />
    )
  }
  const sliderPropsNewRelease: SliderProps = {
    sliderSettings: {
      typeSlider: 'multi',
      pagination: false,
      autoSwipe: false,
      lastSwipe: true,
      quantityListItems: setQuantityListItems(false),
      mediaPlayerHandler: false
    },
    sliderData: {
      data: content ? content.data as CardData[] : null,
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
      loadingData: loading,
      errorData: false,
    },
    userState: {
      user: null
    },
  }

  return (
    <section className={baseClass} ref={sectionElement}>
      <div className={`${titleClass} ${containerClass}`}>
        {setTitle(loading)}
        <Link to="/#" className={linkClasses}>{TEXT.link}</Link>
      </div>
      <Slider {...sliderPropsNewRelease} />
    </section>
  )
}

export const NewReleaseContainer = memo(NewReleaseComponent)
