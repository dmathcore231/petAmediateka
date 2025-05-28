import { useState, useEffect } from "react"
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
