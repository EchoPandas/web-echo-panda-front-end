import React from "react";
import { useNavigate } from "react-router-dom";
import { AlbumItem } from "./albumData";

interface Props {
  album: AlbumItem;
  isLightMode: boolean;
}
export default function AlbumCard({ album, isLightMode }: Props) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/song/${album.id}`)} className="cursor-pointer group relative h-full flex flex-col">
   
      <div
        className={`rounded-xl p-4 border border-zinc-800 hover:scale-105 transition relative overflow-hidden flex-1 flex flex-col ${
          isLightMode ? "bg-white text-black" : "bg-zinc-900 text-white"
        }`}
      >
       
        <div className="w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
      
          <svg
            className="w-10 h-10 text-zinc-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>

          <button
            className={`absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 transform
              bg-green-500 hover:bg-green-600 shadow-green-500/25
              opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 hover:scale-105 active:scale-95
            `}
            aria-label={`Play album ${album.title}`}
          >
            <svg
              className="w-5 h-5 ml-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold line-clamp-2 min-h-12 mb-2 leading-tight">
              {album.title}
            </h3>
            <p className={`text-sm ${isLightMode ? "text-zinc-600" : "text-zinc-400"} line-clamp-1 mb-2`}>
              {album.artist}
            </p>
          </div>
          <p className={`text-xs ${isLightMode ? "text-zinc-500" : "text-zinc-400"} mt-auto pt-2`}>
            {album.songs} songs • {album.year}
          </p>
        </div>
      </div>
    </div>
  );
}