import React from "react";
import AlbumHeader from "./Album/AlbumHeader";
import AlbumGrid from "./Album/AlbumGrid";


export default function Alibum() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-900">
      <AlbumHeader/>
      <AlbumGrid/>
    </div>
  );
}