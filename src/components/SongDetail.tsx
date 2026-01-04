import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaPlay, FaHeart, FaEllipsisH, FaStepBackward, FaStepForward, 
  FaRedo, FaRandom, FaVolumeUp, FaListUl, FaDesktop, 
  FaMicrophone, FaChevronDown, FaChevronLeft, FaPlus,
  FaUser, FaCompactDisc, FaTimes
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
  date: "2024-01-01",
  album: `Album ${i + 1}`,
  duration: `${2 + (i % 4)}:${(10 + i).toString().slice(-2)}`,
  color: "bg-gray-400",
}));

const SongDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  // --- States ---
  const [hovered, setHovered] = useState<number | null>(null);
  const [favs, setFavs] = useState<Record<number, boolean>>({});
  const [playlists, setPlaylists] = useState<Record<number, boolean>>({});
  const [showSidebar, setShowSidebar] = useState<boolean>(false); // Control Sidebar visibility
  const [contextMenu, setContextMenu] = useState<{
    songId: number;
    x: number;
    y: number;
  } | null>(null);
  
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const song: SongData = mockSongsData[id || '1'] || mockSongsData['1'];

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavs = localStorage.getItem('Your Favorite');
    if (savedFavs) {
      setFavs(JSON.parse(savedFavs));
    }
    const savedPlaylists = localStorage.getItem('Your Playlist');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  // Save to localStorage when favs change
  useEffect(() => {
    localStorage.setItem('Your Favorite', JSON.stringify(favs));
    window.dispatchEvent(new Event('storage'));
  }, [favs]);

  // Save to localStorage when playlists change
  useEffect(() => {
    localStorage.setItem('Your Playlist', JSON.stringify(playlists));
    window.dispatchEvent(new Event('storage'));
  }, [playlists]);

  // --- Handlers ---
  const toggleFav = (id: number) => {
    setFavs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePlaylist = (id: number) => {
    setPlaylists((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSongClick = (songId: number) => {
    // When a song in the list is clicked, show the sidebar
    setShowSidebar(true);
    console.log(`Playing/Viewing song: ${songId}`);
  };

  const handleHeartClick = (e: React.MouseEvent, songId: number) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setContextMenu({
      songId,
      x: rect.left,
      y: rect.bottom + 5,
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        closeContextMenu();
      }
    };
    if (contextMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contextMenu]);

  return (
    <div className="flex flex-col h-screen bg-black text-gray-400 font-sans overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto hide-scrollbar relative">
          
          <header className="absolute top-0 w-full z-20 p-6 px-10">
            <button 
              onClick={() => navigate(-1)} 
              className="bg-black/40 hover:bg-black/60 p-2.5 rounded-full text-white transition flex items-center justify-center w-10 h-10"
            >
              <FaChevronLeft size={16} />
            </button>
          </header>

          {/* Hero Banner */}
          <div className="relative shrink-0 min-h-[450px] flex flex-col justify-end p-12 bg-cover bg-center" 
               style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url('${song.coverUrl}')` }}>
            <div className="flex items-center gap-2 text-[10px] mb-2 font-bold text-white uppercase tracking-widest">
              <div className="bg-blue-500 rounded-full p-0.5"><FaChevronDown size={8}/></div>
              <span>Song</span>
            </div>
            <h1 className="text-8xl font-black text-white mb-8 tracking-tight">Eunoia Monica</h1>
            <div className="flex items-center gap-4">
              <button className="bg-[#1d88b9] hover:scale-105 transition text-black px-10 py-2.5 rounded-full font-bold uppercase text-xs tracking-widest">Play</button>
              <FaEllipsisH className="cursor-pointer hover:text-white ml-2 text-xl text-white" />
            </div>
          </div>

          {/* Sticky Tab Bar */}
          <div className="flex gap-10 px-12 py-6 text-xs font-bold tracking-widest sticky top-0 bg-black/90 backdrop-blur-md z-10 border-b border-white/5">
            <span className="text-[#1d88b9] border-b-2 border-[#1d88b9] pb-4 cursor-pointer">OVERVIEW</span>
          </div>

          {/* SONG LIST SECTION */}
          <div className="p-12 pt-8 pb-32">
            <div className="grid grid-cols-12 gap-4 text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-white/5 pb-4">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5 md:col-span-4">Title</div>
              <div className="hidden md:block md:col-span-3">Album</div>
              <div className="hidden md:block md:col-span-2">Release</div>
              <div className="col-span-2 text-right pr-4">Time</div>
            </div>

            <div className="space-y-1 mt-4">
              {sampleSongs.map((s) => (
                <div
                  key={s.id}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSongClick(s.id)}
                  className="group grid grid-cols-12 items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                >
                  <div className="col-span-1 flex justify-center items-center text-sm font-bold">
                    {hovered === s.id ? <FaPlay size={12} className="text-white" /> : <span className="text-gray-600">{s.id}</span>}
                  </div>

                  <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                    <div className={`w-12 h-12 ${s.color} rounded-lg shrink-0`} />
                    <div className="min-w-0">
                      <div className={`truncate font-bold text-[15px] ${hovered === s.id ? "text-white" : "text-gray-200"}`}>{s.title}</div>
                      <div className="text-xs text-gray-500 font-medium">{s.artist}</div>
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-3 text-sm font-medium text-gray-400 truncate">{s.album}</div>
                  <div className="hidden md:block md:col-span-2 text-sm font-medium text-gray-500">{s.date}</div>

                  <div className="col-span-2 flex items-center justify-end gap-8 pr-4">
                    <FaHeart 
                      size={16} 
                      onClick={(e) => handleHeartClick(e, s.id)}
                      className={`cursor-pointer transition-colors ${favs[s.id] ? "text-red-500" : "text-gray-600 group-hover:text-gray-400"}`} 
                    />
                    <div className="text-sm font-bold text-gray-400 w-10 text-right">{s.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Context Menu for Heart Click */}
          {contextMenu && (
            <div
              ref={contextMenuRef}
              className="fixed bg-gray-800 text-white p-3 rounded-lg shadow-xl z-50 border border-gray-600"
              style={{ left: contextMenu.x, top: contextMenu.y }}
            >
              <div className="space-y-2">
                <button
                  onClick={() => {
                    toggleFav(contextMenu.songId);
                    closeContextMenu();
                  }}
                  className="flex items-center gap-2 w-full text-left hover:bg-gray-700 px-3 py-2 rounded transition-colors"
                >
                  <FaHeart size={14} />
                  Add to Favorite
                </button>
                <button
                  onClick={() => {
                    console.log(`Add song ${contextMenu.songId} to playlist`);
                    togglePlaylist(contextMenu.songId);
                    closeContextMenu();
                  }}
                  className="flex items-center gap-2 w-full text-left hover:bg-gray-700 px-3 py-2 rounded transition-colors"
                >
                  <FaListUl size={14} />
                  Add to Playlist
                </button>
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR: Now conditionally rendered with showSidebar state */}
        {showSidebar && (
          <aside className="flex w-[380px] bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2e] border-l border-white/10 p-5 flex-col gap-5 overflow-y-auto hide-scrollbar pb-32 animate-in slide-in-from-right duration-300">
            
            {/* Close Button for Sidebar */}
            <div className="flex justify-end">
                <button onClick={() => setShowSidebar(false)} className="text-gray-400 hover:text-white transition">
                    <FaTimes size={20} />
                </button>
            </div>

            {/* 1. Vinyl Disk Section */}
            <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[30px] p-8 border border-blue-500/30 flex flex-col items-center justify-center min-h-[280px] shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <div className="relative w-40 h-40 rounded-full bg-[#111] border-[6px] border-[#333] flex items-center justify-center shadow-2xl animate-[spin_6s_linear_infinite]">
                <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-[conic-gradient(from_0deg,#111,#222,#111)]">
                  <div className="w-16 h-16 rounded-full bg-red-600 border-4 border-black flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  </div>
                </div>
              </div>
              <div className="absolute top-20 right-10 w-24 h-1 bg-gray-400 rotate-[35deg] origin-right rounded-full">
                 <div className="absolute left-0 -top-1 w-3 h-3 bg-gray-300 rounded-sm"></div>
              </div>
            </div>

            {/* 2. Title & Action Icons */}
            <div className="flex justify-between items-center px-2 mt-2">
              <div className="min-w-0">
                <h2 className="text-white text-xl font-extrabold tracking-wide truncate">{song.title}</h2>
                <p className="text-gray-400 text-sm font-medium">{song.artist}</p>
              </div>
              <div className="flex gap-5 items-center shrink-0">
                 <button onClick={() => toggleFav(parseInt(id || '1'))}>
                   <FaHeart size={26} className={favs[parseInt(id || '1')] ? "text-red-500" : "text-white/40 hover:text-white"} />
                 </button>
                 <button onClick={() => togglePlaylist(parseInt(id || '1'))}>
                   <FaListUl size={26} className={playlists[parseInt(id || '1')] ? "text-blue-500" : "text-white/40 hover:text-white"} />
                 </button>
              </div>
            </div>

            {/* 3. Lyrics Box */}
            <div className="bg-blue-900/10 border border-blue-400/40 rounded-[25px] p-6 backdrop-blur-sm">
              <div className="space-y-4 text-sm font-medium leading-relaxed text-blue-100/80">
                {song.lyrics.map((line, i) => (
                  <p key={i} className={i === 1 ? "text-white font-bold" : ""}>{line}</p>
                ))}
              </div>
            </div>

            {/* 4. Credits Box */}
            <div className="bg-[#0f0f25] border border-blue-900/50 rounded-[25px] p-6">
              <h4 className="text-white font-bold text-lg mb-4">Credits</h4>
              <div className="space-y-4">
                {song.credits.map((credit, i) => (
                  <div key={i}>
                    <p className="text-white text-sm font-bold">{credit.name}</p>
                    <p className="text-gray-500 text-xs">{credit.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Next Song */}
            <div className="bg-[#0f0f25] border border-blue-900/50 rounded-[25px] p-6">
              <h4 className="text-white font-bold text-lg mb-4">Next Song</h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-400 rounded-lg shrink-0"></div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-bold truncate">Next Song Title</p>
                  <p className="text-gray-500 text-xs">Next Artist</p>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* PLAYER */}
      <Player song={{ title: song.title, artist: song.artist, coverUrl: song.coverUrl }} />
    </div>
  );
};

export default SongDetails;