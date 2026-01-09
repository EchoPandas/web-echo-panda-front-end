import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../backend/supabaseClient';
import { useDataCache } from '../../contexts/DataCacheContext';
import { FaSpinner } from 'react-icons/fa';
import { isSongFavorite, toggleFavorite } from '../../backend/favoritesService';

interface Song {
  id: string;
  title: string;
  duration: number;
  created_at: string;
  album?: {
    id: string;
    title: string;
    cover_url: string;
  };
}

interface Props {
  artistId: string;
}

export default function PopularSongs({ artistId }: Props) {
  const navigate = useNavigate();
  const { getCachedData } = useDataCache();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [showAll, setShowAll] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtistSongs();
  }, [artistId]);

  useEffect(() => {
    // Check favorite status for all songs
    songs.forEach(song => {
      checkFavoriteStatus(song.id);
    });
  }, [songs]);

  const fetchArtistSongs = async () => {
    try {
      setLoading(true);

      const data = await getCachedData(`artist_songs_${artistId}`, async () => {
        const startTime = performance.now();
        console.log(`🔄 [PopularSongs] Fetching songs for artist ${artistId}...`);
        
        const { data: songsData, error } = await supabase
          .from('song_artist')
          .select(`
            songs(
              id,
              title,
              duration,
              created_at,
              albums(id, title, cover_url)
            )
          `)
          .eq('artist_id', artistId)
          .limit(10);

        const fetchTime = performance.now() - startTime;
        console.log(`✅ [PopularSongs] Songs fetched in ${fetchTime.toFixed(0)}ms`);
        console.log(`📊 [PopularSongs] Retrieved ${songsData?.length || 0} songs`);

        if (error) throw error;

        const transformedSongs: Song[] = (songsData || [])
          .map((item: any) => item.songs)
          .filter(Boolean)
          .map((song: any) => ({
            id: song.id,
            title: song.title,
            duration: song.duration,
            created_at: song.created_at,
            album: song.albums
          }));

        return transformedSongs;
      });

      setSongs(data);
    } catch (error) {
      console.error('Error fetching artist songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayedSongs = showAll ? songs : songs.slice(0, 5);

  const checkFavoriteStatus = async (songId: string) => {
    const isFav = await isSongFavorite(songId);
    setFavorites(prev => ({ ...prev, [songId]: isFav }));
  };

  const handleToggleFavorite = async (songId: string) => {
    const success = await toggleFavorite(songId);
    if (success) {
      setFavorites(prev => ({
        ...prev,
        [songId]: !prev[songId]
      }));
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular</h2>
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="text-purple-400 text-3xl animate-spin" />
        </div>
      </section>
    );
  }

  if (songs.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular</h2>
        <div className="text-center py-12 text-zinc-500">
          No songs available
        </div>
      </section>
    );
  }

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
              <th className="py-2 px-2">Time</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>

          <tbody className="text-zinc-400">
            {displayedSongs.map((song, i) => (
              <tr
                key={song.id}
                onClick={() => navigate(`/song/${song.id}`)}
                className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-all group cursor-pointer"
              >
                <td className="py-3 px-2 text-zinc-500 group-hover:text-zinc-300">
                  {i + 1}
                </td>
                <td className="py-3 px-2 font-medium text-white">
                  {song.title}
                </td>
                <td className="py-3 px-2">{formatDate(song.created_at)}</td>
                <td className="py-3 px-2">{formatDuration(song.duration)}</td>
                <td className="py-3 px-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(song.id);
                    }}
                    className="p-2 hover:bg-white/10 rounded-full transition-all group"
                  >
                    <svg 
                      className={`w-5 h-5 transition-all ${
                        favorites[song.id] 
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