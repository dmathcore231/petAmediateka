import { useState, useEffect, MouseEvent, JSX } from "react"
import { Link, NavLink } from "react-router-dom"
import { useAppSelector, useAppDispatch, useCheckBreakpoint } from "../../hooks"
import { fetchLogout } from "../../services/auth/authThunk"
import { Btn } from "../Btn"
import { Avatar } from "../Avatar"
import { BurgerMenuItem } from "../../types/interfaces/BurgerMenuItem"
import { BurgerMenuIcon } from "../../assets/icons/BurgerMenuIcon"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { PlusIcon } from "../../assets/icons/PlusIcon"
import { Logo } from "../../assets/icons/Logo"

export function BurgerMenu(): JSX.Element {
  const dispatch = useAppDispatch()
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_LG = useCheckBreakpoint(768)
  const { user } = useAppSelector(state => state.my)
  const [isActive, setIsActive] = useState(false)
  const baseClass = "burger-menu"
  const CLASSES = {
    isActive: isActive ? ` ${baseClass}_active` : "",
    aside: {
      base: "burger-menu-aside",
      header: {
        base: "burger-menu-aside-header",
        item: "burger-menu-aside-header__item",
        marginBottomItem: "burger-menu-aside-header__item_margin_bottom",
        title: "burger-menu-aside-header__title",
        btnClose: "burger-menu-aside-header__close-btn",
        wrapper: "burger-menu-aside-header__wrapper",
        logo: "burger-menu-aside-header__logo",
      },
      body: "burger-menu-aside-body",
      navBar: {
        base: "burger-menu-aside-nav-bar",
        list: "burger-menu-aside-nav-bar-list",
        listItem: "burger-menu-aside-nav-bar-list__item",
        link: "burger-menu-aside-nav-bar-list__link",
        linkActive: "burger-menu-aside-nav-bar-list__link_active",
      },
    },
    wrapper: `${baseClass}__wrapper`,
  }
  const menuItems: BurgerMenuItem[] = [
    {
      to: "/my/favorite",
      text: "Избранное",
      className: "link link_white title title_size_s",
      onClick: handleClickCloseBtn,
      typeLink: "link",
    },
    {
      to: "/my/history",
      text: "История просмотров",
      className: "link link_white title title_size_s",
      onClick: handleClickCloseBtn,
      typeLink: "link",
    },
    {
      to: "/profile/settings",
      text: "Настройки",
      className: "link link_white title title_size_s",
      onClick: handleClickCloseBtn,
      typeLink: "link",
    },
    {
      to: "/my/purchase",
      text: "Покупки",
      className: "link link_white title title_size_s",
      onClick: handleClickCloseBtn,
      typeLink: "link",
    },
    {
      to: "#",
      text: "Выйти из аккаунта",
      className: "link link_gray title title_size_s",
      onClick: handleClickLogout,
      typeLink: "link",
    }
  ]
  const menuItemsMobile: BurgerMenuItem[] = [
    {
      to: "/collection-series",
      text: "Сериалы",
      typeLink: "nav",
    },
    {
      to: "/movies",
      text: "Фильмы",
      typeLink: "nav",
    },
    {
      to: "/collections",
      text: "Коллекции",
      typeLink: "nav",
    },
    {
      to: "/trailers",
      text: "Трейлеры",
      typeLink: "nav",
    },
    {
      to: "/kino1tv",
      text: "Кино1ТВ",
      typeLink: "nav",
    },
    {
      to: "/tv",
      text: "Эфир",
      typeLink: "nav",
    },
  ]

  useEffect((): void => {
    const layoutElement = document.querySelector('.layout')
    if (isActive) {
      layoutElement?.classList.add('layout_fixed')
    } else {
      layoutElement?.classList.remove('layout_fixed')
    }
  }, [isActive])

  function handleClickCloseBtn(event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>): void {
    event.stopPropagation()
    setIsActive(false)
  }

  function handleClickLogout(): void {
    const layoutElement: HTMLElement | null = document.querySelector('.layout')
    layoutElement?.classList.remove('layout_fixed')
    dispatch(fetchLogout())
  }

  const handleClickBurgerMenu = (): void => {
    setIsActive(true)
  }

  const renderBurgerMenuItems = (menuItems: BurgerMenuItem[]): JSX.Element[] => {
    const toggleClassNavLink = (isActive: boolean): string => {
      return isActive ? `${CLASSES.aside.navBar.link} ${CLASSES.aside.navBar.linkActive} title` : `${CLASSES.aside.navBar.link} title`
    }
    return menuItems.map((item, index) => (
      <li key={index} className={CLASSES.aside.navBar.listItem}>
        {item.typeLink === 'link'
          ? (<Link
            to={item.to}
            className={item.className}
            onClick={item.onClick}
          >
            {item.text}
          </Link>)
          : (<NavLink
            to={item.to}
            className={({ isActive }) => toggleClassNavLink(isActive)}
          >
            {item.text}
          </NavLink>)
        }
      </li>
    ))
  }

  const renderBurgerMenu = (mobileBreakpoint: boolean, userAuth: boolean): JSX.Element => {

    if (mobileBreakpoint && !userAuth) {
      return (
        <div className={`${baseClass}${CLASSES.isActive}`}
          onClick={handleClickBurgerMenu}>
          <BurgerMenuIcon width={34} height={34} />
          <div className={CLASSES.wrapper}>
            <aside className={CLASSES.aside.base}>
              <div className={CLASSES.aside.header.base}>
                <div className={`${CLASSES.aside.header.item} ${CLASSES.aside.header.marginBottomItem}`}>
                  <div className={CLASSES.aside.header.wrapper}>
                    <div className={CLASSES.aside.header.logo}>
                      <Logo width={120} height={16} />
                    </div>
                    <div className={CLASSES.aside.header.btnClose}>
                      <Btn
                        type="button"
                        className="btn_transparent"
                        onClick={(event) => handleClickCloseBtn(event)}
                      >
                        <CloseIcon width={16} height={16} />
                      </Btn>
                    </div>
                  </div>
                </div>
                <div className={CLASSES.aside.header.item}>
                  <Link to={'/auth/signin'} className="btn btn_secondary btn_size_sm">
                    Войти
                  </Link>
                </div>
                <div className={CLASSES.aside.header.item}>
                  <Link to={'/auth/signup'} className="btn btn_primary btn_size_sm">
                    Попробовать за 1₽
                  </Link>
                </div>
                <div className={CLASSES.aside.header.item}>
                  <Link to={'/'} className="btn btn_secondary btn_size_sm">
                    Ввести промокод
                  </Link>
                </div>
              </div>
              <div className={CLASSES.aside.body}>
                <nav className={CLASSES.aside.navBar.base}>
                  <ul className={CLASSES.aside.navBar.list}>
                    {renderBurgerMenuItems(menuItemsMobile)}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      )
    }

    return (
      <div className={`${baseClass}${CLASSES.isActive}`}
        onClick={handleClickBurgerMenu}>
        <BurgerMenuIcon width={34} height={34} />
        <div className="burger-menu__wrapper">
          <div className="burger-menu__overlay"></div>
          <aside className="burger-menu-aside">
            <div className="burger-menu-aside-header">
              <div className="burger-menu-aside-header__item burger-menu-aside-header__item_jc">
                <div className="burger-menu-aside-header__title title title_size_m title_color_gray">
                  Выбор профиля
                </div>
                <div className="burger-menu-aside-header__close-btn">
                  <Btn
                    type="button"
                    className="btn_transparent"
                    onClick={(event) => handleClickCloseBtn(event)}
                  >
                    <CloseIcon width={BREAKPOINT_XL ? 20 : 24} height={BREAKPOINT_XL ? 20 : 24} />
                  </Btn>
                </div>
              </div>
              <div className="burger-menu-aside-header__item">
                <Link
                  to="/profile"
                  className="burger-menu-aside-header__avatar"
                  onClick={handleClickCloseBtn}
                >
                  <Avatar size="md" className="avatar__img_border_white" />
                </Link>
                <Link
                  to="/profile"
                  className="burger-menu-aside-header__profile-name title title_size_xm"
                  onClick={handleClickCloseBtn}
                >
                  {user?.userData.profileName}
                </Link>
              </div>
              <div className="burger-menu-aside-header__item">
                <span className="burger-menu-aside-header__new-profile">
                  <PlusIcon width={36} height={36} />
                </span>
                <span className="burger-menu-aside-header__profile-name title title_size_xm">
                  Новый профиль
                </span>
              </div>
            </div>
            <div className="burger-menu-aside-body">
              <div className="burger-menu-aside-subscription">
                <div className="burger-menu-aside-subscription__title">
                  <span className="text">Подписка</span>
                  <span className="text">Амедиатека</span>
                  <img src="/BuyButtonBanner.png"
                    alt="banner" className="burger-menu-aside-subscription__banner" />
                </div>
                <Btn
                  type="button"
                  className="btn_primary btn_size_sm"
                  onClick={() => console.log('click')}
                >
                  Оформить Подписку
                </Btn>
              </div>
              <div className="burger-menu-aside__active-promo">
                <Btn
                  type="button"
                  className="btn_secondary btn_size_sm"
                  onClick={() => console.log('click')}
                >
                  Активировать промокод
                </Btn>
              </div>
              <nav className="burger-menu-aside-nav-bar">
                <ul className="burger-menu-aside-nav-bar-list">
                  {renderBurgerMenuItems(menuItems)}
                </ul>
              </nav>
            </div>
            <div className={CLASSES.aside.body}>
              <nav className={CLASSES.aside.navBar.base}>
                <ul className={CLASSES.aside.navBar.list}>
                  {renderBurgerMenuItems(menuItemsMobile)}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderBurgerMenu(BREAKPOINT_LG, Boolean(user))}
    </>
  )
}
