import { JSX } from "react"
import { useAppSelector } from "../../hooks"
import { Navigate, Outlet } from "react-router-dom"
import { Spinner } from "../Spinner"

export function PrivateRoute(): JSX.Element {
  const { user, loading } = useAppSelector(state => state.auth)

  if (loading) {
    return (
      <div className="main-wrapper">
        <Spinner width={40} height={40} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/signin" replace />
  }

  return <Outlet />
}
