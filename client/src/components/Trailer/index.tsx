import { TrailerProps } from "../../types/interfaces/TrailerProps"
import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"

export function Trailer({ trailerData }: TrailerProps): JSX.Element {
  const { trailer, seasons } = trailerData

  return (
    <div className="trailer">
      <div className="trailer-header">
        <div className="trailer-header__title">
          {seasons && (
            <h3>{`Трейлер - ${seasons.length} сезон`}</h3>
          )}
        </div>
      </div>
      <div className="trailer-main">
        <div className="trailer-main__btn">
          <MediaPlayIcon width={80} height={80} />
        </div>
        {trailer && (

          < img src={trailer.img} alt="trailer" className="trailer-main__img" />
        )}
      </div>
    </div>
  )
}
