import mongoose, { Schema } from 'mongoose'
import { UserSubscription } from '../types/UserSubscription'
const userSchema = new Schema({

  userData: {
    firstName: {
      type: String || null,
      default: null
    },
    lastName: {
      type: String || null,
      default: null
    },
    profileName: {
      type: String,
      default: 'Мой профиль'
    },
    userBirthDay: {
      type: String || null,
      default: null
    },
    userGender: {
      type: String || null,
      default: null
    },
    userAvatar: {
      type: String || null,
      default: null
    },
  },

  userPersonalData: {
    email: String,
    password: {
      type: String,
      required: true
    },
    phone: String || null,
    userCard: {
      type: String || null,
      default: null
    }
  },

  userSubscriptions: {
    type: Array<UserSubscription> || [],
    default: []
  },

  userActionsData: {
    liked: [],
    disliked: [],
    favoritList: [],
    ratingList: [],
  },

  userRole: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  }
}, { id: false })

export const UserModel = mongoose.model('Users', userSchema)
