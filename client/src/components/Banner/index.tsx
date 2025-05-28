import { JSX } from "react"
import { Link } from "react-router-dom"
import { useCheckBreakpoint } from "../../hooks"
import { PictureWithSources } from "../PictureWithSources"
import { BannerProps } from "../../types/interfaces/BannerProps"
import { PictureWithSourcesProps } from "../../types/interfaces/PictureWithSourcesProps"

export function Banner({ _id, title, bannerListItem, img, titleBtn, ageRestriction, loading }: BannerProps): JSX.Element {
  const breakpointLg = useCheckBreakpoint(992)
  const breakpointMd = useCheckBreakpoint(768)
  const baseClass: string = 'banner'
  const loadingClass: string = loading
    ? ` ${baseClass}_loading`
    : ''
  const pictureWithSourcesProps: PictureWithSourcesProps = {
    img: {
      url: img.url,
      sourceUrls: img.sourceUrls,
    },
    alt: 'banner',
    classes: {
      picture: 'banner-picture',
      img: 'banner-picture__img',
    },
    media: ['xxl', 'md'],
  }

  const renderBannerListItems = (arr: string[], breakpointLg: boolean): JSX.Element[] => {
    if (breakpointLg && !breakpointMd) {
      return arr.filter((_, index) => index < arr.length - 1).map((item, index) => (
        <li key={index} className="banner-list__item text">
          {item}
        </li>
      ))
    } else {
      return arr.map((item, index) => (
        <li key={index} className="banner-list__item text">
          {item}
        </li>
      ))
    }
  }

  if (loading) {
    return (
      <div className={`${baseClass} ${loadingClass}`}>
        <div className="banner__wrapper">
          <div className="banner__item">
            <div className="banner__title" />
            <div className="banner-list" />
            <div className="banner__btn" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${baseClass}`}>
      <div className="banner__wrapper">
        <div className="banner__item">
          <div className="banner__title">
            <span className="title title_size_m">{title}</span >
          </div>
          <ul className="banner-list">
            {renderBannerListItems(bannerListItem, breakpointLg)}
            <li className="banner-list__item text text_size_s">
              {`${ageRestriction}+`}
            </li>
          </ul>
          <div className="banner__btn">
            <Link to={'#'} className={"btn btn_primary"}
              onClick={() => console.log('click')}
            >
              {titleBtn}
            </Link>
          </div>
          <PictureWithSources {...pictureWithSourcesProps} />
        </div>
      </div>
    </div>
  )
}
