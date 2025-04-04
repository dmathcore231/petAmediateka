import { useEffect, useState, useRef, CSSProperties, JSX } from "react"
import { useAppDispatch } from "../../hooks"
import { toggleShow, setTitle, setSrc } from "../../redux/MediaPlayerSlice"
import { Btn } from "../Btn"
import { Card } from "../Card"
import { Spinner } from "../Spinner"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { SlideState, MultiSlideState } from "../../types/Slider"
import { defaultCardData } from "../../helpers"
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon"
import { ArrowRightIcon } from "../../assets/icons/ArrowRightIcon"
import { CardData } from "../../types/Card"

export function Slider({ sliderSettings, sliderData: { data, cardStyles, settings, loadingData, errorData } }: SliderProps): JSX.Element {
  const dispatch = useAppDispatch()

  const animatedTime = 400
  const autoSwipeTime = 100
  const sliderListGap = 16

  const { typeSlider, pagenation, autoSwipe, lastSwipe, quantityListItems, mediaPlayerHandler } = sliderSettings

  const [stateSlider, setStateSlider] = useState<SlideState | null>(null)
  const [multiStateSlider, setMultiStateSlider] = useState<MultiSlideState | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [sliderItemWidth, setSliderItemWidth] = useState<number>(0)
  const [classBtn, setClassBtn] = useState(
    {
      prev: '',
      next: ''
    }
  )

  const sliderListRef = useRef<HTMLUListElement>(null)
  const sliderItemRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const isDataComplete = data && data.length === quantityListItems
    const isPrevSlideOutOfBounds = multiStateSlider && multiStateSlider.prevSlide < 0 && lastSwipe
    const isNextSlideOutOfBounds = multiStateSlider
      && data
      && multiStateSlider.nextSlide === data.length
      && lastSwipe
    const isMultiSliderType = typeSlider === 'multi' && !multiStateSlider

    if (isDataComplete) {
      setClassBtn({
        prev: 'slider__btn slider__btn_prev slider__btn_disabled',
        next: 'slider__btn slider__btn_next slider__btn_disabled'
      })
    } else if (isPrevSlideOutOfBounds) {
      const timer = setTimeout(() => {
        setClassBtn({
          prev: 'slider__btn slider__btn_prev slider__btn_disabled',
          next: 'slider__btn slider__btn_next'
        })
      }, animatedTime)

      return () => clearTimeout(timer)
    } else if (isNextSlideOutOfBounds) {
      const timer = setTimeout(() => {
        setClassBtn({
          prev: 'slider__btn slider__btn_prev',
          next: 'slider__btn slider__btn_next slider__btn_disabled'
        })
      }, animatedTime)

      return () => clearTimeout(timer)
    } else if (isMultiSliderType) {
      setClassBtn({
        prev: 'slider__btn slider__btn_prev slider__btn_disabled',
        next: 'slider__btn slider__btn_next'
      })
    }
    else {
      setClassBtn({
        prev: 'slider__btn slider__btn_prev',
        next: 'slider__btn slider__btn_next'
      })
    }
  }, [multiStateSlider])

  useEffect(() => {
    if (data) {
      switch (typeSlider) {
        case 'default': {
          setStateSlider({
            prevSlide: data.length - 1,
            activeSlide: 0,
            nextSlide: 1,
            translateX: 0,
            indexSlide: 0,
            isAnimated: false,
          })

          break
        }
        case 'multi': {
          setMultiStateSlider({
            prevSlide: -1,
            activeSlide: [0, quantityListItems],
            nextSlide: quantityListItems,
            translateX: 0,
            indexSlide: 0,
            isAnimated: false,
          })

          break
        }
      }
    }
  }, [data])

  useEffect(() => {
    if (sliderItemRef.current) {
      setSliderItemWidth(sliderItemRef.current.offsetWidth)
    }
  }, [sliderItemRef.current])

  useEffect(() => {
    const isAnimated = typeSlider === 'default'
      ? stateSlider?.isAnimated
      : multiStateSlider?.isAnimated

    if (isAnimated) {
      const timeoutId = setTimeout(() => {
        switch (typeSlider) {
          case 'default': {
            setStateSlider(prev => (prev ? { ...prev, isAnimated: false } : null))

            break
          }
          case 'multi': {
            setMultiStateSlider(prev => (prev ? { ...prev, isAnimated: false } : null))

            break
          }
        }
      }, animatedTime)

      return () => clearTimeout(timeoutId)
    }
  }, [stateSlider?.isAnimated, multiStateSlider?.isAnimated, animatedTime, typeSlider])


  useEffect(() => {
    if (data && sliderListRef.current && !loadingData) {
      const firstChild = sliderListRef.current.firstChild as HTMLLIElement
      const lastChild = sliderListRef.current.lastChild as HTMLLIElement
      if (firstChild
        && stateSlider
        && stateSlider.indexSlide > data.length - 1
        && stateSlider.activeSlide === 0) {
        firstChild.style.left = `${Math.abs(stateSlider.translateX)}%`
      } else if (lastChild
        && stateSlider
        && stateSlider.indexSlide === data.length
        && stateSlider.activeSlide === data.length - 1) {
        lastChild.style.left = `${data.length * -100}%`
      } else {
        firstChild.style.left = ``
        lastChild.style.left = ``
      }
    }
  }, [stateSlider?.indexSlide, stateSlider?.translateX, data])

  useEffect(() => {
    if (stateSlider
      && data
      && stateSlider.indexSlide > data.length - 1
      && stateSlider.activeSlide === 0) {
      const timerId = setTimeout(() => {
        setStateSlider({
          prevSlide: data.length - 1,
          activeSlide: 0,
          nextSlide: 1,
          translateX: 0,
          indexSlide: 0,
          isAnimated: false,
        })
      }, animatedTime)

      return () => clearTimeout(timerId)
    } else if (stateSlider
      && data
      && stateSlider.indexSlide === data.length
      && stateSlider.activeSlide === data.length - 1) {
      const timerId = setTimeout(() => {
        setStateSlider({
          prevSlide: data.length - 2,
          activeSlide: data.length - 1,
          nextSlide: 0,
          translateX: (data.length - 1) * -100,
          indexSlide: data.length - 1,
          isAnimated: false,
        })
      }, animatedTime)

      return () => clearTimeout(timerId)
    }
  }, [stateSlider?.indexSlide, data])

  useEffect(() => {
    if (!autoSwipe || loadingData) return

    const interval: number = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          handleClickBtnNext()
          return 0
        }
        return prevProgress + 1
      })
    }, autoSwipeTime)

    return () => clearInterval(interval)
  }, [autoSwipe, data])

  const setClassSlide = (index: number) => {
    if (typeSlider === 'default' && stateSlider) {
      const { indexSlide, prevSlide, nextSlide } = stateSlider
      let classValue = 'slider__item'

      switch (true) {
        case (index === indexSlide): {
          return `slider__item_active ${classValue}`
        }
        case (index === prevSlide): {
          return `slider__item_prev ${classValue}`
        }
        case (index === nextSlide): {
          return `slider__item_next ${classValue}`
        }
        default: {
          return `${classValue}`
        }
      }
    } else if (typeSlider === 'multi' && multiStateSlider) {
      const { prevSlide, nextSlide } = multiStateSlider
      let classValue = 'slider__item'

      switch (true) {
        case (index === prevSlide && cardStyles.clipPath): {
          return `slider__item_prev ${classValue} ${classValue}_clip-path-active`
        }
        case (index === prevSlide): {
          return `slider__item_prev ${classValue}`
        }
        case (index === nextSlide && cardStyles.clipPath): {
          return `slider__item_next ${classValue} ${classValue}_clip-path-active`
        }
        case (index === nextSlide): {
          return `slider__item_next ${classValue}`
        }
        default: {
          return `${classValue}`
        }
      }
    } else {
      return 'slider__item'
    }
  }

  const handleClickBtnNext = () => {
    if (typeSlider && data && typeSlider === 'default') {
      setStateSlider(prev => (prev
        ? {
          prevSlide: prev.activeSlide,
          activeSlide: prev.nextSlide,
          nextSlide: (prev.nextSlide + 1) % data.length,
          translateX: prev.translateX - 100,
          indexSlide: prev.activeSlide + 1,
          isAnimated: true,
        }
        : null))
      setProgress(0)
    } else {
      setMultiStateSlider(prev => (prev
        ? {
          prevSlide: prev.prevSlide + 1,
          activeSlide: [prev.activeSlide[0] + 1, prev.activeSlide[1] + 1],
          nextSlide: prev.nextSlide + 1,
          translateX: prev.translateX - (sliderItemWidth + sliderListGap),
          indexSlide: 0,
          isAnimated: true,
        }
        : null))
    }
  }

  const handleClickBtnPrev = () => {
    if (typeSlider === 'default' && data) {
      setStateSlider(prev => (prev
        ? {
          prevSlide: (prev.prevSlide - 1 + data.length) % data.length,
          activeSlide: prev.prevSlide,
          nextSlide: prev.activeSlide,
          translateX: prev.translateX + 100,
          indexSlide: ((prev.activeSlide - 1 + (data.length + 1)) % (data.length + 1)),
          isAnimated: true,
        }
        : null))
      setProgress(0)
    } else {
      setMultiStateSlider(prev => (prev ? {
        prevSlide: prev.prevSlide - 1,
        activeSlide: [prev.activeSlide[0] - 1, prev.activeSlide[1] - 1],
        nextSlide: prev.nextSlide - 1,
        translateX: prev.translateX + (sliderItemWidth + sliderListGap),
        indexSlide: 0,
        isAnimated: true,
      }
        : null
      ))
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

  return (
    <div className={typeSlider === 'default' ? 'slider container' : 'slider slider_multi container'}
      style={
        {
          '--slider-item-per-view': `${quantityListItems}`,
        } as CSSProperties
      }
    >
      <div className={classBtn.prev}>
        <Btn
          type="button"
          className="btn_transparent"
          onClick={handleClickBtnPrev}
          disabled={toggleDisabledBtn()}
        >
          <ArrowLeftIcon width={48} height={48} />
        </Btn>
      </div>
      <div className={classBtn.next}>
        <Btn
          type="button"
          className="btn_transparent"
          onClick={handleClickBtnNext}
          disabled={toggleDisabledBtn()}
        >
          <ArrowRightIcon width={48} height={48} />
        </Btn>
      </div>
      <div className="slider__content">
        <ul className={"slider__list" + (typeSlider === 'multi' && loadingData
          ? " slider__list_loading"
          : "")}
          ref={sliderListRef}
          style={{
            transform: typeSlider === 'default'
              ? `translateX(${stateSlider?.translateX}%)`
              : `translateX(${multiStateSlider?.translateX}px)`,
            transition: typeSlider === 'default'
              ? stateSlider?.isAnimated ? 'var(--transition)' : 'none'
              : multiStateSlider?.isAnimated ? 'var(--transition)' : 'none',
          }}
        >
          {!loadingData && data && !errorData && (
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
          {loadingData && !errorData && (
            typeSlider === 'default'
              ? (
                <Card styles={cardStyles} data={defaultCardData} settings={settings} loadingCardData={loadingData} error={errorData} />
              )
              : (
                <Spinner width={50} height={50} />
              )
          )}
        </ul>
        {pagenation && data && (
          <ul className="slider-pagination">
            {data.map((_, index) => (
              <li
                key={index}
                className={`${stateSlider?.activeSlide === index ? 'slider-pagination__item slider-pagination__item_active' : 'slider-pagination__item'}`}
              >
                {stateSlider?.activeSlide === index && (
                  <div className="slider-pagination__active-line"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
