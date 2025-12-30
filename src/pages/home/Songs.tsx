import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../../components/AlbumCard";
import { albums } from "../../components/AlbumSampleData";
import { Song, artists as allArtists } from "../../data/searchData";

interface Props {
  title?: string;
  isLightMode?: boolean;
  songs?: Song[]; 
}

const SongSection: React.FC<Props> = ({
  title = "Songs",
  isLightMode = true,
  songs = undefined,
}) => {
  const bgClass = "bg-black";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

  const navigate = useNavigate();
  const [playingId, setPlayingId] = useState<number | null>(null);

  const handlePlay = (id: number) => {
    setPlayingId(id);
    window.setTimeout(() => setPlayingId((current) => (current === id ? null : current)), 2000);
  };
  const itemsToRender = songs && songs.length > 0 ? songs : undefined;

  return (
    <section className={`${bgClass} p-4 md:p-6 lg:p-8 rounded-lg mt-8 mb-8`}>
      <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-4 ${textColor}`}>
        {title}
      </h2>

      {itemsToRender ? (
        <div className="w-full overflow-x-auto overflow-y-hidden pb-4 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-4 md:gap-6">
            {itemsToRender.map((s) => {
              const artist = allArtists.find((a) => a.id === s.artistId);
              return (
                <div key={s.id} className="w-[160px] sm:w-[180px] md:w-[200px] flex-shrink-0">
                  <div
                    onClick={() => navigate(`/song/${s.id}`)}
                    className={`cursor-pointer group relative h-full flex flex-col bg-zinc-900 p-3 rounded-lg`}
                  >
                    <div className="w-full aspect-square bg-zinc-700 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      <svg className="w-10 h-10 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>

                      <button
                        onClick={(e) => { e.stopPropagation(); handlePlay(s.id); }}
                        className="absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 transform bg-green-500 hover:bg-green-600 shadow-green-500/25 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 hover:scale-105 active:scale-95"
                        aria-label={`Play ${s.title}`}
                      >
                        <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      </button>

                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold line-clamp-2 min-h-10 leading-tight text-white">{s.title}</h3>
                        <p className="text-sm text-gray-300 line-clamp-1 mb-1 font-medium">{artist ? artist.name : 'Unknown Artist'}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-auto">Song</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto overflow-y-hidden pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <div className="flex gap-4 md:gap-6">
            {albums.map((album) => (
              <div key={album.id} className="w-[160px] sm:w-[180px] md:w-[200px] flex-shrink-0">
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SongSection;
