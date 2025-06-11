import { JSX, useState } from "react"
import { Link } from "react-router-dom"
import { useCheckBreakpoint } from "../../hooks"
import { Btn } from "../Btn"
import { Badge } from "../Badge"
import { AgeRestrictionBadge } from "../AgeRestrictionBadge"
import { Tags } from "../Tags"
import { IconButton } from "../IconButton"
import { Skeletons } from "../Skeletons"
import { PictureWithSources } from "../PictureWithSources"
import { CardProps } from "../../types/interfaces/CardProps"
import { IconButtonProps } from "../../types/interfaces/IconButtonProps"
import { PictureWithSourcesProps } from "../../types/interfaces/PictureWithSourcesProps"
import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"
import { IsFavoriteIcon } from "../../assets/icons/IsFavoriteIcon"

export function Card({ data, styles, settings, loading, error, user: { auth, isFavoriteContent, handleFavoriteContent } }: CardProps): JSX.Element {
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const { _id, title, badge, ageRestriction, description, bg, logoImg, link } = data
  const { cardSize, flex, clipPath: { value: clipPathValue, type: clipPathType }, ageRestrictionBadge, btnGroup, hover, boxShadow, bg: bgImg } = styles
  const { title: { titleOutside, titleLogoImg }, badgeVisible, link: { linkType, linkDisabled }, descriptionVisible, tags, cardSeries } = settings
  const [isHoveredBtnAddFavorite, setIsHoveredBtnAddFavorite] = useState(false)
  const sizeIconFavorite = {
    width: BREAKPOINT_MD ? 20 : 24,
    height: BREAKPOINT_MD ? 20 : 24
  }
  const sizeIconPlay = {
    width: BREAKPOINT_XL ? 40 : 60,
    height: BREAKPOINT_XL ? 40 : 60
  }

  const iconButtonProps: IconButtonProps = {
    config: {
      stateIcon: isFavoriteContent ? 'isActive' : 'default',
      loading,
    },
    styles: {
      scale: true,
      fillColor: 'white'
    },
    iconJSX: {
      default: (<AddFavoriteIcon
        width={sizeIconFavorite.width}
        height={sizeIconFavorite.height} />),
      isActive: (<IsFavoriteIcon
        width={sizeIconFavorite.width}
        height={sizeIconFavorite.height} />),
    },
    isHovered: isHoveredBtnAddFavorite
  }

  if (loading) {
    return (
      <Skeletons type="card" cardType={cardSize} />
    )
  }

  const renderCardContentLinkWrapper = (children: JSX.Element, linkType: 'allCard' | 'title', linkDisabled: boolean): JSX.Element => {
    if (linkType === 'allCard') {
      return (
        <Link
          to={link}
          className="card__link"
          onClick={(e) => linkDisabled && e.preventDefault()}
        >
          {children}
        </Link>
      )
    } else {
      return children
    }
  }

  const renderCardContent = (): JSX.Element => {
    const renderBackground = (): JSX.Element | null => {
      if (error) return null

      const baseClass = 'card-bg'
      const shadowClass = boxShadow ? ' card-bg_shadow' : ''
      const borderClass = bgImg?.border ? ' card-bg_border_color_primary' : ''
      const configBg: Record<string, string | undefined> = {
        lg: bg?.imgUrl,
        lm: bg?.imgResizeLmUrl,
      }
      const src: string = configBg[cardSize] || bg?.imgResizeUrl
      const pictureWithSourcesProps: PictureWithSourcesProps = {
        img: {
          url: src,
          sourceUrls: cardSize === 'lg' ? bg.sourceUrls : [src]
        },
        alt: `${title.originalTitle} background`,
        classes: {
          picture: 'card-bg__picture',
          img: 'card-bg__img'
        },
        media: ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm']
      }

      return (
        <div className={`${baseClass}${shadowClass}${borderClass}`}>
          <PictureWithSources {...pictureWithSourcesProps} />
        </div>
      )
    }

    const renderAgeRestrictionBadge = (): JSX.Element | null => {
      if (!ageRestrictionBadge) return null

      const baseClass = 'card-body__age-restriction'
      const positionClass = ageRestrictionBadge.position === 'right'
        ? ' card-body__age-restriction_jc_fe'
        : ''

      return (
        <div className={`${baseClass}${positionClass}`}>
          <AgeRestrictionBadge size={ageRestrictionBadge.size} data={ageRestriction} />
        </div>
      )
    }

    const renderBadge = (): JSX.Element | null => {
      if (!badge || !badgeVisible) return null

      return (
        <div className="card-body__badge">
          <Badge type={badge.type} title={badge.title} />
        </div>
      )
    }

    const renderLogoImg = (): JSX.Element | null => {
      if (!titleLogoImg) return null

      return (
        <div className="card-body__title">
          {linkType === 'title'
            ? (<Link to={link} className="card__link">
              <img src={logoImg} alt="" className="card-body__title-img" />
            </Link>)
            : (<img src={logoImg} alt="" className="card-body__title-img" />)
          }
        </div>
      )
    }

    const renderDescription = (): JSX.Element | null => {
      if (!descriptionVisible) return null

      const baseClass = 'card-body__description'
      const alignTextClass = ' title title_align_left'
      const descriptionValue = description ? description : ''

      return (
        <div className={`${baseClass}${alignTextClass}`}>
          {descriptionValue}
        </div>
      )
    }

    const renderButtons = (): JSX.Element | null => {
      if (!btnGroup) return null

      const baseClass = "card-body__btn"

      return (
        <div className={baseClass}>
          <Link to={link}
            className={`btn btn_primary card-body__btn-link card-body__btn-link_size_${styles.cardSize}`}>
            <div className="card-body__btn-wrapper">
              <PlayIcon width={28} height={28} />
              <span className="card-body__btn-text">Смотреть</span>
            </div>
          </Link>
          {auth && (
            <Btn
              type="button"
              className="btn_secondary btn_transparent btn_stroke_none card-body__btn-link card-body__btn-link_size_xsm"
              onClick={() => handleFavoriteContent(_id)}
              onMouseEnter={() => setIsHoveredBtnAddFavorite(true)}
              onMouseLeave={() => setIsHoveredBtnAddFavorite(false)}
            >
              <IconButton {...iconButtonProps} />
            </Btn>
          )}
        </div>
      )
    }

    const renderExternalTitle = (): JSX.Element | null => {
      if (titleLogoImg || !titleOutside) return null

      return (
        <div className="card-title title title_align_left">
          {title.value}
        </div>
      )
    }

    return (
      <>
        {renderBackground()}
        <div className={`card-body card-body_flex_jc_${flex.body.justifyContent}`}>
          {renderAgeRestrictionBadge()}
          {renderBadge()}
          {renderLogoImg()}
          {renderDescription()}
          {tags && (
            <Tags data={tags} />
          )}
          {renderButtons()}
        </div>
        {renderExternalTitle()}
        {cardSeries && (
          <div className="card-icon-play">
            <MediaPlayIcon width={sizeIconPlay.width} height={sizeIconPlay.height} />
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
      clipPathValue && clipPathType && `card_clip-path_${clipPathType}`,
      hover?.playBack.value && 'card_hover_playback',
      hover?.playBack?.type === 'bottom-more' && 'card_hover_playback_bottom_more',
    ]

    return classes.filter(Boolean).join(' ')
  }

  if (hover?.playBack.value) {
    const getClasses = (clipPathType: string | null): string => {
      const classes = [
        "card-playback-bg",
        clipPathType && `card-playback-bg_clip-path_${clipPathType}`,
      ]

      return classes.filter(Boolean).join(' ')
    }

    return (
      <>
        <div className={getClasses(clipPathType)} />
        <div className={setClassesCard()}>
          {renderCardContentLinkWrapper(renderCardContent(), linkType, linkDisabled)}
        </div>
      </>
    )
  }

  return (
    <div className={setClassesCard()}>
      {renderCardContentLinkWrapper(renderCardContent(), linkType, linkDisabled)}
    </div>
  )
}
