import { useEffect, useState, useRef, CSSProperties } from "react"
import { Link } from "react-router-dom"
import { Btn } from "../Btn"
import { Card } from "../Card"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { SlideState, MultiSlideState } from "../../types/Slider"
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon"
import { ArrowRightIcon } from "../../assets/icons/ArrowRightIcon"

export function Slider({ sliderSettings, slidesData, cardStyles }: SliderProps): JSX.Element {
  const animatedTime = 400
  const autoSwipeTime = 100
  const sliderListGap = 16

  const { typeSlider, pagenation, autoSwipe, lastSwipe, quantityListItems } = sliderSettings

  const [stateSlider, setStateSlider] = useState<SlideState>({
    prevSlide: slidesData.length - 1,
    activeSlide: 0,
    nextSlide: 1,
    translateX: 0,
    indexSlide: 0,
    isAnimated: false,
  })
  const [multiStateSlider, setMultiStateSlider] = useState<MultiSlideState>({
    prevSlide: -1,
    activeSlide: [0, quantityListItems],
    nextSlide: quantityListItems,
    translateX: 0,
    indexSlide: 0,
    isAnimated: false,
  })
  const [progress, setProgress] = useState<number>(0)
  const [sliderItemWidth, setSliderItemWidth] = useState<number>(0)

  const sliderListRef = useRef<HTMLUListElement>(null)
  const sliderItemRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (sliderItemRef.current) {
      setSliderItemWidth(sliderItemRef.current.offsetWidth)
    }
  }, [sliderItemRef.current])

  useEffect(() => {
    const { isAnimated } = typeSlider === 'default' ? stateSlider : multiStateSlider
    if (isAnimated) {
      const isAnimated = setTimeout(() => {
        if (typeSlider === 'default') {
          setStateSlider(prev => ({
            ...prev,
            isAnimated: false,
          }))
        } else {
          setMultiStateSlider(prev => ({
            ...prev,
            isAnimated: false,
          }))
        }
      }, animatedTime)

      return () => {
        clearTimeout(isAnimated)
      }
    }
  }, [stateSlider.isAnimated, multiStateSlider.isAnimated, animatedTime])

  useEffect(() => {
    if (sliderListRef.current) {
      const firstChild = sliderListRef.current.firstChild as HTMLLIElement
      const lastChild = sliderListRef.current.lastChild as HTMLLIElement
      if (firstChild
        && stateSlider.indexSlide > slidesData.length - 1
        && stateSlider.activeSlide === 0) {
        firstChild.style.left = `${Math.abs(stateSlider.translateX)}%`
      } else if (lastChild
        && stateSlider.indexSlide === slidesData.length
        && stateSlider.activeSlide === slidesData.length - 1) {
        lastChild.style.left = `${slidesData.length * -100}%`
      } else {
        firstChild.style.left = ``
        lastChild.style.left = ``
      }
    }
  }, [stateSlider.indexSlide, stateSlider.translateX])

  useEffect(() => {
    if (stateSlider.indexSlide > slidesData.length - 1 && stateSlider.activeSlide === 0) {
      const timerId = setTimeout(() => {
        setStateSlider({
          prevSlide: slidesData.length - 1,
          activeSlide: 0,
          nextSlide: 1,
          translateX: 0,
          indexSlide: 0,
          isAnimated: false,
        })
      }, animatedTime)

      return () => {
        clearTimeout(timerId)
      }
    } else if (stateSlider.indexSlide === slidesData.length
      && stateSlider.activeSlide === slidesData.length - 1) {
      const timerId = setTimeout(() => {
        setStateSlider({
          prevSlide: slidesData.length - 2,
          activeSlide: slidesData.length - 1,
          nextSlide: 0,
          translateX: (slidesData.length - 1) * -100,
          indexSlide: slidesData.length - 1,
          isAnimated: false,
        })
      }, animatedTime)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [stateSlider.indexSlide, slidesData])

  useEffect(() => {
    setMultiStateSlider({
      prevSlide: -1,
      activeSlide: [0, quantityListItems],
      nextSlide: quantityListItems,
      translateX: 0,
      indexSlide: 0,
      isAnimated: false,
    })
  }, [slidesData])

  useEffect(() => {
    let interval: number

    if (autoSwipe) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            handleClickBtnNext()
            return 0
          }
          return prevProgress + 1
        })
      }, autoSwipeTime)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [autoSwipe])

  const setClassSlide = (index: number) => {
    const { indexSlide, prevSlide, nextSlide } = typeSlider === 'default' ? stateSlider : multiStateSlider
    let classValue = 'slider__item'

    if (index === indexSlide && typeSlider === 'default') {
      return `slider__item_active ${classValue}`
    } else if (index === prevSlide) {
      return `slider__item_prev ${classValue}`
    } else if (index === nextSlide) {
      return `slider__item_next ${classValue}`
    } else {
      return `${classValue}`
    }
  }

  const handleClickBtnNext = () => {
    if (typeSlider === 'default') {
      setStateSlider(prev => ({
        prevSlide: prev.activeSlide,
        activeSlide: prev.nextSlide,
        nextSlide: (prev.nextSlide + 1) % slidesData.length,
        translateX: prev.translateX - 100,
        indexSlide: prev.activeSlide + 1,
        isAnimated: true,
      }))
      setProgress(0)
    } else {
      setMultiStateSlider(prev => ({
        prevSlide: prev.prevSlide + 1,
        activeSlide: [prev.activeSlide[0] + 1, prev.activeSlide[1] + 1],
        nextSlide: prev.nextSlide + 1,
        translateX: prev.translateX - (sliderItemWidth + sliderListGap),
        indexSlide: 0,
        isAnimated: true,
      }))
    }
  }

  const handleClickBtnPrev = () => {
    if (typeSlider === 'default') {
      setStateSlider(prev => ({
        prevSlide: (prev.prevSlide - 1 + slidesData.length) % slidesData.length,
        activeSlide: prev.prevSlide,
        nextSlide: prev.activeSlide,
        translateX: prev.translateX + 100,
        indexSlide: ((prev.activeSlide - 1 + (slidesData.length + 1)) % (slidesData.length + 1)),
        isAnimated: true,
      }))
      setProgress(0)
    } else {
      setMultiStateSlider(prev => ({
        prevSlide: prev.prevSlide - 1,
        activeSlide: [prev.activeSlide[0] - 1, prev.activeSlide[1] - 1],
        nextSlide: prev.nextSlide - 1,
        translateX: prev.translateX + (sliderItemWidth + sliderListGap),
        indexSlide: 0,
        isAnimated: true,
      }))
    }
  }

  const toggleDisabledBtn = (): boolean => {
    const { isAnimated } = typeSlider === 'default' ? stateSlider : multiStateSlider

    if (isAnimated) {
      return true
    } else {
      return false
    }
  }

  const setClassSliderBtn = (btnType: string) => {
    if (lastSwipe) {
      if (btnType === 'prev') {
        if (multiStateSlider.prevSlide < 0) {
          return 'slider__btn slider__btn_disabled slider__btn_prev'
        } else {
          return 'slider__btn slider__btn_prev'
        }
      } else {
        if (multiStateSlider.nextSlide === slidesData.length) {
          return 'slider__btn slider__btn_disabled slider__btn_next'
        } else {
          return 'slider__btn slider__btn_next'
        }
      }
    } else {
      if (btnType === 'prev') {
        return 'slider__btn slider__btn_prev'
      } else {
        return 'slider__btn slider__btn_next'
      }
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
      <div className={setClassSliderBtn('prev')}>
        <Btn
          type="button"
          className="btn_transparent"
          onClick={handleClickBtnPrev}
          disabled={toggleDisabledBtn()}
        >
          <ArrowLeftIcon width={48} height={48} />
        </Btn>
      </div>
      <div className={setClassSliderBtn('next')}>
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
        <ul className="slider__list"
          ref={sliderListRef}
          style={{
            transform: typeSlider === 'default'
              ? `translateX(${stateSlider.translateX}%)`
              : `translateX(${multiStateSlider.translateX}px)`,
            transition: typeSlider === 'default'
              ? stateSlider.isAnimated ? 'var(--transition)' : 'none'
              : multiStateSlider.isAnimated ? 'var(--transition)' : 'none',
          }}
        >
          {slidesData.map((slide, index) => (
            <li
              key={index}
              className={setClassSlide(index)}
              ref={sliderItemRef}
            >
              <Card styles={cardStyles} data={slide} />
            </li>
          ))}
        </ul>
        {pagenation && (
          <ul className="slider-pagination">
            {slidesData.map((_, index) => (
              <li
                key={index}
                className={`${stateSlider.activeSlide === index ? 'slider-pagination__item slider-pagination__item_active' : 'slider-pagination__item'}`}
              >
                {stateSlider.activeSlide === index && (
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
