import React, { useState } from "react";
import { FaHeart as Heart, FaPlay as Play, FaPlus as Plus } from "react-icons/fa";

interface Props {
  title?: string;
  isLightMode?: boolean;
}

interface SongItem {
  id: number;
  title: string;
  artist: string;
  date?: string;
  album?: string;
  duration?: string;
  color?: string;
}

const sampleSongs: SongItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
  date: "2024-01-01",
  album: `Album ${i + 1}`,
  duration: `${2 + (i % 4)}:${(10 + i).toString().slice(-2)}`,
  // use gray tones only
  color: ["bg-gray-400"][i % 1],
}));

const SongDiscoverSection: React.FC<Props> = ({ title = "Top Tracks", isLightMode = false }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [favs, setFavs] = useState<Record<number, boolean>>({});

  const toggleFav = (id: number) => {
    setFavs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const wrapperBg = isLightMode ? "bg-gray-50 text-gray-900" : "bg-[#0f0f0f] text-white";

  return (
    <section className={`max-w-7xl mx-auto p-4 md:p-8 ${wrapperBg} rounded-lg`}>
      <header className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {/* removed top View All - moved below list */}
      </header>

      <div className="grid grid-cols-12 gap-4 text-xs md:text-sm uppercase tracking-wide text-gray-400 font-medium border-b border-gray-800 pb-2">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5 md:col-span-4">Title</div>
        <div className="hidden md:block md:col-span-3">Album</div>
        <div className="hidden md:block md:col-span-2">Release</div>
        <div className="col-span-2 text-right">Time</div>
      </div>

      <div className="space-y-2 mt-3">
        {sampleSongs.map((s) => (
          <div
            key={s.id}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className="group grid grid-cols-12 items-center gap-4 p-3 rounded-lg bg-gray-800/70 hover:bg-gray-700/70 transition-colors cursor-pointer"
          >
            <div className="col-span-1 flex justify-center items-center text-sm font-semibold text-gray-200">
              {hovered === s.id ? <Play size={16} className="text-gray-100" /> : `#${s.id}`}
            </div>

            <div className="col-span-5 md:col-span-4 flex items-center gap-3 min-w-0">
              <div className={`w-12 h-12 ${s.color} rounded-md shrink-0 flex items-center justify-center text-xs font-bold overflow-hidden`}>
                <div className="w-full h-full bg-gradient-to-br from-black/10 to-transparent opacity-40" />
              </div>
              <div className="min-w-0">
                <div className={`truncate font-semibold ${hovered === s.id ? "text-gray-100" : "text-gray-200"}`}>
                  {s.title}
                </div>
                <div className="text-xs text-gray-400 truncate">{s.artist}</div>
              </div>
            </div>

            <div className="hidden md:block md:col-span-3 text-sm text-gray-300 truncate">{s.album}</div>
            <div className="hidden md:block md:col-span-2 text-sm text-gray-300">{s.date}</div>

            <div className="col-span-2 flex items-center justify-end gap-4 pr-2">
              <button
                onClick={() => toggleFav(s.id)}
                className="hover:scale-110 transition-transform"
                aria-label={`favorite-${s.id}`}
                type="button"
              >
                <Heart size={16} className={favs[s.id] ? "text-red-400" : "text-gray-400"} />
              </button>
              <div className="text-sm font-medium text-gray-300 w-12 text-right">{s.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SongDiscoverSection;
