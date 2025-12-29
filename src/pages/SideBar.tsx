import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaSignOutAlt, FaPlus, FaChevronLeft, FaChevronRight 
} from "react-icons/fa";
import { getSidebarLinks } from "../routes/routeConfig";

interface SideBarProps {
  isLightMode: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isLightMode, isCollapsed = false, onToggleCollapse }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const sidebarLinks = getSidebarLinks();

  const handleToggleCollapse = () => {
    if (onToggleCollapse) onToggleCollapse(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    void navigate("/login");
  };

  const themeClasses = {
    aside: isLightMode ? "bg-white border-r border-gray-200 text-gray-900" : "bg-black text-white",
    hover: isLightMode ? "hover:bg-gray-100" : "hover:bg-white/10",
    textMuted: isLightMode ? "text-gray-500" : "text-gray-400",
    border: isLightMode ? "border-gray-200" : "border-white/10"
  };

  return (
    <>
      <aside
        className={`h-screen flex flex-col transition-all duration-300 relative z-40 ${themeClasses.aside} ${
          isCollapsed ? "w-20" : "w-64 md:w-72"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={handleToggleCollapse}
          className={`hidden md:flex absolute top-5 -right-3 p-1.5 rounded-full border bg-inherit shadow-md transition-transform z-50 ${themeClasses.border} hover:scale-110 active:scale-95`}
        >
          {isCollapsed ? <FaChevronRight size={10} /> : <FaChevronLeft size={10} />}
        </button>
        
        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 hide-scrollbar">
          {!isCollapsed && (
            <div className={`px-5 mb-3 text-[11px] font-bold uppercase tracking-[0.2em] ${themeClasses.textMuted}`}>
              Menu
            </div>
          )}

          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  title={isCollapsed ? link.label : ""}
                  className={({ isActive }) => `
                    flex items-center rounded-2xl transition-all duration-200 group
                    ${/* BIGGER PADDING HERE */ isCollapsed ? "p-4 justify-center" : "py-4 px-5 justify-start"}
                    ${isActive 
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                      : `text-gray-400 ${themeClasses.hover} hover:text-white`
                    }
                  `}
                >
                  {/* BIGGER ICONS */}
                  <link.icon className={`h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110 ${isCollapsed ? "" : "mr-4"}`} />
                  {!isCollapsed && <span className="font-bold text-[15px] truncate tracking-wide">{link.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Action Section */}
          <div className={`mt-8 ${isCollapsed ? "px-0" : "px-2"}`}>
            <button
              onClick={() => alert("New Playlist")}
              className={`flex items-center w-full rounded-2xl border-2 border-dashed transition-all group
                ${isCollapsed ? "p-4 justify-center" : "py-4 px-5 justify-start"}
                ${isLightMode ? "border-gray-200 hover:border-blue-500" : "border-white/10 hover:border-blue-500"}
              `}
            >
              <FaPlus className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              {!isCollapsed && (
                <span className="ml-4 text-[15px] font-bold text-gray-400 group-hover:text-blue-500">
                  New Playlist
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Logout Section */}
        <div className={`p-4 border-t ${themeClasses.border}`}>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`flex items-center w-full rounded-2xl transition-all group
              ${isCollapsed ? "p-4 justify-center" : "py-4 px-5 justify-start"}
              ${isLightMode ? "text-red-600 hover:bg-red-50" : "text-red-500 hover:bg-red-500/10"}
            `}
          >
            <FaSignOutAlt className="h-6 w-6 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && <span className="ml-4 text-[15px] font-bold">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Styles for scrollbar hiding */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* ... Logout Modal remains the same ... */}
    </>
  );
};

export default SideBar;