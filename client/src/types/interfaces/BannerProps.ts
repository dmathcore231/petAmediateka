
export interface BannerProps {
  _id: string
  title: string
  bannerListItem: Array<string>
  img: {
    url: string
    resizeUrl: string
    sourceUrls: Array<string>
  }
  titleBtn: string
  ageRestriction: number
  loading: boolean
}
