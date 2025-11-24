import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
const MainLayout = () => {
    return (_jsxs("div", { children: [_jsx(NavBar, {}), _jsx(Outlet, {})] }));
};
export default MainLayout;
