import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaPlay, FaHeart, FaEllipsisH, FaStepBackward, FaStepForward, 
  FaRedo, FaRandom, FaVolumeUp, FaListUl, FaDesktop, 
  FaMicrophone, FaChevronDown, FaChevronLeft, FaPlus,
  FaUser, FaCompactDisc, FaTimes, FaFolder, FaMusic, FaCheck
} from 'react-icons/fa';
import Player from './Player';

// --- Types & Mock Data ---
interface SongData {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  lyrics: string[];
  credits: { name: string; role: string }[];
}

interface CustomPlaylist {
  id: string;
  name: string;
  songIds: number[];
  createdAt: string;
}
const formatDate = (date?: Date) => {
  const d = date || new Date();
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};


const mockSongsData: Record<string, SongData> = {
  '1': {
    id: '1',
    title: 'Beautiful Things',
    artist: 'Benson Boone',
    album: 'Beautiful Things',
    duration: '3:45',
    coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000',
    lyrics: [
      "And that's a feeling I wanna get used to",
      "But there's no man as terrified As the man who stands to lose you",
      "Oh, I hope I don't lose you",
      "Mm Please stay I want you, I need"
    ],
    credits: [
      { name: 'Benson Boone', role: 'Main Artist' },
      { name: 'TEEDY', role: 'Composer, Lyricist, Producer' }
    ]
  }
};

interface SongItem {
  id: number;
  title: string;
  artist: string;
  date?: string;
  album?: string;
  duration?: string;
  color?: string;
}


const sampleSongs: SongItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
  date: formatDate(), // <-- Use current date
  album: `Album ${i + 1}`,
  duration: `${2 + (i % 4)}:${(10 + i).toString().padStart(2,'0')}`,
  color: "bg-gray-400",
}));



const PlaylistManager = {
  getPlaylists: (): CustomPlaylist[] => {
    const saved = localStorage.getItem('customPlaylists');
    return saved ? JSON.parse(saved) : [];
  },
  
  savePlaylist: (playlist: CustomPlaylist) => {
    const playlists = PlaylistManager.getPlaylists();
    const existing = playlists.findIndex(p => p.id === playlist.id);
    
    if (existing !== -1) {
      playlists[existing] = playlist;
    } else {
      playlists.push(playlist);
    }
    
    localStorage.setItem('customPlaylists', JSON.stringify(playlists));
    window.dispatchEvent(new Event('storage'));
  },
  
  addSongToPlaylist: (playlistId: string, songId: number) => {
    const playlists = PlaylistManager.getPlaylists();
    const playlist = playlists.find(p => p.id === playlistId);
    
    if (playlist && !playlist.songIds.includes(songId)) {
      playlist.songIds.push(songId);
      PlaylistManager.savePlaylist(playlist);
    }
  }
};

// --- Create Playlist Modal Component ---
interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlaylist: (name: string) => void;
  initialSongId?: number;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ 
  isOpen, 
  onClose, 
  onCreatePlaylist,
  initialSongId 
}) => {
  const [playlistName, setPlaylistName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (playlistName.trim()) {
      onCreatePlaylist(playlistName.trim());
      setPlaylistName('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl border border-blue-500/30 shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Playlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-full">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Playlist Name</label>
          <input
            ref={inputRef}
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && playlistName.trim() && handleSubmit(e)}
            placeholder="My Awesome Playlist"
            className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            maxLength={50}
          />
        </div>

        {initialSongId && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-300">
              <FaMusic className="inline mr-2" size={12} />
              Song will be added to this playlist
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!playlistName.trim()}
            className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all"
          >
            Create Playlist
          </button>
          <button onClick={onClose} className="px-6 bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Playlist Selector Modal Component ---
interface PlaylistSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  songId: number;
  onSelectPlaylist: (playlistId: string) => void;
  onCreateNew: () => void;
}

const PlaylistSelectorModal: React.FC<PlaylistSelectorModalProps> = ({
  isOpen,
  onClose,
  songId,
  onSelectPlaylist,
  onCreateNew
}) => {
  const [playlists, setPlaylists] = useState<CustomPlaylist[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPlaylists(PlaylistManager.getPlaylists());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl border border-blue-500/30 shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add to Playlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-full">
            <FaTimes size={20} />
          </button>
        </div>

        <button
          onClick={onCreateNew}
          className="w-full bg-linear-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 rounded-lg mb-4 transition-all flex items-center justify-center gap-2"
        >
          <FaPlus size={16} />
          Create New Playlist
        </button>

        <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
          {playlists.length === 0 ? (
            <div className="text-center py-8">
              <FaFolder size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No playlists yet</p>
            </div>
          ) : (
            playlists.map((playlist) => {
              const isAdded = playlist.songIds.includes(songId);
              return (
                <button
                  key={playlist.id}
                  onClick={() => !isAdded && onSelectPlaylist(playlist.id)}
                  className={`w-full p-4 rounded-lg border transition-all flex items-center justify-between ${
                    isAdded ? 'bg-green-500/10 border-green-500/30 cursor-default' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FaFolder size={16} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white">{playlist.name}</p>
                      <p className="text-xs text-gray-400">{playlist.songIds.length} songs</p>
                    </div>
                  </div>
                  {isAdded && <FaCheck size={18} className="text-green-500" />}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main SongDetails Component ---
const SongDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [hovered, setHovered] = useState<number | null>(null);
  const [favs, setFavs] = useState<Record<number, boolean>>({});
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<{ songId: number; x: number; y: number } | null>(null);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState<number | null>(null);
  
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const song: SongData = mockSongsData[id || '1'] || mockSongsData['1'];

  useEffect(() => {
    const savedFavs = localStorage.getItem('Your Favorite');
    if (savedFavs) setFavs(JSON.parse(savedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem('Your Favorite', JSON.stringify(favs));
    window.dispatchEvent(new Event('storage'));
  }, [favs]);

  const handleHeartClick = (e: React.MouseEvent, songId: number) => {
    e.stopPropagation();
    setContextMenu({ songId, x: e.clientX, y: e.clientY });
  };

  const handleOpenPlaylistSelector = () => {
    if (contextMenu) {
      setSelectedSongForPlaylist(contextMenu.songId);
      setShowSelectorModal(true);
      setContextMenu(null);
    }
  };

  const handleSelectPlaylist = (playlistId: string) => {
    if (selectedSongForPlaylist) {
      PlaylistManager.addSongToPlaylist(playlistId, selectedSongForPlaylist);
      setShowSelectorModal(false);
      setSelectedSongForPlaylist(null);
    }
  };

  const handleCreatePlaylist = (name: string) => {
    const newPlaylist: CustomPlaylist = {
      id: `playlist_${Date.now()}`,
      name,
      songIds: selectedSongForPlaylist ? [selectedSongForPlaylist] : [],
      createdAt: new Date().toISOString()
    };
    PlaylistManager.savePlaylist(newPlaylist);
    setShowCreateModal(false);
    setSelectedSongForPlaylist(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-gray-400 font-sans overflow-hidden">
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-y-auto hide-scrollbar relative">
          
          <header className="absolute top-0 w-full z-20 p-6 px-10">
            <button onClick={() => navigate(-1)} className="bg-black/40 hover:bg-black/60 p-2.5 rounded-full text-white transition">
              <FaChevronLeft size={16} />
            </button>
          </header>

          <div className="relative shrink-0 min-h-[450px] flex flex-col justify-end p-12 bg-cover bg-center" 
               style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url('${song.coverUrl}')` }}>
            <h1 className="text-8xl font-black text-white mb-8 tracking-tight">Eunoia Monica</h1>
            <div className="flex items-center gap-4">
              <button className="bg-[#1d88b9] hover:scale-105 transition text-black px-10 py-2.5 rounded-full font-bold uppercase text-xs">Play</button>
              <FaEllipsisH className="cursor-pointer hover:text-white ml-2 text-xl text-white" />
            </div>
          </div>

          <div className="p-12 pt-8 pb-32">
            <div className="grid grid-cols-12 gap-4 text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-white/5 pb-4">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-4 hidden md:block">Album</div>
              <div className="col-span-2 text-right pr-4">Time</div>
            </div>

            <div className="space-y-1 mt-4">
              {sampleSongs.map((s) => (
                <div key={s.id} onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered(null)}
                     onClick={() => setShowSidebar(true)}
                     className="group grid grid-cols-12 items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="col-span-1 flex justify-center items-center text-sm">
                    {hovered === s.id ? <FaPlay size={12} className="text-white" /> : s.id}
                  </div>
                  <div className="col-span-5 flex items-center gap-4">
                    <div className={`w-12 h-12 ${s.color} rounded-lg shrink-0`} />
                    <div className="truncate">
                      <div className={`truncate font-bold text-[15px] ${hovered === s.id ? "text-white" : "text-gray-200"}`}>{s.title}</div>
                      <div className="text-xs text-gray-500">{s.artist}</div>
                    </div>
                  </div>
                  <div className="col-span-4 hidden md:block text-sm text-gray-400 truncate">{s.album}</div>
                  <div className="col-span-2 flex items-center justify-end gap-8 pr-4">
                    <FaHeart size={16} onClick={(e) => handleHeartClick(e, s.id)}
                             className={`cursor-pointer transition-colors ${favs[s.id] ? "text-red-500" : "text-gray-600 group-hover:text-gray-400"}`} />
                    <div className="text-sm font-bold text-gray-400">{s.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {contextMenu && (
            <div ref={contextMenuRef} className="fixed bg-gray-800 text-white p-2 rounded-lg shadow-xl z-50 border border-gray-600 w-48"
                 style={{ left: contextMenu.x, top: contextMenu.y }}>
              <button onClick={() => { setFavs(p => ({...p, [contextMenu.songId]: !p[contextMenu.songId]})); setContextMenu(null); }}
                      className="flex items-center gap-2 w-full text-left hover:bg-gray-700 px-3 py-2 rounded transition-colors text-sm font-medium">
                <FaHeart size={14} className={favs[contextMenu.songId] ? "text-red-500" : ""} /> {favs[contextMenu.songId] ? 'Unfavorite' : 'Add to Favorite'}
              </button>
              <button onClick={handleOpenPlaylistSelector}
                      className="flex items-center gap-2 w-full text-left hover:bg-gray-700 px-3 py-2 rounded transition-colors text-sm font-medium">
                <FaListUl size={14} /> Add to Playlist
              </button>
            </div>
          )}
        </main>

      {showSidebar && (
  <aside className="w-[380px] bg-linear-to-b from-[#0a0a1a] to-[#1a0a2e] border-l border-white/10 p-5 flex flex-col gap-5 overflow-y-auto animate-in slide-in-from-right">

    {/* Close Button */}
    <div className="flex justify-end">
      <button onClick={() => setShowSidebar(false)} className="text-gray-400 hover:text-white">
        <FaTimes size={20} />
      </button>
    </div>

    {/* Album Cover Animation */}
    <div className="relative bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-[30px] p-8 border border-blue-500/30 flex items-center justify-center min-h-[280px]">
      <div className="w-40 h-40 rounded-full bg-[#111] border-[6px] border-[#333] flex items-center justify-center animate-[spin_6s_linear_infinite]">
        <div className="w-16 h-16 rounded-full bg-red-600 border-4 border-black" />
      </div>
    </div>

    {/* Song Info + Heart & Add Buttons */}
    <div className="flex justify-between items-center mt-4">
      <div>
        <h2 className="text-white text-xl font-extrabold">{song.title}</h2>
        <p className="text-gray-400 text-sm">{song.artist}</p>
      </div>

      {/* Buttons aligned to right of text */}
      <div className="flex gap-4">
        {/* Heart Button */}
        <button
          onClick={() => setFavs(p => ({ ...p, [parseInt(id || '1')]: !p[parseInt(id || '1')] }))}
          className={`transition-colors ${favs[parseInt(id || '1')] ? "text-red-500" : "text-gray-400 hover:text-white"}`}
        >
          <FaHeart size={20} />
        </button>

        {/* Add to Playlist Button */}
        <button
          onClick={() => { setSelectedSongForPlaylist(parseInt(id || '1')); setShowSelectorModal(true); }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaPlus size={20} />
        </button>
      </div>
    </div>

    {/* Lyrics Section */}
    <div className="bg-blue-900/10 border border-blue-400/40 rounded-[25px] p-6 text-sm italic text-blue-100/80 flex flex-col gap-2 max-h-96 overflow-y-auto mt-2">
      {song.lyrics.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>

    {/* Credits */}
    <div className="text-gray-500 text-xs mt-2">
      {song.credits.map((c, idx) => (
        <p key={idx}>{c.name} - {c.role}</p>
      ))}
    </div>
  </aside>
)}


      </div>

      <CreatePlaylistModal 
        isOpen={showCreateModal} 
        onClose={() => { setShowCreateModal(false); setSelectedSongForPlaylist(null); }} 
        onCreatePlaylist={handleCreatePlaylist} 
        initialSongId={selectedSongForPlaylist || undefined} 
      />

      <PlaylistSelectorModal 
        isOpen={showSelectorModal} 
        onClose={() => { setShowSelectorModal(false); setSelectedSongForPlaylist(null); }} 
        songId={selectedSongForPlaylist || 0} 
        onSelectPlaylist={handleSelectPlaylist}
        onCreateNew={() => { setShowSelectorModal(false); setShowCreateModal(true); }} 
      />

      <Player song={{ title: song.title, artist: song.artist, coverUrl: song.coverUrl }} />
    </div>
  );
};

export default SongDetails;