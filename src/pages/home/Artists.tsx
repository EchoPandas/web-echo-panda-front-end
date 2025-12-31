import React from "react";
import { useNavigate } from "react-router-dom";
import { Artist } from "../../data/searchData";

interface Props {
  title?: string;
  isLightMode?: boolean;
  artists?: Artist[]; 
}

const sampleArtists = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Artist ${String(i + 1)}`,
}));

const ArtistSection: React.FC<Props> = ({ title = "Artists", isLightMode = true, artists = undefined }) => {
  const navigate = useNavigate();
  const bgClass = "bg-transparent";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

  const items = artists && artists.length > 0 ? artists : sampleArtists;

  return (
    <section className={`${bgClass} p-4 rounded-lg`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>

      <div
        className="flex gap-4 overflow-x-auto scroll-hide pb-3 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((artist) => (
          <div
            key={artist.id}
            onClick={() => navigate(`/artist?id=${artist.id}`)}
            className="flex flex-col items-center flex-shrink-0 w-28 snap-start cursor-pointer"
          >
            <div className="rounded-full bg-gray-500 mb-2 transition hover:scale-105 w-24 h-24 sm:w-28 sm:h-28"></div>
            <p className={`text-center text-sm ${textColor}`}>{artist.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistSection;
