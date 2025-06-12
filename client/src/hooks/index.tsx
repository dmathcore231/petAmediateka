import { useState, useEffect, RefObject, useRef } from "react"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "../redux/store"

export const useAppDispatch = (): AppDispatch => useDispatch()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useCheckBreakpoint = (breakpoint: number): boolean => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return width <= breakpoint
}

export const useLazyLoad = <T extends Element>(
  elementRef: RefObject<T | null>,
  callback: () => void,
  threshold: number = 0.7
) => {
  const isTriggered = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || isTriggered.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold && !isTriggered.current) {
          callback()
          isTriggered.current = true
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, callback, threshold])
}
