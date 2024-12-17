import { Request, Response, Router } from 'express'
import { checkValidQueryParamsContentMiddleware } from "../middlewares/checkValidQueryParamsContentMiddleware"
import { getContent } from '../controllers/getContent'
import { ResponseWithoutPayload, ResponseWithPayload } from '../types/interface/Response'
import { Content } from '../types/interface/Content'
import { MediaContent } from '../types/interface/MediaContent'
import { MediaContentModel } from '../models/mediaContentSchema'

const contentRouter = Router()

const setResponseContent = async (req: Request, res: Response) => {
  const { localDataState } = res.locals
  const { error, content } = localDataState

  try {
    if (error) {
      const response: ResponseWithoutPayload = {
        status: error.status,
        error: {
          numberError: error.numberError,
          message: error.message,
          value: error.value
        },
        message: "Reject",
        value: null
      }

      return res.status(error.status).json(response)
    }

    const response: ResponseWithPayload<Content | MediaContent> = {
      status: 200,
      error: null,
      message: "Accept",
      value: content
    }

    return res.status(response.status).json(response)
  } catch (error: unknown) {
    const response: ResponseWithoutPayload = {
      status: 500,
      error: null,
      message: "Error",
      value: null
    }

    return res.status(response.status).json(response)
  }
}

const test = async () => {
  const newContent = {
    type: 'series',
    seasons: [
      {
        numberOfSeasons: 1,
        episodes: [
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 1,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e1.jpg',
            title: 'Серия 1'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 2,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e2.jpg',
            title: 'Серия 2'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 3,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e3.jpg',
            title: 'Серия 3'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 4,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e4.jpg',
            title: 'Серия 4'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 5,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e5.jpg',
            title: 'Серия 5'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 6,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e6.jpg',
            title: 'Серия 6'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 7,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e7.jpg',
            title: 'Серия 7'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 8,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e8.jpg',
            title: 'Серия 8'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 9,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e9.jpg',
            title: 'Серия 9'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 10,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e10.jpg',
            title: 'Серия 10'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 11,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e11.jpg',
            title: 'Серия 11'
          },
          {
            link: {
              _current: {
                type: '720p',
                value: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4'
              },
              quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
              quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
            },
            episodeNumber: 12,
            imgPreview: 'http://localhost:3000/public/series/normalPeople/s1e12.jpg',
            title: 'Серия 12'
          },
        ],
        bg: {
          imgUrl: 'http://localhost:3000/public/series/normalPeople/imgBgS1.jpg',
          videoUrl: null
        },
        trailer: null,
        description: null
      }
    ],
    data: {
      title: {
        value: 'Нормальные люди',
        originalTitle: 'Normal People',
        linkTitle: 'normal-people'
      },
      badge: null,
      description: {
        mainDescription: '«Нормальные люди» – экранизация одноименного бестселлера Салли Руни с Полом Мескалом («Гладиатор 2», «Солнце мое») и Дейзи Эдгар-Джонс («Там, где поют раки», «Безмолвный свидетель») в главных ролях. Действие сериала разворачивается в небольшом ирландском городке. Марианна – умная, богатая, но совершенно непопулярная девушка в школе, практически изгой. Конелл – звезда футбольной команды и тайная любовь всех одноклассниц. Их случайная встреча приводит не просто к первой любви, а скорее к первой настоящей близости, которую они попробуют пронести через годы и сохранить во взрослом возрасте. Героев будут ждать болезненные расставания и трогательные примирения с совершенно непредсказуемым исходом их тайного романа.',
        prewiewDescription: '«Нормальные люди» – экранизация одноименного бестселлера Салли Руни с Полом Мескалом («Гладиатор 2», «Солнце мое») и Дейзи Эдгар-Джонс («Там, где поют раки», «Безмолвный свидетель») в главных ролях. Действие сериала разворачивается в небольшом ирландском городке.'
      },
      about: null,
      ageRestriction: 18,
      dateRelease: '2020',
      genres: ['Драма', 'Мелодрама'],
      actors: ['Пол Мескал', 'Дейзи Эдгар-Джонс'],
      directors: ['Леонард Абрахамсон', 'Хетти Макдональд'],
      country: 'Ирландия',
      production: 'Hulu'
    },
    rating: {
      raitingAmediateka: 7.2,
      ratingImdb: 8.4,
      ratingKinopoisk: 7.6
    },
    actionsData: {
      favorites: [],
      liked: [],
      disliked: []
    },
    bg: {
      imgUrl: 'http://localhost:3000/public/series/normalPeople/imgBgS1.jpg',
      videoUrl: null,
      imgResizeUrl: 'http://localhost:3000/public/series/normalPeople/resizeImgBgS1.jpg'
    },
    trailer: {
      quality360: 'http://localhost:3000/public/series/normalPeople/videoTrailer360.mp4',
      quality720: 'http://localhost:3000/public/series/normalPeople/videoTrailer720.mp4',
      img: 'http://localhost:3000/public/series/normalPeople/imgTrailer.jpg'
    },
    logoImg: 'http://localhost:3000/public/series/normalPeople/imgLogo.png'
  }

  const updatedContent = await MediaContentModel.findByIdAndUpdate('6751b791bc89441d15183116', newContent, { new: true, overwrite: true })
}

contentRouter.get(`/content`, checkValidQueryParamsContentMiddleware, getContent, setResponseContent)
contentRouter.get(`/test`, test)

export { contentRouter }
