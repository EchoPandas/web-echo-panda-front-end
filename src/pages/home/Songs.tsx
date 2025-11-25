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
  const cardBg = isLightMode ? "bg-gray-200" : "bg-gray-700";

  return (
    <section className={`${bgClass} p-4 md:p-6 lg:p-8 rounded-lg mb-8`}>
      <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-4 ${textColor}`}>
        {title}
      </h2>

      <div
    className="flex space-x-4 overflow-x-auto scroll-hide py-2"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
        {sampleSongs.map((song) => (
          <div
            key={song.id}
            className={`min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] p-4 rounded-lg ${cardBg} text-white flex-shrink-0 hover:scale-105 transition-transform`}
          >
            <div className="h-28 md:h-32 bg-gray-500 rounded-lg mb-2"></div>
            <h3 className="font-semibold text-sm md:text-base">{song.title}</h3>
            <p className="text-xs md:text-sm text-gray-300">{song.artist}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SongSection;
