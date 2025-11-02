import React from 'react';
import {
  FaHome,
  FaRegHeart,
  FaUserFriends,
  FaRegClock,
  FaChartLine,
  FaCog
} from "react-icons/fa";
import { IoMdDisc } from "react-icons/io";
import { RiPlayListFill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import Home from '../pages/Home';
import Modify from '../pages/Modify';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Alibum from '../pages/Alibum';
import Discover from '../pages/Discover';

// Placeholder components for routes
const Artists = () => <div className="p-6"><h1 className="text-2xl font-bold">Artists</h1><p>Explore artists</p></div>;
const RecentlyAdded = () => <div className="p-6"><h1 className="text-2xl font-bold">Recently Added</h1><p>Recently added songs</p></div>;
const MostPlayed = () => <div className="p-6"><h1 className="text-2xl font-bold">Most Played</h1><p>Your most played tracks</p></div>;
const Favorites = () => <div className="p-6"><h1 className="text-2xl font-bold">Your Favorites</h1><p>Your favorite songs</p></div>;
const Playlist = () => <div className="p-6"><h1 className="text-2xl font-bold">Your Playlist</h1><p>Your playlists</p></div>;
const Settings = () => <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Application settings</p></div>;

export interface RouteConfig {
  path: string;
  label: string;
  icon: React.ElementType;
  component?: React.ComponentType;
  group: "menu" | "library" | "playlist" | "general" | "auth" | "other";
  requiresAuth?: boolean;
  showInSidebar?: boolean;
}

export const routeConfig: RouteConfig[] = [
  // Main menu routes
  { path: "/", label: "Home", icon: FaHome, component: Home, group: "menu", showInSidebar: true },
  { path: "/discover", label: "Discover", icon: MdOutlineExplore, component: Discover, group: "menu", showInSidebar: true },
  { path: "/albums", label: "Albums", icon: IoMdDisc, component: Alibum, group: "menu", showInSidebar: true },
  { path: "/artists", label: "Artists", icon: FaUserFriends, component: Artists, group: "menu", showInSidebar: true },

  // Library routes
  { path: "/recently-added", label: "Recently Added", icon: FaRegClock, component: RecentlyAdded, group: "library", showInSidebar: true },
  { path: "/most-played", label: "Most Played", icon: FaChartLine, component: MostPlayed, group: "library", showInSidebar: true },

  // Playlist routes
  { path: "/favorites", label: "Your Favorites", icon: FaRegHeart, component: Favorites, group: "playlist", showInSidebar: true },
  { path: "/playlist", label: "Your Playlist", icon: RiPlayListFill, component: Playlist, group: "playlist", showInSidebar: true },

  // General routes
  { path: "/settings", label: "Settings", icon: FaCog, component: Settings, group: "general", showInSidebar: true },
  { path: "/modify", label: "Modify", icon: FaCog, component: Modify, group: "other", showInSidebar: false },

  // Auth routes
  { path: "/login", label: "Login", icon: FaHome, component: Login, group: "auth", showInSidebar: false },
  { path: "/register", label: "Register", icon: FaHome, component: Register, group: "auth", showInSidebar: false },
];

// Helper function to get sidebar links
export const getSidebarLinks = (): RouteConfig[] => {
  return routeConfig.filter(route => route.showInSidebar === true);
};

// Helper function to get routes by group
export const getRoutesByGroup = (group: RouteConfig["group"]): RouteConfig[] => {
  return routeConfig.filter(route => route.group === group && route.showInSidebar === true);
};
