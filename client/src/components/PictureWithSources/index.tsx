import { JSX } from "react"
import { PictureWithSourcesProps } from "../../types/interfaces/PictureWithSourcesProps"
import { MediaBreakpoint } from "../../types/MediaBreakpoint"

export function PictureWithSources({ img, alt, classes, media }: PictureWithSourcesProps): JSX.Element {
  const getSource = (url: string[], media: MediaBreakpoint[]): JSX.Element[] => {
    const maxMedia: Record<MediaBreakpoint, string> = {
      xs: '30rem',
      sm: '36rem',
      md: '48rem',
      lg: '62rem',
      xl: '75rem',
      xxl: '87.5rem',
      xxxl: '112.5rem'
    }

    const sources = url.map((item, index) => ({
      url: item,
      resolution: Number(item.split('/').pop()?.split('.')[0].split('x')[0]),
      media: maxMedia[media[index]]
    }))

    const sortedSources = sources.sort((a, b) => a.resolution - b.resolution)

    return sortedSources.map(({ url, media }, index) => (
      <source key={index} srcSet={url} media={`(max-width: ${media})`} type="image/webp" />
    ))
  }


  return (
    <picture className={classes.picture}>
      {getSource(img.sourceUrls, media)}
      <img src={img.url} alt={alt} className={classes.img} />
    </picture>
  )
}
