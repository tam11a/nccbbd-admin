import { lazy } from "react";
import { PRIVATE_ROUTES } from "./paths";

export const privateRoutes = [
  {
    path: PRIVATE_ROUTES.DASHBOARD,
    Component: lazy(() => import("@pages/Dashboard")),
  },
  {
    path: PRIVATE_ROUTES.HOME,
    Component: lazy(() => import("@pages/Home")),
  },
  {
    path: PRIVATE_ROUTES.MODS,
    Component: lazy(() => import("@pages/Mods")),
  },
  {
    path: PRIVATE_ROUTES.GALLERY,
    Component: lazy(() => import("@pages/Gallery")),
  },
  {
    path: PRIVATE_ROUTES.SETTINGS,
    Component: lazy(() => import("@pages/Settings")),
  },
  {
    path: PRIVATE_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
