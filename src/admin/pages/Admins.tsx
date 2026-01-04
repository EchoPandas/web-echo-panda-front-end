import React, { useState, useMemo, useRef } from "react";
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaSearch, FaEye,
  FaMars, FaVenus, FaGenderless, FaCalendarAlt, FaCamera, FaLock, FaKey, FaUserShield
} from "react-icons/fa";

interface AdminItem {
  id: string;
  avatar: string;
  name: string;
  email: string;
  gender: "Male" | "Female" | "Other";
  joinDate: string;
  status: "active" | "blocked";
  passwordHash: string;
  role: "Admin"; 
}

const MOCK_ADMINS: AdminItem[] = [
  { 
    id: "1", 
    avatar: "https://i.pravatar.cc/150?img=10", 
    name: "Alice Johnson", 
    email: "alice@echopanda.com", 
    gender: "Female", 
    joinDate: "2024-01-10", 
    status: "active",
    passwordHash: "$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/zB6Enxy2KeBhGJLMWkWNfS",
    role: "Admin"
  },
  { 
    id: "2", 
    avatar: "https://i.pravatar.cc/150?img=11", 
    name: "Sok Dara", 
    email: "dara.admin@platform.com", 
    gender: "Male", 
    joinDate: "2023-12-05", 
    status: "blocked",
    passwordHash: "$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm",
    role: "Admin"
  },
];

export default function AdminsManager() {
  const [admins, setAdmins] = useState<AdminItem[]>(MOCK_ADMINS);
  const [query, setQuery] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminItem | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  const [formData, setFormData] = useState<Partial<AdminItem>>({
    name: "",
    email: "",
    gender: "Male",
    status: "active",
    avatar: "",
    joinDate: new Date().toISOString().split('T')[0],
    passwordHash: "",
    role: "Admin"
  });

  const filtered = useMemo(() => {
    return admins.filter((a) => 
      a.name.toLowerCase().includes(query.toLowerCase()) || 
      a.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [admins, query]);

  const simulateHash = (pwd: string) => {
    if (!pwd) return "";
    return btoa(pwd + "p@nd@_s@lt").substring(0, 40);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, avatar: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const toggleStatus = (id: string) => {
    setAdmins(prev => prev.map(a => 
      a.id === id ? { ...a, status: a.status === 'active' ? 'blocked' : 'active' } : a
    ));
  };

  const openModal = (mode: "add" | "edit" | "view", admin?: AdminItem) => {
    if (admin) {
      setSelectedAdmin(admin);
      setFormData(admin);
    } else {
      setFormData({ 
        name: "", email: "", gender: "Male", status: "active", avatar: "", 
        joinDate: new Date().toISOString().split('T')[0],
        passwordHash: "",
        role: "Admin"
      });
    }
    setModalMode(mode);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedHash = formData.passwordHash && formData.passwordHash.length < 20 
      ? simulateHash(formData.passwordHash) 
      : formData.passwordHash;

    if (modalMode === "add") {
      const newAdmin: AdminItem = {
        ...(formData as AdminItem),
        id: Date.now().toString(),
        role: "Admin", // Force Role to Admin
        passwordHash: processedHash || "no_hash_generated",
        avatar: formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=random`
      };
      setAdmins([newAdmin, ...admins]);
    } else if (modalMode === "edit" && selectedAdmin) {
      setAdmins(admins.map(a => 
        a.id === selectedAdmin.id ? { ...a, ...formData, passwordHash: processedHash } as AdminItem : a
      ));
    }
    setModalMode(null);
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
             <h1 className="text-3xl font-black text-white tracking-tight">
              Admin <span className="text-purple-400">Management</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Security & encrypted administrator credentials</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:min-w-[300px]">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search admins..." 
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-600" 
              />
            </div>
            <button onClick={() => openModal("add")} className="bg-white text-black px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple-500 hover:text-white transition-all shadow-2xl flex items-center gap-2">
              <FaPlus /> New Admin
            </button>
          </div>
        </div>

        {/* --- MAIN TABLE --- */}
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                  <th className="p-6">Administrator</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">Security Hash</th>
                  <th className="p-6">Gender</th>
                  <th className="p-6">Joined Date</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((a) => (
                  <tr key={a.id} className="group hover:bg-white/[0.03] transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={a.avatar} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/5 group-hover:ring-purple-500/30 transition-all" alt="" />
                        <div>
                          <p className="text-white font-bold tracking-tight">{a.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <FaUserShield className="opacity-50" /> {a.role}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5 w-fit">
                        <FaLock className="text-purple-500 text-[10px]" />
                        <code className="text-[10px] text-slate-400 font-mono">
                          {a.passwordHash.substring(0, 10)}...
                        </code>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                        {a.gender === "Male" ? <FaMars className="text-blue-400 text-xs" /> : <FaVenus className="text-pink-400 text-xs" />}
                        {a.gender}
                      </span>
                    </td>
                    <td className="p-6 text-sm text-slate-400 font-medium">{a.joinDate}</td>
                    <td className="p-6">
                      <button 
                        onClick={() => toggleStatus(a.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                          a.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}
                      >
                        {a.status}
                      </button>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openModal("view", a)} className="p-3 bg-slate-900 hover:bg-white/10 rounded-xl transition-all"><FaEye /></button>
                        <button onClick={() => openModal("edit", a)} className="p-3 bg-slate-900 hover:bg-purple-500 rounded-xl transition-all"><FaEdit /></button>
                        <button onClick={() => setAdmins(admins.filter(x => x.id !== a.id))} className="p-3 bg-slate-900 hover:bg-red-500 rounded-xl transition-all"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {modalMode && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-12 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setModalMode(null)} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors"><FaTimes size={20} /></button>

            {modalMode === "view" && selectedAdmin ? (
              <div className="text-center space-y-8">
                <img src={selectedAdmin.avatar} className="w-32 h-32 rounded-[2.5rem] mx-auto object-cover ring-4 ring-purple-500/20" alt="" />
                <div>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{selectedAdmin.name}</h2>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-black uppercase text-purple-400 tracking-widest">{selectedAdmin.role}</span>
                    <span className="text-slate-600">|</span>
                    <p className="text-slate-500 font-bold text-sm">{selectedAdmin.email}</p>
                  </div>
                </div>
                <div className="bg-black/30 p-5 rounded-3xl border border-white/5 text-left">
                  <p className="text-[10px] text-slate-500 font-black uppercase mb-2">Hash Signature</p>
                  <code className="text-[11px] text-purple-300/70 break-all font-mono block leading-relaxed">{selectedAdmin.passwordHash}</code>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-3xl text-left text-sm">
                  <div><p className="text-[10px] text-slate-500 font-black uppercase">Gender</p><p className="font-bold text-white">{selectedAdmin.gender}</p></div>
                  <div><p className="text-[10px] text-slate-500 font-black uppercase">Admin Since</p><p className="font-bold text-white">{selectedAdmin.joinDate}</p></div>
                </div>
                <button onClick={() => setModalMode(null)} className="w-full py-4 bg-white/5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all border border-white/10">Close Profile</button>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-5">
                <h2 className="text-2xl font-black text-white uppercase italic">{modalMode === "add" ? "New" : "Edit"} <span className="text-purple-500">Admin</span></h2>
                
                <div onClick={() => fileInputRef.current?.click()} className="w-20 h-20 rounded-[1.5rem] bg-white/5 border-2 border-dashed border-white/20 mx-auto flex items-center justify-center cursor-pointer overflow-hidden transition-all hover:border-purple-500">
                  {formData.avatar ? <img src={formData.avatar} className="w-full h-full object-cover" alt="" /> : <FaCamera className="text-slate-600" />}
                </div>
                <input type="file" ref={fileInputRef} hidden onChange={handleImageChange} />

                <div className="space-y-4">
                  <input required placeholder="Full Name" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500 transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-black uppercase ml-2">System Role</label>
                      <select className="w-full px-5 py-4 bg-slate-800 border border-white/10 rounded-2xl text-white outline-none cursor-not-allowed appearance-none" value="Admin" disabled>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-black uppercase ml-2">Gender</label>
                      <select className="w-full px-5 py-4 bg-slate-800 border border-white/10 rounded-2xl text-white outline-none" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as any})}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-black uppercase ml-2">Secret Password</label>
                    <input required={modalMode === "add"} type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500 transition-all" value={formData.passwordHash} onChange={e => setFormData({...formData, passwordHash: e.target.value})} />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setModalMode(null)} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/5 hover:bg-white/10 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-purple-600 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-all">Save Admin</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}