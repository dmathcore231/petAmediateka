import { UserData } from "./User"

export interface AvatarProps {
  size: "sm" | "md" | "lg"
  className?: string
  user: UserData | null
}
