import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// === ICON IMPORTS ===
import { FaSignOutAlt, FaPlus, FaTimes, FaSun, FaMoon, FaMicrophone, } from "react-icons/fa";
import { getSidebarLinks } from "../routes/routeConfig";
// === CONSTANTS ===
const HEADER_CLASS = "px-6 text-xs uppercase tracking-wider";
const NavBar = () => {
    // === STATE VARIABLES ===
    const [searchQuery, setSearchQuery] = useState("");
    const [isLightMode, setIsLightMode] = useState(false);
    const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();
    // === THEME COLORS ===
    const sidebarBg = isLightMode ? "bg-white border-gray-200" : "bg-black border-gray-900";
    const headerBg = isLightMode ? "bg-white border-gray-200" : "bg-black border-gray-800";
    const textColor = isLightMode ? "text-gray-900" : "text-white";
    const linkTextColor = isLightMode ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white";
    const linkHoverBg = isLightMode ? "hover:bg-gray-100" : "hover:bg-gray-800";
    const sidebarHeaderColor = isLightMode ? "text-gray-500" : "text-gray-400";
    const mainBg = isLightMode ? "bg-gray-50" : "bg-black";
    // === LOGOUT HANDLER ===
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        void navigate("/login"); // mark promise as intentionally ignored
    };
    // === LOGOUT CONFIRM MODAL ===
    const LogoutConfirmModal = () => (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-gray-900 text-white rounded-2xl p-8 w-96 text-center shadow-2xl", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Are you sure?" }), _jsx("p", { className: "text-gray-400 mb-6", children: "Do you really want to log out from EchoPanda?" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: handleLogout, className: "bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-medium transition-all", children: "Yes, Log Out" }), _jsx("button", { onClick: () => { setShowLogoutConfirm(false); }, className: "bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-full font-medium transition-all", children: "Cancel" })] })] }) }));
    // === RENDER SINGLE LINK ITEM ===
    const renderLink = (link) => (_jsx("li", { className: "px-4", children: _jsxs(NavLink, { to: link.path, className: ({ isActive }) => `flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50" : `${linkTextColor} ${linkHoverBg}`}`, children: [_jsx(link.icon, { className: "mr-4 h-5 w-5" }), link.label] }) }, link.path));
    // === RENDER SIDEBAR GROUPS ===
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
        return (_jsxs(_Fragment, { children: [Object.entries(groups).map(([key, group]) => (_jsxs("div", { className: "mt-4", children: [_jsx("div", { className: `${HEADER_CLASS} ${sidebarHeaderColor}`, children: group.title }), _jsx("ul", { className: "mt-2 space-y-1", children: group.links.map(renderLink) })] }, key))), _jsx("div", { className: "px-6 mt-3", children: _jsxs("button", { onClick: () => { alert("Add Playlist clicked!"); }, className: "flex items-center text-sm font-semibold text-green-500 hover:text-green-400 transition-colors", children: [_jsx(FaPlus, { className: "mr-3 h-4 w-4" }), " Add Playlist"] }) })] }));
    };
    // === VOICE SEARCH MODAL ===
    const VoiceSearchModal = () => (_jsxs("div", { className: "fixed inset-0 bg-black/90 flex items-center justify-center backdrop-blur-sm z-50", children: [_jsx("button", { onClick: () => { setIsVoiceSearchOpen(false); }, className: "absolute top-8 right-8 text-white hover:text-gray-400", children: _jsx(FaTimes, { className: "h-8 w-8" }) }), _jsxs("div", { className: "text-center relative", children: [_jsxs("div", { className: "w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl", children: [_jsx("div", { className: "w-32 h-32 bg-blue-400 rounded-full animate-ping absolute opacity-50" }), _jsx("div", { className: "w-24 h-24 bg-white rounded-full flex items-center justify-center", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-10 w-10 text-blue-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 10a7 7 0 01-14 0M12 17v4m-4 0h8m0-11a3 3 0 00-3-3V4a3 3 0 006 0v3a3 3 0 00-3 3z" }) }) })] }), _jsx("p", { className: "text-white text-2xl mt-8", children: "Listening..." }), _jsx("p", { className: "text-gray-400 mt-2", children: "Try saying a song or artist name." })] })] }));
    return (_jsxs("div", { className: `flex h-screen ${mainBg} ${textColor}`, children: [isVoiceSearchOpen && _jsx(VoiceSearchModal, {}), showLogoutConfirm && _jsx(LogoutConfirmModal, {}), _jsxs("aside", { className: `w-72 flex flex-col transition-all ${sidebarBg}`, children: [_jsxs("div", { className: "p-8 flex items-center space-x-4", children: [_jsx("div", { className: "w-8 h-8" }), _jsxs("span", { className: "text-2xl font-extrabold", children: [_jsx("span", { className: "text-fuchsia-600", children: "Echo" }), _jsx("span", { className: "text-blue-600", children: "Panda" })] })] }), _jsx("nav", { className: "flex-1 overflow-y-auto", children: renderSidebarGroups() }), _jsx("div", { className: `p-6 border-t ${isLightMode ? "border-gray-200" : "border-gray-800"}`, children: _jsxs("button", { onClick: () => { setShowLogoutConfirm(true); }, className: "flex items-center text-red-500 hover:text-red-400 text-lg", children: [_jsx(FaSignOutAlt, { className: "mr-3 h-5 w-5" }), " Logout"] }) })] }), _jsxs("main", { className: "flex-1 flex flex-col", children: [_jsxs("header", { className: `h-16 flex items-center justify-between px-6 ${headerBg}`, children: [_jsxs("div", { className: "flex-1 max-w-2xl relative", children: [_jsx("input", { type: "text", value: searchQuery, onChange: (e) => { setSearchQuery(e.target.value); }, placeholder: "Search for Music, Artists...", className: `w-full rounded-full py-2 px-4 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 outline-none ${isLightMode ? "bg-gray-200 text-gray-900 placeholder-gray-500" : "bg-gray-900 text-white placeholder-gray-500"}` }), _jsx("div", { className: "absolute left-3 top-2.5 text-gray-400", children: _jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }), _jsx("div", { className: "absolute right-3 top-2.5 text-gray-400 hover:text-blue-500 cursor-pointer", onClick: () => { setIsVoiceSearchOpen(true); }, children: _jsx(FaMicrophone, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "flex items-center space-x-6 ml-6", children: [_jsx(NavLink, { to: "/about-us", className: linkTextColor, children: "About Us" }), _jsx(NavLink, { to: "/contact-us", className: linkTextColor, children: "Contact" }), _jsx("button", { onClick: () => { setIsLightMode(!isLightMode); }, className: `${linkTextColor} p-2 rounded-full`, title: isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode", children: isLightMode ? _jsx(FaMoon, { className: "h-5 w-5" }) : _jsx(FaSun, { className: "h-5 w-5 text-yellow-500" }) }), _jsx(NavLink, { to: "/login", className: "px-4 py-1 text-blue-500 hover:text-blue-400 font-medium", children: "Login" }), _jsx(NavLink, { to: "/signup", className: "px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 font-medium", children: "Sign Up" })] })] }), _jsx("section", { className: "flex-1 overflow-auto p-6" })] })] }));
};
export default NavBar;
