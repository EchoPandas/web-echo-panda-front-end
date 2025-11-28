import React from "react";

import AppFooter from "./home/AppFooter";
import HeroBanner from "./artist/HeroBanner";
import PopularSongs from "./artist/PopularSongs";
import AlbumsSection from "./artist/AlbumsSection";
import SingleSongs from "./artist/SingleSongs";
import PlaylistSection from "./artist/PlaylistSection";
import FansAlsoListen from "./artist/FansAlsoListen";

const Artist: React.FC = () => {
  const isLightMode = false; 
  return (
    <>
      <HeroBanner />
      <div className="space-y-10 p-6 text-white">
        <PopularSongs />          
        <AlbumsSection />         
        <SingleSongs />           
        <PlaylistSection />       
        <FansAlsoListen />         
      </div>
      <AppFooter isLightMode={isLightMode} />
    </>
  );
};

export default Artist;