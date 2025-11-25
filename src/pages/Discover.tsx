
import React from 'react';
import SongSection from './home/Songs';
import SongDiscoverSection from './home/SongDiscovers';
import AlbumSection from './home/Albumes';
import ArtistSection from './home/Artists';
import AppFooter from './home/AppFooter';

const Discover: React.FC = () => {
  // For this component, we'll assume lightMode false for now
  // You might want to pass isLightMode as a prop or use context
  const isLightMode = false;

  return (
    <>
      {/* Songs Sections */}
      <SongSection title="Music Genres" isLightMode={isLightMode} />
      <SongSection title="Featured Charts" isLightMode={isLightMode} />
      <ArtistSection title="Popular Artists" isLightMode={isLightMode} />     
      <SongDiscoverSection title="Trending Songs" isLightMode={isLightMode} />
      <SongSection title="New Release Songs" isLightMode={isLightMode} />
      <AlbumSection title="Top Albums" isLightMode={isLightMode} />

      {/* Footer */}
      <AppFooter isLightMode={isLightMode} />
    </>
  );
};

export default Discover;
