import { Schema, model } from 'mongoose'
import { MovieModel } from './movieSchema'
import { Series } from '../types/interface/Series'

export const seriesSchema = new Schema<Series>({
  seasons: {
    type: [
      {
        numberOfSeasons: {
          type: Number,
          required: true,
        },
        episodes: {
          type: [
            {
              link: {
                type: String,
                required: true
              },
              episodeNumber: {
                type: Number,
                required: true
              },
              img: {
                type: String,
                required: true
              },
              title: {
                type: String
              }
            }
          ],
          required: true,
          _id: false
        }
      }
    ],
    required: true,
    _id: false
  }
})

seriesSchema.add(MovieModel.schema.obj)

export const SeriesModel = model<Series>('Series', seriesSchema)
