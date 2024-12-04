import { CardData } from "../types/Card"
import { BannerProps } from "../types/interfaces/BannerProps"
import { UserData } from "../types/interfaces/User"
import { SrcMediaPlaer } from "../types/SrcMediaPlaer"
import { MediaContent } from "../types/interfaces/MediaContent"

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

export const formSrcMediaContent = (mediaContentData: MediaContent): SrcMediaPlaer => {
  const result: SrcMediaPlaer = {
    _current: {
      type: '360p',
      value: ''
    },
    quality360: '',
    quality720: '',
    quality1080: '',
    quality2160: ''
  }

  if (mediaContentData && mediaContentData.trailer) {
    Object.entries(mediaContentData.trailer).forEach(([key, value]) => {
      if (key === 'quality360') {
        result.quality360 = value || ''
      } else if (key === 'quality720') {
        result.quality720 = value || ''
      } else if (key === 'quality1080') {
        result.quality1080 = value || ''
      } else if (key === 'quality2160') {
        result.quality2160 = value || ''
      }
    })
  }

  if (result.quality720) {
    result._current.type = '720p'
    result._current.value = result.quality720
  } else {
    result._current.type = '360p'
    result._current.value = result.quality360
  }

  return result
}
