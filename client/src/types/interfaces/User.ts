import { UserSubscription } from "../UserSubscription"
import { UserActionsData } from "./UserActionsData"

export interface UserData {
  _id: string
  userData: {
    firstName: string | null
    lastName: string | null
    profileName: string
    userBirthDay: string | null
    userGender: string | null
    userAvatar: string | null
  },

  userPersonalData: {
    email: string
    phone: string | null
    userCard: string | null
  },

  userSubscriptions: UserSubscription[] | []

  userActionsData: UserActionsData,

  userRole: "user" | "moderator" | "admin"
}
