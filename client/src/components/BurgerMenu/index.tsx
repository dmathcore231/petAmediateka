import { useState, useEffect, MouseEvent, JSX } from "react"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { fetchLogout } from "../../services/auth/authThunk"
import { Btn } from "../Btn"
import { Avatar } from "../Avatar"
import { BurgerMenuItem } from "../../types/interfaces/BurgerMenuItem"
import { BurgerMenuIcon } from "../../assets/icons/BurgerMenuIcon"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { PlusIcon } from "../../assets/icons/PlusIcon"

export function BurgerMenu(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.my)

  const [isActive, setIsActive] = useState(false)

  const baseClasss = "burger-menu"
  const isActiveClass = isActive ? " burger-menu_active" : ""

  const menuItems: BurgerMenuItem[] = [
    {
      to: "/my/favorite",
      text: "Избранное",
      className: "link link_white title title_size_s",
      onClick: handleClickCloseBtn
    },
    {
      to: "/my/history",
      text: "История просмотров",
      className: "link link_white title title_size_s",
      onClick: handleClickCloseBtn
    },
    {
      to: "/profile/settings",
      text: "Настройки",
      className: "link link_white title title_size_s",
      onClick: handleClickCloseBtn
    },
    {
      to: "/my/purchase",
      text: "Покупки",
      className: "link link_white title title_size_s",
      onClick: handleClickCloseBtn
    },
    {
      to: "#",
      text: "Выйти из аккаунта",
      className: "link link_gray title title_size_s",
      onClick: handleClickLogout
    }
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
    return menuItems.map((item, index) => (
      <li key={index} className="burger-menu-aside__item">
        <Link
          to={item.to}
          className={item.className}
          onClick={item.onClick}
        >
          {item.text}
        </Link>
      </li>
    ))
  }

  return (
    <div className={`${baseClasss}${isActiveClass}`}
      onClick={handleClickBurgerMenu}>
      <BurgerMenuIcon width={34} height={34} />
      <div className="burger-menu__wrapper">
        <div className="burger-menu__overlay"></div>
        <aside className="burger-menu-aside">
          <div className="burger-menu-aside-header">
            <div className="burger-menu-aside-header__item burger-menu-aside-header__item_jc">
              <div className="burger-menu-aside-header__title title title_color_gray">
                Выбор профиля
              </div>
              <div className="burger-menu-aside-header__close-btn">
                <Btn
                  type="button"
                  className="btn_transparent"
                  onClick={(event) => handleClickCloseBtn(event)}
                >
                  <CloseIcon width={24} height={24} />
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
                className="burger-menu-aside-header__profile-name"
                onClick={handleClickCloseBtn}
              >
                {user?.userData.profileName}
              </Link>
            </div>
            <div className="burger-menu-aside-header__item">
              <span className="burger-menu-aside-header__new-profile">
                <PlusIcon width={36} height={36} />
              </span>
              <span className="burger-menu-aside-header__profile-name">
                Новый профиль
              </span>
            </div>
          </div>
          <div className="burger-menu-aside-body">
            <div className="burger-menu-aside-subscription">
              <div className="burger-menu-aside-subscription__title">
                <span className="title">Подписка</span>
                <span className="title">Амедиатека</span>
                <img src="/BuyButtonBanner.png" alt="banner" className="burger-menu-aside-subscription__banner" />
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
        </aside>
      </div>
    </div>
  )
}
