import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabaseClient";
import { FaSpinner, FaMusic } from "react-icons/fa";
import Song from "../components/Song";

interface Artist {
  id: string;
  name: string;
  image_url: string;
}

interface Album {
  id: string;
  title: string;
  cover_url: string;
}

interface Song {
  id: string;
  title: string;
  duration: number;
  album_id: string | null;
  audio_url: string | null;
  songCover_url: string | null;
  created_at: string;
  artists?: Artist[];
  album?: Album;
}

const RecentlyAdded: React.FC = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentSongs();
  }, []);

  const fetchRecentSongs = async () => {
    try {
      setLoading(true);
      const startTime = performance.now();
      console.log('🔄 [RecentlyAdded] Fetching songs...');
      
      const { data, error } = await supabase
        .from('songs')
        .select(`
          id,
          title,
          duration,
          album_id,
          audio_url,
          songCover_url,
          created_at,
          song_artist(
            artists(id, name, image_url)
          ),
          albums(id, title, cover_url)
        `)
        .order('created_at', { ascending: false })
        .limit(25);

      const fetchTime = performance.now() - startTime;
      console.log(`✅ [RecentlyAdded] Songs fetched in ${fetchTime.toFixed(0)}ms`);
      console.log(`📊 [RecentlyAdded] Retrieved ${data?.length || 0} songs`);

      if (error) throw error;

      const transformedSongs: Song[] = (data || []).map((song: any) => ({
        id: song.id,
        title: song.title,
        duration: song.duration,
        album_id: song.album_id,
        audio_url: song.audio_url,
        songCover_url: song.songCover_url,
        created_at: song.created_at,
        artists: song.song_artist?.map((sa: any) => sa.artists).filter(Boolean) || [],
        album: song.albums || null
      }));

      setSongs(transformedSongs);
    } catch (error) {
      console.error('Error fetching recent songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handlePlay = (songId: string) => {
    navigate(`/song/${songId}`);
  };

  const handleAddToPlaylist = (songId: string) => {
    console.log('Add to playlist:', songId);
    // Implement add to playlist logic
  };

  const handleAddToFavorite = (songId: string) => {
    console.log('Add to favorite:', songId);
    // Implement add to favorite logic
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
            Recently <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Added</span>
          </h1>
          <p className="text-slate-400 text-lg">Latest 25 tracks added to the collection</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <FaSpinner className="text-purple-400 text-5xl animate-spin" />
          </div>
        ) : songs.length === 0 ? (
          <div className="text-center py-32">
            <FaMusic className="text-slate-700 text-6xl mx-auto mb-4" />
            <p className="text-slate-400 text-xl">No songs added yet</p>
          </div>
        ) : (
          <div className="bg-[#0f0f0f] rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-xs md:text-sm uppercase tracking-wide text-gray-400 font-medium border-b border-gray-800 pb-2 px-3">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5 md:col-span-4">Title</div>
              <div className="hidden md:block md:col-span-3">Album</div>
              <div className="hidden md:block md:col-span-2">Added</div>
              <div className="col-span-2 text-right">Time</div>
            </div>

            {/* Song List */}
            <div className="space-y-2 mt-3">
              {songs.map((song, index) => (
                <Song
                  key={song.id}
                  id={song.id}
                  index={index + 1}
                  title={song.title}
                  artists={song.artists}
                  album={song.album}
                  duration={song.duration}
                  coverUrl={song.songCover_url}
                  metadata={formatDate(song.created_at)}
                  onPlay={handlePlay}
                  onAddToPlaylist={handleAddToPlaylist}
                  onAddToFavorite={handleAddToFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;