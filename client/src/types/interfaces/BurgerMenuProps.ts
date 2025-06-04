import { UserData } from "./User"

export interface BurgerMenuProps {
  user: UserData | null
  onLogout: () => void
}
