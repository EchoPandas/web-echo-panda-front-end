import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaMicrophone,
  FaTimes,
  FaSearch,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { getCurrentUser, isAuthenticated } from "../routes/authContext";

interface NavBarProps {
  isLightMode: boolean;
  setIsLightMode: (value: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ isLightMode, setIsLightMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loggedIn = isAuthenticated();
    setIsUserLoggedIn(loggedIn);
    if (loggedIn) {
      setUserData(getCurrentUser());
    }
  }, []);

  const headerBg = isLightMode
    ? "bg-white border-gray-200"
    : "bg-black border-gray-800";
  const linkTextColor = isLightMode
    ? "text-gray-600 hover:text-gray-900"
    : "text-gray-300 hover:text-white";
  const inputBg = isLightMode
    ? "bg-gray-200 text-gray-900 placeholder-gray-500"
    : "bg-gray-900 text-white placeholder-gray-400";

  // Voice search modal
  const VoiceSearchModal = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center backdrop-blur-sm z-50">
      <button
        onClick={() => setIsVoiceSearchOpen(false)}
        className="absolute top-8 right-8 text-white hover:text-gray-400"
      >
        <FaTimes className="h-8 w-8" />
      </button>
      <div className="text-center relative">
        <div className="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <FaMicrophone className="h-10 w-10 text-blue-600" />
          </div>
        </div>
        <p className="text-white text-2xl mt-8">Listening...</p>
        <p className="text-gray-400 mt-2">Try saying a song or artist name.</p>
      </div>
    </div>
  );

  return (
    <header
      className={`w-full border-b px-4 md:px-8 py-2 flex items-center justify-between ${headerBg}`}
    >
      {isVoiceSearchOpen && <VoiceSearchModal />}

      {/* Logo */}
      <NavLink
        to="/"
        className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
      >
        Echo Panda
      </NavLink>

      {/* Search */}
      <div className="flex-1 mx-4 relative max-w-full md:max-w-xl">
        <div className="absolute left-3 top-3 text-gray-400">
          <FaSearch />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className={`w-full rounded-full py-2 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 ${inputBg}`}
        />
        <div
          className="absolute right-3 top-3 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
          onClick={() => setIsVoiceSearchOpen(true)}
        >
          <FaMicrophone />
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <NavLink to="/AboutUs" className={linkTextColor}>
          About Us
        </NavLink>
        <NavLink to="/contact-us" className={linkTextColor}>
          Contact
        </NavLink>

        {isUserLoggedIn ? (
          <NavLink
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
          >
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-blue-500"
              />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500">
                <FaUser className="text-white text-sm" />
              </div>
            )}
            <span className={`${linkTextColor} text-base`}>
              {userData?.displayName || userData?.username || "Profile"}
            </span>
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className={`px-4 py-2 text-base font-medium rounded-full ${
                isLightMode
                  ? "text-blue-600 hover:text-blue-500"
                  : "text-blue-500 hover:text-blue-400"
              }`}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={`px-4 py-2 text-base font-medium rounded-full ${
                isLightMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FaBars className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 right-4 bg-gray-800 text-white w-48 py-3 rounded-xl shadow-lg md:hidden z-50">
          <div className="flex flex-col space-y-2 px-3">
            <NavLink
              to="/aboutUs"
              className="dropdown-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact-us"
              className="dropdown-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>

            {isUserLoggedIn ? (
              <NavLink
                to="/profile"
                className="dropdown-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="dropdown-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="dropdown-item bg-blue-600 text-center py-2 rounded-lg hover:bg-blue-700 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
