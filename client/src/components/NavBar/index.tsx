import { Link, NavLink, useLocation } from "react-router-dom"
import { JSX } from "react"
import { useAppSelector } from "../../hooks"
import { ProfileSwitcher } from "../ProfileSwitcher"
import { Spinner } from "../Spinner"
import { BurgerMenu } from "../BurgerMenu"
import { Logo } from "../../assets/icons/Logo"
import { SearchIcon } from "../../assets/icons/SearchIcon"

const CLASSES: Record<string, string> = {
  base: "nav-bar",
  item: "nav-bar__item",
  logo: "nav-bar__logo",
  list: "nav-bar-list",
  link: "nav-bar-list__link",
  linkActive: "nav-bar-list__link_active",
  title: "title",
}
const CONFIG_LIST: { url: string, value: string }[] = [
  { url: '/collection-series', value: 'Сериалы' },
  { url: '/movies', value: 'Фильмы' },
  { url: '/collections', value: 'Коллекции' },
  { url: '/trailers', value: 'Трейлеры' },
  { url: '/kino1tv', value: 'Кино1ТВ' },
  { url: '/tv', value: 'Эфир' },
  { url: '/search', value: 'Поиск' },
]

const toggleLinkIsActive = (isActive: boolean): string => isActive
  ? CLASSES.linkActive
  : CLASSES.link

const renderList = (data: { url: string, value: string }[]): JSX.Element => {
  return (
    <ul className={CLASSES.list}>
      {data.map(({ url, value }, index) => (
        <li className={CLASSES.item} key={index}>
          <NavLink to={url}
            className={({ isActive }) => toggleLinkIsActive(isActive)}
          >
            {value === "Поиск" && <SearchIcon width={20} height={20} />}
            <span className={CLASSES.title}>
              {value}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

const text: Record<string, string> = {
  promoCode: "Ввести промокод",
  signIn: "Войти",
  signUp: "Попробовать за 1₽",
}

export function NavBar(): JSX.Element {
  const location = useLocation()
  const { user, loading } = useAppSelector(state => state.auth)
  const paddingNoneClass = location.pathname === "/" ? "" : " nav-bar_padding-horizontal_none"

  return (
    <nav className={`${CLASSES.base}${paddingNoneClass}`}>
      <div className={CLASSES.item}>
        <Link to="/" className={CLASSES.logo}>
          <Logo width={168} height={16} />
        </Link>
        {renderList(CONFIG_LIST)}
      </div>
      <div className={CLASSES.item}>
        <div className="nav-bar-wrapper">
          {!user && !loading && (
            <>
              <span className="nav-bar-wrapper__item nav-bar-wrapper__item_margin nav-bar-wrapper__item_width_188">
                <Link to="/" className="btn btn_secondary btn_size_sm btn_margin_right_20">
                  {text.promoCode}
                </Link>
              </span>
              <span className="nav-bar-wrapper__item">
                <Link to="/auth/signin" className="btn btn_secondary btn_size_xsm">
                  {text.signIn}
                </Link>
              </span>
            </>
          )}
          <span className="nav-bar-wrapper__item nav-bar-wrapper__item_width_200">
            <Link to="/auth/signup" className="btn btn_primary btn_size_sm">
              {text.signUp}
            </Link>
          </span>
          {user && !loading && (
            <>
              <ProfileSwitcher className="profile-switcher_margin" />
              <BurgerMenu />
            </>
          )}
          {loading && (
            <div className="nav-bar-spinner-wrapper">
              <Spinner width={34} height={34} />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
