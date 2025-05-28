import { JSX } from "react"
import { useCheckBreakpoint } from "../../hooks"
import { MetaDataProps } from "../../types/interfaces/MetaDataProps"
import { MetaDataHeaderListConfig } from "../../types/interfaces/MetaDataHeaderListConfig"
import { RatingAmediateka } from "../../assets/icons/RatingAmediateka"
import { ImdbIcon } from "../../assets/icons/ImdbIcon"
import { KinopoiskIcon } from "../../assets/icons/KinopoiskIcon"

export function MetaData({ rating, dateRelease, ageRestriction, genres, description, directors, actors, country }: MetaDataProps): JSX.Element {
  const BREAKPOINT_XXXL = useCheckBreakpoint(1800)
  const BREAKPOINT_XXL = useCheckBreakpoint(1400)
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_LG = useCheckBreakpoint(992)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const BREAKPOINT_SM = useCheckBreakpoint(576)

  const baseClass = "meta-data"
  const CLASSES = {
    header: {
      base: `${baseClass}-header`,
      list: `${baseClass}-header-list`,
      item: `${baseClass}-header-list__item`,
      wrapper: `${baseClass}-header-list__wrapper`,
    },
    title: {
      base: "title",
      color: {
        secondaryActive: "title_color_secondary-active",
        gray: "title_color_gray",
      },
      weightBold: "title_weight_bold",
      alignLeft: "title_align_left",
    },
    description: `${baseClass}-description`,
    info: {
      base: `${baseClass}-info`,
      item: `${baseClass}-info__item`,
    },
  }

  const truncateList = (data: string[] | string, limit: number): string => {
    if (typeof data === "string") return data

    return data.length > limit
      ? data.slice(0, limit).join(" / ") + " /..."
      : data.join(" / ")
  }

  const breakpointGenresLimit = BREAKPOINT_MD
    ? 4
    : BREAKPOINT_LG
      ? 1
      : BREAKPOINT_XXXL
        ? 2
        : 4
  const breakpointInfoLimit = BREAKPOINT_MD
    ? 2
    : BREAKPOINT_LG
      ? 3
      : BREAKPOINT_XL
        ? 2
        : 4
  const headerListConfig: MetaDataHeaderListConfig[] = [
    {
      value: rating.raitingAmediateka,
      icon: (<RatingAmediateka width={BREAKPOINT_XL ? 24 : 30} height={BREAKPOINT_XL ? 20 : 24} />),
    },
    {
      value: rating.ratingImdb,
      icon: (<ImdbIcon width={BREAKPOINT_XL ? 33 : 41} height={BREAKPOINT_XL ? 18 : 22} />),
    },
    {
      value: rating.ratingKinopoisk || "",
      icon: (<KinopoiskIcon width={BREAKPOINT_XL ? 23 : 29} height={BREAKPOINT_XL ? 23 : 29} />),
    },
    {
      value: dateRelease,
    },
    {
      value: ageRestriction,
    },
    {
      value: truncateList(genres, breakpointGenresLimit),
    }
  ]

  const renderInfo = (): JSX.Element => {
    const config = [
      {
        title: "Режиссёры",
        value: truncateList(directors, 4),
      },
      {
        title: "Актеры",
        value: truncateList(actors, 4),
      },
      {
        title: "Страна",
        value: country,
      },
      {
        title: "Жанры",
        value: truncateList(genres, 4),
      }
    ]

    return (
      <div className={CLASSES.info.base}>
        {config.map((item, index) => (
          <div key={index} className={CLASSES.info.item}>
            <span className={`${CLASSES.title.base} ${CLASSES.title.color.secondaryActive} ${CLASSES.title.weightBold}`}>
              {item.title}
            </span>
            <span className={`${CLASSES.title.base} ${CLASSES.title.color.gray} ${CLASSES.title.alignLeft}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={baseClass}>
      <div className={CLASSES.header.list}>
        <div className={CLASSES.header.wrapper}>
          {headerListConfig.slice(0, 3).map((item, index) => (
            <div key={index} className={CLASSES.header.item}>
              {item.icon}
              <span className={`${CLASSES.title.base} ${CLASSES.title.color.secondaryActive} ${CLASSES.title.weightBold}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className={`${CLASSES.header.wrapper}`}>
          {headerListConfig.slice(3).map((item, index) => (
            <div key={index} className={CLASSES.header.item}>
              <span className={`${CLASSES.title.base} ${CLASSES.title.color.secondaryActive} ${CLASSES.title.weightBold}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={`${CLASSES.description} ${CLASSES.title.base} ${CLASSES.title.alignLeft}`}>
        {description}
      </div>
      {renderInfo()}
    </div>
  )
}
