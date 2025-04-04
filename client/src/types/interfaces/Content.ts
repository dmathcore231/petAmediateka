import { CardData } from "../Card"
import { BannerProps } from "./BannerProps"
import { PromoLineData } from "./PromoLineData"

export type Content = {
  _id: string
  __v: number
  type: ContentTypeEnum
  data: Array<CardData> | BannerProps | PromoLineData | null
}

export enum ContentTypeEnum {
  MainSlider = "mainSlider",
  WatchingNow = "watchingNow",
  Banner = "banner",
  Series = "series",
  NewRelease = "newRelease",
  PromoLine = "promoLine",
}
