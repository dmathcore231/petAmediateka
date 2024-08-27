import { Document } from "mongoose"
import { UserSubscription } from "../UserSubscription"

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

  userSubscriptions: UserSubscription[] | []

  userActionsData: {
    liked: [],
    disliked: [],
    favoritList: [],
    ratingList: [],
  },

  userRole: "user" | "moderator" | "admin"
}
