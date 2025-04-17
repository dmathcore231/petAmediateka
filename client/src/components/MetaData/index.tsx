import { JSX } from "react"
import { MetaDataProps } from "../../types/interfaces/MetaDataProps"
import { RatingAmediateka } from "../../assets/icons/RatingAmediateka"
import { ImdbIcon } from "../../assets/icons/ImdbIcon"
import { KinopoiskIcon } from "../../assets/icons/KinopoiskIcon"

export function MetaData({ rating, dateRelease, ageRestriction, genres }: MetaDataProps): JSX.Element {
  const classes: Record<string, string> = {
    base: "meta-data",
    list: "meta-data-list",
    item: "meta-data-list__item",
    title: "title title_color_secondary-active title_weight_bold",
    wrapper: "meta-data-list__wrapper",
    wrapperGapSizeLg: "meta-data-list__wrapper_gap_size_lg",
  }

  const getGenres = (data: string[] | string, limit: number): string => {
    if (typeof data === "string") return data

    return data.length > limit
      ? data.slice(0, limit).join(" / ") + " / ..."
      : data.join(" / ")

  }

  return (
    <div className={classes.base}>
      <div className={classes.list}>
        <div className={classes.wrapper}>
          <div className={classes.item}>
            <RatingAmediateka width={30} height={24} />
            <span className={classes.title}>
              {rating.raitingAmediateka}
            </span>
          </div>
          {rating.ratingImdb && (
            <div className={classes.item}>
              <ImdbIcon width={41} height={22} />
              <span className={classes.title}>
                {rating.ratingImdb}
              </span>
            </div>
          )}
          {rating.ratingKinopoisk && (
            <div className={classes.item}>
              <KinopoiskIcon width={29} height={29} />
              <span className={classes.title}>
                {rating.ratingKinopoisk}
              </span>
            </div>
          )}
        </div>
        <div className={`${classes.wrapper} ${classes.wrapperGapSizeLg}`}>
          <div className={classes.item}>
            <span className={classes.title}>
              {dateRelease}
            </span>
          </div>
          <div className={classes.item}>
            <span className={classes.title}>
              {ageRestriction}+
            </span>
          </div>
          <div className={classes.item}>
            <span className={classes.title}>
              {getGenres(genres, 3)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
