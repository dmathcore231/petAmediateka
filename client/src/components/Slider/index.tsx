import { useEffect, useState, useRef } from "react"
import { Btn } from "../Btn"
import { Card } from "../Card"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon"
import { ArrowRightIcon } from "../../assets/icons/ArrowRightIcon"

export function Slider({ dataSlide, scaleHover, pagenation, autoSwipe, playbacBgHover, lastSwipe }: SliderProps): JSX.Element {

  const animatedTime = 400

  const [stateSlider, setStateSlider] = useState({
    prevSlide: dataSlide.length - 1,
    activeSlide: 0,
    nextSlide: 1,
    translateX: 0,
    indexSlide: 0,
    isAnimated: false,
  })

  const sliderListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (stateSlider.isAnimated) {
      const isAnimated = setTimeout(() => {
        setStateSlider(prev => ({
          ...prev,
          isAnimated: false,
        }))
      }, animatedTime)

      return () => {
        clearTimeout(isAnimated)
      }
    }
  }, [stateSlider.isAnimated, animatedTime])

  useEffect(() => {
    if (sliderListRef.current) {
      const firstChild = sliderListRef.current.firstChild as HTMLLIElement
      const lastChild = sliderListRef.current.lastChild as HTMLLIElement
      if (firstChild
        && stateSlider.indexSlide > dataSlide.length - 1
        && stateSlider.activeSlide === 0) {
        firstChild.style.left = `${Math.abs(stateSlider.translateX)}%`
      } else if (lastChild
        && stateSlider.indexSlide === dataSlide.length
        && stateSlider.activeSlide === dataSlide.length - 1) {
        lastChild.style.left = `${dataSlide.length * -100}%`
      } else {
        firstChild.style.left = ``
        lastChild.style.left = ``
      }
    }
  }, [stateSlider.indexSlide, stateSlider.translateX])

  useEffect(() => {
    if (stateSlider.indexSlide > dataSlide.length - 1 && stateSlider.activeSlide === 0) {
      const timerId = setTimeout(() => {
        setStateSlider({
          prevSlide: dataSlide.length - 1,
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
    } else if (stateSlider.indexSlide === dataSlide.length
      && stateSlider.activeSlide === dataSlide.length - 1) {
      const timerId = setTimeout(() => {
        setStateSlider({
          prevSlide: dataSlide.length - 2,
          activeSlide: dataSlide.length - 1,
          nextSlide: 0,
          translateX: (dataSlide.length - 1) * -100,
          indexSlide: dataSlide.length - 1,
          isAnimated: false,
        })
      }, animatedTime)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [stateSlider.indexSlide, dataSlide])

  const setClassSlide = (index: number) => {
    if (index === stateSlider.indexSlide) {
      return "slider__item slider__item_active"
    } else if (index === stateSlider.prevSlide) {
      return "slider__item slider__item_prev"
    } else if (index === stateSlider.nextSlide) {
      return "slider__item slider__item_next"
    } else {
      return "slider__item"
    }
  }

  const handleClickBtnNext = () => {
    setStateSlider(prev => ({
      prevSlide: prev.activeSlide,
      activeSlide: prev.nextSlide,
      nextSlide: (prev.nextSlide + 1) % dataSlide.length,
      translateX: prev.translateX - 100,
      indexSlide: prev.activeSlide + 1,
      isAnimated: true,
    }))
  }

  const handleClickBtnPrev = () => {
    setStateSlider(prev => ({
      prevSlide: (prev.prevSlide - 1 + dataSlide.length) % dataSlide.length,
      activeSlide: prev.prevSlide,
      nextSlide: prev.activeSlide,
      translateX: prev.translateX + 100,
      indexSlide: ((prev.activeSlide - 1 + dataSlide.length) % dataSlide.length) + 1,
      isAnimated: true,
    }))
  }

  return (
    <div className="slider">
      <div className="slider__btn slider__btn_prev">
        <Btn
          type="button"
          className="btn_transparent"
          onClick={handleClickBtnPrev}
          disabled={stateSlider.isAnimated}
        >
          <ArrowLeftIcon width={48} height={48} />
        </Btn>
      </div>
      <div className="slider__btn slider__btn_next">
        <Btn
          type="button"
          className="btn_transparent"
          onClick={handleClickBtnNext}
          disabled={stateSlider.isAnimated}
        >
          <ArrowRightIcon width={48} height={48} />
        </Btn>
      </div>
      <div className="slider__content">
        <ul className="slider__list"
          ref={sliderListRef}
          style={{
            transform: `translateX(${stateSlider.translateX}%)`,
            transition: stateSlider.isAnimated ? 'var(--transition)' : 'none'
          }}
        >
          {dataSlide.map((slide, index) => (
            <li
              key={index}
              className={setClassSlide(index)}
            >
              <Card size={'lg'} data={slide} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
