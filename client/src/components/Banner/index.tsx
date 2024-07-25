import { Link } from "react-router-dom"
import { BannerProps } from "../../types/interfaces/BannerProps"

export function Banner({ title, bannerListItem, img, titleBtn, ageRestriction }: BannerProps): JSX.Element {
  return (
    <div className="banner">
      <div className="banner__wrapper">
        <div className="banner__item">
          <div className="banner__title">
            <h2>{title}</h2>
          </div>
          <ul className="banner-list">
            {bannerListItem.map((item, index) => (
              <li key={index} className="banner-list__item title title_size_sm">
                {item}
              </li>
            ))}
            <li className="banner-list__item title title_size_sm">
              {`${ageRestriction}+`}
            </li>
          </ul>
          <div className="banner__btn">
            <Link to={'#'} className="btn btn_primary"
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
