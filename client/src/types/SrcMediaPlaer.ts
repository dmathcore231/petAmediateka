import { VideoQuality } from "./VideoQuality"

export type SrcMediaPlaer = {
  _current: {
    type: VideoQuality
    value: string
  }
  quality360: string
  quality720: string
  quality1080: string
  quality2160: string
}
