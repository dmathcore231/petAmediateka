import { JSX, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { DropdownsItem } from "../../types/DropdownsItem"
import { DropdownsProps } from "../../types/interfaces/DropdownsProps"
export function Dropdowns({ items }: DropdownsProps): JSX.Element {
  const [isActive, setIsActive] = useState(false)

  const renderChildren = (children: DropdownsItem[]): JSX.Element => {
    return (
      <>
        {children.map((item, index) => {
          if (item.navLink) {
            return (
              <li key={index} className="dropdown-list__item">
                <NavLink to={item.url} className="dropdown-list__link">
                  {item.value}
                </NavLink>
              </li>
            )
          }
          return (
            <li key={index} className="dropdown-list__item">
              <Link to={item.url} className="dropdown-list__link">
                {item.value}
              </Link>
            </li>
          )
        })}
      </>
    )
  }


  return (
    <div className="dropdown">

    </div>
  )
}
