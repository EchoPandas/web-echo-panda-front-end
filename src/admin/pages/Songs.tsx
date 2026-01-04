import React, { useMemo, useState, useEffect } from "react";
import {
  FaSearch, FaEye, FaEdit, FaTrash, FaTimes, 
  FaMusic, FaClock, FaPlus, FaMicrophone, 
  FaPlayCircle, FaCalendarAlt, FaCompactDisc
} from "react-icons/fa";

interface Song {
  id: string;
  title: string;
  artist: string;
  category: string;
  duration: string;
  album: string;
  plays: number;
  releaseDate: string;
  status: "published" | "draft";
}

const INITIAL_SONGS: Song[] = [
  { id: "1", title: "Midnight Dreams", artist: "DJ Seang", category: "EDM", duration: "3:45", album: "Neon Nights", plays: 124500, releaseDate: "2023-12-01", status: "published" },
  { id: "2", title: "Broken Heart", artist: "DARA", category: "Pop", duration: "4:10", album: "Love & Pain", plays: 85000, releaseDate: "2024-01-15", status: "draft" },
  { id: "3", title: "Golden Hour", artist: "DARA", category: "Pop", duration: "3:22", album: "Sunshine", plays: 230400, releaseDate: "2023-05-20", status: "published" },
];

export default function SongsManager() {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  const [formData, setFormData] = useState<Partial<Song>>({
    title: "", artist: "", category: "Pop", duration: "0:00", album: "", status: "draft", releaseDate: new Date().toISOString().split('T')[0]
  });


  const filtered = useMemo(() => {
    return songs.filter((s) => {
      const matchTitle = s.title.toLowerCase().includes(query.toLowerCase()) || s.artist.toLowerCase().includes(query.toLowerCase());
      const matchCategory = categoryFilter === "all" || s.category === categoryFilter;
      return matchTitle && matchCategory;
    });
  }, [songs, query, categoryFilter]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      setSongs(songs.filter(s => s.id !== id));
    }
  };

  const handleOpenEdit = (song: Song) => {
    setEditingSong(song);
    setFormData(song);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingSong) {
      setSongs(songs.map(s => s.id === editingSong.id ? { ...s, ...formData } as Song : s));
    } else {
      const newSong: Song = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        plays: 0,
      } as Song;
      setSongs([newSong, ...songs]);
    }
    setShowModal(false);
    setEditingSong(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
  
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">Songs <span className="text-purple-400">Management</span></h2>
          <button 
            onClick={() => { setEditingSong(null); setFormData({ title: "", artist: "", category: "Pop", duration: "0:00", album: "", status: "draft", releaseDate: "" }); setShowModal(true); }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <FaPlus /> Add New Song
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[300px] relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="Search by title or artist..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select 
            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all" className="bg-slate-900">All Genres</option>
            <option value="Pop" className="bg-slate-900">Pop</option>
            <option value="EDM" className="bg-slate-900">EDM</option>
            <option value="Electronic" className="bg-slate-900">Electronic</option>
          </select>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 py-5">Song & Artist</th>
                  <th className="px-6 py-5">Album</th>
                  <th className="px-6 py-5">Plays</th>
                  <th className="px-6 py-5">Released</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(song => (
                  <tr key={song.id} className="group hover:bg-white/5 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {song.title[0]}
                        </div>
                        <div>
                          <p className="text-white font-bold leading-tight">{song.title}</p>
                          <p className="text-slate-500 text-sm flex items-center gap-1 mt-0.5"><FaMicrophone size={10}/> {song.artist} • {song.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">
                       <div className="flex items-center gap-2"><FaCompactDisc className="text-slate-500"/> {song.album}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-mono">
                      {song.plays.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                       <div className="flex items-center gap-2"><FaCalendarAlt size={12}/> {song.releaseDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${song.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {song.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => handleOpenEdit(song)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400 hover:text-blue-300"><FaEdit/></button>
                        <button onClick={() => handleDelete(song.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400 hover:text-red-300"><FaTrash/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DYNAMIC MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">{editingSong ? 'Update Track' : 'Add New Track'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white"><FaTimes size={24}/></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Song Title</label>
                <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500" placeholder="e.g. Midnight Dreams" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Artist Name</label>
                <input value={formData.artist} onChange={(e) => setFormData({...formData, artist: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500" placeholder="e.g. DJ Seang" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Album</label>
                <input value={formData.album} onChange={(e) => setFormData({...formData, album: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500" placeholder="Album Name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Genre</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500">
                  <option value="Pop">Pop</option>
                  <option value="EDM">EDM</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Hip Hop">Hip Hop</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Duration</label>
                <input value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500" placeholder="3:45" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Release Date</label>
                <input type="date" value={formData.releaseDate} onChange={(e) => setFormData({...formData, releaseDate: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 text-white" />
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:scale-105 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}