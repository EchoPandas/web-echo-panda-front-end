
import React from 'react';
import HeroSection from './home/HeroSection';
import SongSection from './home/Songs';
import ArtistSection from './home/Artists';
import AppFooter from './home/AppFooter';
import ContactUs from './home/ContactUs';

const Home: React.FC = () => {
 
  const isLightMode = false;

  return (
    <>
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
    </>
  );
};

export default Home;
