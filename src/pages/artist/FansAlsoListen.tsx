import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FansAlsoListen() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  
  const allArtists = [
    { name: "Artist 1" },
    { name: "Artist 2" },
    { name: "Artist 3" },
    { name: "Artist 4" },
    { name: "Artist 5" },
    { name: "Artist 6" },
    { name: "Artist 7" },
    { name: "Artist 8" },
    { name: "Artist 9" },
    { name: "Artist 10" },
    { name: "Artist 11" },
    { name: "Artist 12" },
    { name: "Artist 13" },
    { name: "Artist 14" },
    { name: "Artist 15" },
  ];

  const displayedArtists = showAll ? allArtists : allArtists.slice(0, 5);

  return (
    <section className="mb-12">
   
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Fans <span className='text-xl font-semibold text-blue-400'>Also Listen To</span></h2>
          <p className="text-zinc-400 text-sm">Discover similar artists</p>
        </div>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayedArtists.map((artist, i) => (
          <div key={i} onClick={() => navigate(`/song/${i + 1}`)} className="group cursor-pointer">
          
            <div className="relative mb-3">
              <div className="w-full aspect-square bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full group-hover:scale-105 transition-transform duration-300 shadow-lg overflow-hidden flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {artist.name.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
            </div>

          
            <div className="text-center">
              <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                {artist.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Similar Artist</p>
            </div>
          </div>
        ))}
      </div>

    
      {allArtists.length > 5 && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-sm font-medium transition-all duration-300 border border-zinc-700 hover:border-zinc-600 hover:scale-105"
          >
            {showAll ? 'Show Less' : 'Load More Artists'}
          </button>
        </div>
      )}
    </section>
  );
}