import { JSX } from "react"
import { Link, NavLink } from "react-router-dom"
import { NavBarItemFooterTypes } from "../../types/NavBarItemFooterTypes"
import { ConfigNavBarFooterItems } from "../../types/interfaces/ConfigNavBarFooterItems"
import { Logo } from "../../assets/icons/Logo"
import { AppStoreIcon } from "../../assets/icons/AppStoreIcon"
import { GooglePlayIcon } from "../../assets/icons/GooglePlayIcon"
import { AppGalleryIcon } from "../../assets/icons/AppGalleryIcon"
import { RuStoreIcon } from "../../assets/icons/RuStoreIcon"
import { SmartTvIcon } from "../../assets/icons/SmartTvIcon"
import { TelegramIcon } from "../../assets/icons/TelegramIcon"
import { VkIcon } from "../../assets/icons/VkIcon"
import { YouTubeIcon } from "../../assets/icons/YouTubeIcon"
import { ZenIcon } from "../../assets/icons/ZenIcon"

export function Footer(): JSX.Element {
  const text = {
    email: 'help@amediateka.ru',
    support: 'Поддержка',
  }

  const renderNavBarItems = (type: NavBarItemFooterTypes): JSX.Element => {
    const config: Record<NavBarItemFooterTypes, ConfigNavBarFooterItems[]> = {
      main: [
        { url: '/collection-series', value: 'Сериалы' },
        { url: '/movies', value: 'Фильмы' },
        { url: '/collections', value: 'Коллекции' },
        { url: '/trailers', value: 'Трейлеры' },
        { url: '/kino1tv', value: 'Кино1ТВ' },
        { url: '/tv', value: 'Эфир' },
        { url: '/search', value: 'Поиск' },
        { url: '/blog', value: 'Блог' },
      ],
      secondary: [
        { url: '/tos', value: 'Пользовательское соглашение' },
        { url: '/faq', value: 'FAQ' },
        { url: '/contacts', value: 'Контакты' },
        { url: '/partners', value: 'Партнерская программа' },
        { url: '/recommendations', value: 'В Амедиатеке применяются рекомендательные технологии' },
      ],
      store: [
        { url: '#', value: (<AppStoreIcon width={122} height={40} />) },
        { url: '#', value: (<GooglePlayIcon width={122} height={40} />) },
        { url: '#', value: (<AppGalleryIcon width={122} height={40} />) },
        { url: '#', value: (<RuStoreIcon width={122} height={40} />) },
        { url: '#', value: (<SmartTvIcon width={122} height={40} />) },
      ],
      social: [
        { url: '#', value: (<TelegramIcon width={40} height={40} />) },
        { url: '#', value: (<VkIcon width={40} height={40} />) },
        { url: '#', value: (<YouTubeIcon width={40} height={40} />) },
        { url: '#', value: (<ZenIcon width={40} height={40} />) },
      ]
    }

    const setClassLink = (isActive: boolean, typeLink: NavBarItemFooterTypes): string => {
      const socialClass = 'link link_social'
      const baseClass = typeLink === 'social'
        ? socialClass
        : 'nav-bar-list__link'
      const activeLinkClass = isActive && typeLink !== 'social'
        ? " nav-bar-list__link_active"
        : ""

      return `${baseClass}${activeLinkClass}`
    }
    const renderLinkValue = (value: string | JSX.Element): JSX.Element => typeof value === 'string'
      ? <span className="text text_size_s">{value}</span>
      : value

    return (
      <>
        {Object.values(config[type]).map(({ url, value }, index) => (
          <li key={index} className="nav-bar-list__item">
            <NavLink to={url}
              className={({ isActive }) => setClassLink(isActive, type)}
            >
              {renderLinkValue(value)}
            </NavLink>
          </li>
        ))}
      </>
    )
  }

  return (
    <footer className="footer container">
      <div className="footer__item">
        <Link to="/" className="footer__link-home">
          <Logo width={168} height={16} />
        </Link>
      </div>
      <div className="footer__item">
        <div className="footer-menu">
          <nav className="footer-nav-bar">
            <ul className="nav-bar-list">
              {renderNavBarItems('main')}
            </ul>
            <ul className="nav-bar-list nav-bar-list_gap_sm">
              {renderNavBarItems('secondary')}
            </ul>
            <ul className="nav-bar-list nav-bar-list_gap_sm nav-bar-list_padding_top">
              {renderNavBarItems('store')}
            </ul>
            <ul className="nav-bar-list nav-bar-list_gap_sm nav-bar-list_padding_top">
              {renderNavBarItems('social')}
            </ul>
          </nav>
        </div>
      </div>
      <div className="footer__item">
        <Link to="/" className="footer__link">
          <span className="value value_color_gray">
            {text.support}
          </span>
        </Link>
        <Link to="/" className="footer__link">
          <span className="value">
            {text.email}
          </span>
        </Link>
      </div>
    </footer>
  )
}
