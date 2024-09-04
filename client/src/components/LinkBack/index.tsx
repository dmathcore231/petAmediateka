import { Link } from "react-router-dom"
import { LinkBackProps } from "../../types/interfaces/LinkBackProps"

export function LinkBack({ activePage }: LinkBackProps): JSX.Element {
  return (
    <div className="link-back">
      <div className="link-back__item">
        <Link to={"/"} className="link-back__link text text_color_gray">
          Главная
        </Link>
      </div>
      <div className="link-back__item">
        <span className="text text_color_gray"> / </span>
      </div>
      <div className="link-back__item">
        <span className="text text_color_secondary-active">
          {activePage}
        </span>
      </div>
    </div>
  )
}
