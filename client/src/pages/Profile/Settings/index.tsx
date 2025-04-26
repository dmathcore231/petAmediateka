import { JSX } from "react"
import { LinkBack } from "../../../components/LinkBack"
export function ProfileSettings(): JSX.Element {
  const propsLinkBack = {
    activePage: "Настройки",
    backLink: { to: "/profile", text: "Профиль" },
  }
  return (
    <div className="profile-settings">
      <div className="profile-settings-pre-title">
        <LinkBack {...propsLinkBack} />
      </div>
    </div>
  )
}
