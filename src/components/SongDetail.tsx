import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaPlay, FaHeart, FaEllipsisH, FaStepBackward, FaStepForward, 
  FaRedo, FaRandom, FaVolumeUp, FaListUl, FaDesktop, 
  FaMicrophone, FaChevronDown, FaChevronLeft, FaPlus
} from 'react-icons/fa';

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

const SongDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const song: SongData = mockSongsData[id || '1'] || mockSongsData['1'];

  return (
    <div className="flex h-screen bg-black text-gray-400 font-sans overflow-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
      
      <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative">
        
        <header className="absolute top-0 w-full z-20 p-6 px-10">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-black/40 hover:bg-black/60 p-2.5 rounded-full text-white transition flex items-center justify-center w-10 h-10"
          >
            <FaChevronLeft size={16} />
          </button>
        </header>

        {/* Hero Banner */}
        <div className="relative min-h-[450px] flex flex-col justify-end p-12 bg-cover bg-center" 
             style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url('${song.coverUrl}')` }}>
          <div className="flex items-center gap-2 text-[10px] mb-2 font-bold text-white uppercase tracking-widest">
            <div className="bg-blue-500 rounded-full p-0.5"><FaChevronDown size={8}/></div>
            <span>Song</span>
          </div>
          <h1 className="text-8xl font-black text-white mb-8 tracking-tight">Eunoia Monica</h1>
          <div className="flex items-center gap-4">
            <button className="bg-[#1d88b9] hover:scale-105 transition text-black px-10 py-2.5 rounded-full font-bold uppercase text-xs tracking-widest">Play</button>
            <FaEllipsisH className="cursor-pointer hover:text-white ml-2 text-xl" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-10 px-12 py-6 text-xs font-bold tracking-widest sticky top-0 bg-black/90 backdrop-blur-md z-10 border-b border-white/5">
          <span className="text-[#1d88b9] border-b-2 border-[#1d88b9] pb-4 cursor-pointer">OVERVIEW</span>
          <span className="hover:text-white cursor-pointer transition">FANS ALSO LIKE</span>
          <span className="hover:text-white cursor-pointer transition">ABOUT</span>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-12 gap-12 p-12 pt-8 mb-24">
          <div className="col-span-8">
             <h3 className="text-white font-bold mb-6">Popular</h3>
             <div className="space-y-1">
               {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="group flex items-center gap-4 p-2 px-4 hover:bg-white/5 rounded-md transition text-sm cursor-pointer">
                     <span className="w-4 text-gray-500">{idx}</span>
                     <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-blue-500 rounded shadow-md"></div>
                     <FaHeart size={14} className="opacity-0 group-hover:opacity-100 hover:text-white" />
                     <span className="flex-1 text-white font-medium">Song Title - Albums - Singer </span>
                     <span className="text-xs text-gray-500 tabular-nums">11-23-2020</span>
                  </div>
               ))}
             </div>
          </div>
        </div>
      </main>

      {/* --- RIGHT SIDEBAR --- */}
      <aside className="w-[400px] bg-[#030312] border-l border-white/5 p-8 flex flex-col gap-6 overflow-y-auto no-scrollbar">
        <div className="relative aspect-square w-full bg-[#0d1b3e] rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl border border-white/5">
           <div className="w-full h-full rounded-full bg-black/40 p-6 relative">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-orange-400 via-red-500 to-blue-600 animate-spin-slow flex items-center justify-center">
                 <div className="w-1/3 h-1/3 bg-black rounded-full border-4 border-white/10"></div>
              </div>
           </div>
        </div>

        <div className="mt-2">
           <div className="flex justify-between items-start">
             <div>
               <h2 className="text-white text-2xl font-bold tracking-tight">{song.title}</h2>
               <p className="text-gray-400 text-sm mt-1">{song.artist}</p>
             </div>
             <div className="flex gap-3 text-blue-500">
               <FaHeart size={20} fill="currentColor" className="cursor-pointer hover:text-white hover:scale-110 transition-all duration-200" />
               <div className="bg-blue-600/20 p-1.5 rounded hover:bg-blue-600/30 cursor-pointer hover:scale-110 transition-all duration-200">
                  <FaPlus size={14} />
               </div>
             </div>
           </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl">
           <div className="text-[13px] text-blue-200/80 space-y-3 font-medium leading-relaxed italic">
              {song.lyrics.map((line, index) => (
                <p key={index} className={index === 1 ? "text-blue-100 font-semibold" : ""}>{line}</p>
              ))}
           </div>
        </div>

        {/* Credits Section */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-bold text-sm">Credits</span>
            <button className="text-[10px] border border-white/20 px-3 py-1 rounded-full text-white font-bold tracking-tighter hover:bg-white/10">FOLLOW</button>
          </div>
          <div className="space-y-4">
            {song.credits.map((credit, i) => (
              <div key={i}>
                <p className="text-white text-sm font-semibold">{credit.name}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">{credit.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Songs Section */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 mb-24">
          <h3 className="text-white font-bold text-sm mb-4">Next Songs</h3>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-500 rounded overflow-hidden">
                <img src={song.coverUrl} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="text-white text-xs font-semibold truncate">Song Title - Albums - Singer</p>
                <p className="text-[10px] text-gray-500">Artist Name</p>
             </div>
             <button className="bg-blue-500/20 hover:bg-blue-500/30 p-2 rounded-full text-blue-500 hover:text-white transition">
               <FaPlus size={12} />
             </button>
          </div>
        </div>
      </aside>

      {/* --- PLAYER FOOTER --- */}
      <footer className="fixed bottom-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 h-24 flex items-center justify-between px-8 z-20">
        <div className="flex items-center gap-4 w-[30%]">
          <div className="w-14 h-14 rounded overflow-hidden shadow-lg border border-white/10">
            <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold">{song.title}</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Artist Name / Collaboration</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center w-[40%] gap-2">
          <div className="flex items-center gap-8 text-gray-400">
            <FaRandom size={16} className="text-[#1d51b9]" />
            <FaStepBackward size={20} className="hover:text-white cursor-pointer" />
            <div className="bg-white rounded-full p-2.5 text-black hover:scale-105 transition cursor-pointer">
               <FaPlay size={20} />
            </div>
            <FaStepForward size={20} className="hover:text-white cursor-pointer" />
            <FaRedo size={16} />
          </div>
          <div className="flex items-center gap-3 w-full max-w-md text-[10px] text-gray-500 font-medium">
            <span>5:16</span>
            <div className="flex-1 h-1 bg-white/20 rounded-full">
              <div className="h-full bg-white w-[75%] rounded-full"></div>
            </div>
            <span>5:41</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 w-[30%] text-gray-400">
          <FaMicrophone size={16} className="hover:text-white" />
          <FaListUl size={18} className="hover:text-white" />
          <FaDesktop size={18} className="hover:text-white" />
          <FaVolumeUp size={18} />
          <div className="w-24 h-1 bg-white/20 rounded-full">
             <div className="h-full bg-white w-1/2 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SongDetails;