import { useEffect, useState, useRef, CSSProperties, JSX } from "react"
import { useAppDispatch } from "../../hooks"
import { toggleShow, setTitle, setSrc } from "../../redux/MediaPlayerSlice"
import { Btn } from "../Btn"
import { Card } from "../Card"
import { Spinner } from "../Spinner"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { SlideState, MultiSlideState } from "../../types/Slider"
import { CardData } from "../../types/Card"
import { SliderClassBtnState } from "../../types/SliderClassBtnState"
import { defaultCardData } from "../../helpers"
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon"
import { ArrowRightIcon } from "../../assets/icons/ArrowRightIcon"

export function Slider({ sliderSettings, sliderData: { data, cardStyles, settings, loadingData, errorData } }: SliderProps): JSX.Element {
  const dispatch = useAppDispatch()
  const ANIMATED_TIME: number = 400
  const autoSwipeTime: number = 100
  const sliderListGap: number = 16
  const defSliderClassBtnState: SliderClassBtnState = {
    prev: '',
    next: ''
  }

  const { typeSlider, pagenation, autoSwipe, lastSwipe, quantityListItems, mediaPlayerHandler } = sliderSettings

  const [stateSlider, setStateSlider] = useState<SlideState | null>(null)
  const [multiStateSlider, setMultiStateSlider] = useState<MultiSlideState | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [sliderItemWidth, setSliderItemWidth] = useState<number>(0)
  const [classBtnState, setClassBtnState] = useState<SliderClassBtnState>(defSliderClassBtnState)

  const sliderListRef = useRef<HTMLUListElement>(null)
  const sliderItemRef = useRef<HTMLLIElement>(null)

  const sliderStyle: CSSProperties = {
    ['--slider-item-per-view' as string]: `${quantityListItems}`
  }

  useEffect((): void | (() => void) => {
    const isDataComplete: boolean = data?.length === quantityListItems
    const isPrevSlideOutOfBounds: boolean | null = multiStateSlider
      && multiStateSlider.prevSlide < 0
      && lastSwipe
    const isNextSlideOutOfBounds: boolean | null = multiStateSlider
      && data
      && multiStateSlider.nextSlide === data.length
      && lastSwipe
    const isMultiSliderType: boolean = typeSlider === 'multi' && !multiStateSlider

    const classesBtn: Record<string, string> = {
      base: "slider__btn",
      prev: "slider__btn_prev",
      next: "slider__btn_next",
      disabled: "slider__btn_disabled"
    }

    type ToggleDisabledClassBtn = {
      prevDisabled: boolean
      nextDisabled: boolean
      isAnimated?: boolean
    }

    const toggleDisabledClassBtn = ({ prevDisabled, nextDisabled, isAnimated }: ToggleDisabledClassBtn): void | (() => void) => {
      if (!isAnimated) {
        setClassBtnState({
          prev: prevDisabled
            ? `${classesBtn.base} ${classesBtn.prev} ${classesBtn.disabled}`
            : `${classesBtn.base} ${classesBtn.prev}`,
          next: nextDisabled
            ? `${classesBtn.base} ${classesBtn.next} ${classesBtn.disabled}`
            : `${classesBtn.base} ${classesBtn.next}`
        })
      }

      const timerId = setTimeout((): void => {
        setClassBtnState({
          prev: prevDisabled
            ? `${classesBtn.base} ${classesBtn.prev} ${classesBtn.disabled}`
            : `${classesBtn.base} ${classesBtn.prev}`,
          next: nextDisabled
            ? `${classesBtn.base} ${classesBtn.next} ${classesBtn.disabled}`
            : `${classesBtn.base} ${classesBtn.next}`
        })
      }, ANIMATED_TIME)

      return () => clearTimeout(timerId)
    }

    if (isDataComplete) return toggleDisabledClassBtn({
      prevDisabled: true,
      nextDisabled: true
    }) as void

    if (isPrevSlideOutOfBounds) return toggleDisabledClassBtn({
      prevDisabled: true,
      nextDisabled: false,
      isAnimated: true
    }) as () => void

    if (isNextSlideOutOfBounds) return toggleDisabledClassBtn({
      prevDisabled: false,
      nextDisabled: true,
      isAnimated: true
    }) as () => void

    if (isMultiSliderType) return toggleDisabledClassBtn({
      prevDisabled: true,
      nextDisabled: true
    }) as void

    return toggleDisabledClassBtn({
      prevDisabled: false,
      nextDisabled: false
    })

  }, [data, typeSlider, multiStateSlider, lastSwipe, quantityListItems])

  useEffect(() => {
    if (!data) return

    const baseState = {
      translateX: 0,
      indexSlide: 0,
      isAnimated: false,
    }

    if (typeSlider === 'default') {
      setStateSlider({
        ...baseState,
        prevSlide: data.length - 1,
        activeSlide: 0,
        nextSlide: data.length > 1 ? 1 : 0,
      })
    } else if (typeSlider === 'multi') {
      setMultiStateSlider({
        ...baseState,
        prevSlide: -1,
        activeSlide: [0, quantityListItems],
        nextSlide: quantityListItems,
      })
    }
  }, [data, typeSlider, quantityListItems])

  useEffect(() => {
    if (sliderItemRef.current) {
      setSliderItemWidth(sliderItemRef.current.offsetWidth)
    }
  }, [sliderItemRef.current])

  useEffect(() => {
    const isAnimated = typeSlider === 'default'
      ? stateSlider?.isAnimated
      : multiStateSlider?.isAnimated

    if (!isAnimated) return

    const timeoutId = setTimeout(() => {
      if (typeSlider === 'default') {
        return setStateSlider(prev => (prev ? { ...prev, isAnimated: false } : null))
      } else {
        return setMultiStateSlider(prev => (prev ? { ...prev, isAnimated: false } : null))
      }
    }, ANIMATED_TIME)

    return () => clearTimeout(timeoutId)
  }, [stateSlider?.isAnimated, multiStateSlider?.isAnimated, ANIMATED_TIME, typeSlider])

  useEffect(() => {
    if (!data || !sliderListRef.current || loadingData || !stateSlider) return

    const firstChild = sliderListRef.current.firstChild as HTMLElement
    const lastChild = sliderListRef.current.lastChild as HTMLElement

    if (!firstChild || !lastChild) return
    const { indexSlide, activeSlide, translateX } = stateSlider

    const isFirstSlideEdgeCase: boolean = indexSlide > data.length - 1
      && activeSlide === 0
    const isLastSlideEdgeCase: boolean = indexSlide === data.length
      && activeSlide === data.length - 1

    firstChild.style.left = ""
    lastChild.style.left = ""

    if (isFirstSlideEdgeCase) firstChild.style.left = `${Math.abs(translateX)}%`
    if (isLastSlideEdgeCase) lastChild.style.left = `${data.length * -100}%`

  }, [stateSlider?.indexSlide, stateSlider?.translateX, data])

  useEffect(() => {
    if (!data || !stateSlider) return

    const { indexSlide, activeSlide } = stateSlider
    const shouldResetToFirstSlide: boolean = indexSlide > data.length - 1
      && activeSlide === 0
    const shouldResetToLastSlide: boolean = indexSlide === data.length
      && activeSlide === data.length - 1

    if (!shouldResetToFirstSlide && !shouldResetToLastSlide) return

    const timerId = setTimeout(() => {
      if (shouldResetToFirstSlide) {
        setStateSlider({
          prevSlide: data.length - 1,
          activeSlide: 0,
          nextSlide: 1,
          translateX: 0,
          indexSlide: 0,
          isAnimated: false,
        })
      } else if (shouldResetToLastSlide) {
        setStateSlider({
          prevSlide: data.length - 2,
          activeSlide: data.length - 1,
          nextSlide: 0,
          translateX: (data.length - 1) * -100,
          indexSlide: data.length - 1,
          isAnimated: false,
        })
      }
    }, ANIMATED_TIME)

    return () => clearTimeout(timerId)
  }, [stateSlider?.indexSlide, data])

  useEffect(() => {
    if (!autoSwipe || loadingData) return

    const interval: number = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          handleClickBtn('next')
          return 0
        }
        return prevProgress + 1
      })
    }, autoSwipeTime)

    return () => clearInterval(interval)
  }, [autoSwipe, data])

  const setClassSlide = (index: number): string => {
    const baseClass = "slider__item"
    const clipPathClass = cardStyles.clipPath.value
      ? ` ${baseClass}_clip-path-active`
      : ''
    const classes: Record<string, string> = {
      active: `${baseClass}_active`,
      prev: `${baseClass}_prev`,
      next: `${baseClass}_next`,
    }

    if (typeSlider === 'default' && stateSlider) {
      const { indexSlide, prevSlide, nextSlide } = stateSlider

      if (index === indexSlide) return `${baseClass} ${classes.active}`
      if (index === prevSlide) return `${baseClass} ${classes.prev}`
      if (index === nextSlide) return `${baseClass} ${classes.next}`

      return `${baseClass}`
    }

    if (typeSlider === 'multi' && multiStateSlider) {
      const { prevSlide, nextSlide } = multiStateSlider

      if (index === prevSlide) return `${baseClass} ${classes.prev}${clipPathClass}`
      if (index === nextSlide) return `${baseClass} ${classes.next}${clipPathClass}`

      return `${baseClass}`
    }

    return baseClass
  }

  const handleClickBtn = (typeBtn: 'prev' | 'next'): void => {
    if (!typeSlider || !data) return

    const sliderConfig = {
      default: {
        next: (prevState: SlideState) => ({
          prevSlide: prevState.activeSlide,
          activeSlide: prevState.nextSlide,
          nextSlide: (prevState.nextSlide + 1) % data.length,
          translateX: prevState.translateX - 100,
          indexSlide: prevState.activeSlide + 1,
          isAnimated: true,
        }),
        prev: (prevState: SlideState) => ({
          prevSlide: (prevState.prevSlide - 1 + data.length) % data.length,
          activeSlide: prevState.prevSlide,
          nextSlide: prevState.activeSlide,
          translateX: prevState.translateX + 100,
          indexSlide: ((prevState.activeSlide - 1 + (data.length + 1)) % (data.length + 1)),
          isAnimated: true,
        }),
      },
      multi: {
        next: (prevState: MultiSlideState) => ({
          prevSlide: prevState.prevSlide + 1,
          activeSlide: [prevState.activeSlide[0] + 1, prevState.activeSlide[1] + 1],
          nextSlide: prevState.nextSlide + 1,
          translateX: prevState.translateX - (sliderItemWidth + sliderListGap),
          indexSlide: 0,
          isAnimated: true,
        }),
        prev: (prevState: MultiSlideState) => ({
          prevSlide: prevState.prevSlide - 1,
          activeSlide: [prevState.activeSlide[0] - 1, prevState.activeSlide[1] - 1],
          nextSlide: prevState.nextSlide - 1,
          translateX: prevState.translateX + (sliderItemWidth + sliderListGap),
          indexSlide: 0,
          isAnimated: true,
        })
      }
    }

    if (typeSlider === 'default') {
      setStateSlider(prev => !prev ? null : sliderConfig.default[typeBtn](prev))
      setProgress(0)
    } else {
      setMultiStateSlider(prev => !prev ? null : sliderConfig.multi[typeBtn](prev))
    }
  }

  const toggleDisabledBtn = (): boolean => {
    const isAnimated = typeSlider === 'default'
      ? stateSlider?.isAnimated
      : multiStateSlider?.isAnimated

    if (isAnimated || loadingData) {
      return true
    } else {
      return false
    }
  }

  const handleClickSliderItem = (data: CardData): void => {
    dispatch(toggleShow(true))
    dispatch(setTitle(data.title.value))
    if (data.src) {
      dispatch(setSrc(data.src))
    }
  }

  const renderTitleImg = (indexItem: number, slideItemData: CardData): JSX.Element => {
    if (indexItem === settings.title.titleLogoImgIndex) {
      const updateSettings = {
        ...settings,
        title: {
          ...settings.title,
          titleLogoImg: true
        }
      }

      return (
        <Card styles={cardStyles} data={slideItemData} settings={updateSettings} loadingCardData={loadingData} error={errorData} />
      )
    } else {
      return (
        <Card styles={cardStyles} data={slideItemData} settings={settings} loadingCardData={loadingData} error={errorData} />
      )
    }
  }

  const toggleBaseClass = (typeSlider: "default" | "multi"): string => {
    return typeSlider === 'default'
      ? 'slider container'
      : 'slider slider_multi container'
  }

  const renderList = (): JSX.Element | null => {
    if (errorData) return null

    const baseClass = "slider__list"
    const multiLoadingClass = "slider__list_loading"

    const listStyles: CSSProperties = {
      transform: typeSlider === 'default'
        ? `translateX(${stateSlider?.translateX}%)`
        : `translateX(${multiStateSlider?.translateX}px)`,
      transition: typeSlider === 'default'
        ? stateSlider?.isAnimated ? 'var(--transition)' : 'none'
        : multiStateSlider?.isAnimated ? 'var(--transition)' : 'none',
    }

    const toggleListClass = () => {
      return typeSlider === 'multi' && loadingData
        ? `${baseClass} ${multiLoadingClass}`
        : `${baseClass}`
    }

    const loadingContent = (): JSX.Element => {
      return (
        (
          typeSlider === 'default'
            ? (<Card styles={cardStyles}
              data={defaultCardData} settings={settings}
              loadingCardData={loadingData}
              error={errorData} />)
            : (<Spinner width={50} height={50} />)
        )
      )
    }

    if (loadingData && !data) return loadingContent()

    return (
      <ul className={toggleListClass()}
        ref={sliderListRef}
        style={listStyles}
      >
        {data && (
          data.map((slide, index) => (
            <li
              key={index}
              className={setClassSlide(index)}
              ref={sliderItemRef}
              onClick={() => mediaPlayerHandler ? handleClickSliderItem(slide) : null}
            >
              {renderTitleImg(index, slide)}
            </li>
          ))
        )}
      </ul>
    )
  }

  const renderPagenation = (): JSX.Element | null => {
    if (!pagenation || !data || !stateSlider) return null
    const { activeSlide } = stateSlider

    const baseClass = "slider-pagination"
    const itemClass = `${baseClass}__item`
    const activeItemClass = `${itemClass}_active`
    const activeLineClass = `${baseClass}__active-line`

    const lineStyle: CSSProperties = {
      width: `${progress}%`,
    }

    const setClassItem = (index: number): string => {
      return activeSlide === index
        ? `${itemClass} ${activeItemClass}`
        : `${itemClass}`
    }

    return (
      <ul className={baseClass}>
        {data.map((_, index) => (
          <li
            key={index}
            className={setClassItem(index)}
          >
            {activeSlide === index && (
              <div className={activeLineClass}
                style={lineStyle}
              />
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className={toggleBaseClass(typeSlider)}
      style={sliderStyle}
    >
      <div className={classBtnState.prev}>
        <Btn
          type="button"
          className="btn_transparent"
          onClick={() => handleClickBtn('prev')}
          disabled={toggleDisabledBtn()}
        >
          <ArrowLeftIcon width={48} height={48} />
        </Btn>
      </div>
      <div className={classBtnState.next}>
        <Btn
          type="button"
          className="btn_transparent"
          onClick={() => handleClickBtn('next')}
          disabled={toggleDisabledBtn()}
        >
          <ArrowRightIcon width={48} height={48} />
        </Btn>
      </div>
      <div className="slider__content">
        {renderList()}
        {renderPagenation()}
      </div>
    </div>
  )
}
