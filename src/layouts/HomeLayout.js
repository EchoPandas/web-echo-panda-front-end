import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/SideBar";
import NavBar from '../pages/NavBar';
const HomeLayout = () => {
    const [isLightMode, setIsLightMode] = useState(false);
    const mainBg = isLightMode ? "bg-gray-50" : "bg-black";
    const textColor = isLightMode ? "text-gray-900" : "text-white";
    return (_jsxs("div", { className: "flex flex-col h-screen", children: [_jsx(NavBar, { isLightMode: isLightMode, setIsLightMode: setIsLightMode }), _jsxs("div", { className: `flex flex-1 ${mainBg} ${textColor} overflow-hidden`, children: [_jsx(SideBar, { isLightMode: isLightMode }), _jsx("main", { className: "flex-1 overflow-auto p-6 space-y-12", children: _jsx(Outlet, {}) })] })] }));
};
export default HomeLayout;
