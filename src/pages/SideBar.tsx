import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaPlus } from "react-icons/fa";
import { getSidebarLinks } from "../routes/routeConfig";

interface SideBarProps {
  isLightMode: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isLightMode }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    void navigate("/login");
  };

  const bgClass = isLightMode ? "bg-gray-50 text-gray-900" : "bg-black text-white";

  const renderLink = (link: ReturnType<typeof getSidebarLinks>[number]) => (
    <li key={link.path} className="px-1 md:px-4">
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start px-3 py-3 rounded-lg transition-all duration-200 
            ${isActive ? "bg-blue-500 text-white" :
              isLightMode ? "text-gray-700 hover:bg-gray-200" :
              "text-gray-300 hover:bg-gray-800"}
          `
        }
      >
        {/*icons for mobile */}
        <link.icon className="h-5 w-5 md:h-6 md:w-6" />
        {/*----------------------------------------------------------------*/}
        <span className="hidden md:inline ml-4">{link.label}</span>
      </NavLink>
    </li>
  );

  const sidebarLinks = getSidebarLinks();

  return (
    <aside
      className={`h-screen flex flex-col ${bgClass}
      w-12 md:w-72 transition-all duration-300`}
    >

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

      <nav className="flex-1 overflow-y-auto mt-3">
        {/* Desktop */}
        <div className="hidden md:block px-6 text-xs text-gray-400 uppercase">Menu</div>
        <ul className="mt-2 space-y-1">
          {sidebarLinks.map((link) => renderLink(link))}
        </ul>

        {/* icon on mobile */}
       <div className="flex justify-center md:block mt-4 md:px-6">
          <button
            onClick={() => alert("Add Playlist clicked!")}
            className="flex items-center justify-center md:justify-start text-green-500 hover:text-green-400">
            <FaPlus className="h-5 w-5 md:h-4 md:w-4" />
            <span className="hidden md:inline ml-3 text-sm font-semibold">
              Add Playlist
            </span>
          </button>
        </div>
      </nav>

      {/* Logout btn*/}
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className={`flex items-center justify-center md:justify-start text-lg ${
            isLightMode ? "text-red-600 hover:text-red-700" : "text-red-500 hover:text-red-400"
          }`}
        >
          <FaSignOutAlt className="h-5 w-5 md:h-6 md:w-6" />
          <span className="hidden md:inline ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
