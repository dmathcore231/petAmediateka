import { Link, NavLink } from "react-router-dom"
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
              <li className="nav-bar-list__item">
                <NavLink to="/series"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm">Сериалы</span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/movies"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm">Фильмы</span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/collections"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm">Коллекции</span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/trailers"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm">Трейлеры</span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/kino1tv"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm">Кино1ТВ</span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/tv"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm">Эфир</span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/search"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm">Поиск</span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/blog"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm">Блог</span>
                </NavLink>
              </li>
            </ul>
            <ul className="nav-bar-list nav-bar-list_gap_sm">
              <li className="nav-bar-list__item">
                <NavLink to="/tos"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm title_color_gray">
                    Пользовательское соглашение
                  </span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/faq"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm title_color_gray">
                    FAQ
                  </span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/contacts"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm title_color_gray">
                    Контакты
                  </span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/partners"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm title_color_gray">
                    Партнерская программа
                  </span>
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/recommendations"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <span className="title title_size_sm title_color_gray">
                    В Амедиатеке применяются рекомендательные технологии
                  </span>
                </NavLink>
              </li>
            </ul>
            <ul className="nav-bar-list nav-bar-list_gap_sm nav-bar-list_padding_top">
              <li className="nav-bar-list__item">
                <NavLink to="/#"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <AppStoreIcon width={122} height={40} />
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/#"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <GooglePlayIcon width={122} height={40} />
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/#"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <AppGalleryIcon width={122} height={40} />
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/#"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <RuStoreIcon width={122} height={40} />
                </NavLink>
              </li>
              <li className="nav-bar-list__item">
                <NavLink to="/#"
                  className={({ isActive }) =>
                    isActive ? "nav-bar-list__link_active" : "nav-bar-list__link"
                  }
                >
                  <SmartTvIcon width={122} height={40} />
                </NavLink>
              </li>
            </ul>
            <ul className="nav-bar-list nav-bar-list_gap_sm nav-bar-list_padding_top">
              <li className="nav-bar-list__item">
                <Link to="/#"
                  className="link link_social"
                >
                  <TelegramIcon width={32} height={32} />
                </Link>
              </li>
              <li className="nav-bar-list__item">
                <Link to="/#"
                  className="link link_social"
                >
                  <VkIcon width={32} height={32} />
                </Link>
              </li>
              <li className="nav-bar-list__item">
                <Link to="/#"
                  className="link link_social"
                >
                  <YouTubeIcon width={32} height={32} />
                </Link>
              </li>
              <li className="nav-bar-list__item">
                <Link to="/#"
                  className="link link_social"
                >
                  <ZenIcon width={32} height={32} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="footer__item">
        <Link to="/" className="footer__link">
          <span className="title title_size_md title_color_gray">
            Поддержка
          </span>
        </Link>
        <Link to="/" className="footer__link">
          <span className="title">
            help@amediateka.ru
          </span>
        </Link>
      </div>
    </footer>
  )
}
