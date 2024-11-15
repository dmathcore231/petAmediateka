import { LinkBack } from "../../components/LinkBack"

export function СollectionSeries(): JSX.Element {
  return (
    <div className="collection-series container">
      <div className="collection-series-header">
        <div className="collection-series-header__item">
          <LinkBack activePage="Сериалы" />
        </div>
        <div className="collection-series-header__item">
          <h1>Сериалы онлайн</h1>
        </div>
        <div className="collection-series-header__item">
          <span className="collection-series-header__post-title text text_color_secondary-active">
            Лучшие сериалы в HD качестве. Смотрите любимые сериалы онлайн без рекламы на Амедиатеке. Оформите подписку на сайте или в приложении Амедиатеки и смотрите сериалы онлайн в день премьеры.
          </span>
        </div>
      </div>
    </div>
  )
}
