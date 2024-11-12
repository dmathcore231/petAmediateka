import { MediaContent } from "../types/interfaces/MediaContent"
import { UserData } from "../types/interfaces/User"

export const setDataInLocalStorage = (key: string, data: string | null | UserData): void => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    localStorage.removeItem(key)
  }
}

export const getDataFromLocalStorage = (key: string): UserData | null => {
  const data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

export const temporaryBannerListItem: Array<string> = [
  'В единой подписке',
  'На любых устройствах',
  'В отличном качестве',
  'Без рекламы'
]

export const defaultCardData: MediaContent = {
  _id: '1',
  __v: 0,
  type: 'movie',
  seasons: null,
  data: {
    title: {
      value: 'Test Title',
      originalTitle: 'Test Original Title',
      linkTitle: 'test-title'
    },
    badge: {
      type: 'secondary',
      title: 'test badge'
    },
    description: {
      mainDescription: 'Main description',
      prewiewDescription: 'Prewiew description'
    },
    about: true,
    ageRestriction: 18,
    dateRelease: '2022',
    genres: ['Драма', 'Мелодрама', 'Боевик', 'Фэнтези'],
    actors: ['Стив Туссэн', 'Мэтт Смит', 'Эмма Д’Арси', 'Пэдди Консидайн'],
    directors: ['Грег Яйтанс', 'Мигель Сапочник'],
    country: 'США',
    production: 'HBO'
  },
  rating: {
    raitingAmediateka: 9.1,
    ratingImdb: 8.8,
    ratingKinopoisk: 8.4
  },
  actionsData: {
    favorites: [],
    liked: [],
    disliked: []
  },
  bg: {
    imgUrl: '',
    videoUrl: '',
    imgResizeUrl: ''
  },
  trailer: {
    quality360: '',
    quality720: '',
    quality1080: null,
    quality2160: null,
    img: ''
  },
  logoImg: ''
}
