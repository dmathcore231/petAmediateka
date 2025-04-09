import { JSX } from "react"
import { Link } from "react-router-dom"
import { BannerProps } from "../../types/interfaces/BannerProps"

export function Banner({ _id, title, bannerListItem, img, titleBtn, ageRestriction, loading }: BannerProps): JSX.Element {
  const baseClass: string = 'banner'
  const loadingClass: string = loading
    ? ` ${baseClass}_loading`
    : ''

  const renderBannerListItems = (arr: string[]): JSX.Element[] => arr.map((item, index) => (
    <li key={index} className="banner-list__item text text_size_s">
      {item}
    </li>
  ))

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
            <h3>{title}</h3>
          </div>
          <ul className="banner-list">
            {renderBannerListItems(bannerListItem)}
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
        </div>
        <picture className="banner-picture">
          <img src={img} alt="" className="banner-picture__img" />
        </picture>
      </div>
    </div>
  )
}
