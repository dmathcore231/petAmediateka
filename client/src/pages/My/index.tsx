import { JSX } from "react"
import { Outlet, NavLink } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"

const TITLE_CLASSES = "title title_size_m"
const LINK_CLASSES = "link link_primary link_color_white"
const LINK_ACTIVE_CLASSES = "link link_primary link_primary_active"
const CLASSES: Record<string, string> = {
  base: "my",
  item: "my__item",
  nav: "my-nav",
  navItem: "my-nav__item",
  navLink: "my-nav__link",
}

const renderMyList = (): JSX.Element => {
  const items: { title: string, link: string }[] = [
    { title: "Избранное", link: "/my/favorite" },
    { title: "История просмотров", link: "/my/history" },
    { title: "Покупки", link: "/my/purchase" },
  ]

  const setClassLink = (isActive: boolean): string => {
    return isActive
      ? `${CLASSES.navLink} ${LINK_ACTIVE_CLASSES} ${TITLE_CLASSES}`
      : `${CLASSES.navLink} ${LINK_CLASSES} ${TITLE_CLASSES}`
  }
  return (
    <ul className={CLASSES.nav}>
      {items.map((item) => (
        <li key={item.title} className={CLASSES.navItem}>
          <NavLink
            to={item.link}
            className={({ isActive }) => setClassLink(isActive)}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export function My(): JSX.Element {
  return (
    <div className={`${CLASSES.base} container`}>
      <div className={CLASSES.item}>
        <LinkBack activePage="Я смотрю" />
      </div>
      <div className={CLASSES.item}>
        <h1>Я смотрю</h1>
      </div>
      <nav className={CLASSES.item}>
        {renderMyList()}
      </nav>
      <div className={CLASSES.item}>
        <Outlet />
      </div>
    </div>
  )
}
