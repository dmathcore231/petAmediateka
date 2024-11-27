import { CardData } from "../types/Card"
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

export const defaultCardData: CardData = {
  _id: '1',
  type: 'movie',
  title: {
    value: 'Test Title',
    originalTitle: 'Test Original Title',
    linkTitle: 'test-title'
  },
  badge: {
    type: 'secondary',
    title: 'test badge'
  },
  ageRestriction: 0,
  description: "Prewiew description",
  bg: {
    imgUrl: '',
    videoUrl: '',
    imgResizeUrl: ''
  },
  logoImg: '',
  link: '',
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
