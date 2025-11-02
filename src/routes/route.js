import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import { routeConfig } from './routeConfig';
// Get main routes (menu, library, playlist, general) for HomeLayout
const mainRoutes = routeConfig.filter(route => ['menu', 'library', 'playlist', 'general', 'other'].includes(route.group) &&
    route.component);
// Get auth routes for AuthLayout
const authRoutes = routeConfig.filter(route => route.group === 'auth' && route.component);
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(HomeLayout, {}),
        children: mainRoutes.map(route => ({
            path: route.path,
            element: route.component ? _jsx(route.component, {}) : null,
        })),
    },
    {
        path: '/',
        element: _jsx(AuthLayout, {}),
        children: authRoutes.map(route => ({
            path: route.path,
            element: route.component ? _jsx(route.component, {}) : null,
        })),
    },
]);
export default router;
