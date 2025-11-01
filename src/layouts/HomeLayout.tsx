import React, { useState } from "react";
import SideBar from "../pages/SideBar";
import  NavBar  from '../pages/NavBar';
import HeroSection from "../pages/home/HeroSection";
import SongSection from "../pages/home/Songs";
import ArtistSection from "../pages/home/Artists";

import AppFooter from "../pages/home/AppFooter";
import ContactUs from "../pages/home/ContactUs";

const HomeLayout: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  const mainBg = isLightMode ? "bg-gray-50" : "bg-black";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

 return (
    <div className="flex flex-col h-screen">
      {/* NavBar at the top */}
      <NavBar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />

      {/* Content area with sidebar */}
      <div className={`flex flex-1 ${mainBg} ${textColor} overflow-hidden`}>
        <SideBar isLightMode={isLightMode} />

        <main className="flex-1 overflow-auto p-6 space-y-12">
          {/* Hero */}
          <HeroSection isLightMode={isLightMode} />

          {/* Songs Sections */}
          <SongSection title="Trending Songs" isLightMode={isLightMode} />
          <ArtistSection title="Popular Artists" isLightMode={isLightMode} />
          <SongSection title="K-POP Songs" isLightMode={isLightMode} />
          <SongSection title="Chinese Songs" isLightMode={isLightMode} />
          <SongSection title="Indonesian Songs" isLightMode={isLightMode} />
          <SongSection title="Khmer Songs" isLightMode={isLightMode} />
          <SongSection title="Top Albums" isLightMode={isLightMode} />
          <SongSection title="Mood Playlists" isLightMode={isLightMode} />


          {/* Contact Us */}
          <ContactUs isLightMode={isLightMode} />
          {/* Footer */}
        <AppFooter isLightMode={isLightMode} />
        </main>

        
      </div>
    </div>
  );
};

export default HomeLayout;
