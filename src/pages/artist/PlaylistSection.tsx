import { useState } from 'react';

export default function PlaylistSection() {
  const [showAll, setShowAll] = useState(false);
  
  const allPlaylists = [
    { title: "Playlist Title 1" },
    { title: "Playlist Title 2" },
    { title: "Playlist Title 3" },
    { title: "Playlist Title 4" },
    { title: "Playlist Title 5" },
    { title: "Playlist Title 6" },
    { title: "Playlist Title 7" },
    { title: "Playlist Title 8" },
    { title: "Playlist Title 9" },
    { title: "Playlist Title 10" },
  ];

  const displayedPlaylists = showAll ? allPlaylists : allPlaylists.slice(0, 5);

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Artist's <span className='text-xl font-semibold text-blue-400'>Playlist</span></h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-green-400 hover:text-green-300 transition-colors"
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayedPlaylists.map((item, i) => (
          <div key={i} className="cursor-pointer group">
            <div className="w-full aspect-square bg-gray-700 text-white rounded-lg group-hover:opacity-80 transition-all flex items-center justify-center group-hover:scale-105 duration-300">
              <span className="text-white font-semibold text-center px-2">Playlist Cover</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300 text-center">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}