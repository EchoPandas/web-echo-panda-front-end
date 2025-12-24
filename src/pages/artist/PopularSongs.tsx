import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PopularSongs() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [showAll, setShowAll] = useState(false);
  
  const songs = [
    { title: "Song Title 1", date: "Jan 15, 2023", play: "214M", time: "4:50" },
    { title: "Song Title 2", date: "Mar 22, 2022", play: "198M", time: "4:11" },
    { title: "Song Title 3", date: "Nov 30, 2021", play: "143M", time: "4:42" },
    { title: "Song Title 4", date: "May 19, 2020", play: "93M", time: "5:03" },
    { title: "Song Title 5", date: "May 20, 2019", play: "165M", time: "3:20" },
    { title: "Song Title 6", date: "Aug 12, 2018", play: "87M", time: "3:45" },
    { title: "Song Title 7", date: "Dec 05, 2017", play: "76M", time: "4:15" },
    { title: "Song Title 8", date: "Feb 28, 2016", play: "54M", time: "3:58" },
    { title: "Song Title 9", date: "Oct 15, 2015", play: "42M", time: "4:22" },
    { title: "Song Title 10", date: "Jul 08, 2014", play: "38M", time: "3:37" },
  ];

  const displayedSongs = showAll ? songs : songs.slice(0, 5);

  const toggleFavorite = (index: number) => {
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Popular</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-zinc-300">
          <thead className="border-b border-zinc-700">
            <tr>
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">Title</th>
              <th className="py-2 px-2">Release Date</th>
              <th className="py-2 px-2">Played</th>
              <th className="py-2 px-2">Time</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>

          <tbody className="text-zinc-400">
            {displayedSongs.map((song, i) => (
              <tr
                key={i}
                onClick={() => navigate(`/song/${i + 1}`)}
                className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-all group cursor-pointer"
              >
                <td className="py-3 px-2 text-zinc-500 group-hover:text-zinc-300">
                  {i + 1}
                </td>
                <td className="py-3 px-2 font-medium text-white">
                  {song.title}
                </td>
                <td className="py-3 px-2">{song.date}</td>
                <td className="py-3 px-2">{song.play}</td>
                <td className="py-3 px-2">{song.time}</td>
                <td className="py-3 px-2">
                  <button 
                    onClick={() => toggleFavorite(i)}
                    className="p-2 hover:bg-white/10 rounded-full transition-all group"
                  >
                    <svg 
                      className={`w-5 h-5 transition-all ${
                        favorites[i] 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-zinc-400 fill-none group-hover:text-white'
                      }`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  
      {songs.length > 5 && (
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-all hover:scale-105"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </section>
  );
}