import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getSidebarLinks } from "../routes/routeConfig";

interface SideBarProps {
  isLightMode: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isLightMode, isCollapsed = false, onToggleCollapse }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!isCollapsed);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    void navigate("/login");
  };

  const bgClass = isLightMode ? "bg-gray-50 text-gray-900" : "bg-black text-white";

  const renderLink = (link: ReturnType<typeof getSidebarLinks>[number]) => (
    <li key={link.path} className={`px-1 ${isCollapsed ? "flex justify-start" : "md:px-4"}`}>
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          `flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${isCollapsed ? "w-12 justify-center" : "w-full justify-start"}
            ${isActive ? "bg-blue-500 text-white" :
              isLightMode ? "text-gray-700 hover:bg-gray-200" :
              "text-gray-300 hover:bg-gray-800"}
          `
        }
        title={isCollapsed ? link.label : undefined}
      >
        <link.icon className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
        {!isCollapsed && (
          <span className="ml-4">{link.label}</span>
        )}
      </NavLink>
    </li>
  );

  const sidebarLinks = getSidebarLinks();

  return (
    <aside
      className={`h-screen flex flex-col ${bgClass} transition-all duration-300 relative
      ${isCollapsed ? "w-20" : "w-72"}`}
    >
      <button
        onClick={handleToggleCollapse}
        className={`hidden md:flex absolute top-4 right-2 p-2 rounded-lg transition-colors z-10 ${isLightMode ? "hover:bg-gray-200" : "hover:bg-gray-800"}`}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <FaChevronRight className="h-4 w-4" />
        ) : (
          <FaChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-2xl p-8 w-96 text-center shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-400 mb-6">Do you really want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto mt-12">
        {/* Desktop */}
        {!isCollapsed && (
          <div className="px-6 text-xs text-gray-400 uppercase">Menu</div>
        )}
        <ul className="mt-2 space-y-1">
        {sidebarLinks.map((link) => renderLink(link))}
        </ul>

        {/* Add Playlist Button */}
       <div className={`flex ${isCollapsed ? "justify-start px-1" : "px-6"} mt-4`}>
          <button
            onClick={() => alert("Add Playlist clicked!")}
            className={`flex items-center ${isCollapsed ? "w-12 justify-center" : "justify-start"} text-green-500 hover:text-green-400`}>
            <FaPlus className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-semibold">
                Add Playlist
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Logout btn*/}
      <div className={`p-3 border-t border-gray-800 flex ${isCollapsed ? "justify-start px-1" : "justify-start"}`}>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className={`flex items-center ${isCollapsed ? "w-12 justify-center" : "justify-start"} p-2 rounded-lg transition-all ${
            isLightMode ? "text-red-600 hover:text-red-700 hover:bg-gray-200" : "text-red-500 hover:text-red-400 hover:bg-gray-800"
          }`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <FaSignOutAlt className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 text-sm">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;