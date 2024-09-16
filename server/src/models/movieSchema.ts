import { Schema, model } from 'mongoose'
import { Movie } from '../types/interface/Movie'

const movieSchema = new Schema<Movie>({
  movieData: {
    type: {
      title: {
        type: String,
        required: true
      },
      discription: {
        type: String,
        required: true
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
      }
    },
    required: true,
    _id: false
  },
  movieRating: {
    type: {
      raitingAmediateka: {
        type: Number,
        default: "N/A"
      },
      ratingImdb: {
        type: Number,
        default: "N/A"
      }
    },
    required: true,
    _id: false
  },
  movieActionsData: {
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
  imgBg: {
    type: String,
    required: true
  },
  trailer: {
    type: String,
    default: null
  }
})

export default model<Movie>('Movie', movieSchema)
