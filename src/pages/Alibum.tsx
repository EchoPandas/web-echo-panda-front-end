import React from "react";
import AlbumHeader from "../pages/alibum/AlbumHeader";
import AlbumGrid from "../pages/alibum/AlbumGrid";

export default function AlbumPage() {
  return (
 
    <div className="w-full min-h-screen bg-linear-to-b from-zinc-950 via-black to-black text-white">
      <AlbumHeader />
      <AlbumGrid />
    </div>
  );
}
