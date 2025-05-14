import { JSX } from "react"
import { useAppSelector } from "../../hooks"
import { Navigate, Outlet } from "react-router-dom"
import { Spinner } from "../Spinner"

export function PrivateRoute(): JSX.Element {
  const { loading, token } = useAppSelector(state => state.auth)
  const { initializedData } = useAppSelector(state => state.my)

  if (loading) {
    return (
      <div className="main-wrapper">
        <Spinner width={50} height={50} />
      </div>
    )
  }

  if (!token && initializedData) {
    return <Navigate to="/auth/signin" replace />
  }

  return <Outlet />
}
