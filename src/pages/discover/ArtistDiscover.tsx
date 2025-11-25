// src/pages/Artists.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

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
  const circleClass = isLightMode
    ? "bg-gray-200 text-gray-900 border-gray-300"
    : "bg-gray-800 text-white border-gray-700";
  const navigate = useNavigate();

  return (
    <section className={`${bgClass} p-4 rounded-lg`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      <div className="w-full">
        <div className="w-full overflow-x-auto py-2">
          <div className="flex space-x-4 w-max px-1 items-stretch">
            {sampleArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex flex-col items-center flex-shrink-0 w-32 p-3 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 transition"
              >
                <div className="h-32 w-32 rounded-full bg-gray-500 mb-2 hover:scale-105 transition"></div>
                <p className="text-center text-sm text-gray-200 truncate w-28">{artist.name}</p>
              </div>
            ))}
            {/* final "View All" card */}
            <div className="min-w-[140px] p-4 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
              <button
                aria-label="View all artists"
                type="button"
                onClick={() => navigate("/artists")}
                className={`w-12 h-12 rounded-full flex items-center justify-center border ${circleClass} transition-transform hover:scale-105`}
              >
                <FaEye size={16} />
              </button>
              <div className="mt-2 text-xs text-gray-300">View All</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
