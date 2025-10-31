import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Modify from '../pages/Modify';

const router = createBrowserRouter([
    {
        path: '/',
           element: <HomeLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/modify', element: <Modify /> },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
])
export default router;