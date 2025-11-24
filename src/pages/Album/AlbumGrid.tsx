import React from "react";
import { albums } from "./AlbumData";
import AlbumCard from "./AlbumCard";

export default function AlbumGrid() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-5 gap-4 md:gap-6">
        {albums.map((album, index) => (
          <AlbumCard key={album.id} album={album} index={index} />
        ))}
      </div>
      <div className="h-24"></div>
    </div>
  );
}
