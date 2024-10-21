import { Schema, model } from 'mongoose'
import { Movie } from '../types/interface/Movie'

const movieSchema = new Schema<Movie>({
  data: {
    type: {
      title: {
        type: String,
        required: true
      },
      originalTitle: {
        type: String
      },
      discription: {
        type: String,
        required: true
      },
      about: {
        type: Boolean,
        default: false
      },
      ageRestriction: {
        type: Number,
        required: true
      },
      dateRelease: {
        type: String,
        required: true
      },
      genres: {
        type: [String],
        required: true
      },
      actors: {
        type: [String],
        required: true
      },
      directors: {
        type: [String],
        required: true
      },
      country: {
        type: String,
        required: true
      },
      production: {
        type: String,
        default: "N/A"
      }
    },
    required: true,
    _id: false
  },
  rating: {
    type: {
      raitingAmediateka: {
        type: Number,
        default: "N/A"
      },
      ratingImdb: {
        type: Number,
        default: "N/A"
      },
      ratingKinopoisk: {
        type: Number,
        default: "N/A"
      }
    },
    required: true,
    _id: false
  },
  actionsData: {
    type: {
      favorites: {
        type: [String],
        default: []
      },
      liked: {
        type: [String],
        default: []
      },
      disliked: {
        type: [String],
        default: []
      }
    },
    required: true,
    _id: false
  },
  bg: {
    type: {
      type: String,
      enum: ['img', 'video'],
      default: 'img'
    },
    url: {
      type: String,
      default: ""
    }
  },
  trailer: {
    type: {
      quality360: {
        type: String,
        default: null
      },
      quality720: {
        type: String,
        default: null
      },
      quality1080: {
        type: String,
        default: null
      },
      quality2160: {
        type: String,
        default: null
      }
    },
    default: null,
    _id: false
  },
  titleImg: {
    type: String,
    required: true
  }
})

export const MovieModel = model<Movie>('Movies', movieSchema)
