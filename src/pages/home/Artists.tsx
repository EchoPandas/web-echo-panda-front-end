// src/pages/Artists.tsx
import React from "react";

interface Props {
  title: string;
  isLightMode: boolean;
}

const sampleArtists = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Artist ${i + 1}`,
}));

const ArtistSection: React.FC<Props> = ({ title, isLightMode }) => {
  const bgClass = isLightMode ? "bg-gray-50" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

  return (
    <section className={`${bgClass} p-4 rounded-lg`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {sampleArtists.map((artist) => (
          <div
            key={artist.id}
            className="flex flex-col items-center flex-shrink-0 w-32"
          >
            <div className="h-32 w-32 rounded-full bg-gray-500 mb-2 hover:scale-105 transition"></div>
            <p className="text-center">{artist.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistSection;
