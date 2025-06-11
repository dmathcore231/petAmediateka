import { useState, useEffect, MouseEvent, JSX } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCheckBreakpoint } from "../../hooks"
import { Btn } from "../Btn"
import { Avatar } from "../Avatar"
import { BurgerMenuItem } from "../../types/interfaces/BurgerMenuItem"
import { BurgerMenuProps } from "../../types/interfaces/BurgerMenuProps"
import { AvatarProps } from "../../types/interfaces/AvatarProps"
import { BurgerMenuIcon } from "../../assets/icons/BurgerMenuIcon"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { PlusIcon } from "../../assets/icons/PlusIcon"
import { Logo } from "../../assets/icons/Logo"

export function BurgerMenu({ user, onLogout }: BurgerMenuProps): JSX.Element {
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_LG = useCheckBreakpoint(768)
  const [isActive, setIsActive] = useState(false)

  const BASE_CLASS = "burger-menu"
  const ASIDE_BASE_CLASS = `${BASE_CLASS}-aside`
  const ASIDE_HEADER_BASE_CLASS = `${ASIDE_BASE_CLASS}-header`
  const ASIDE_NAV_BAR_BASE_CLASS = `${ASIDE_BASE_CLASS}-nav-bar`
  const ASIDE_SUBSCRIPTION_BASE_CLASS = `${ASIDE_BASE_CLASS}-subscription`
  const CLASSES = {
    isActive: isActive ? ` ${BASE_CLASS}_active` : "",
    aside: {
      header: {
        item: `${ASIDE_HEADER_BASE_CLASS}__item`,
        marginBottomItem: `${ASIDE_HEADER_BASE_CLASS}__item_margin_bottom`,
        jc: `${ASIDE_HEADER_BASE_CLASS}__item_jc`,
        title: `${ASIDE_HEADER_BASE_CLASS}__title`,
        btnClose: `${ASIDE_HEADER_BASE_CLASS}__btn-close`,
        wrapper: `${ASIDE_HEADER_BASE_CLASS}__wrapper`,
        logo: `${ASIDE_HEADER_BASE_CLASS}__logo`,
        newProfile: `${ASIDE_HEADER_BASE_CLASS}__new-profile`,
        profileName: `${ASIDE_HEADER_BASE_CLASS}__profile-name`,
      },
      body: `${ASIDE_BASE_CLASS}-body`,
      navBar: {
        list: `${ASIDE_NAV_BAR_BASE_CLASS}-list`,
        listItem: `${ASIDE_NAV_BAR_BASE_CLASS}-list__item`,
        link: `${ASIDE_NAV_BAR_BASE_CLASS}-list__link`,
        linkActive: `${ASIDE_NAV_BAR_BASE_CLASS}-list__link_active`,
      },
      subscription: {
        title: `${ASIDE_SUBSCRIPTION_BASE_CLASS}__title`,
        banner: `${ASIDE_SUBSCRIPTION_BASE_CLASS}__banner`,
      },
      activePromo: `${ASIDE_BASE_CLASS}__active-promo`
    },
    wrapper: `${BASE_CLASS}__wrapper`,
    overlay: `${BASE_CLASS}__overlay`,
    title: {
      base: "title",
      sizeM: "title_size_m",
      sizeXM: "title_size_xm",
      colorGray: "title_color_gray",
    }
  }
  const TEXT = {
    btn: {
      signIn: "Войти",
      signUp: "Попробовать за 1₽",
      promoCode: "Ввести промокод",
    },
    burgerMenu: {
      titleHeader: "Выбор профиля",
      createProfile: "Новый профиль",
      activatePromo: "Активировать промокод",
    },
    banner: {
      preTitle: "Подписка",
      title: "Амедиатека",
      btn: "Оформить подписку",
    }
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
      onClick: onLogout,
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

  const avatarProps: AvatarProps = {
    size: "md",
    className: "avatar__img_border_white",
    user,
  }

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
        <div className={`${BASE_CLASS}${CLASSES.isActive}`}
          onClick={handleClickBurgerMenu}>
          <BurgerMenuIcon width={34} height={34} />
          <div className={CLASSES.wrapper}>
            <aside className={ASIDE_BASE_CLASS}>
              <div className={ASIDE_HEADER_BASE_CLASS}>
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
                    {TEXT.btn.signIn}
                  </Link>
                </div>
                <div className={CLASSES.aside.header.item}>
                  <Link to={'/auth/signup'} className="btn btn_primary btn_size_sm">
                    {TEXT.btn.signUp}
                  </Link>
                </div>
                <div className={CLASSES.aside.header.item}>
                  <Link to={'/'} className="btn btn_secondary btn_size_sm">
                    {TEXT.btn.promoCode}
                  </Link>
                </div>
              </div>
              <div className={CLASSES.aside.body}>
                <nav className={ASIDE_NAV_BAR_BASE_CLASS}>
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
      <div className={`${BASE_CLASS}${CLASSES.isActive}`}
        onClick={handleClickBurgerMenu}>
        <BurgerMenuIcon width={34} height={34} />
        <div className={CLASSES.wrapper}>
          <div className={CLASSES.overlay} />
          <aside className={ASIDE_BASE_CLASS}>
            <div className={ASIDE_HEADER_BASE_CLASS}>
              <div className={`${CLASSES.aside.header.item} ${CLASSES.aside.header.jc}`}>
                <div className={`${CLASSES.aside.header.title} ${CLASSES.title.base} ${CLASSES.title.sizeM} ${CLASSES.title.colorGray}`}>
                  {TEXT.burgerMenu.titleHeader}
                </div>
                <div className={CLASSES.aside.header.btnClose}>
                  <Btn
                    type="button"
                    className="btn_transparent"
                    onClick={(event) => handleClickCloseBtn(event)}
                  >
                    <CloseIcon width={BREAKPOINT_XL ? 20 : 24} height={BREAKPOINT_XL ? 20 : 24} />
                  </Btn>
                </div>
              </div>
              <div className={CLASSES.aside.header.item}>
                <Link
                  to="/profile"
                  className="burger-menu-aside-header__avatar"
                  onClick={handleClickCloseBtn}
                >
                  <Avatar {...avatarProps} />
                </Link>
                <Link
                  to="/profile"
                  className="burger-menu-aside-header__profile-name title title_size_xm"
                  onClick={handleClickCloseBtn}
                >
                  {user?.userData.profileName}
                </Link>
              </div>
              <div className={CLASSES.aside.header.item}>
                <span className={CLASSES.aside.header.newProfile}>
                  <PlusIcon width={36} height={36} />
                </span>
                <span className={`${CLASSES.aside.header.profileName} ${CLASSES.title.base} ${CLASSES.title.sizeXM}`}>
                  {TEXT.burgerMenu.createProfile}
                </span>
              </div>
            </div>
            <div className={CLASSES.aside.body}>
              <div className={ASIDE_SUBSCRIPTION_BASE_CLASS}>
                <div className={CLASSES.aside.subscription.title}>
                  <span className="text">{TEXT.banner.preTitle}</span>
                  <span className="text">{TEXT.banner.title}</span>
                  <img src="/BuyButtonBanner.png"
                    alt="banner" className={CLASSES.aside.subscription.banner} />
                </div>
                <Btn
                  type="button"
                  className="btn_primary btn_size_sm"
                  onClick={() => console.log('click')}
                >
                  {TEXT.banner.btn}
                </Btn>
              </div>
              <div className={CLASSES.aside.activePromo}>
                <Btn
                  type="button"
                  className="btn_secondary btn_size_sm"
                  onClick={() => console.log('click')}
                >
                  {TEXT.burgerMenu.activatePromo}
                </Btn>
              </div>
              <nav className={ASIDE_NAV_BAR_BASE_CLASS}>
                <ul className={CLASSES.aside.navBar.list}>
                  {renderBurgerMenuItems(menuItems)}
                </ul>
              </nav>
            </div>
            <div className={CLASSES.aside.body}>
              <nav className={ASIDE_NAV_BAR_BASE_CLASS}>
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
