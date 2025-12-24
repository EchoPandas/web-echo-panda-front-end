import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingleSongs() {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  
  const allSingles = [
    { title: "Single Song 1" },
    { title: "Single Song 2" },
    { title: "Single Song 3" },
    { title: "Single Song 4" },
    { title: "Single Song 5" },
    { title: "Single Song 6" },
    { title: "Single Song 7" },
    { title: "Single Song 8" },
    { title: "Single Song 9" },
    { title: "Single Song 10" },
  ];

  const displayedSingles = showAll ? allSingles : allSingles.slice(0, 5);

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Single <span className='text-xl font-semibold text-blue-400'>Songs</span> </h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayedSingles.map((song, i) => (
          <div key={i} className="cursor-pointer group" onClick={() => navigate(`/song/single-${i + 1}`)}>
            <div className="w-full aspect-square  bg-gray-700 text-white rounded-lg group-hover:opacity-80 transition-all flex items-center justify-center group-hover:scale-105 duration-300">
              <span className="text-white font-semibold text-center px-2">Single Cover</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300 text-center">{song.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}