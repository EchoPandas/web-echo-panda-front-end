import { jsx as _jsx } from "react/jsx-runtime";
import { Route, RouterProvider } from 'react-router-dom';
import router from './routes/route';
import HomeLayout from './layouts/HomeLayout';
function App() {
    return (_jsx(RouterProvider, { router: router, children: _jsx(Route, { path: "/", element: _jsx(HomeLayout, {}) }) }));
}
export default App;
