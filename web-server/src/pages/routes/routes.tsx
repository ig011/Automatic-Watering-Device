import Home from "../home/home";
import NotFound from "../notFound/notFound";
import Settings from "../settings/settings";

export interface IRouteInterface {
  path: string;
  element: JSX.Element;
}

export const PageRoutes: Array<IRouteInterface> = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
];
