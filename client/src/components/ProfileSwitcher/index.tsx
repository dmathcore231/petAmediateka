import { useState, useRef, MouseEvent, JSX } from "react"
import { useAppSelector } from "../../hooks"
import { Spinner } from "../Spinner"
import { ProfileSwitcherProps } from "../../types/interfaces/ProfileSwitcherProps"
import { Avatar } from "../Avatar"
import { PlusIcon } from "../../assets/icons/PlusIcon"

export function ProfileSwitcher({ className }: ProfileSwitcherProps): JSX.Element {
  const { user, loading } = useAppSelector(state => state.my)
  const [isActive, setIsActive] = useState(false)
  const menuListRef = useRef<HTMLUListElement>(null)
  const textNewProfile: string = "Новый профиль"

  const handleClickSwitcherMenu = (event: MouseEvent): void => {
    if (event.target !== menuListRef.current) {
      setIsActive(!isActive)
    }
  }

  const setClassSwitcher = (): string => {
    const baseClass: string = "profile-switcher"
    const customClass: string = className ? " " + className : ""

    return `${baseClass}${customClass}`
  }

  const setClassSwitcherMenu = (): string => {
    const baseClass = "profile-switcher-menu"
    const isActiveClass = isActive ? " profile-switcher-menu_active" : ""

    return `${baseClass}${isActiveClass}`
  }

  return (
    <div className={setClassSwitcher()}
      onClick={handleClickSwitcherMenu}>
      <div className={setClassSwitcherMenu()}>
        <Avatar size="sm" className="avatar__img_scale"
        />
        <ul className="profile-switcher-menu-list" ref={menuListRef}>
          {loading && (
            <Spinner width={20} height={20} />
          )}
          {user && (
            <>
              <li className="profile-switcher-menu-list__item">
                <span className="profile-switcher-menu-list__avatar">
                  <Avatar size="sm" className="avatar__img_border_white" />
                </span>
                <span className="profile-switcher-menu-list__profile-name">
                  {user.userData.profileName}
                </span>
              </li>
              <li className="profile-switcher-menu-list__item">
                <span className="profile-switcher-menu-list__new-profile">
                  <PlusIcon width={26} height={26} />
                </span>
                <span className="profile-switcher-menu-list__profile-name">
                  {textNewProfile}
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
