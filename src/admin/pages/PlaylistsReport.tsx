import React, { useState } from "react";
import { FaList, FaLock, FaUnlock, FaCalendarAlt } from "react-icons/fa";

interface Playlist {
  rank: number;
  name: string;
  owner: string;
  type: "Public" | "Private";
  songs: number;
}

const MOCK_PLAYLISTS: Playlist[] = [
  { rank: 1, name: "Top Hits 2026", owner: "Alice", type: "Public", songs: 25 },
  { rank: 2, name: "Chill Vibes", owner: "Bob", type: "Private", songs: 18 },
  { rank: 3, name: "Rock Classics", owner: "Carol", type: "Public", songs: 30 },
  { rank: 4, name: "Jazz Evening", owner: "Dave", type: "Private", songs: 12 },
  { rank: 5, name: "Electronic Dreams", owner: "Eve", type: "Public", songs: 20 },
  { rank: 6, name: "Morning Boost", owner: "Frank", type: "Public", songs: 15 },
  { rank: 7, name: "Relax & Unwind", owner: "Grace", type: "Private", songs: 10 },
  { rank: 8, name: "Workout Mix", owner: "Hank", type: "Public", songs: 22 },
  { rank: 9, name: "Night Drive", owner: "Ivy", type: "Public", songs: 28 },
  { rank: 10, name: "Acoustic Lounge", owner: "Jack", type: "Private", songs: 14 },
];

export default function PlaylistsReport({ dateFilterProp, onFilterChange }: { dateFilterProp?: string; onFilterChange?: (filter: string) => void }) {
  const [dateFilter, setDateFilter] = useState(dateFilterProp || "all");

  const handleFilterChange = (filter: string) => {
    setDateFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  const totalPlaylists = MOCK_PLAYLISTS.length;
  const publicCount = MOCK_PLAYLISTS.filter(p => p.type === "Public").length;
  const privateCount = totalPlaylists - publicCount;
  const mostSongs = MOCK_PLAYLISTS.reduce((a, b) => (a.songs > b.songs ? a : b), MOCK_PLAYLISTS[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Playlist Report</h1>
            <p className="text-slate-400 mt-1">Analyze playlist trends and statistics</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/60 rounded-lg px-4 py-2 border border-purple-500/20">
            <FaCalendarAlt className="text-purple-400" />
            <select value={dateFilter} onChange={(e) => handleFilterChange(e.target.value)} className="bg-transparent text-white focus:outline-none">
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20">
            <p className="text-slate-400 text-sm">Total Playlists</p>
            <p className="text-3xl font-bold text-white mt-2">{totalPlaylists}</p>
          </div>

          <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20">
            <p className="text-slate-400 text-sm">Most Songs</p>
            <p className="text-xl font-bold text-white mt-2">{mostSongs.name}</p>
            <p className="text-slate-400 text-xs mt-1">{mostSongs.songs} songs</p>
          </div>

          <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20">
            <p className="text-slate-400 text-sm">Public vs Private</p>
            <p className="text-white font-semibold mt-2">
              <FaUnlock className="inline text-green-400 mr-1" /> {publicCount} Public &nbsp; | &nbsp;
              <FaLock className="inline text-red-400 mr-1" /> {privateCount} Private
            </p>
          </div>
        </div>

        <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20 overflow-x-auto">
          <h2 className="text-xl font-bold text-white mb-4">Top Playlists</h2>
          <div className="space-y-3">
            {MOCK_PLAYLISTS.map((p) => (
              <div key={p.rank} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
                    {p.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{p.name}</p>
                    <p className="text-slate-400 text-xs">{p.owner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold flex items-center gap-1">
                    {p.type === "Public" ? <FaUnlock className="text-green-400" /> : <FaLock className="text-red-400" />}
                    {p.songs} songs
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
