import React, { useMemo, useState } from "react";
import { 
  FaPlus, FaSearch, FaMusic, 
  FaChartBar, FaTrash, FaEdit, FaTimes, FaLayerGroup 
} from "react-icons/fa";

interface Category {
  id: string;
  name: string;
  slug: string;
  songCount: number;
  color: string;
  description: string;
}

const INITIAL_CATEGORIES: Category[] = [
  { id: "1", name: "Pop", slug: "pop", songCount: 1240, color: "from-pink-500 to-rose-500", description: "Mainstream popular music with catchy hooks." },
  { id: "2", name: "EDM", slug: "edm", songCount: 850, color: "from-purple-500 to-indigo-600", description: "Electronic Dance Music for clubs and festivals." },
  { id: "3", name: "Lo-fi", slug: "lo-fi", songCount: 420, color: "from-cyan-500 to-blue-500", description: "Chill beats for studying and relaxation." },
  { id: "4", name: "Rock", slug: "rock", songCount: 670, color: "from-orange-500 to-red-600", description: "Classic and modern rock tracks." },
];

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  // form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "from-purple-500 to-pink-500",
  });

  // Filtered categories
  const filtered = useMemo(() => {
    return categories.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleDelete = (id: string) => {
    if (confirm("Delete this category? This might affect associated songs.")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingCat(null);
    setFormData({
      name: "",
      description: "",
      color: "from-purple-500 to-pink-500",
    });
    setShowModal(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCat(cat);
    setFormData({
      name: cat.name,
      description: cat.description,
      color: cat.color,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingCat) {
      // update
      setCategories(categories.map(c =>
        c.id === editingCat.id
          ? {
              ...c,
              name: formData.name,
              description: formData.description,
              color: formData.color,
              slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
            }
          : c
      ));
    } else {
      // create
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
        songCount: 0,
        color: formData.color,
      };

      setCategories([newCategory, ...categories]);
    }

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black">
              Genre <span className="text-purple-400">Categories</span>
            </h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <FaLayerGroup className="text-purple-500" />
              Total Genres: {categories.length}
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
          >
            <FaPlus /> Create Category
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative mb-8 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Filter categories..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(cat => (
            <div key={cat.id} className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition">
              <div className="flex justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                  <FaMusic />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openEditModal(cat)}><FaEdit /></button>
                  <button onClick={() => handleDelete(cat.id)}><FaTrash /></button>
                </div>
              </div>

              <h3 className="text-xl font-bold">{cat.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{cat.description}</p>

              <div className="flex justify-between text-sm text-slate-300 border-t border-white/5 pt-4">
                <span className="flex items-center gap-2">
                  <FaChartBar className="text-purple-400" />
                  {cat.songCount} Tracks
                </span>
                <span className="text-xs text-slate-500">/{cat.slug}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 w-full max-w-md rounded-3xl p-8">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingCat ? "Edit Genre" : "New Genre"}
              </h2>
              <button onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Genre name"
                className="w-full bg-slate-800 px-4 py-3 rounded-xl outline-none"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full bg-slate-800 px-4 py-3 rounded-xl h-24 outline-none"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold"
              >
                {editingCat ? "Update Category" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
