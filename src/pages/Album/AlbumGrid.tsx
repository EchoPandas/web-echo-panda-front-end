import React from "react";
import { albums } from "./albumData";
import AlbumCard from "./AlbumCard";
interface Props {
  isLightMode: boolean;
}

export default function AlbumGrid({ isLightMode }: Props) {
  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            isLightMode={isLightMode}
          />
        ))}
      </div>
       {/* Space at the bottom  */}
      <div className="h-24" />
    </div>
  );
}
