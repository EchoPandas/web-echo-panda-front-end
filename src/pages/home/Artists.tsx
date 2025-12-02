import React from "react";

interface Props {
  title: string;
  isLightMode: boolean;
}

const sampleArtists = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Artist ${String(i + 1)}`,
}));

const ArtistSection: React.FC<Props> = ({ title, isLightMode }) => {
  const bgClass = isLightMode ? "bg-gray-50" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

  return (
    <section className={`${bgClass} p-4 rounded-lg`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>

      {/*Scroll */}
            <div
        className="flex gap-4 overflow-x-auto scroll-hide pb-3 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {sampleArtists.map((artist) => (
          <div
            key={artist.id}
            className="flex flex-col items-center flex-shrink-0 w-28 snap-start"
          >
            <div className="
              rounded-full bg-gray-500 mb-2 transition hover:scale-105
              w-24 h-24 sm:w-28 sm:h-28
            "></div>

            <p className={`text-center text-sm ${textColor}`}>
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistSection;
