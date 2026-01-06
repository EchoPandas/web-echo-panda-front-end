import React, { useState, useEffect } from 'react';
import { FaPlay, FaRandom, FaHeart, FaMusic, FaTrash, FaList, FaPlus } from 'react-icons/fa';
import { PlaylistHero } from './playList/PlaylistHero';
import PlaylistSongs from './playList/PlaylistSongs';
import AppFooter from './home/AppFooter';

// --- Types ---
interface SongItem {
  id: number;
  title: string;
  artist: string;
  date: string;
  album: string;
  duration: string;
  color: string;
  coverUrl?: string;
}

interface CustomPlaylist {
  id: string;
  name: string;
  songIds: number[];
  createdAt: string;
}

const getTodayDate = (): string => {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const sampleSongs: SongItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Song ${i + 1}`,
  artist: `Artist ${String.fromCharCode(65 + i)}`,
  date: getTodayDate(),
  album: `Album ${Math.ceil((i + 1) / 3)}`,
  duration: `${3 + (i % 2)}:${String(10 + (i * 5) % 50).padStart(2, '0')}`,
  color: 'bg-blue-500',
  coverUrl: `https://picsum.photos/seed/${i + 50}/200/200`,
}));


// --- Create Playlist Modal ---
const CreatePlaylistModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#181818] w-full max-w-sm rounded-3xl p-8 border border-white/10 shadow-2xl scale-in-center">
        <h2 className="text-2xl font-black text-white mb-6">New Playlist</h2>
        <input
          autoFocus
          type="text"
          placeholder="Playlist name"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white mb-6 outline-none focus:border-blue-500 transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && name.trim() && onConfirm(name)}
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-gray-400 font-bold hover:text-white transition">
            Cancel
          </button>
          <button
            disabled={!name.trim()}
            onClick={() => onConfirm(name)}
            className="flex-1 py-3 rounded-full font-bold bg-blue-500 text-white hover:bg-blue-400 transition disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Playlist Page ---
const Playlist: React.FC = () => {
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [customPlaylists, setCustomPlaylists] = useState<CustomPlaylist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load playlists and songs
  const loadAllData = () => {
    const savedPlaylists: CustomPlaylist[] = JSON.parse(localStorage.getItem('customPlaylists') || '[]');
    setCustomPlaylists(savedPlaylists);

    if (selectedPlaylistId) {
      const current = savedPlaylists.find((p) => p.id === selectedPlaylistId);
      setSongs(current ? sampleSongs.filter(s => current.songIds.includes(s.id)) : []);
      if (!current) setSelectedPlaylistId(null);
    } else {
      setSongs([]); 
    }
  };

  useEffect(() => {
    loadAllData();
    window.addEventListener('storage', loadAllData);
    return () => window.removeEventListener('storage', loadAllData);
  }, [selectedPlaylistId]);

  // --- Handlers ---
  const handleCreatePlaylist = (name: string) => {
    const newPlaylist = { id: `pl_${Date.now()}`, name, songIds: [], createdAt: new Date().toISOString() };
    const updated = [...customPlaylists, newPlaylist];
    localStorage.setItem('customPlaylists', JSON.stringify(updated));
    setCustomPlaylists(updated);
    setSelectedPlaylistId(newPlaylist.id);
    setIsModalOpen(false);
    showToast(`Playlist "${name}" created!`);
  };

  const deletePlaylist = (id: string) => {
    const playlist = customPlaylists.find(p => p.id === id);
    if (!playlist) return;

    const updated = customPlaylists.filter(p => p.id !== id);
    localStorage.setItem('customPlaylists', JSON.stringify(updated));
    setCustomPlaylists(updated);

    if (selectedPlaylistId === id) {
      setSelectedPlaylistId(null);
      setSongs([]);
    }

    showToast(`Playlist "${playlist.name}" deleted`);
    window.dispatchEvent(new Event('storage'));
  };

  const handleDeleteSong = (songId: string) => {
    if (selectedPlaylistId) {
      const updated = customPlaylists.map(p =>
        p.id === selectedPlaylistId ? { ...p, songIds: p.songIds.filter(id => id !== parseInt(songId)) } : p
      );
      localStorage.setItem('customPlaylists', JSON.stringify(updated));
    }
    loadAllData();
    window.dispatchEvent(new Event('storage'));
  };

  const currentName = selectedPlaylistId
    ? customPlaylists.find(p => p.id === selectedPlaylistId)?.name
    : 'Your Library';

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const hasSongs = songs.length > 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <CreatePlaylistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleCreatePlaylist} />

      {/* KEEP HERO */}
      <PlaylistHero title={currentName || 'Library'} songCount={songs.length} duration={`${songs.length * 3} min`} />

      <main className="px-8 -mt-10 relative z-10">
        {/* Library Cards */}
        <section className="mb-10 mt-5">
          <h3 className="text-xs font-bold uppercase text-gray-300 mb-5">Your Library</h3>

          <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar mask-fade-right mt-5">
            {/* Create Card */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 w-44 p-5 rounded-4xl bg-white/5 border border-dashed border-white/10 hover:border-blue-500/50 hover:bg-white/10 cursor-pointer transition-all group"
            >
              <div className="aspect-square rounded-3xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-105 transition duration-300">
                <FaPlus size={28} className="text-gray-500 group-hover:text-blue-500" />
              </div>
              <p className="text-sm font-bold text-center group-hover:text-blue-500 transition">Create New</p>
            </div>

            {/* Custom Playlists */}
            {customPlaylists.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedPlaylistId(p.id)}
                className={`group shrink-0 w-44 p-5 rounded-4xl cursor-pointer transition-all duration-300 relative ${
                  selectedPlaylistId === p.id ? 'bg-white/15 ring-2 ring-white/20' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); deletePlaylist(p.id); }}
                  className="absolute top-7 right-7 z-20 opacity-0 group-hover:opacity-100 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow-xl scale-75 group-hover:scale-100"
                >
                  <FaTrash size={12} />
                </button>
                <div className="aspect-square rounded-3xl bg-neutral-900 flex items-center justify-center mb-4 shadow-xl overflow-hidden">
                  <FaMusic size={35} className="text-neutral-700 group-hover:text-blue-500/50 transition" />
                </div>
                <p className="text-sm font-bold truncate text-center px-2">{p.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Show Action Bar & Songs List only if user has songs */}
        {hasSongs && (
          <>
            {/* Action Bar */}
            <div className="flex items-center gap-8 bg-white/2 p-4 border border-white/5 backdrop-blur-md">
              <button className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition">
                <FaPlay size={20} className="ml-1" />
              </button>
              <button className="text-gray-500 hover:text-white transition"><FaRandom size={22} /></button>
              <div className="h-6 w-px bg-white/10" />
              <p className="text-sm font-bold text-gray-400">{songs.length} Tracks in this set</p>
              <div className="ml-auto flex gap-4 text-gray-500 pr-4">
                <FaList size={18} className="cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Songs List */}
            <div className="bg-white/1 border border-white/5 overflow-hidden backdrop-blur-2xl mb-20 cursor-pointer">
              <PlaylistSongs songs={songs} onDelete={handleDeleteSong} />
            </div>
          </>
        )}
      </main>

      <AppFooter isLightMode={false} />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-up z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Playlist;
