export type SlideState = {
  prevSlide: number
  activeSlide: number
  nextSlide: number
  translateX: number
  indexSlide: number
  isAnimated: boolean
}


export type MultiSlideState = {
  prevSlide: number
  activeSlide: Array<number>
  nextSlide: number
  translateX: number
  indexSlide: number,
  isAnimated: boolean
}

export type SliderSettings = {
  typeSlider: "default" | "multi"
  pagenation: boolean
  autoSwipe: boolean
  lastSwipe: boolean
  quantityListItems: number
  mediaPlayerHandler: boolean
}
