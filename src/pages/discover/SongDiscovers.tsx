import React, { useState, useRef, useEffect } from "react";
import {
  FaHeart as Heart,
  FaPlay as Play,
  FaCheck as Check,
  FaPlus,
  FaShareAlt,
  FaListUl,
  FaUser,
  FaCompactDisc,
  FaClock,
} from "react-icons/fa";

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

const SongDiscoverSection: React.FC<Props> = ({
  title = "Top Tracks",
  isLightMode = false,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [favs, setFavs] = useState<Record<number, boolean>>({});
  const [contextMenu, setContextMenu] = useState<{
    songId: number;
    x: number;
    y: number;
  } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const toggleFav = (id: number) => {
    setFavs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleHeartClick = (e: React.MouseEvent, songId: number) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setContextMenu({
      songId,
      x: rect.left,
      y: rect.bottom + 5,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleMenuAction = (action: string, songId: number) => {
    console.log(`Action: ${action} for song ${songId}`);
    // Handle different actions here
    if (action === "favorite") {
      toggleFav(songId);
    }
    closeContextMenu();
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    if (contextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const wrapperBg = isLightMode
    ? "bg-gray-50 text-gray-900"
    : "bg-[#0f0f0f] text-white";

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
              {hovered === s.id ? (
                <Play size={16} className="text-gray-100" />
              ) : (
                `#${s.id}`
              )}
            </div>

            <div className="col-span-5 md:col-span-4 flex items-center gap-3 min-w-0">
              <div
                className={`w-12 h-12 ${s.color} rounded-md shrink-0 flex items-center justify-center text-xs font-bold overflow-hidden`}
              >
                <div className="w-full h-full bg-gradient-to-br from-black/10 to-transparent opacity-40" />
              </div>
              <div className="min-w-0">
                <div
                  className={`truncate font-semibold ${
                    hovered === s.id ? "text-gray-100" : "text-gray-200"
                  }`}
                >
                  {s.title}
                </div>
                <div className="text-xs text-gray-400 truncate">{s.artist}</div>
              </div>
            </div>

            <div className="hidden md:block md:col-span-3 text-sm text-gray-300 truncate">
              {s.album}
            </div>
            <div className="hidden md:block md:col-span-2 text-sm text-gray-300">
              {s.date}
            </div>

            <div className="col-span-2 flex items-center justify-end gap-10 pr-2">
              <button
                onClick={(e) => handleHeartClick(e, s.id)}
                className="hover:scale-110 transition-transform"
                aria-label={`favorite-${s.id}`}
                type="button"
              >
                <Heart
                  size={16}
                  className={favs[s.id] ? "text-red-400" : "text-gray-400"}
                />
              </button>
              <div className="text-sm font-medium text-gray-300 w-12 text-right">
                {s.duration}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spotify-style Context Menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          style={{
            position: "fixed",
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            zIndex: 1000,
          }}
          className="bg-[#282828] text-white rounded-md shadow-2xl min-w-[220px] py-1 border border-gray-700/50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="py-1">
            <button
              onClick={() => handleMenuAction("favorite", contextMenu.songId)}
              className="w-full px-3 py-2.5 text-left hover:bg-gray-700/50 transition-colors flex items-center gap-3 text-sm"
            >
              <Heart
                size={14}
                className={
                  favs[contextMenu.songId] ? "text-red-400" : "text-gray-300"
                }
              />
              <span>
                {favs[contextMenu.songId]
                  ? "Remove from Liked Songs"
                  : "Save to Liked Songs"}
              </span>
            </button>
          </div>

          <div className="border-t border-gray-700/50 py-1">
            <button
              onClick={() =>
                handleMenuAction("addToPlaylist", contextMenu.songId)
              }
              className="w-full px-3 py-2.5 text-left hover:bg-gray-700/50 transition-colors flex items-center gap-3 text-sm"
            >
              <FaPlus size={14} className="text-gray-300" />
              <span>Add to Playlist</span>
            </button>
          </div>

          <div className="border-t border-gray-700/50 py-1">
            <button
              onClick={() => handleMenuAction("goToArtist", contextMenu.songId)}
              className="w-full px-3 py-2.5 text-left hover:bg-gray-700/50 transition-colors flex items-center gap-3 text-sm"
            >
              <FaUser size={14} className="text-gray-300" />
              <span>Go to Artist</span>
            </button>
            <button
              onClick={() => handleMenuAction("goToAlbum", contextMenu.songId)}
              className="w-full px-3 py-2.5 text-left hover:bg-gray-700/50 transition-colors flex items-center gap-3 text-sm"
            >
              <FaCompactDisc size={14} className="text-gray-300" />
              <span>Go to Album</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SongDiscoverSection;
