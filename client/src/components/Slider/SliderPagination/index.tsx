import { JSX } from "react"

export interface SliderPaginationProps {
  isActive: boolean
  pageLength: number,
  activeSlide: number
}
export function SliderPagination({ isActive, pageLength, activeSlide }: SliderPaginationProps): JSX.Element | null {
  if (!isActive || !pageLength) return null

  const baseClass = "slider-pagination"
  const itemClass = `${baseClass}__item`
  const activeItemClass = `${itemClass}_active`
  const activeLineClass = `${baseClass}__active-line`

  const setClassItem = (index: number): string => {
    return activeSlide === index
      ? `${itemClass} ${activeItemClass}`
      : `${itemClass}`
  }

  return (
    <ul className={baseClass}>
      {Array.from({ length: pageLength }, (_, index) => (
        <li
          key={index}
          className={setClassItem(index)}
        >
          {activeSlide === index && (
            <div className={activeLineClass} />
          )}
        </li>
      ))}
    </ul>
  )

  // return (
  //   <ul className={baseClass}>
  //     {data.map((_, index) => (
  //       <li
  //         key={index}
  //         className={setClassItem(index)}
  //       >
  //         {activeSlide === index && (
  //           <div className={activeLineClass}
  //             style={lineStyle}
  //           />
  //         )}
  //       </li>
  //     ))}
  //   </ul>
  // )
}
