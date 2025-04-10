import { JSX } from "react"
import { TagsProps } from "../../types/interfaces/TagsProps"
import { RatingAmediateka } from "../../assets/icons/RatingAmediateka"

export function Tags({ data }: TagsProps): JSX.Element {

  const { raiting, ageRestriction, dateRelease, genres } = data

  return (
    <div className="tags">
      <ul className="tags-list">
        {raiting && (
          <li className="tags-list__item">
            <span className="tags-list__badge tags-list__badge_raiting">
              <RatingAmediateka width={30} height={24} />
              {raiting}
            </span>
          </li>
        )}
        {ageRestriction && (
          <li className="tags-list__item">
            <span className="tags-list__badge text text_size_sm">
              {ageRestriction}+
            </span>
          </li>
        )}
        {dateRelease && (
          <li className="tags-list__item">
            <span className="tags-list__badge text text_size_sm">
              {dateRelease}
            </span>
          </li>
        )}
        {genres && (
          <li className="tags-list__item">
            {genres.map((genre, index) => (
              <span className="tags-list__badge text text_size_sm" key={index}>
                {genre}
              </span>
            ))}
          </li>
        )}
      </ul>
    </div>
  )
}
