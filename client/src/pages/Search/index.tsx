import { useState } from "react"
import { LinkBack } from "../../components/LinkBack"
import { Input } from "../../components/Input"

export function Search(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('')

  return (
    <div className="search container">
      <div className="search-header">
        <div className="search-header__item">
          <LinkBack activePage="Поиск" />
        </div>
        <div className="search-header__item">
        <Input
            type="email"
            id="email"
            label={{ labelInvisible: true, value: null }}
            required={false}
            placeholder={{
              type: "float",
              value: "Сериал, фильм или жанр"
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </div >
  )
}
