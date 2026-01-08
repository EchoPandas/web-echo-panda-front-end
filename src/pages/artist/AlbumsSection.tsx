import { useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import { albums } from "../../components/AlbumSampleData";

interface Props {
  artistId: string;
}

export default function AlbumsSection({ artistId }: Props) {
  const [showAll, setShowAll] = useState(false);

  const displayedAlbums = showAll ? albums : albums.slice(0, 5);

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">
          Artist's{" "}
          <span className="text-xl font-semibold text-blue-400">Albums</span>
        </h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          {showAll ? "View Less" : "View More"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayedAlbums.map((album) => (
          <div key={album.id} className="w-full">
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </section>
  );
}
