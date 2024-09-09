import { Link, NavLink, useLocation } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { ProfileSwitcher } from "../ProfileSwitcher"
import { Spinner } from "../Spinner"
import { Logo } from "../../assets/icons/Logo"
import { SearchIcon } from "../../assets/icons/SearchIcon"
import { BurgerMenu } from "../../assets/icons/BurgerMenu"

export function NavBar(): JSX.Element {
  const location = useLocation()
  const { user, loading } = useAppSelector(state => state.auth)

  return (
    <nav className={`nav-bar ${location.pathname === "/" ? "" : "nav-bar_padding-horizontal_none"}`}>
      <div className="nav-bar__item">
        <Link to="/" className="nav-bar__logo">
          <Logo width={168} height={16} />
        </Link>
        <ul className="nav-bar-list">
          <li className="nav-bar-list__item">
            <NavLink to="/series"
              className={({ isActive }) =>
                isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
              }
            >
              <span className="title">Сериалы</span>
            </NavLink>
          </li>
          <li className="nav-bar-list__item">
            <NavLink to="/movies"
              className={({ isActive }) =>
                isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
              }
            >
              <span className="title">Фильмы</span>
            </NavLink>
          </li>
          <li className="nav-bar-list__item">
            <NavLink to="/collections"
              className={({ isActive }) =>
                isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
              }
            >
              <span className="title">Коллекции</span>
            </NavLink>
          </li>
          <li className="nav-bar-list__item">
            <NavLink to="/trailers"
              className={({ isActive }) =>
                isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
              }
            >
              <span className="title">Трейлеры</span>
            </NavLink>
          </li>
          <li className="nav-bar-list__item">
            <NavLink to="/kino1tv"
              className={({ isActive }) =>
                isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
              }
            >
              <span className="title">Кино1ТВ</span>
            </NavLink>
          </li>
          <li className="nav-bar-list__item">
            <NavLink to="/tv"
              className={({ isActive }) =>
                isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
              }
            >
              <span className="title">Эфир</span>
            </NavLink>
          </li>
          <li className="nav-bar-list__item">
            <NavLink to="/search"
              className={({ isActive }) =>
                isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
              }
            >
              <SearchIcon width={20} height={20} />
              <span className="title">
                Поиск
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-bar__item">
        <div className="nav-bar__wrapper">
          {!user && !loading && (
            <>
              <Link to="/" className="btn btn_secondary btn_size_sm btn_margin_right_20">
                Ввести промокод
              </Link>
              <Link to="/auth/signin" className="btn btn_secondary btn_size_xsm">
                Войти
              </Link>
            </>
          )}
          <Link to="/auth/signup" className="btn btn_primary btn_size_sm">
            Попробовать за 1₽
          </Link>
          {user && !loading && (
            <>
              <ProfileSwitcher className="profile-switcher_margin" />
              <BurgerMenu width={34} height={34} />
            </>
          )}
          {loading && (
            <Spinner width={24} height={24} />
          )}
        </div>
      </div>
    </nav>
  )
}
