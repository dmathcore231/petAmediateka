import { JSX } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { Btn } from "../Btn"
import { Badge } from "../Badge"
import { AgeRestrictionBadge } from "../AgeRestrictionBadge"
import { Tags } from "../Tags"
import { CardProps } from "../../types/interfaces/CardProps"
import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"

export function Card({ data, styles, settings, loadingCardData, error }: CardProps): JSX.Element {
  const { user } = useAppSelector(state => state.auth)

  const { _id, type, title, badge, ageRestriction, description, bg, logoImg, link } = data
  const { cardSize, flex, clipPath, ageRestrictionBadge, btnGroup, hover, boxShadow } = styles
  const { title: { titleOutside, titleLogoImg, titleLogoImgIndex }, badgeVisible, link: { linkType }, descriptionVisible, tags, cardSeries } = settings

  const renderCardContentLinkWrapper = (children: JSX.Element): JSX.Element => {
    if (linkType === 'allCard') {
      return (
        <Link
          to={link}
          className="card__link"
        >
          {children}
        </Link>
      )
    } else {
      return children
    }
  }

  const renderCardBg = (): JSX.Element => {
    const configBg: Record<string, string | undefined> = {
      lg: bg?.imgUrl,
      lm: bg?.imgResizeLmUrl,
    }

    const src: string = configBg[cardSize] || bg?.imgResizeUrl

    return <img src={src} alt="" className="card-bg__img" />
  }

  const renderCardContent = (): JSX.Element => {
    const renderBackground = (): JSX.Element | null => {
      if (loadingCardData || error) return null

      const baseClass = 'card-bg'
      const shadowClass = boxShadow ? ' card-bg_shadow' : ''

      return (
        <div className={`${baseClass}${shadowClass}`}>
          <picture className="card-bg__picture">
            {renderCardBg()}
          </picture>
        </div>
      )
    }

    return (
      <>
        {renderBackground()}
        <div className={`card-body card-body_flex_jc_${flex.body.justifyContent}`}>
          {ageRestrictionBadge && (
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
          {badge && badgeVisible && (
            <div className="card-body__badge">
              {!loadingCardData
                ? (<Badge type={badge.type} title={badge.title} />)
                : (<Badge type={'loading'} />)}
            </div>
          )}
          {titleLogoImg && (
            <div className="card-body__title">
              {
                linkType === 'title'
                  ? (
                    <Link to={link} className="card__link">
                      <img src={logoImg} alt="" className="card-body__title-img" />
                    </Link>
                  )
                  : (
                    <img src={logoImg} alt="" className="card-body__title-img" />
                  )
              }
            </div>
          )}
          {descriptionVisible && (
            <div className={"card-body__description" + (loadingCardData ? ' card-body__description_loading' : '') + " title title_align_left"}>
              {!loadingCardData && description ? description : ''}
            </div>
          )}
          {tags && (
            <Tags data={tags} />
          )}
          {btnGroup === true && (
            <div className={"card-body__btn" + (loadingCardData ? ' card-body__btn_loading' : '')}>
              {!loadingCardData && (
                <>
                  <Link to={link} className={`btn btn_primary card-body__btn-link card-body__btn-link_size_${styles.cardSize}`}>
                    <div className="card-body__btn-wrapper">
                      <PlayIcon width={28} height={28} />
                      <span className="card-body__btn-text">Смотреть</span>
                    </div>
                  </Link>
                  {user && (
                    <Btn
                      type="button"
                      className="btn_secondary btn_transparent card-body__btn-link card-body__btn-link_size_xsm"
                      onClick={() => console.log('add favorite')}
                    >
                      <span className="card-body__btn-wrapper-scale">
                        <AddFavoriteIcon width={22} height={22} />
                      </span>
                    </Btn>
                  )}
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
        {cardSeries && (
          <div className="card-icon-play">
            <MediaPlayIcon width={60} height={60} />
          </div>
        )}
      </>
    )
  }

  const setClassesCard = (): string => {
    const classes = [
      `card card_size_${cardSize}`,
      hover?.shadow && 'card_hover_shadow',
      hover?.scale && 'card_hover_scale',
      clipPath && 'card_clip-path_main',
      hover?.playBack.value && 'card_hover_playback',
      hover?.playBack?.type === 'bottom-more' && 'card_hover_playback_bottom_more',
      loadingCardData && 'card_loading',
    ]

    return classes.filter(Boolean).join(' ')
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
