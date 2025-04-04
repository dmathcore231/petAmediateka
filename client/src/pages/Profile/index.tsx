import { Link } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"

export function ProfileMain(): JSX.Element {
  return (
    <div className="profile">
      <nav className="profile-nav-bar">
        <div className="profile-nav-bar__item">
          <LinkBack activePage="Профиль" />
          <h2>Настройки</h2>
        </div>
        <div className="profile-nav-bar__item">
          <ul className="profile-nav-bar-list">
            <li className="profile-nav-bar-list__item">
              <Link to={'#'}
                className="link link_primary link_color_white title title_size_s profile-nav-bar-list__link ">
                Профили
              </Link>
            </li>
            <li className="profile-nav-bar-list__item">
              <Link to={'#'}
                className="link link_primary link_color_white title title_size_s profile-nav-bar-list__link ">
                Покупки
              </Link>
            </li>
            <li className="profile-nav-bar-list__item">
              <Link to={'#'}
                className="link link_primary link_color_white title title_size_s profile-nav-bar-list__link ">
                Способы оплаты
              </Link>
            </li>
            <li className="profile-nav-bar-list__item">
              <Link to={'#'}
                className="link link_primary link_color_white title title_size_s profile-nav-bar-list__link ">
                Устройства
              </Link>
            </li>
            <li className="profile-nav-bar-list__item">
              <Link to={'#'}
                className="link link_primary link_color_white title title_size_s profile-nav-bar-list__link ">
                Аккаунт
              </Link>
            </li>
            <li className="profile-nav-bar-list__item">
              <Link to={'#'}
                className="link link_primary link_color_white title title_size_s profile-nav-bar-list__link ">
                Помощь и поддержка
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="profile-body">
        Main content
      </div>
    </div>
  )
}
