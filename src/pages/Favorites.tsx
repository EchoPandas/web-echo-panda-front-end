import React, { useState, useRef, useEffect } from "react";
import {
  FaHeart as Heart,
  FaPlay as Play,
  FaPlus,
  FaUser,
  FaCompactDisc,
} from "react-icons/fa";
import { getCurrentUser } from "../routes/authContext";

interface SongItem {
  id: number;
  title: string;
  artist: string;
  date: string;
  album: string;
  duration: string;
  color: string;
  userEmail: string;
}

const sampleFavorites: SongItem[] = [
  {
    id: 1,
    title: "Favorite Song 1",
    artist: "Artist A",
    date: "2025-01-01",
    album: "Album 1",
    duration: "3:20",
    color: "bg-gray-400",
    userEmail: "test@gmail.com",
  },
  {
    id: 2,
    title: "Favorite Song 2",
    artist: "Artist B",
    date: "2025-01-02",
    album: "Album 2",
    duration: "2:58",
    color: "bg-gray-500",
    userEmail: "other@gmail.com",
  },
];

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<SongItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    songId: number;
    x: number;
    y: number;
  } | null>(null);

  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      const user = getCurrentUser();
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      const userFavorites = sampleFavorites.filter(
        (song) => song.userEmail === user.email
      );
      setFavorites(userFavorites);
      setLoading(false);
    };
    loadFavorites();
  }, []);

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAll = () => {
    setFavorites([]);
  };

  const handleHeartClick = (e: React.MouseEvent, songId: number) => {
    e.stopPropagation();
    removeFavorite(songId);
  };

  const handleContextMenu = (e: React.MouseEvent, songId: number) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setContextMenu({
      songId,
      x: rect.left,
      y: rect.bottom + 5,
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  const handleMenuAction = (action: string, songId: number) => {
    if (action === "remove") removeFavorite(songId);
    closeContextMenu();
  };

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

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎵 Favorite (Liked Songs)
          </h1>
          <p className="text-gray-400 text-lg">
            Favorite is a quick way to save songs you like. One click (❤️) to add
            or remove.
          </p>
        </div>

        <section className="max-w-7xl mx-auto p-4 md:p-8 bg-[#0f0f0f] text-white rounded-lg">
          <header className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Liked Songs</h2>
              <p className="text-sm text-gray-400 mt-1">
                {favorites.length} songs · System-managed
              </p>
            </div>
            <button
              onClick={clearAll}
              disabled={favorites.length === 0}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-full text-sm font-semibold"
            >
              Clear All
            </button>
          </header>

          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading favorites...</div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Heart size={48} className="mx-auto mb-4 opacity-50" />
              <p>No favorite songs yet</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-12 gap-4 text-xs md:text-sm uppercase text-gray-400 border-b border-gray-800 pb-2">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5 md:col-span-4">Title</div>
                <div className="hidden md:block md:col-span-3">Album</div>
                <div className="hidden md:block md:col-span-2">Liked Date</div>
                <div className="col-span-2 text-right">Time</div>
              </div>

              <div className="space-y-2 mt-3">
                {favorites.map((song) => (
                  <div
                    key={song.id}
                    onMouseEnter={() => setHovered(song.id)}
                    onMouseLeave={() => setHovered(null)}
                    onContextMenu={(e) => handleContextMenu(e, song.id)}
                    className="grid grid-cols-12 gap-4 p-3 rounded-lg bg-gray-800/70 hover:bg-gray-700/70 cursor-pointer"
                  >
                    <div className="col-span-1 text-center">
                      {hovered === song.id ? <Play size={16} /> : `#${song.id}`}
                    </div>

                    <div className="col-span-5 md:col-span-4 flex gap-3">
                      <div className={`w-12 h-12 ${song.color} rounded-md`}></div>
                      <div>
                        <div className="font-semibold">{song.title}</div>
                        <div className="text-xs text-gray-400">{song.artist}</div>
                      </div>
                    </div>

                    <div className="hidden md:block md:col-span-3">{song.album}</div>
                    <div className="hidden md:block md:col-span-2">{song.date}</div>

                    <div className="col-span-2 flex justify-end gap-6">
                      <button onClick={(e) => handleHeartClick(e, song.id)}>
                        <Heart size={16} className="text-red-400 fill-red-400" />
                      </button>
                      <span>{song.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {contextMenu && (
            <div
              ref={contextMenuRef}
              style={{ top: contextMenu.y, left: contextMenu.x }}
              className="fixed bg-[#282828] rounded-md shadow-xl min-w-[200px]"
            >
              <button
                onClick={() => handleMenuAction("remove", contextMenu.songId)}
                className="w-full px-3 py-2 text-left hover:bg-gray-700"
              >
                Remove from Favorites
              </button>
              <button className="w-full px-3 py-2 text-left hover:bg-gray-700">
                Add to Playlist
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Favorites;
