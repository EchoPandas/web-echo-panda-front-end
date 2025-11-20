import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import { routeConfig } from './routeConfig';

// Get main routes (menu, library, playlist, general) for HomeLayout
const mainRoutes = routeConfig.filter(
  route => 
    ['menu', 'library', 'playlist', 'general', 'other'].includes(route.group) && 
    route.component
);

// Get auth routes for AuthLayout
const authRoutes = routeConfig.filter(
  route => route.group === 'auth' && route.component
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: mainRoutes.map(route => ({
            path: route.path,
            element: route.component ? <route.component /> : null,
        })),
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: authRoutes.map(route => ({
            path: route.path,
            element: route.component ? <route.component /> : null,
        })),
    },
])
export default router;
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import { routeConfig } from "./routeConfig";

// Get main routes (menu, library, playlist, general) for HomeLayout
const mainRoutes = routeConfig.filter(
  (route) =>
    ["menu", "library", "playlist", "general", "other"].includes(route.group) &&
    route.component
);

// Get auth routes for AuthLayout
const authRoutes = routeConfig.filter(
  (route) => route.group === "auth" && route.component
);

const router = createBrowserRouter([
  // Auth routes first (so they match before HomeLayout catches everything)
  ...authRoutes.map((route) => ({
    path: route.path,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: route.component ? <route.component /> : null,
      },
    ],
  })),
  // Home layout with main routes
  {
    path: "/",
    element: <HomeLayout />,
    children: mainRoutes.map((route) => ({
      path: route.path === "/" ? undefined : route.path,
      index: route.path === "/",
      element: route.component ? <route.component /> : null,
    })),
  },
]);

export default router;
]);

export default router;

