import { createBrowserRouter, Navigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { Auth } from "../pages/Auth"
import { Home } from "../pages/Home"
import { СollectionSeries } from "../pages/СollectionSeries"
import { Series } from "../pages/Series"
import { Movies } from "../pages/Movies"
import { Collections } from "../pages/Collections"
import { Trailers } from "../pages/Trailers"
import { Kino1tv } from "../pages/Kino1tv"
import { Tv } from "../pages/Tv"
import { Search } from "../pages/Search"
import { Profile } from "../pages/Profile"
import { ProfileMain } from "../pages/Profile/Main"
import { ProfileSettings } from "../pages/Profile/Settings"
import { My } from "../pages/My"
import { Favorite } from "../pages/My/Favorite"
import { History } from "../pages/My/History"
import { Purchase } from "../pages/My/Purchase"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/collection-series",
        element: <СollectionSeries />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/trailers",
        element: <Trailers />,
      },
      {
        path: "/kino1tv",
        element: <Kino1tv />,
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        element: <Series />,
        path: "/series/:id/:title",
        children: [
          {
            path: "/series/:id/:title/season/:seasonIndex",
            element: <Series />,
          }
        ]
      },
      {
        element: <Profile />,
        children: [
          {
            path: "/profile",
            element: <ProfileMain />,
          },
          {
            path: "/profile/settings",
            element: <ProfileSettings />,
          }
        ]
      },
      {
        element: <My />,
        path: "/my",
        children: [
          {
            index: true,
            element: <Navigate to="favorite" replace />
          },
          {
            path: "favorite",
            element: <Favorite />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "purchase",
            element: <Purchase />,
          }
        ]
      }
    ],
  },
  {
    children: [
      {
        path: "/auth/signin",
        element: <Auth pageState="signIn" />,
      },
      {
        path: "/auth/signup",
        element: <Auth pageState="signUp" />,
      }
    ]
  }
])
