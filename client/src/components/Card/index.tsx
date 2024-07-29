import { Link } from "react-router-dom"
import { Btn } from "../Btn"
import { Badge } from "../Badge"
import { CardProps } from "../../types/interfaces/CardProps"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"

export function Card({ size, data }: CardProps): JSX.Element {

  if (size === 'lg') {
    return (
      <div className="card">
        <div className={`card-image-bg card-image-bg_${size}`}>
          <picture className="card-picture">
            <img src={data.imgBg} alt={data.title} className="card-image-bg__img" />
          </picture>
        </div>
        <div className="card-content">
          <div className="card-content__age-restriction">
            {`${data.ageRestriction}+`}
          </div>
          <div className="card-body">
            {data.badge && (
              <div className="card-body__badge">
                <Badge type={data.badge.type} title={data.badge.title} />
              </div>
            )}
            <div className="card-body__title">
              <img src={data.title} alt="" className="card-body__title-img" />
            </div>
            <div className="card-body__description title title_align_left">
              {data.description}
            </div>
            <div className="card-body__btn">
              <Link to='#' className="btn btn_primary card-body__btn-link">
                <div className="card-body__btn-wrapper">
                  <PlayIcon width={28} height={28} />
                  <span className="card-body__btn-text">Смотреть</span>
                </div>
              </Link>
              <Btn
                type="button"
                className="btn_secondary btn_transparent card-body__btn-link card-body__btn-link_size_xsm"
                onClick={() => console.log('add favorite')}
              >
                <span className="card-body__btn-wrapper-scale">
                  <AddFavoriteIcon width={22} height={22} />
                </span>
              </Btn>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (size === 'md') {
    return (
      <div className="card">
        Card md
      </div>
    )
  } else if (size === 'sm') {
    return (
      <div className="card">
        <div className="card-image-bg">
          <picture className="card-picture">
            <img src={data.imgBg} alt="" className="card-image-bg__img" />
          </picture>
        </div>
      </div>
    )
  } else {
    return (
      <div className="card">
        Card xsm
      </div>
    )
  }
}
