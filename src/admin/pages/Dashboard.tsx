import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaCompactDisc,
  FaMusic,
  FaListUl,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";


interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}

interface Activity {
  id: number;
  type: "user" | "song" | "artist";
  title: string;
  description: string;
  timestamp: string;
  avatar?: string;
}

interface ChartData {
  month: string;
  songs: number;
  users: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await new Promise((r) => setTimeout(r, 400));

        const mockStats: StatCard[] = [
          { title: "Total Users", value: 1234, icon: <FaUsers />, color: "from-blue-500 to-cyan-500", trend: 12 },
          { title: "Total Songs", value: 5678, icon: <FaCompactDisc />, color: "from-purple-500 to-pink-500", trend: 8 },
          { title: "Total Artists", value: 342, icon: <FaMusic />, color: "from-green-500 to-emerald-500", trend: 5 },
          { title: "Total Playlists", value: 456, icon: <FaListUl />, color: "from-orange-500 to-red-500", trend: 3 },
        ];

        const mockChartData: ChartData[] = [
          { month: "Jan", songs: 120, users: 400 },
          { month: "Feb", songs: 154, users: 480 },
          { month: "Mar", songs: 187, users: 520 },
          { month: "Apr", songs: 145, users: 580 },
          { month: "May", songs: 210, users: 620 },
          { month: "Jun", songs: 245, users: 720 },
          { month: "Jul", songs: 290, users: 850 },
          { month: "Aug", songs: 312, users: 980 },
          { month: "Sep", songs: 268, users: 1050 },
          { month: "Oct", songs: 345, users: 1150 },
          { month: "Nov", songs: 380, users: 1220 },
          { month: "Dec", songs: 410, users: 1234 },
        ];

        setStats(mockStats);
        setChartData(mockChartData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const maxSongs = chartData.length ? Math.max(...chartData.map((d) => d.songs)) : 0;
  const maxUsers = chartData.length ? Math.max(...chartData.map((d) => d.users)) : 0;

  const userChartPoints = chartData
    .map((d, i) => `${(i * (560 / chartData.length)) + 30},${350 - (d.users / (maxUsers || 1)) * 250}`)
    .join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-slate-400 mt-2">Platform overview — quick summary of key metrics</p>
        </div>

      {/* Dynamic Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.title} className="bg-slate-800/60 shadow-lg rounded-xl p-8 flex items-center justify-between gap-4 hover:scale-[1.01] transition-transform">
              <div>
                <p className="text-slate-400 text-sm font-medium">{s.title}</p>
                <h3 className="text-3xl font-extrabold text-white mt-2">{s.value.toLocaleString()}</h3>
                {s.trend != null && <p className="text-green-400 text-sm mt-2">▲ {s.trend}% this month</p>}
              </div>
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-2xl`}>{s.icon}</div>
            </div>
          ))}
        </div>

      {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/60 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FaChartBar className="text-purple-400" />Songs Added Per Month</h2>
          <div className="flex items-end justify-between h-56 gap-2">
            {chartData.map((d, i) => {
              const height = maxSongs ? (d.songs / maxSongs) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-purple-500 to-pink-500 transition-all" style={{ height: `${Math.max(height, 6)}%` }} />
                  <span className="text-xs text-slate-400">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

          <div className="bg-slate-800/60 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FaChartLine className="text-cyan-400" />User Growth</h2>
          <svg width="100%" height="260" className="mt-2">
            <defs>
              <linearGradient id="gline" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <polyline points={userChartPoints} fill="none" stroke="#06b6d4" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        </div>
      </div>
    </div>
  );
}
