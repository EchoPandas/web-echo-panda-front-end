import { useState } from "react";
import { albums } from "../../components/AlbumSampleData";
import AlbumCard from "../../components/AlbumCard";

interface Props {
  artistId: string;
}

export default function SingleSongs({ artistId }: Props) {
  const [showAll, setShowAll] = useState(false);

  const displayedSingleSongs = showAll ? albums : albums.slice(0, 5);

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">
          Single{" "}
          <span className="text-xl font-semibold text-blue-400">Songs</span>{" "}
        </h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {showAll ? "View Less" : "View More"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayedSingleSongs.map((album) => (
          <div key={album.id} className="w-full">
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </section>
  );
}
