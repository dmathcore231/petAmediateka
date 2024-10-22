import { Schema, model } from 'mongoose'
import { MediaContent } from "../types/interface/MediaContent"

const mediaContentSchema = new Schema<MediaContent>({
  type: {
    type: String,
    enum: ['movie', 'series'],
    required: true,
    _id: false
  },
  seasons: {
    type: [
      {
        numberOfSeasons: {
          type: Number,
          required: true
        },
        episodes: {
          type: [{
            link: {
              type: String,
              required: true
            },
            episodeNumber: {
              type: Number,
              required: true
            },
            imgPreview: {
              type: String,
              required: true
            },
            title: {
              type: String,
              required: true
            }
          }],
          required: true
        },
        bg: {
          type: {
            type: String,
            enum: ['img', 'video'],
            required: false,
            default: null
          },
          url: {
            type: String,
            required: false,
            default: null
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
      }
    ],
    default: null,
    _id: false
  },
  data: {
    type: {
      title: {
        type: {
          value: {
            type: String,
            required: true
          },
          originalTitle: {
            type: String,
            required: true
          },
          linkTitle: {
            type: String,
            required: true
          }
        },
        required: true
      },
      badge: {
        type: {
          type: String,
          enum: ['primary', 'secondary'],
          required: false,
          default: null
        },
        title: {
          type: String,
          required: false,
          default: null
        },
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
  logoImg: {
    type: String,
    required: true
  }
})

export const MediaContentModel = model<MediaContent>('MediaContent', mediaContentSchema)
