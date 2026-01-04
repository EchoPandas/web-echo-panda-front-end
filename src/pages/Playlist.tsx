// src/pages/Playlist.tsx
import React, { useState, useEffect } from 'react';
import { PlaylistHero } from './playList/PlaylistHero';
import PlaylistSongs from './playList/PlaylistSongs';
import AppFooter from './home/AppFooter';
import { FaPlay, FaRandom, FaHeart } from 'react-icons/fa';

interface SongItem {
  id: number;
  title: string;
  artist: string;
  date: string;
  album: string;
  duration: string;
  color: string;
}

const sampleSongs: SongItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
  date: "2024-01-01",
  album: `Album ${i + 1}`,
  duration: `${2 + (i % 4)}:${(10 + i).toString().slice(-2)}`,
  color: "bg-gray-400",
}));

const Playlist: React.FC = () => {
  const isLightMode = false;
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadSongs();
    
    // Listen for storage updates
    const handleStorageChange = () => {
      loadSongs();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadSongs = () => {
    const savedPlaylists = localStorage.getItem('Your Playlist');
    if (savedPlaylists) {
      try {
        const playlistRecord: Record<number, boolean> = JSON.parse(savedPlaylists);
        const playlistIds = Object.keys(playlistRecord).filter(id => playlistRecord[parseInt(id)]);
        const playlistSongs = sampleSongs.filter(song => playlistIds.includes(song.id.toString()));
        setSongs(playlistSongs);
      } catch (error) {
        console.error('Error loading playlist:', error);
        setSongs([]);
      }
    } else {
      setSongs([]);
    }
  };

  const handleDeleteSong = (songId: string) => {
    // Filter out the deleted song
    const updatedSongs = songs.filter(song => song.id.toString() !== songId);
    setSongs(updatedSongs);
    const savedPlaylists = localStorage.getItem('Your Playlist');
    if (savedPlaylists) {
      const playlistRecord: Record<number, boolean> = JSON.parse(savedPlaylists);
      playlistRecord[parseInt(songId)] = false;
      localStorage.setItem('Your Playlist', JSON.stringify(playlistRecord));
    }
    window.dispatchEvent(new Event('storage'));
    console.log('Deleted song:', songId);
  };
  const totalDuration = songs.reduce((total, song) => {
    const [min, sec] = (song.duration || '3:30').split(':').map(Number);
    return total + (min * 60) + (sec || 0);
  }, 0);
  
  const totalMinutes = Math.floor(totalDuration / 60);
  const totalSeconds = totalDuration % 60;
  const formattedDuration = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  const handlePlayAll = () => {
    setIsPlaying(!isPlaying);
  };
  const handleShuffle = () => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    setSongs(shuffled);
  };

  const clearPlaylist = () => {
    if (window.confirm('Are you sure you want to clear the entire playlist?')) {
      localStorage.removeItem('Your Playlist');
      setSongs([]);
      window.dispatchEvent(new Event('storage'));
    }
  };
  return (
    <div className={`min-h-screen overflow-x-hidden ${isLightMode ? 'bg-white' : 'bg-linear-to-b from-blue-950/20 via-black to-black'}`}>
      <PlaylistHero title="My Playlist" songCount={songs.length} duration={formattedDuration} />
      
      {/* Play Controls */}
      <div className="px-8 pb-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={handlePlayAll}
            className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={songs.length === 0}
          >
            <FaPlay size={24} className="ml-1" />
          </button>
          
          <button 
            onClick={handleShuffle}
            className={`p-3 rounded-full ${isLightMode ? 'hover:bg-gray-200' : 'hover:bg-white/10'} transition disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={songs.length === 0}
          >
            <FaRandom size={22} className={isLightMode ? 'text-gray-700' : 'text-gray-400'} />
          </button>
          
          <button className={`p-3 rounded-full ${isLightMode ? 'hover:bg-gray-200' : 'hover:bg-white/10'} transition disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={songs.length === 0}
          >
            <FaHeart size={22} className="text-gray-400 hover:text-red-500 transition" />
          </button>
          
          <div className="ml-auto flex items-center gap-3">
            {songs.length > 0 && (
              <button 
                onClick={clearPlaylist}
                className="text-sm px-4 py-2 rounded-full bg-linear-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition"
              >
                Clear All
              </button>
            )}
            <button className={`text-sm px-4 py-2 rounded-full border ${isLightMode ? 'border-gray-300 hover:bg-gray-100' : 'border-white/20 hover:bg-white/10'} transition`}>
              Sort by
            </button>
          </div>
        </div>
      </div>
      
      <div className={`px-8 pb-24 ${isLightMode ? 'text-black' : 'text-white'}`}>
        <PlaylistSongs songs={songs} onDelete={handleDeleteSong} />
      </div>
      <AppFooter isLightMode={isLightMode} />
    </div>
  );
};

export default Playlist;