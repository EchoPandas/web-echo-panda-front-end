import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabaseClient";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";
import AlbumCard from "../components/AlbumCard";

interface Artist {
  id: string;
  name: string;
  image_url: string;
}

interface Album {
  id: string;
  title: string;
  cover_url: string;
  type: string;
  artists?: Artist[];
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const CategoryAlbums: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCategoryAndAlbums(id);
    }
  }, [id]);

  const fetchCategoryAndAlbums = async (categoryId: string) => {
    try {
      setLoading(true);
      const startTime = performance.now();
      console.log(`🔄 [CategoryAlbums] Fetching category ${categoryId}...`);

      // Fetch category details
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Fetch albums in this category
      const { data: albumData, error: albumError } = await supabase
        .from('album_category')
        .select(`
          albums(
            id,
            title,
            cover_url,
            type,
            album_artist(
              artists(id, name, image_url)
            )
          )
        `)
        .eq('category_id', categoryId);

      const fetchTime = performance.now() - startTime;
      console.log(`✅ [CategoryAlbums] Data fetched in ${fetchTime.toFixed(0)}ms`);

      if (albumError) throw albumError;

      const transformedAlbums: Album[] = (albumData || [])
        .map((item: any) => item.albums)
        .filter(Boolean)
        .map((album: any) => ({
          id: album.id,
          title: album.title,
          cover_url: album.cover_url,
          type: album.type,
          artists: album.album_artist?.map((aa: any) => aa.artists).filter(Boolean) || []
        }));

      console.log(`📊 [CategoryAlbums] Retrieved ${transformedAlbums.length} albums`);
      setAlbums(transformedAlbums);
    } catch (error) {
      console.error('Error fetching category albums:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <FaSpinner className="text-purple-400 text-5xl animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-20">🎵</div>
          <p className="text-slate-400 text-xl">Category not found</p>
          <button 
            onClick={() => navigate('/discover')}
            className="mt-4 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-bold transition-all"
          >
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft /> Back
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-2xl">
              🎵
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tight">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-slate-400 text-lg mt-2">{category.description}</p>
              )}
            </div>
          </div>
          
          <p className="text-slate-500">
            {albums.length} {albums.length === 1 ? 'album' : 'albums'} in this category
          </p>
        </div>

        {/* Albums Grid */}
        {albums.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-4 opacity-20">📀</div>
            <p className="text-slate-400 text-xl">No albums in this category yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryAlbums;
