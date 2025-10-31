
import React from "react";

interface Props {
  title: string;
  isLightMode: boolean;
}

const sampleSongs = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
}));

const SongSection: React.FC<Props> = ({ title, isLightMode }) => {
  const bgClass = isLightMode ? "bg-gray-50" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

  return (
    <section className={`${bgClass} p-4 rounded-lg`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {sampleSongs.map((song) => (
          <div
            key={song.id}
            className="min-w-[200px] p-4 rounded-lg bg-gray-700 text-white flex-shrink-0 hover:scale-105 transition"
          >
            <div className="h-32 bg-gray-500 rounded-lg mb-2"></div>
            <h3 className="font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-300">{song.artist}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SongSection;
