import React from "react";
import SongDiscoverSection from "./discover/SongDiscovers";

const RecentlyAdded: React.FC = () => {
  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Recently Added</h1>
        <SongDiscoverSection title="Latest Tracks" isLightMode={false} />
      </div>
    </div>
  );
};

export default RecentlyAdded;
