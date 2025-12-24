import React from "react";
import { albums } from "../../components/AlbumSampleData";
import AlbumCard from "../../components/AlbumCard";
interface Props {
  isLightMode: boolean;
}

export default function AlbumGrid() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>

      <div className="h-24" />
    </div>
  );
}
