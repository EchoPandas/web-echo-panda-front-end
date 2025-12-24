import React from "react";

import AlbumCard from "../../components/AlbumCard";
import { albums } from "../../components/AlbumSampleData";

interface Props {
  title?: string;
  isLightMode?: boolean;
}

const SongSection: React.FC<Props> = ({
  title = "Songs",
  isLightMode = true,
}) => {
  const bgClass = isLightMode ? "bg-gray-50" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

  return (
    <section className={`${bgClass} p-4 md:p-6 lg:p-8 rounded-lg mt-8 mb-8`}>
      <h2
        className={`text-xl md:text-2xl lg:text-3xl font-bold mb-4 ${textColor}`}
      >
        {title}
      </h2>

      {/* Horizontal scrolling container */}
      <div className="w-full overflow-x-auto overflow-y-hidden pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
        <div className="flex gap-4 md:gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              className="w-[160px] sm:w-[180px] md:w-[200px] flex-shrink-0"
            >
              <AlbumCard album={album} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SongSection;
