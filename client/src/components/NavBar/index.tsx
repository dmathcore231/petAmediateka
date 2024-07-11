import { Link, NavLink } from "react-router-dom"
import { Btn } from "../Btn"
import { Logo } from "../../assets/icons/Logo"
import { SearchIcon } from "../../assets/icons/SearchIcon"

export function NavBar(): JSX.Element {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__item">
        <Link to="/" className="nav-bar__logo">
          <Logo width="168px" height="16px" />
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
              <span>Трейлеры</span>
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
              <SearchIcon width="14px" height="14px" />
              <span className="title">
                Поиск
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-bar__item">
        <div className="nav-bar__wrapper">
          <Link to="/" className="btn btn_secondary btn_size_sm btn_margin_right_20">
            Ввести промокод
          </Link>
          <Link to="/" className="btn btn_secondary btn_size_xsm">
            Войти
          </Link>
          <Link to="/" className="btn btn_primary btn_size_sm">
            Попробовать за 1₽
          </Link>
        </div>
      </div>
    </nav>
  )
}
