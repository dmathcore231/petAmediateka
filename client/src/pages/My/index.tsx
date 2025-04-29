import { JSX } from "react"
import { Outlet, NavLink } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"

const TITLE_CLASSES = "title title_size_m"
const LINK_CLASSES = "link link_primary link_color_white"
const LINK_ACTIVE_CLASSES = "link link_primary link_primary_active"

const TEXT = {
  title: "Я смотрю"
}

const renderNavBarList = (): JSX.Element => {
  const items: { title: string, link: string }[] = [
    { title: "Избранное", link: "/my/favorite" },
    { title: "История просмотров", link: "/my/history" },
    { title: "Покупки", link: "/my/purchase" },
  ]

  const setClassLink = (isActive: boolean): string => {
    const navLinkClass = "my-header-nav-bar-list__link"
    return isActive
      ? `${navLinkClass} ${LINK_ACTIVE_CLASSES} ${TITLE_CLASSES}`
      : `${navLinkClass} ${LINK_CLASSES} ${TITLE_CLASSES}`
  }
  return (
    <ul className="my-header-nav-bar-list">
      {items.map((item) => (
        <li key={item.title} className="my-header-nav-bar-list__item">
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
    <div className="my">
      <div className="my-header">
        <div className="my-header__wrapper container">
          <div className="my-header__title">
            <LinkBack activePage="Я смотрю" />
            <h2>{TEXT.title}</h2>
          </div>
          <nav className="my-header-nav-bar">
            {renderNavBarList()}
          </nav>
        </div>
      </div>
      <div className="my-body container">
        <Outlet />
      </div>
    </div>
  )
}
