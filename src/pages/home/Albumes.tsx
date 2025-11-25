import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

interface Props {
  title: string;
  isLightMode: boolean;
}

const sampleAlbums = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Album ${String(i + 1)}`,
  artist: `Artist ${String(i + 1)}`,
}));

const AlbumSection: React.FC<Props> = ({ title, isLightMode }) => {
  const bgClass = isLightMode ? "bg-gray-50" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";
  const btnClass = isLightMode
    ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
    : "bg-gray-700 text-white hover:bg-gray-600";
  const circleClass = isLightMode
    ? "bg-gray-200 text-gray-900 border-gray-300"
    : "bg-gray-800 text-white border-gray-700";
  const navigate = useNavigate();

  return (
    <section className={`${bgClass} p-4 rounded-lg`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      {/* scrolling row: keep full width, inner flex with w-max so items scroll */}
      <div className="w-full">
        <div className="w-full overflow-x-auto py-2">
          <div className="flex space-x-4 w-max px-1 items-stretch">
            {sampleAlbums.map((album) => (
              <div
                key={album.id}
                className="min-w-[200px] p-4 rounded-lg bg-gray-700 text-white flex-shrink-0 hover:scale-105 transition"
              >
                <div className="h-32 bg-gray-500 rounded-lg mb-2"></div>
                <h3 className="font-semibold">{album.title}</h3>
                <p className="text-sm text-gray-300">{album.artist}</p>
              </div>
            ))}
            {/* "View All" card at end of row */}
            <div className="min-w-[140px] p-4 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
              <button
                aria-label="View all albums"
                type="button"
                onClick={() => navigate("/albums")}
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

export default AlbumSection;
