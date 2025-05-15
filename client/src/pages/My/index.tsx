import { JSX } from "react"
import { Outlet, NavLink } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"

const TITLE_CLASSES = "title title_size_m"
const LINK_CLASSES = "link link_primary link_color_white"
const LINK_ACTIVE_CLASSES = "link link_primary link_primary_active"

const TEXT: Record<string, string> = {
  title: "Я смотрю",
  btn: "Редактировать избранное",
  activePage: "Я смотрю",
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

const baseClass = "my"
const headerWrapperClass = `${baseClass}-header__wrapper`
const headerClass = `${baseClass}-header`
const navBarClass = `${headerClass}-nav-bar`
const classes: Record<string, string> = {
  headerWrapperClass: `${headerClass}__wrapper`,
  headerWrapperVariablesClass: `${headerWrapperClass}_flex_direction_row ${headerWrapperClass}_flex_justify_sb ${headerWrapperClass}_width_full`,
  headerTitle: `${headerClass}__title`,
}

export function My(): JSX.Element {

  return (
    <div className={baseClass}>
      <div className={headerClass}>
        <div className={`${headerWrapperClass} container`}>
          <div className={classes.headerTitle}>
            <LinkBack activePage={TEXT.activePage} />
            <h2>{TEXT.title}</h2>
          </div>
          <div className={`${headerWrapperClass} ${classes.headerWrapperVariablesClass}`}>
            <nav className={navBarClass}>
              {renderNavBarList()}
            </nav>
          </div>
        </div>
      </div>
      <div className="my-body container">
        <Outlet />
      </div>
    </div>
  )
}
