import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AlbumsSection() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  
  const allAlbums = [
    { title: "Album Title 1" },
    { title: "Album Title 2" },
    { title: "Album Title 3" },
    { title: "Album Title 4" },
    { title: "Album Title 5" },
    { title: "Album Title 6" },
    { title: "Album Title 7" },
    { title: "Album Title 8" },
    { title: "Album Title 9" },
    { title: "Album Title 10" },
  ];

  const displayedAlbums = showAll ? allAlbums : allAlbums.slice(0, 5);

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Artist's <span className='text-xl font-semibold text-blue-400'>Albums</span></h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayedAlbums.map((album, i) => (
          <div key={i} onClick={() => navigate(`/song/${i + 1}`)} className="cursor-pointer group">
            <div className="w-full aspect-square  bg-gray-700 text-white rounded-lg group-hover:opacity-80 transition-all flex items-center justify-center group-hover:scale-105 duration-300">
              <span className="text-white font-semibold text-center px-2">Album Cover</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300 text-center">{album.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}