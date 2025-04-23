import { JSX } from "react"
import { Link } from "react-router-dom"
import { LinkBackProps } from "../../types/interfaces/LinkBackProps"

export function LinkBack({ activePage }: LinkBackProps): JSX.Element {
  const classes: Record<string, string> = {
    base: "link-back",
    item: "link-back__item",
    link: "link-back__link",
    text: "text",
    textColorGray: "text_color_gray",
    textColorSecondaryActive: "text_color_secondary-active",
  }
  const textHomeLink: string = "Главная"

  return (
    <div className={classes.base}>
      <div className={classes.item}>
        <Link to={"/"} className={`${classes.link} ${classes.text} ${classes.textColorGray}`}>
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
