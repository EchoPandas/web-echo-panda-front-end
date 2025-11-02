import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaPlus } from "react-icons/fa";
import { getSidebarLinks } from "../routes/routeConfig";
const SideBar = ({ isLightMode }) => {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        void navigate("/login");
    };
    const bgClass = isLightMode ? "bg-gray-50 text-gray-900" : "bg-black text-white";
    const renderLink = (link) => (_jsx("li", { className: "px-4", children: _jsxs(NavLink, { to: link.path, className: ({ isActive }) => `flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                : isLightMode
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"}`, children: [_jsx(link.icon, { className: "mr-4 h-5 w-5" }), link.label] }) }, link.path));
    const renderSidebarGroups = () => {
        const sidebarLinks = getSidebarLinks();
        const groups = {
            menu: { title: "Menu", links: [] },
            library: { title: "Library", links: [] },
            playlist: { title: "Playlist & Favorites", links: [] },
            general: { title: "General", links: [] },
        };
        sidebarLinks.forEach((link) => {
            if (link.group in groups) {
                groups[link.group].links.push(link);
            }
        });
        return (_jsxs(_Fragment, { children: [Object.entries(groups).map(([key, group]) => (_jsxs("div", { className: "mt-4", children: [_jsx("div", { className: "px-6 text-xs uppercase tracking-wider text-gray-400", children: group.title }), _jsx("ul", { className: "mt-2 space-y-1", children: group.links.map(renderLink) })] }, key))), _jsx("div", { className: "px-6 mt-3", children: _jsxs("button", { onClick: () => {
                            alert("Add Playlist clicked!");
                        }, className: `flex items-center text-sm font-semibold text-green-500 hover:text-green-400 transition-colors`, children: [_jsx(FaPlus, { className: "mr-3 h-4 w-4" }), " Add Playlist"] }) })] }));
    };
    return (_jsxs("aside", { className: `w-72 flex flex-col h-screen ${bgClass}`, children: [showLogoutConfirm && (_jsx("div", { className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-gray-900 text-white rounded-2xl p-8 w-96 text-center shadow-2xl", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Are you sure?" }), _jsx("p", { className: "text-gray-400 mb-6", children: "Do you really want to log out?" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: handleLogout, className: "bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-medium transition-all", children: "Yes, Log Out" }), _jsx("button", { onClick: () => {
                                        setShowLogoutConfirm(false);
                                    }, className: "bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-full font-medium transition-all", children: "Cancel" })] })] }) })), _jsx("nav", { className: "flex-1 overflow-y-auto", children: renderSidebarGroups() }), _jsx("div", { className: "p-6 border-t border-gray-800", children: _jsxs("button", { onClick: () => {
                        setShowLogoutConfirm(true);
                    }, className: `flex items-center text-lg ${isLightMode ? "text-red-600 hover:text-red-700" : "text-red-500 hover:text-red-400"}`, children: [_jsx(FaSignOutAlt, { className: "mr-3 h-5 w-5" }), " Logout"] }) })] }));
};
export default SideBar;
