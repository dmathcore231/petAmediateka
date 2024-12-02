import { createBrowserRouter } from "react-router-dom"
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
