import { useState } from "react"
import { useAppSelector } from "../../hooks"
import { Spinner } from "../Spinner"
import { ProfileSwitcherProps } from "../../types/interfaces/ProfileSwitcherProps"
import { Avatar } from "../Avatar"

export function ProfileSwitcher({ className }: ProfileSwitcherProps): JSX.Element {
  const { user, loading } = useAppSelector(state => state.auth)
  const [isActive, setIsActive] = useState(false)

  const handleClickSwitcherMenu = () => {
    setIsActive(!isActive)
  }

  return (
    <div className={"profile-switcher" + (className ? " " + className : "")}>
      <div className={"profile-switcher-menu" + (isActive ? " profile-switcher-menu_active" : "")}
        onClick={handleClickSwitcherMenu}>
        <Avatar className="avatar__img_scale" />
        <ul className="profile-switcher-menu-list">
          {loading && (
            <Spinner width={20} height={20} />
          )}
          {user && (
            <li className="profile-switcher-menu-list__item">
              <span className="profile-switcher-menu-list__avatar">
                <Avatar className="avatar__img_border_white" />
              </span>
              <span className="profile-switcher-menu-list__profile-name">
                {user.userData.profileName}
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
