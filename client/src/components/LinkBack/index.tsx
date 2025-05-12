import { JSX } from "react"
import { Link } from "react-router-dom"
import { LinkBackProps } from "../../types/interfaces/LinkBackProps"

export function LinkBack({ activePage, backLink }: LinkBackProps): JSX.Element {
  const classes: Record<string, string> = {
    base: "link-back",
    item: "link-back__item",
    link: "link-back__link",
    text: "text",
    textColorGray: "text_color_gray",
    textColorSecondaryActive: "text_color_secondary-active",
  }
  const textHomeLink: string = backLink ? backLink.text : "Главная"
  const urlLink = backLink ? backLink.to : "/"

  return (
    <div className={classes.base}>
      <div className={classes.item}>
        <Link to={urlLink} className={`${classes.link} ${classes.text} ${classes.textColorGray}`}>
          {textHomeLink}
        </Link>
      </div>
      <div className={classes.item}>
        <span className={`${classes.text} ${classes.textColorGray}`}> / </span>
      </div>
      <div className={classes.item}>
        <span className={`${classes.text} ${classes.textColorSecondaryActive}`}>
          {activePage}
        </span>
      </div>
    </div>
  )
}
