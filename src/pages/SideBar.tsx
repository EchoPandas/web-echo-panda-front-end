
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaRegHeart, FaUserFriends, FaRegClock, FaChartLine, FaCog, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { IoMdDisc } from "react-icons/io";
import { RiPlayListFill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";

interface SideBarProps {
  isLightMode: boolean;
}

interface SidebarLink {
  to: string;
  label: string;
  icon: React.ElementType;
  group: "menu" | "library" | "playlist" | "general";
}

const sidebarLinks: SidebarLink[] = [
  { to: "/", label: "Home", icon: FaHome, group: "menu" },
  { to: "/discover", label: "Discover", icon: MdOutlineExplore, group: "menu" },
  { to: "/albums", label: "Albums", icon: IoMdDisc, group: "menu" },
  { to: "/artists", label: "Artists", icon: FaUserFriends, group: "menu" },
  { to: "/recently-added", label: "Recently Added", icon: FaRegClock, group: "library" },
  { to: "/most-played", label: "Most Played", icon: FaChartLine, group: "library" },
  { to: "/favorites", label: "Your Favorites", icon: FaRegHeart, group: "playlist" },
  { to: "/playlist", label: "Your Playlist", icon: RiPlayListFill, group: "playlist" },
  { to: "/settings", label: "Settings", icon: FaCog, group: "general" },
];

const SideBar: React.FC<SideBarProps> = ({ isLightMode }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const bgClass = isLightMode ? "bg-gray-50 text-gray-900" : "bg-black text-white";

  const renderLink = (link: SidebarLink) => (
    <li key={link.to} className="px-4">
      <NavLink
        to={link.to}
        className={({ isActive }) =>
          `flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
              : isLightMode
              ? "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
              : "text-gray-300 hover:text-white hover:bg-gray-800"
          }`
        }
      >
        <link.icon className="mr-4 h-5 w-5" />
        {link.label}
      </NavLink>
    </li>
  );

  const renderSidebarGroups = () => {
    const groups = {
      menu: { title: "Menu", links: [] as SidebarLink[] },
      library: { title: "Library", links: [] as SidebarLink[] },
      playlist: { title: "Playlist & Favorites", links: [] as SidebarLink[] },
      general: { title: "General", links: [] as SidebarLink[] },
    };

    sidebarLinks.forEach((link) => {
      groups[link.group].links.push(link);
    });

    return (
      <>
        {Object.entries(groups).map(([key, group]) => (
          <div key={key} className="mt-4">
            <div className="px-6 text-xs uppercase tracking-wider text-gray-400">{group.title}</div>
            <ul className="mt-2 space-y-1">{group.links.map(renderLink)}</ul>
          </div>
        ))}
        <div className="px-6 mt-3">
          <button
            onClick={() => alert("Add Playlist clicked!")}
            className={`flex items-center text-sm font-semibold text-green-500 hover:text-green-400 transition-colors`}
          >
            <FaPlus className="mr-3 h-4 w-4" /> Add Playlist
          </button>
        </div>
      </>
    );
  };

  return (
    <aside className={`w-72 flex flex-col h-screen ${bgClass}`}>
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-2xl p-8 w-96 text-center shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-400 mb-6">Do you really want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-medium transition-all"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-full font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      <nav className="flex-1 overflow-y-auto">{renderSidebarGroups()}</nav>

      <div className="p-6 border-t border-gray-800">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className={`flex items-center text-lg ${
            isLightMode ? "text-red-600 hover:text-red-700" : "text-red-500 hover:text-red-400"
          }`}
        >
          <FaSignOutAlt className="mr-3 h-5 w-5" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
