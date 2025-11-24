import React from "react";
import { AlbumItem } from "./AlbumData";

interface Props {
  album: AlbumItem;
  index: number;
}

export default function AlbumCard({ album, index }: Props) {
  return (
    <div 
  className="group cursor-pointer"
  style={{ animationDelay: (index * 30).toString() + "ms" }} 
>

      <div className="relative bg-linear-to-br from-zinc-900 to-zinc-950 rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:bg-zinc-800 shadow-lg hover:shadow-2xl border border-zinc-800/50 hover:border-zinc-700 overflow-hidden">
        <div className="relative z-10">
          <div className="relative w-full aspect-square mb-4 bg-linear-to-br from-zinc-800 to-zinc-900 rounded-xl transition-all duration-300 group-hover:shadow-xl flex items-center justify-center overflow-hidden border border-zinc-700/50 group-hover:border-zinc-600">
            <svg className="relative z-10 w-10 h-10 text-zinc-600 group-hover:text-zinc-400 transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>

            <div className="absolute bottom-2 right-2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-20">
              <button className="bg-green-400 hover:bg-green-400 hover:scale-110 active:scale-95 rounded-full p-3 transition-all duration-200 shadow-xl shadow-black/40">
                <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-sm truncate text-white group-hover:text-white transition-colors">{album.title}</h3>
            <p className="text-xs text-zinc-400 group-hover:text-zinc-300 truncate transition-colors">{album.artist}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{album.year}</span>
              <span className="text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium">Album</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}