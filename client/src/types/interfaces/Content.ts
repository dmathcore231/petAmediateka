import { CardData } from "../Card"
import { BannerProps } from "./BannerProps"

export type Content = {
  _id: string
  __v: number
  type: ContentTypeEnum
  data: Array<CardData> | BannerProps | null
}

export enum ContentTypeEnum {
  MainSlider = "mainSlider",
  WatchingNow = "watchingNow",
  Banner = "banner",
  Series = "series",
}
