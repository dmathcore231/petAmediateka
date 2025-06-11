export type SlideState<T> = {
  prevSlide: number
  activeSlide: T
  nextSlide: number
  translateX: number
  indexSlide: number
  isAnimated: boolean
  sliderItemWidth: number
}

export type SliderSettings = {
  typeSlider: "default" | "multi"
  pagination: boolean
  autoSwipe: boolean
  lastSwipe: boolean
  quantityListItems: number
  mediaPlayerHandler: boolean
}
