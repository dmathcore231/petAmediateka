import { JSX } from "react"
import { Link, Outlet } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"

export function Profile(): JSX.Element {
  const classes = {
    base: "profile",
    navBar: "profile-nav-bar",
    navBarItem: "profile-nav-bar__item",
    navBarList: "profile-nav-bar-list",
    navBarListItem: "profile-nav-bar-list__item",
    navBarLink: "profile-nav-bar-list__link",
  }
  const linkClass = 'link link_primary link_color_white title title_size_s'

  const mainTitleMenu = 'Настройки'

  const renderNavBarList = (): JSX.Element => {
    const textLinks: string[] = [
      'Профили',
      'Покупки',
      'Способы оплаты',
      'Устройства',
      'Аккаунт',
      'Помощь и поддержка',
    ]
    return (
      <ul className={classes.navBarList}>
        {textLinks.map((text, index) => (
          <li className={classes.navBarListItem} key={index}>
            <Link to={'#'}
              className={`${classes.navBarLink} ${linkClass}`}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className={classes.base}>
      <nav className={classes.navBar}>
        <div className={classes.navBarItem}>
          <LinkBack activePage="Профиль" />
          <h2>{mainTitleMenu}</h2>
        </div>
        <div className={classes.navBarItem}>
          {renderNavBarList()}
        </div>
      </nav>
      <div className="profile-body">
        <Outlet />
      </div>
    </div>
  )
}
