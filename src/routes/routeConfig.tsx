import {
  FaHome,
  FaRegHeart,
  FaUserFriends,
  FaRegClock,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { IoMdDisc } from "react-icons/io";
import { RiPlayListFill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import Home from "../pages/Home";
import Modify from "../pages/Modify";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Alibum from "../pages/Alibum";
import Discover from "../pages/Discover";
import Profile from "../pages/Profile";
import Artist from "../pages/Artist";
import AboutUs from "../pages/AboutUs";
import RecentlyAdded from "../pages/RecentlyAdded";
import MostPlayed from "../pages/MostPlayed";
import FavoritesPage from "../pages/Favorites";
import { Playlist, Settings } from "./placeholderComponents";
import ContactUs from "../pages/ContactUs";
import SongSection from "../pages/home/Songs";
import SongDetails from "../components/SongDetail";
import SearchPage from "../pages/SearchPage";

export interface RouteConfig {
  path: string;
  label: string;
  icon: React.ElementType | null;
   component?: React.ComponentType<any>;
  group: "menu" | "library" | "playlist" | "general" | "auth" | "other";
  requiresAuth?: boolean;
  showInSidebar?: boolean;
}
const injectProps = (Component: React.ComponentType<any>, props: any) => {
  return () => <Component {...props} />;
};
export const routeConfig: RouteConfig[] = [
  // Main menu routes
  {
    path: "/",
    label: "Home",
    icon: FaHome,
    component: Home,
    group: "menu",
    showInSidebar: true,
  },
  {
    path: "/discover",
    label: "Discover",
    icon: MdOutlineExplore,
    component: Discover,
    group: "menu",
    showInSidebar: true,
  },
  {
    path: "/albums",
    label: "Albums",
    icon: IoMdDisc,
    component: Alibum,
    group: "menu",
    showInSidebar: true,
  },
  {
    path: "/artist",
    label: "Artists",
    icon: FaUserFriends,
    component: Artist,
    group: "menu",
    showInSidebar: true,
  },

  // Library routes
  {
    path: "/recently-added",
    label: "Recently Added",
    icon: FaRegClock,
    component: RecentlyAdded,
    group: "library",
    showInSidebar: true,
  },
  {
    path: "/most-played",
    label: "Most Played",
    icon: FaChartLine,
    component: MostPlayed,
    group: "library",
    showInSidebar: true,
  },

  // Playlist routes
  {
    path: "/favorites",
    label: "Your Favorites",
    icon: FaRegHeart,
    component: FavoritesPage,
    group: "playlist",
    showInSidebar: true,
  },
  {
    path: "/playlist",
    label: "Your Playlist",
    icon: RiPlayListFill,
    component: Playlist,
    group: "playlist",
    showInSidebar: true,
  },

  // General routes
  {
    path: "/settings",
    label: "Settings",
    icon: FaCog,
    component: Settings,
    group: "general",
    showInSidebar: true,
  },
  {
    path: "/modify",
    label: "Modify",
    icon: FaCog,
    component: Modify,
    group: "other",
    showInSidebar: false,
  },
  {
    path: "/profile",
    label: "Profile",
    icon: FaUserFriends,
    component: Profile,
    group: "general",
    showInSidebar: false,
  },
  {
    path: "/aboutUs",
    label: "AboutUs",
    group: "general",
    component: AboutUs,
    showInSidebar: false,
    icon: null,
  },
  {
    path: "/ContactUs",
    label: "Contact Us",
    component: ContactUs,
    group: "general",
    showInSidebar: false,
    icon: null,
  },

  // Auth routes
  {
    path: "/login",
    label: "Login",
    icon: FaHome,
    component: Login,
    group: "auth",
    showInSidebar: false,
  },
  {
    path: "/register",
    label: "Register",
    icon: FaHome,
    component: Register,
    group: "auth",
    showInSidebar: false,
  },
  {
    path: "/Songs",
    label: "Songs",
    component: SongSection,
    group: "general",
    showInSidebar: false,
    icon: null,
  },
  {
    path: "/song/:id",
    label: "Song Detail",
    component: SongDetails,
    group: "other",
    showInSidebar: false,
    icon: null,
  },
{
  path: "/search",
  label: "Search",
  component: injectProps(SearchPage, { isLightMode: true }),
  group: "other",
  showInSidebar: false,
  icon: null,
}
]
// Helper function to get sidebar links
export const getSidebarLinks = (): RouteConfig[] => {
  return routeConfig.filter((route) => route.showInSidebar === true);
};

// Helper function to get routes by group
export const getRoutesByGroup = (
  group: RouteConfig["group"]
): RouteConfig[] => {
  return routeConfig.filter(
    (route) => route.group === group && route.showInSidebar === true
  );
  return routeConfig.filter((route) => route.showInSidebar === true);
};
