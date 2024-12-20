import { Link } from "react-router-dom"
import { Btn } from "../Btn"
import { Badge } from "../Badge"
import { AgeRestrictionBadge } from "../AgeRestrictionBadge"
import { Tags } from "../Tags"
import { CardProps } from "../../types/interfaces/CardProps"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"

export function Card({ data, styles, settings, loadingCardData, error }: CardProps): JSX.Element {
  const { _id, type, data: { title, badge, ageRestriction, description: { prewiewDescription } }, bg, logoImg } = data
  const { cardSize, flex, clipPath, ageRestrictionBadge, btnGroup, hover, boxShadow } = styles
  const { title: { titleValue, titleOutside, titleLogoImg }, link: { linkType }, descriptionVisible, tags } = settings

  const setLinkValue = (): string => {
    return type === 'movie'
      ? `/movie/${_id}/${title.linkTitle}`
      : `/series/${_id}/${title.linkTitle}`
  }

  const renderCardContentLinkWrapper = (children: JSX.Element): JSX.Element => {
    if (linkType === 'allCard') {
      return (
        <Link
          to={setLinkValue()}
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
        {!loadingCardData && !error && (
          <div className={boxShadow ? "card-bg card-bg_shadow" : "card-bg"}>
            <picture className="card-bg__picture">

              {cardSize === 'lg' && bg?.imgUrl
                ? (
                  <img src={bg.imgUrl} alt="" className="card-bg__img" />
                )
                : (
                  <img src={bg?.imgResizeUrl} alt="" className="card-bg__img" />
                )
              }
            </picture>
          </div>
        )}
        <div className={`card-body card-body_flex_jc_${flex.body.justifyContent}`}>
          {ageRestriction && ageRestrictionBadge && (
            <div className={ageRestrictionBadge.position === 'right'
              ? "card-body__age-restriction card-body__age-restriction_jc_fe"
              : "card-body__age-restriction"
            }>
              {!loadingCardData
                ? (<AgeRestrictionBadge size={ageRestrictionBadge.size} data={ageRestriction} />)
                : (<AgeRestrictionBadge size={ageRestrictionBadge.size} loading={loadingCardData} />)}
            </div>
          )
          }
          {badge && (
            <div className="card-body__badge">
              {!loadingCardData
                ? (<Badge type={badge.type} title={badge.title} />)
                : (<Badge type={'loading'} />)}
            </div>
          )}
          {titleLogoImg && (
            <div className="card-body__title">
              {
                linkType === 'title' && titleValue
                  ? (
                    <Link to={setLinkValue()} className="card__link">
                      <img src={logoImg} alt="" className="card-body__title-img" />
                    </Link>
                  )
                  : (
                    <img src={logoImg} alt="" className="card-body__title-img" />
                  )
              }
            </div>
          )}
          {!titleLogoImg && !titleOutside && (
            <div className="card-body__title">
              {titleValue}
            </div>
          )}
          {descriptionVisible && (
            <div className={"card-body__description" + (loadingCardData ? ' card-body__description_loading' : '') + " title title_align_left"}>
              {!loadingCardData && prewiewDescription ? prewiewDescription : ''}
            </div>
          )}
          {tags && (
            <Tags data={tags} />
          )}
          {btnGroup === true && (
            <div className={"card-body__btn" + (loadingCardData ? ' card-body__btn_loading' : '')}>
              {!loadingCardData && (
                <>
                  <Link to={setLinkValue()} className={`btn btn_primary card-body__btn-link card-body__btn-link_size_${styles.cardSize}`}>
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
                </>
              )}
            </div>
          )}
        </div>
        {!titleLogoImg && titleOutside && (
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
    if (loadingCardData) classes += ' card_loading'
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
