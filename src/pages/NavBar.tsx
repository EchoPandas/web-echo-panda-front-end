import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaMicrophone,
  FaTimes,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { getUserData, isAuthenticated } from "../routes/authContext";

interface NavBarProps {
  isLightMode: boolean;
  setIsLightMode: (value: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ isLightMode, setIsLightMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const loggedIn = isAuthenticated();
    setIsUserLoggedIn(loggedIn);
    if (loggedIn) {
      setUserData(getUserData());
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

  // === VOICE SEARCH MODAL ===
  const VoiceSearchModal = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center backdrop-blur-sm z-50">
      <button
        onClick={() => {
          setIsVoiceSearchOpen(false);
        }}
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
      className={`h-16 flex items-center justify-between border-b ${headerBg}`}
    >
      {isVoiceSearchOpen && <VoiceSearchModal />}

      <div className="w-55 pl-5 flex items-center">
        <NavLink to="/" className="flex items-center">
          <span className="text-3xl font-extrabold tracking-wider font-orbitron">
            <span className="relative from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Echo
              <span className="absolute inset-0 blur-sm from-blue-400 via-purple-500 to-pink-500 opacity-40 -z-10"></span>
            </span>
            <span className="ml-2 relative from-pink-500 via-purple-500 to-blue-400 text-transparent bg-clip-text">
              Panda
              <span className="absolute inset-0 blur-sm from-pink-500 via-purple-500 to-blue-400 opacity-40 -z-10"></span>
            </span>
          </span>
        </NavLink>
      </div>

      <div className="flex-1 max-w-2xl relative px-6">
        <div className="absolute left-9 top-2 text-gray-400">
          <FaSearch className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search for Music, Artists..."
          className={`w-full rounded-full py-2 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none ${inputBg} font-inter`}
        />
        <div
          className="absolute right-9 top-2 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
          onClick={() => {
            setIsVoiceSearchOpen(true);
          }}
        >
          <FaMicrophone className="h-5 w-5" />
        </div>
      </div>

      <div className="flex items-center space-x-8 px-8">
        <NavLink
          //   to="/about-us"
          // <NavLink
          to="/about-us"
          className={`${linkTextColor} text-base font-medium tracking-wide font-inter hover:scale-105 transition-transform`}
        >
          About Us
        </NavLink>
        <NavLink
          //   to="/contact-us"
          // <NavLink
          to="/contact-us"
          className={`${linkTextColor} text-base font-medium tracking-wide font-inter hover:scale-105 transition-transform`}
        >
          Contact
        </NavLink>

        <button
          onClick={() => {
            setIsLightMode(!isLightMode);
          }}
          className={`${linkTextColor} p-2 rounded-full transition-colors`}
          title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {isLightMode ? (
            <FaMoon className="h-5 w-5" />
          ) : (
            <FaSun className="h-5 w-5 text-yellow-500" />
          )}
        </button>

        {isUserLoggedIn ? (
          <NavLink
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
            title="Profile"
          >
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-blue-500"
              />
            ) : (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isLightMode ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                <FaUser className="text-white text-sm" />
              </div>
            )}
            <span
              className={`${linkTextColor} text-base font-medium font-inter`}
            >
              {userData?.displayName || userData?.username || "Profile"}
            </span>
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className={`px-6 py-2 text-base font-medium rounded-full transition-all hover:scale-105 ${
                isLightMode
                  ? "text-blue-600 hover:text-blue-500"
                  : "text-blue-500 hover:text-blue-400"
              } font-inter`}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={`px-6 py-2 text-base font-medium rounded-full transition-all hover:scale-105 ${
                isLightMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } font-inter`}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};
export default NavBar;
