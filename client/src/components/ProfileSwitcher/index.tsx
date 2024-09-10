import { useState, useRef, MouseEvent } from "react"
import { useAppSelector } from "../../hooks"
import { Spinner } from "../Spinner"
import { ProfileSwitcherProps } from "../../types/interfaces/ProfileSwitcherProps"
import { Avatar } from "../Avatar"
import { PlusIcon } from "../../assets/icons/PlusIcon"

export function ProfileSwitcher({ className }: ProfileSwitcherProps): JSX.Element {
  const { user, loading } = useAppSelector(state => state.auth)
  const [isActive, setIsActive] = useState(false)
  const menuListRef = useRef<HTMLUListElement>(null)

  const handleClickSwitcherMenu = (event: MouseEvent) => {
    if (event.target !== menuListRef.current) {
      setIsActive(!isActive)
    }
  }

  return (
    <div className={"profile-switcher" + (className ? " " + className : "")}
      onClick={handleClickSwitcherMenu}>
      <div className={"profile-switcher-menu" + (isActive ? " profile-switcher-menu_active" : "")}>
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
                  Новый профиль
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
