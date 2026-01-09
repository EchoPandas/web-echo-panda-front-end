import React, { useState, useEffect } from "react";
import HeroSection from "./home/HeroSection";
import SongSection from "./home/Songs";
import ArtistSection from "./home/Artists";
import AppFooter from "./home/AppFooter";
import ContactUs from "./ContactUs";

import InterestOnboardingModal from "../components/InterestOnboardingModal";
import { getRecommendationsForInterests } from "../backend/recommendationService";
import type { Song } from "../data/searchData";

const Home: React.FC = () => {
  const isLightMode = false;

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[] | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem('onboarding:interests');
    if (!stored) {
      setIsOnboardingOpen(true);
    } else {
      try {
        const interests = JSON.parse(stored);
        getRecommendationsForInterests(interests).then(setRecommendedSongs);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleOnboardingSave = (interests: string[]) => {
    localStorage.setItem('onboarding:interests', JSON.stringify(interests));
    setIsOnboardingOpen(false);
    getRecommendationsForInterests(interests).then(setRecommendedSongs);
  };

  return (
    <div className="w-full max-w-full">
      {/* Hero */}
      <HeroSection isLightMode={isLightMode} />

      {recommendedSongs && recommendedSongs.length > 0 && (
        <SongSection title="Recommended for you" isLightMode={isLightMode} songs={recommendedSongs} />
      )}

      {/* Songs Sections */}
      <SongSection title="Trending Songs" isLightMode={isLightMode} limit={6} offset={0} />
      <ArtistSection title="Popular Artists" isLightMode={isLightMode} layout="grid" />
      <SongSection title="K-POP Songs" isLightMode={isLightMode} limit={1} offset={6} />
      <SongSection title="Chinese Songs" isLightMode={isLightMode} limit={1} offset={7} />
      <SongSection title="Indonesian Songs" isLightMode={isLightMode} limit={1} offset={8} />
      <SongSection title="Khmer Songs" isLightMode={isLightMode} limit={1} offset={9} />
      <SongSection title="Top Albums" isLightMode={isLightMode} limit={5} offset={10} />
      <SongSection title="Mood Playlists" isLightMode={isLightMode} limit={5} offset={15} />

      {/* Contact Us */}
      <div className="mb-12">
        <ContactUs isLightMode={isLightMode} />
      </div>

      {/* Onboarding modal */}
      <InterestOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSave={handleOnboardingSave}
      />

      {/* Footer */}
      <AppFooter isLightMode={isLightMode} />
    </div>
  );
};

export default Home;
