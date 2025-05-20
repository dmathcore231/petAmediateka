import { MediaBreakpoint } from "../MediaBreakpoint"

export interface PictureWithSourcesProps {
  img: {
    url: string
    sourceUrls: string[]
  }
  alt: string
  classes: {
    picture: string
    img: string
  }
  media: MediaBreakpoint[]
}
