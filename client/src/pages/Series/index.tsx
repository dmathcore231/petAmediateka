import { useParams } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"
import { HboIcon } from "../../assets/icons/HboIcon"
export function Series(): JSX.Element {
  const { id, title, season } = useParams()

  console.log(id, title, season)

  return (
    <div className="page-series">
      <div className="page-series-bg">
        <picture className="page-series-bg__picture">
          <img src="/hotd/imgBgHOTD.jpg" alt="" className="page-series-bg__img" />
        </picture>
      </div>
      <div className="page-series-content container">
        <div className="page-series-content-header">
          <LinkBack activePage="Сериалы" />
          <div className="page-series-content-header-logo">
            <img src="/hotd/logo.png" alt="logo" className="page-series-content-header-logo__img" />
          </div>
          <div className="page-series-content-header__item">
            <span className="title title_color_white-dark">
              Сезон {season}
            </span>
            <span className="title title_color_white-dark">
              <HboIcon width={43} height={18} />
            </span>
          </div>
          <div className="page-series-content-header__item">
            <span className="title title_color_white-dark">
              Сезоны:
            </span>
            <span className="page-series-content-header__seasons-item title">1</span>
            <span className="page-series-content-header__seasons-item title">2</span>
          </div>
        </div>
      </div>

    </div>
  )
}
