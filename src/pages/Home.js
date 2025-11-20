import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import HeroSection from './home/HeroSection';
import SongSection from './home/Songs';
import ArtistSection from './home/Artists';
import AppFooter from './home/AppFooter';
import ContactUs from './home/ContactUs';
const Home = () => {
    // For this component, we'll assume lightMode false for now
    // You might want to pass isLightMode as a prop or use context
    const isLightMode = false;
    return (_jsxs(_Fragment, { children: [_jsx(HeroSection, { isLightMode: isLightMode }), _jsx(SongSection, { title: "Trending Songs", isLightMode: isLightMode }), _jsx(ArtistSection, { title: "Popular Artists", isLightMode: isLightMode }), _jsx(SongSection, { title: "K-POP Songs", isLightMode: isLightMode }), _jsx(SongSection, { title: "Chinese Songs", isLightMode: isLightMode }), _jsx(SongSection, { title: "Indonesian Songs", isLightMode: isLightMode }), _jsx(SongSection, { title: "Khmer Songs", isLightMode: isLightMode }), _jsx(SongSection, { title: "Top Albums", isLightMode: isLightMode }), _jsx(SongSection, { title: "Mood Playlists", isLightMode: isLightMode }), _jsx(ContactUs, { isLightMode: isLightMode }), _jsx(AppFooter, { isLightMode: isLightMode })] }));
};
export default Home;
