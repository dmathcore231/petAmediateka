import { JSX } from "react"
import { MyEmptyProps } from "../../../types/interfaces/MyEmptyProps"

export function MyEmpty({ title, text }: MyEmptyProps): JSX.Element {
  return (
    <div className="my-empty">
      <div className="my-empty__item">
        <div className="my-empty__title">
          <h2>{title}</h2>
        </div>
        <div className="my-empty__text title title_align_left">
          {text}
        </div>
      </div>
      <div className="my-empty__item">
        <img src="../../../../public/empty.png" alt="empty" className="my-empty__img" />
      </div>
    </div>
  )
}
