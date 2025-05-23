import { Schema, model } from 'mongoose'
import { User } from '../types/interface/User'

const userSchema = new Schema<User>({
  userData: {
    type: {
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
    default: {},
    _id: false
  },

  userPersonalData: {
    type: {
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
    required: true,
    _id: false
  },

  userSubscriptions: {
    type: [
      {
        type: {
          type: String,
          enum: ["oneMonth", "threeMonths", "sixMonths", "oneYear"],
        },
        date: {
          startDate: Number,
          expirationDate: Number
        }
      }
    ],
  },

  userActionsData: {
    liked: {
      type: [String],
      default: []
    },
    disliked: {
      type: [String],
      default: []
    },
    favoritList: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'MediaContent'
      }],
      default: []
    },
    historyList: {
      type: [
        {
          type: {
            data: {
              type: String,
              require: true,
            },
            value: {
              type: String,
              require: true,
            }
          },
        }
      ],
      default: []
    },
    purchase: {
      type: [
        {
          type: {
            data: {
              type: String,
              require: true,
            },
            value: {
              type: String,
              require: true,
            }
          },
        }
      ],
      default: []
    },
  },

  userRole: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  }
})

export const UserModel = model('Users', userSchema)
