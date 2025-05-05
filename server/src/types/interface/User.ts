import { Document } from "mongoose"
import { UserSubscription } from "../UserSubscription"
import { UserActionsData } from "./UserActionsData"

export interface User extends Document {
  userData: {
    firstName: string
    lastName: string
    profileName: string
    userBirthDay: string | null
    userGender: string | null
    userAvatar: string | null
  },

  userPersonalData: {
    email: string
    password: string
    phone: string | null
    userCard: string | null
  },

  userSubscriptions: Array<UserSubscription> | []

  userActionsData: UserActionsData,

  userRole: "user" | "moderator" | "admin"
}
