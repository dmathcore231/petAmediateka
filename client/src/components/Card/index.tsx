import { Link } from "react-router-dom"
import { Btn } from "../Btn"
import { Badge } from "../Badge"
import { AgeRestrictionBadge } from "../AgeRestrictionBadge"
import { CardProps } from "../../types/interfaces/CardProps"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"


export function Card({ size, data }: CardProps): JSX.Element {

  return (
    <div className={`card card_size_${size}`}>
      <div className="card-bg">
        <picture className="card-bg__picture">
          <img src={data.imgBg} alt="" className="card-bg__img" />
        </picture>
      </div>
      <div className="card-body">
        {data.ageRestriction && (
          <div className={size === 'md'
          ? "card-body__age-restriction card-body__age-restriction_jc_fe"
          : "card-body__age-restriction"
          }>
            <AgeRestrictionBadge size={size} data={data.ageRestriction} />
          </div>
        )
        }
        {data.badge && (
          <div className="card-body__badge">
            <Badge type={data.badge.type} title={data.badge.title} />
          </div>
        )}
        {data.title && data.title.type === 'img' && (
          <div className="card-body__title">
            <img src={data.title.value} alt="" className="card-body__title-img" />
          </div>
        )}
        {data.description && (
          <div className="card-body__description title title_align_left">
            {data.description}
          </div>
        )}
        {size === 'lg' && (
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
        )}
      </div>
      {data.title && data.title.type === 'text' && (
        <div className="card-title title title_align_left">
          {data.title.value}
        </div>
      )}
    </div>
  )
}
