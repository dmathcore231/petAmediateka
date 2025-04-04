import { JSX } from "react"
import { useAppSelector } from "../../hooks"
import { AvatarProps } from "../../types/interfaces/AvatarProps"

export function Avatar({ size, className }: AvatarProps): JSX.Element {
  const { user } = useAppSelector(state => state.auth)

  const baseClass: string = `avatar__img`
  const sizeClass: string = `avatar__img_size_${size}`
  const customClass: string = className ? ` ${className}` : ''

  const setUserAvatar = (): string => user?.userData.userAvatar || '/defaultAvatar.jpg'

  return (
    <div className="avatar">
      <img src={setUserAvatar()} alt="profile-avatar"
        className={`${baseClass} ${sizeClass}${customClass}`} />
    </div>
  )
}
