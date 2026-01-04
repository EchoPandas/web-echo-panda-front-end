import React, { useMemo, useState } from "react";
import { FaMusic, FaMicrophone, FaFire, FaCalendarAlt } from "react-icons/fa";

interface Song {
  rank: number;
  title: string;
  artist: string;
  favorites: number;
  plays: number;
}

interface Artist {
  rank: number;
  name: string;
  favorites: number;
  followers: number;
}

const MOCK_SONGS: Song[] = [
  { rank: 1, title: "Midnight Dreams", artist: "Luna Beats", favorites: 2450, plays: 8900 },
  { rank: 2, title: "Electric Soul", artist: "Synthwave Band", favorites: 2180, plays: 7600 },
  { rank: 3, title: "Ocean Waves", artist: "Chill Vibes", favorites: 1950, plays: 6800 },
  { rank: 4, title: "Neon Lights", artist: "Alex Rivera", favorites: 1820, plays: 6200 },
  { rank: 5, title: "Paradise Lost", artist: "Echo Dreams", favorites: 1650, plays: 5500 },
  { rank: 6, title: "Cosmic Journey", artist: "Space Travelers", favorites: 1520, plays: 5100 },
  { rank: 7, title: "Sunset Horizon", artist: "Golden Hour", favorites: 1380, plays: 4600 },
  { rank: 8, title: "Starlight", artist: "Luna Moon", favorites: 1240, plays: 4200 },
  { rank: 9, title: "Urban Beats", artist: "City Sounds", favorites: 1120, plays: 3800 },
  { rank: 10, title: "Ethereal Vibes", artist: "Quantum Music", favorites: 980, plays: 3300 },
];

const MOCK_ARTISTS: Artist[] = [
  { rank: 1, name: "Luna Beats", favorites: 5200, followers: 45000 },
  { rank: 2, name: "Synthwave Band", favorites: 4800, followers: 42000 },
  { rank: 3, name: "Chill Vibes", favorites: 4200, followers: 38000 },
  { rank: 4, name: "Alex Rivera", favorites: 3900, followers: 35000 },
  { rank: 5, name: "Echo Dreams", favorites: 3600, followers: 32000 },
  { rank: 6, name: "Space Travelers", favorites: 3200, followers: 28000 },
  { rank: 7, name: "Golden Hour", favorites: 2800, followers: 25000 },
  { rank: 8, name: "Luna Moon", favorites: 2400, followers: 22000 },
  { rank: 9, name: "City Sounds", favorites: 2000, followers: 18000 },
  { rank: 10, name: "Quantum Music", favorites: 1600, followers: 15000 },
];

export default function Favorites({ dateFilter: dateFilterProp, onFilterChange }: { dateFilter?: string; onFilterChange?: (filter: string) => void }) {
  const [dateFilter, setDateFilter] = useState(dateFilterProp || "all");

  const handleFilterChange = (filter: string) => {
    setDateFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Favorites</h1>
            <p className="text-slate-400 mt-1">Analyze popular content and trending songs</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaMusic className="text-purple-400" />
              Top 10 Favorited Songs
            </h2>

            <div className="space-y-3">
              {MOCK_SONGS.map((song) => (
                <div key={song.rank} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm">
                      {song.rank}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{song.title}</p>
                      <p className="text-slate-400 text-xs">{song.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-semibold flex items-center gap-1">
                        <FaFire className="text-orange-400" />
                        {song.favorites.toLocaleString()}
                      </p>
                      <p className="text-slate-400 text-xs">{song.plays.toLocaleString()} plays</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaMicrophone className="text-cyan-400" />
              Top 10 Artists
            </h2>

            <div className="space-y-3">
              {MOCK_ARTISTS.map((artist) => (
                <div key={artist.rank} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold text-sm">
                      {artist.rank}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{artist.name}</p>
                      <p className="text-slate-400 text-xs">{artist.followers.toLocaleString()} followers</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-semibold flex items-center gap-1">
                      <FaFire className="text-orange-400" />
                      {artist.favorites.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20">
            <p className="text-slate-400 text-sm">Total Favorites</p>
            <p className="text-3xl font-bold text-white mt-2">{MOCK_SONGS.reduce((sum, s) => sum + s.favorites, 0).toLocaleString()}</p>
            <p className="text-green-400 text-xs mt-2">↑ 12% from last period</p>
          </div>

          <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20">
            <p className="text-slate-400 text-sm">Top Song</p>
            <p className="text-xl font-bold text-white mt-2">{MOCK_SONGS[0].title}</p>
            <p className="text-slate-400 text-xs mt-2">{MOCK_SONGS[0].artist}</p>
          </div>

          <div className="bg-slate-800/60 shadow-lg rounded-xl p-6 border border-purple-500/20">
            <p className="text-slate-400 text-sm">Top Artist</p>
            <p className="text-xl font-bold text-white mt-2">{MOCK_ARTISTS[0].name}</p>
            <p className="text-slate-400 text-xs mt-2">{MOCK_ARTISTS[0].followers.toLocaleString()} followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

