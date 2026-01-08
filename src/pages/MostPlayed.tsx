import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabaseClient";
import { FaSpinner, FaMusic } from "react-icons/fa";
import Song from "../components/Song";
import AlbumCard from "../components/AlbumCard";

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

interface SongData {
  id: string;
  title: string;
  duration: number;
  album_id: string | null;
  audio_url: string | null;
  songCover_url: string | null;
  play_count: number;
  created_at: string;
  artists?: Artist[];
  album?: Album;
}

const MostPlayed: React.FC = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<SongData[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  useEffect(() => {
    fetchMostPlayedSongs();
    fetchMostPlayedAlbums();
  }, []);

  const fetchMostPlayedSongs = async () => {
    try {
      setLoading(true);
      const startTime = performance.now();
      console.log('🔄 [MostPlayed] Fetching songs...');
      
      // TODO: Replace with actual play_count column when available
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
      console.log(`✅ [MostPlayed] Songs fetched in ${fetchTime.toFixed(0)}ms`);
      console.log(`📊 [MostPlayed] Retrieved ${data?.length || 0} songs`);

      if (error) throw error;

      const transformedSongs: SongData[] = (data || []).map((song: any) => ({
        id: song.id,
        title: song.title,
        duration: song.duration,
        album_id: song.album_id,
        audio_url: song.audio_url,
        songCover_url: song.songCover_url,
        created_at: song.created_at,
        play_count: 0, // TODO: Add actual play count
        artists: song.song_artist?.map((sa: any) => sa.artists).filter(Boolean) || [],
        album: song.albums || null
      }));

      setSongs(transformedSongs);
    } catch (error) {
      console.error('Error fetching most played songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMostPlayedAlbums = async () => {
    try {
      setLoadingAlbums(true);
      const startTime = performance.now();
      console.log('🔄 [MostPlayed] Fetching albums...');

      const { data, error } = await supabase
        .from('albums')
        .select(`
          id,
          title,
          cover_url,
          release_date,
          artist_id,
          artists(id, name, image_url)
        `)
        .order('release_date', { ascending: false })
        .limit(10);

      const fetchTime = performance.now() - startTime;
      console.log(`✅ [MostPlayed] Albums fetched in ${fetchTime.toFixed(0)}ms`);
      console.log(`📊 [MostPlayed] Retrieved ${data?.length || 0} albums`);

      if (error) throw error;

      const transformedAlbums = (data || []).map((album: any) => ({
        id: album.id,
        title: album.title,
        artist: album.artists?.name || 'Unknown Artist',
        cover: album.cover_url || '',
        year: album.release_date ? new Date(album.release_date).getFullYear() : null,
      }));

      setAlbums(transformedAlbums);
    } catch (error) {
      console.error('Error fetching most played albums:', error);
    } finally {
      setLoadingAlbums(false);
    }
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
            Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Played</span>
          </h1>
          <p className="text-slate-400 text-lg">Your most played tracks</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <FaSpinner className="text-purple-400 text-5xl animate-spin" />
          </div>
        ) : songs.length === 0 ? (
          <div className="text-center py-32">
            <FaMusic className="text-slate-700 text-6xl mx-auto mb-4" />
            <p className="text-slate-400 text-xl">No songs played yet</p>
          </div>
        ) : (
          <div className="bg-[#0f0f0f] rounded-lg mb-12">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-xs md:text-sm uppercase tracking-wide text-gray-400 font-medium border-b border-gray-800 pb-2 px-3">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5 md:col-span-4">Title</div>
              <div className="hidden md:block md:col-span-3">Album</div>
              <div className="hidden md:block md:col-span-2">Plays</div>
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
                  metadata={song.play_count > 0 ? `${song.play_count} plays` : '-'}
                  onPlay={handlePlay}
                  onAddToPlaylist={handleAddToPlaylist}
                  onAddToFavorite={handleAddToFavorite}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Most Played Albums
          </h2>
          {loadingAlbums ? (
            <div className="flex items-center justify-center py-16">
              <FaSpinner className="text-purple-400 text-4xl animate-spin" />
            </div>
          ) : albums.length === 0 ? (
            <div className="text-center py-16">
              <FaMusic className="text-slate-700 text-5xl mx-auto mb-4" />
              <p className="text-slate-400">No albums found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MostPlayed;
