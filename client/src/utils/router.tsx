import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../components/Layout"
import { Home } from "../pages/Home"
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
        path: "/series",
        element: <Series />,
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
      }
    ],
  }
])