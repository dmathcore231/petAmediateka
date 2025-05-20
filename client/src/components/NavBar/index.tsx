import { Link, NavLink, useLocation } from "react-router-dom"
import { JSX } from "react"
import { useAppSelector, useCheckBreakpoint } from "../../hooks"
import { ProfileSwitcher } from "../ProfileSwitcher"
import { Spinner } from "../Spinner"
import { BurgerMenu } from "../BurgerMenu"
import { Dropdowns } from "../Dropdowns"
import { Logo } from "../../assets/icons/Logo"
import { SearchIcon } from "../../assets/icons/SearchIcon"
import { MoreLineIcon } from "../../assets/icons/MoreLineIcon"

const CLASSES: Record<string, string> = {
  base: "nav-bar",
  item: "nav-bar__item",
  logo: "nav-bar__logo",
  list: "nav-bar-list",
  listItem: "nav-bar-list__item",
  listItemCursorPointer: "nav-bar-list__item_cursor_pointer",
  listItemHover: "nav-bar-list__item_hover",
  link: "nav-bar-list__link",
  linkActive: "nav-bar-list__link_active",
  title: "title",
}

const toggleLinkIsActive = (isActive: boolean): string => isActive
  ? CLASSES.linkActive
  : CLASSES.link

const text: Record<string, string> = {
  promoCode: "Ввести промокод",
  signIn: "Войти",
  signUp: "Попробовать за 1₽",
}

export function NavBar(): JSX.Element {
  const location = useLocation()
  const breakpointXL = useCheckBreakpoint(1600)
  const breakpointMD = useCheckBreakpoint(768)
  const { user } = useAppSelector(state => state.my)
  const { loading } = useAppSelector(state => state.auth)
  const paddingNoneClass: string = location.pathname === "/"
    ? ""
    : " nav-bar_padding-horizontal_none"

  const renderList = (showDropdowns: boolean): JSX.Element => {
    const CONFIG_LIST: { url: string, value: string, navLink: boolean }[] = [
      { url: '/collection-series', value: 'Сериалы', navLink: true },
      { url: '/movies', value: 'Фильмы', navLink: true },
      { url: '/collections', value: 'Коллекции', navLink: true },
      { url: '/trailers', value: 'Трейлеры', navLink: true },
      { url: '/kino1tv', value: 'Кино1ТВ', navLink: true },
      { url: '/tv', value: 'Эфир', navLink: true },
      { url: '/search', value: 'Поиск', navLink: false },
    ]

    if (showDropdowns) {
      const filterNumbers = 3
      const newList = CONFIG_LIST.slice(0, filterNumbers)

      return (
        <ul className={CLASSES.list}>
          {newList.map(({ url, value }, index) => (
            <>
              <li className={CLASSES.listItem} key={index}>
                <NavLink to={url}
                  className={({ isActive }) => toggleLinkIsActive(isActive)}
                >
                  {value === "Поиск"
                    ? (<SearchIcon width={20} height={20} />)
                    : (<span className={CLASSES.title}>
                      {value}
                    </span>)
                  }

                </NavLink>
              </li>
            </>
          ))}
          <li className={`${CLASSES.listItem}
            ${CLASSES.listItemCursorPointer}
            ${CLASSES.listItemHover}`
          }>
            <MoreLineIcon width={20} height={20} />
            <Dropdowns items={CONFIG_LIST.slice(filterNumbers)} />
          </li>
        </ul>
      )
    }
    return (
      <ul className={CLASSES.list}>
        {CONFIG_LIST.map(({ url, value }, index) => (
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

  if (!breakpointMD) {
    return (
      <nav className={`${CLASSES.base}${paddingNoneClass}`}>
        <div className={CLASSES.item}>
          <Link to="/" className={CLASSES.logo}>
            <Logo width={168} height={16} />
          </Link>
          {renderList(breakpointXL)}
        </div>
        <div className={CLASSES.item}>
          <div className="nav-bar-wrapper">
            {!user && !loading && (
              <>
                <span className="nav-bar-wrapper__item nav-bar-wrapper__item_margin nav-bar-wrapper__item_width_lg">
                  <Link to="/" className="btn btn_secondary btn_size_sm">
                    {text.promoCode}
                  </Link>
                </span>
                <span className="nav-bar-wrapper__item">
                  <Link to="/auth/signin" className="btn btn_secondary btn_size_sm">
                    {text.signIn}
                  </Link>
                </span>
              </>
            )}
            <span className="nav-bar-wrapper__item nav-bar-wrapper__item_width_lg">
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

  return (
    <nav className={`${CLASSES.base}${paddingNoneClass}`}>
      <div className={CLASSES.item}>
        <Link to="/" className={CLASSES.logo}>
          <Logo width={168} height={16} />
        </Link>
      </div>
      <div className={CLASSES.item}>
        <ul className={CLASSES.list}>
          <li className={CLASSES.listItem}>
            <NavLink to={'/search'}
              className={({ isActive }) => toggleLinkIsActive(isActive)}
            >
              <SearchIcon width={20} height={20} />
            </NavLink>
          </li>
          <li className={CLASSES.listItem}>
            <BurgerMenu />
          </li>
        </ul>
      </div>
    </nav>
  )
}
