import { UserSubscription } from "../UserSubscription"

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

  userActionsData: {
    liked: [],
    disliked: [],
    favoritList: [],
    ratingList: [],
    historyList: [],
    purchase: [],
  },

  userRole: "user" | "moderator" | "admin"
}
