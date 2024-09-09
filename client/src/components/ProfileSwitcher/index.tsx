import { ProfileSwitcherProps } from "../../types/interfaces/ProfileSwitcherProps"
import { Avatar } from "../Avatar"

export function ProfileSwitcher({ className }: ProfileSwitcherProps): JSX.Element {

  return (
    <div className={"profile-switcher" + (className ? " " + className : "")}>
      <div className="profile-switcher-menu">
        <Avatar />
      </div>
    </div>
  )
}
