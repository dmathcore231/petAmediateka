import { useAppSelector } from "../../hooks"
import { AvatarProps } from "../../types/interfaces/AvatarProps"

export function Avatar({ className }: AvatarProps): JSX.Element {
  const { user, loading } = useAppSelector(state => state.auth)

  const setUserAvatar = (): string => {
    if (user && user.userData.userAvatar) {
      return user.userData.userAvatar
    } else {
      return '../../../public/defaultAvatar.jpg'
    }
  }

  return (
    <div className="avatar">
      <img src={setUserAvatar()} alt="profile-avatar" className={"avatar__img" + (className ? " " + className : "")} />
    </div>
  )
}