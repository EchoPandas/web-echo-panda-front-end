import React from "react";
import SongDiscoverSection from "./discover/SongDiscovers";
import AlbumCard from "./Album/AlbumCard";
import { albums } from "./Album/albumData";

const MostPlayed: React.FC = () => {
  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">MOST PLAYED</h1>
        <SongDiscoverSection title="Your Most Played" isLightMode={false} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Most Played Albums
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
            {albums.slice(0, 10).map((album) => (
              <AlbumCard key={album.id} album={album} isLightMode={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPlayed;
