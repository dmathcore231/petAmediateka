
export interface Banner {
  title: string
  bannerListItem: Array<string>
  img: {
    url: string
    resizeUrl: string
    sourceUrls: Array<string>
  }
  titleBtn: string
  ageRestriction: number
}
