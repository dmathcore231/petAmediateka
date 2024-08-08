import { SeoBlockProps } from "../../types/interfaces/SeoBlockProps"

export function SeoBlock({ title, text }: SeoBlockProps): JSX.Element {
  return (
    <div className="seo-block">
      <div className="seo-block__item title">
        {title}
      </div>
      <div className="seo-block__item text text_color_gray">
        {text}
      </div>
    </div>
  )
}
