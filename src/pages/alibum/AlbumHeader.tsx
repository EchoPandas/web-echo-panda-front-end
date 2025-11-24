import React from "react";
import { albums } from "./albumData";

export default function AlbumHeader() {
  return (
    <div className="relative h-96 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          filter: 'blur(2px) brightness(0.4)'
        }}
      ></div>

      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black"></div>

      <div className="absolute inset-0 bg-linear-to-r from-purple-900/30 via-transparent to-pink-900/30"></div>

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-sm font-medium">Collection</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-linear-to-r from-white via-white to-gray-300 bg-clip-text text-transparent tracking-tight">
            Albums
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
             {"Explore your music collection · " + albums.length.toString() + " albums"}
           </p>

        </div>
      </div>
    </div>
  );
}