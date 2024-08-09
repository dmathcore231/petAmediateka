import { Link } from "react-router-dom"
import { Btn } from "../Btn"
import { Badge } from "../Badge"
import { AgeRestrictionBadge } from "../AgeRestrictionBadge"
import { Tags } from "../Tags"
import { CardProps } from "../../types/interfaces/CardProps"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"

export function Card({ data, styles }: CardProps): JSX.Element {

  const { link, imgBg, title, ageRestriction, description, badge, tags } = data
  const { cardSize, flex, clipPath, ageRestrictionBadge, btnGroup, hover, boxShadow, titleOutside } = styles

  const renderCardContentLinkWrapper = (children: JSX.Element): JSX.Element => {
    if (link.type === 'allCard') {
      return (
        <Link
          to={link.value}
          className="card__link"
        >
          {children}
        </Link>
      )
    } else {
      return children
    }
  }

  const renderCardContent = (): JSX.Element => {
    return (
      <>
        <div className={boxShadow ? "card-bg card-bg_shadow" : "card-bg"}>
          <picture className="card-bg__picture">
            <img src={imgBg} alt="" className="card-bg__img" />
          </picture>
        </div>
        <div className={`card-body card-body_flex_jc_${flex.body.justifyContent}`}>
          {ageRestriction && ageRestrictionBadge && (
            <div className={ageRestrictionBadge.position === 'right'
              ? "card-body__age-restriction card-body__age-restriction_jc_fe"
              : "card-body__age-restriction"
            }>
              <AgeRestrictionBadge size={ageRestrictionBadge.size} data={ageRestriction} />
            </div>
          )
          }
          {badge && (
            <div className="card-body__badge">
              <Badge type={badge.type} title={badge.title} />
            </div>
          )}
          {title && title.type === 'img' && (
            <div className="card-body__title">
              {
                link.type === 'title'
                  ? (
                    <Link to={link.value} className="card__link">
                      <img src={title.value} alt="" className="card-body__title-img" />
                    </Link>
                  )
                  : (
                    <img src={title.value} alt="" className="card-body__title-img" />
                  )
              }
            </div>
          )}
          {title && title.type === 'text' && !titleOutside && (
            <div className="card-body__title">
              {title.value}
            </div>
          )}
          {description && (
            <div className="card-body__description title title_align_left">
              {data.description}
            </div>
          )}
          {tags && (
            <Tags data={tags} />
          )}
          {btnGroup === true && (
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
        {title && title.type === 'text' && titleOutside && (
          <div className="card-title title title_align_left">
            {title.value}
          </div>
        )}
      </>
    )
  }

  const setClassesCard = (): string => {
    let classes = `card card_size_${cardSize}`
    if (hover?.shadow) classes += ' card_hover_shadow'
    if (hover?.scale) classes += ' card_hover_scale'
    if (clipPath) classes += ` card_clip-path_main`
    if (hover?.playBack.value) classes += ' card_hover_playback'
    if (hover && hover.playBack.type === 'bottom-more') classes += ' card_hover_playback_bottom_more'
    return classes
  }

  if (hover?.playBack.value) {
    return (
      <>
        <div className="card-playback-bg"></div>
        <div className={setClassesCard()}>
          {renderCardContentLinkWrapper(renderCardContent())}
        </div>
      </>
    )
  } else {
    return (
      <div className={setClassesCard()}>
        {renderCardContentLinkWrapper(renderCardContent())}
      </div>
    )
  }
}
