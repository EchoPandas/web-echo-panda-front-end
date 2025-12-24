import React from "react";
import SongDiscoverSection from "./discover/SongDiscovers";
import { albums } from "../components/AlbumSampleData";
import AlbumCard from "../components/AlbumCard";

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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {albums.slice(0, 10).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPlayed;
