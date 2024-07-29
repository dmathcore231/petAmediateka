
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
