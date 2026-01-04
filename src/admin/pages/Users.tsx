import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye, FaEdit, FaSearch, FaBan, 
  FaCheckCircle, FaTrashAlt, FaMars, FaVenus, FaGenderless, FaCalendarAlt
} from "react-icons/fa";

type Role = "user" | "admin";
type Status = "active" | "blocked";
type Gender = "Male" | "Female" | "Other";

interface UserItem {
  id: string;
  avatar?: string;
  name: string;
  email: string;
  gender: Gender;
  age: number;
  registerDate: string;
  role: Role;
  status: Status;
}

const MOCK_USERS: UserItem[] = [
  { id: "1", avatar: "https://i.pravatar.cc/150?img=1", name: "John Doe", email: "john@gmail.com", gender: "Male", age: 28, registerDate: "2024-01-12", role: "user", status: "active" },
  { id: "2", avatar: "https://i.pravatar.cc/150?img=5", name: "Sarah Smith", email: "sarah@gmail.com", gender: "Female", age: 24, registerDate: "2024-02-05", role: "user", status: "active" },
  { id: "3", avatar: "https://i.pravatar.cc/150?img=3", name: "Alex Rivera", email: "alex@gmail.com", gender: "Other", age: 31, registerDate: "2023-11-20", role: "user", status: "blocked" },
  { id: "4", avatar: "https://i.pravatar.cc/150?img=9", name: "Luna Moon", email: "luna@gmail.com", gender: "Female", age: 22, registerDate: "2024-03-01", role: "user", status: "active" },
];

export default function UsersManager() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserItem[]>(MOCK_USERS);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const searchStr = query.toLowerCase();
      return (
        u.name.toLowerCase().includes(searchStr) || 
        u.email.toLowerCase().includes(searchStr) ||
        u.gender.toLowerCase().includes(searchStr)
      );
    });
  }, [users, query]);

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u
    ));
  };

  const deleteUser = (id: string) => {
    if(window.confirm("Delete this user permanently?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              User <span className="text-purple-400">List</span>
            </h1>
            <p className="text-slate-500 font-medium">Manage member accounts and registration data</p>
          </div>

          <div className="relative group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, gender..."
              className="pl-12 pr-6 py-4 w-full lg:w-[450px] rounded-2xl bg-slate-900/80 border border-white/5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-2xl"
            />
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="px-8 py-6">Identity</th>
                  <th className="px-6 py-6 text-center">Gender</th>
                  <th className="px-6 py-6 text-center">Age</th>
                  <th className="px-6 py-6">Joined Date</th>
                  <th className="px-6 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={u.avatar} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/5 group-hover:ring-purple-500/50 transition-all" alt="" />
                        <div>
                          <div className="text-white font-bold tracking-tight">{u.name}</div>
                          <div className="text-slate-500 text-xs font-medium">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${
                          u.gender === 'Male' ? 'text-blue-400' : 
                          u.gender === 'Female' ? 'text-pink-400' : 'text-slate-400'
                        }`}>
                          {u.gender === "Male" && <FaMars />}
                          {u.gender === "Female" && <FaVenus />}
                          {u.gender === "Other" && <FaGenderless />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-slate-400">{u.gender}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className="inline-block px-3 py-1 bg-slate-800 text-purple-400 rounded-lg text-xs font-black ring-1 ring-white/5">
                        {u.age}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <FaCalendarAlt className="text-purple-500/50 text-[10px]" />
                        {u.registerDate}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <button 
                        onClick={() => toggleStatus(u.id)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                          u.status === "active" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" 
                          : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                        }`}
                      >
                        {u.status}
                      </button>
                    </td>

                    {/* Actions Column */}
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <ActionButton icon={<FaEye />} onClick={() => navigate(`/admin/users/${u.id}`)} />
                        <ActionButton icon={<FaEdit />} onClick={() => navigate(`/admin/users/${u.id}/edit`)} hoverColor="hover:bg-purple-600" />
                        <ActionButton icon={<FaTrashAlt />} onClick={() => deleteUser(u.id)} hoverColor="hover:bg-red-600" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <div className="inline-flex p-8 bg-white/5 rounded-[2rem] mb-6 text-slate-700">
                <FaSearch size={40} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic">No Matches Found</h3>
              <p className="text-slate-500 mt-2 font-medium">We couldn't find any users matching "{query}"</p>
              <button onClick={() => setQuery("")} className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, onClick, hoverColor = "hover:bg-slate-700" }: { icon: React.ReactNode; onClick: () => void; hoverColor?: string }) {
  return (
    <button 
      onClick={onClick} 
      className={`p-3.5 bg-slate-800/80 text-slate-400 hover:text-white rounded-2xl transition-all border border-white/5 shadow-xl ${hoverColor}`}
    >
      {icon}
    </button>
  );
}