import { useState, useEffect, MouseEvent } from "react"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { fetchLogout } from "../../redux/authSlice"
import { resetStatusResponse } from "../../redux/statusResponseSlice"
import { Btn } from "../Btn"
import { Avatar } from "../Avatar"
import { BurgerMenuIcon } from "../../assets/icons/BurgerMenuIcon"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { PlusIcon } from "../../assets/icons/PlusIcon"

export function BurgerMenu(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const layoutElement = document.querySelector('.layout')
    if (isActive) {
      layoutElement?.classList.add('layout_fixed')
    } else {
      layoutElement?.classList.remove('layout_fixed')
    }
  }, [isActive])

  const handleClickBurgerMenu = () => {
    setIsActive(true)
  }

  const handleClickCloseBtn = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsActive(false)
  }

  const handleClickLogout = () => {
    const layoutElement = document.querySelector('.layout')
    dispatch(fetchLogout())
    layoutElement?.classList.remove('layout_fixed')
  }

  return (
    <div className={"burger-menu" + (isActive ? " burger-menu_active" : "")}
      onClick={handleClickBurgerMenu}>
      <BurgerMenuIcon width={34} height={34} />
      <div className="burger-menu__wrapper">
        <div className="burger-menu__overlay"></div>
        <aside className="burger-menu-aside">
          <div className="burger-menu-aside-header">
            <div className="burger-menu-aside-header__close-btn">
              <Btn
                type="button"
                className="btn_transparent"
                onClick={(event) => handleClickCloseBtn(event)}
              >
                <CloseIcon width={24} height={24} />
              </Btn>
            </div>
            <div className="burger-menu-aside-header__item">
              <span className="burger-menu-aside-header__avatar">
                <Avatar size="md" className="avatar__img_border_white" />
              </span>
              <span className="burger-menu-aside-header__profile-name">
                {user?.userData.profileName}
              </span>
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
                <li className="burger-menu-aside-nav-bar-list__item">
                  <Link to="#" className="link link_white title title_size_lm">
                    Избранное
                  </Link>
                </li>
                <li className="burger-menu-aside-nav-bar-list__item">
                  <Link to="#" className="link link_white title title_size_lm">
                    История просмотров
                  </Link>
                </li>
                <li className="burger-menu-aside-nav-bar-list__item">
                  <Link to="#" className="link link_white title title_size_lm">
                    Настроики
                  </Link>
                </li>
                <li className="burger-menu-aside-nav-bar-list__item">
                  <Link to="#" className="link link_white title title_size_lm">
                    Покупки
                  </Link>
                </li>
                <li className="burger-menu-aside-nav-bar-list__item">
                  <Link to="#"
                    className="link link_gray title title_size_lm"
                    onClick={handleClickLogout}
                  >
                    Выйти из аккаунта
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  )
}
