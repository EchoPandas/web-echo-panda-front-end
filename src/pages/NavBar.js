import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaMicrophone, FaTimes, FaSearch } from "react-icons/fa";
const NavBar = ({ isLightMode, setIsLightMode, }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
    const headerBg = isLightMode
        ? "bg-white border-gray-200"
        : "bg-black border-gray-800";
    const linkTextColor = isLightMode
        ? "text-gray-600 hover:text-gray-900"
        : "text-gray-300 hover:text-white";
    const inputBg = isLightMode
        ? "bg-gray-200 text-gray-900 placeholder-gray-500"
        : "bg-gray-900 text-white placeholder-gray-400";
    // === VOICE SEARCH MODAL ===
    const VoiceSearchModal = () => (_jsxs("div", { className: "fixed inset-0 bg-black/90 flex items-center justify-center backdrop-blur-sm z-50", children: [_jsx("button", { onClick: () => {
                    setIsVoiceSearchOpen(false);
                }, className: "absolute top-8 right-8 text-white hover:text-gray-400", children: _jsx(FaTimes, { className: "h-8 w-8" }) }), _jsxs("div", { className: "text-center relative", children: [_jsx("div", { className: "w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl", children: _jsx("div", { className: "w-24 h-24 bg-white rounded-full flex items-center justify-center", children: _jsx(FaMicrophone, { className: "h-10 w-10 text-blue-600" }) }) }), _jsx("p", { className: "text-white text-2xl mt-8", children: "Listening..." }), _jsx("p", { className: "text-gray-400 mt-2", children: "Try saying a song or artist name." })] })] }));
    return (_jsxs("header", { className: `h-16 flex items-center justify-between border-b ${headerBg}`, children: [isVoiceSearchOpen && _jsx(VoiceSearchModal, {}), _jsx("div", { className: "w-55 pl-5 flex items-center", children: _jsx(NavLink, { to: "/", className: "flex items-center", children: _jsxs("span", { className: "text-3xl font-extrabold tracking-wider font-orbitron", children: [_jsxs("span", { className: "relative from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text", children: ["Echo", _jsx("span", { className: "absolute inset-0 blur-sm from-blue-400 via-purple-500 to-pink-500 opacity-40 -z-10" })] }), _jsxs("span", { className: "ml-2 relative from-pink-500 via-purple-500 to-blue-400 text-transparent bg-clip-text", children: ["Panda", _jsx("span", { className: "absolute inset-0 blur-sm from-pink-500 via-purple-500 to-blue-400 opacity-40 -z-10" })] })] }) }) }), _jsxs("div", { className: "flex-1 max-w-2xl relative px-6", children: [_jsx("div", { className: "absolute left-9 top-2 text-gray-400", children: _jsx(FaSearch, { className: "h-5 w-5" }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => {
                            setSearchQuery(e.target.value);
                        }, placeholder: "Search for Music, Artists...", className: `w-full rounded-full py-2 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none ${inputBg} font-inter` }), _jsx("div", { className: "absolute right-9 top-2 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors", onClick: () => {
                            setIsVoiceSearchOpen(true);
                        }, children: _jsx(FaMicrophone, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "flex items-center space-x-8 px-8", children: [_jsx(NavLink
                    //   to="/about-us"
                    // <NavLink
                    , { 
                        //   to="/about-us"
                        // <NavLink
                        to: "/about-us", className: `${linkTextColor} text-base font-medium tracking-wide font-inter hover:scale-105 transition-transform`, children: "About Us" }), _jsx(NavLink
                    //   to="/contact-us"
                    // <NavLink
                    , { 
                        //   to="/contact-us"
                        // <NavLink
                        to: "/contact-us", className: `${linkTextColor} text-base font-medium tracking-wide font-inter hover:scale-105 transition-transform`, children: "Contact" }), _jsx("button", { onClick: () => {
                            setIsLightMode(!isLightMode);
                        }, className: `${linkTextColor} p-2 rounded-full transition-colors`, title: isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode", children: isLightMode ? (_jsx(FaMoon, { className: "h-5 w-5" })) : (_jsx(FaSun, { className: "h-5 w-5 text-yellow-500" })) }), _jsx(NavLink, { to: "/login", className: `px-6 py-2 text-base font-medium rounded-full transition-all hover:scale-105 ${isLightMode
                            ? "text-blue-600 hover:text-blue-500"
                            : "text-blue-500 hover:text-blue-400"} font-inter`, children: "Login" }), _jsx(NavLink, { to: "/register", className: `px-6 py-2 text-base font-medium rounded-full transition-all hover:scale-105 ${isLightMode
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-500 text-white hover:bg-blue-600"} font-inter`, children: "Sign Up" })] })] }));
};
export default NavBar;
