import { BannerProps } from "../types/interfaces/BannerProps"
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
    about: null,
    ageRestriction: 18,
    dateRelease: '2022',
    genres: ['Драма', 'Мелодрама', 'Боевик', 'Фэнтези'],
    actors: ['Стив Туссэн', 'Мэтт Смит', 'Эмма Д’Арси', 'Пэдди Консидайн'],
    directors: ['Грег Яйтанс', 'Мигель Сапочник'],
    country: 'США',
    production: 'HBO'
  },
  rating: {
    amediateka: 9.1,
    imdb: 8.8,
    kinopoisk: 8.4
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

export const defaultBannerData: BannerProps = {
  _id: '1',
  title: "test title",
  bannerListItem: ['test1', 'test2', 'test3', 'test4'],
  img: "/bannerImg.png",
  titleBtn: "Test btn",
  ageRestriction: 18,
  loading: true
}
