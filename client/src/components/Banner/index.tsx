import { Link } from "react-router-dom"
import { BannerProps } from "../../types/interfaces/BannerProps"

export function Banner({ _id, title, bannerListItem, img, titleBtn, ageRestriction, loading }: BannerProps): JSX.Element {

  return (
    <div className={"banner" + (loading ? " banner_loading" : "")}>
      <div className="banner__wrapper">
        <div className="banner__item">
          <div className="banner__title">
            {!loading && (
              <h3>{title}</h3>
            )}
          </div>
          {!loading
            ? (
              <ul className="banner-list">
                {bannerListItem.map((item, index) => (
                  <li key={index} className="banner-list__item text text_size_s">
                    {item}
                  </li>
                ))}
                <li className="banner-list__item text text_size_s">
                  {`${ageRestriction}+`}
                </li>
              </ul>
            )
            : (
              <div className="banner-list"></div>
            )
          }
          <div className="banner__btn">
            {!loading && (
              <Link to={'#'} className={"btn btn_primary"}
                onClick={() => console.log('click')}
              >
                {titleBtn}
              </Link>
            )}
          </div>
        </div>
        {!loading && (
          <picture className="banner-picture">
            <img src={img} alt="" className="banner-picture__img" />
          </picture>
        )}
      </div>
    </div>
  )
}
