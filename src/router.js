import { createHashRouter } from "react-router-dom";
import { lazy, Suspense } from "@wordpress/element";
import Default from "./layouts/default";
import PageLoading from "./components/page_loading";
const Home = lazy(() => import('./pages/home'));
const Settings = lazy(() => import('./pages/settings'));
const Three = lazy(() => import('./pages/three'));

const router = createHashRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "",
        element: <Suspense fallback={<PageLoading/>}>
          <Home />
        </Suspense>,
      },
      {
        path: "settings",
        element: <Suspense fallback={<PageLoading/>}>
          <Settings />
        </Suspense>,
      },
      {
        path: "three",
        element: <Suspense fallback={<PageLoading/>}>
          <Three />
        </Suspense>,
      }
    ]
  }
]);

export { router }