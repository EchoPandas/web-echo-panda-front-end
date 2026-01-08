import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabaseClient";
import SongSection from "./home/Songs";
import ArtistSection from "./home/Artists";
import AppFooter from "./home/AppFooter";
import Song from "../components/Song";

interface Category {
  id: string;
  name: string;
  description: string;
}

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const isLightMode = false;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const sampleSongs = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Trending Song ${i + 1}`,
    artists: [{ id: '1', name: `Artist ${i + 1}` }],
    album: { id: '1', title: `Album ${i + 1}` },
    duration: 180 + (i * 15),
  }));

  const circleClass = isLightMode
    ? "bg-gray-200 text-gray-900 border-gray-300"
    : "bg-gray-800 text-white border-gray-700";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const startTime = performance.now();
      console.log('🔄 [Discover] Fetching categories...');

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      const fetchTime = performance.now() - startTime;
      console.log(`✅ [Discover] Categories fetched in ${fetchTime.toFixed(0)}ms`);
      console.log(`📊 [Discover] Retrieved ${data?.length || 0} categories`);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  return (
    <>
      {/* Categories Section */}
      {!loadingCategories && categories.length > 0 && (
        <div className="px-4 py-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Music Genres</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                className="group cursor-pointer bg-gradient-to-br from-purple-900/30 to-pink-900/30 hover:from-purple-800/50 hover:to-pink-800/50 rounded-xl p-4 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 hover:scale-105"
              >
                <div className="text-4xl mb-2">🎵</div>
                <h3 className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )} 

      {/* Songs Sections */}
      <SongSection title="Featured Charts" isLightMode={isLightMode} />
      <ArtistSection title="Popular Artists" isLightMode={isLightMode} />
      
      {/* Trending Songs Section */}
      <section className="bg-[#0f0f0f] p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Trending Songs</h2>
        <div className="space-y-1">
          {sampleSongs.map((song, idx) => (
            <Song
              key={song.id}
              id={song.id}
              index={idx + 1}
              title={song.title}
              artists={song.artists}
              album={song.album}
              duration={song.duration}
              onPlay={(id) => console.log('Play song:', id)}
              onAddToPlaylist={(id) => console.log('Add to playlist:', id)}
              onAddToFavorite={(id) => console.log('Add to favorite:', id)}
            />
          ))}
        </div>
      </section>
      
      <SongSection title="New Release Songs" isLightMode={isLightMode} />
      <SongSection title="Top Albums" isLightMode={isLightMode} />

      {/* Footer */}
      <AppFooter isLightMode={isLightMode} />
    </>
  );
};

export default Discover;
