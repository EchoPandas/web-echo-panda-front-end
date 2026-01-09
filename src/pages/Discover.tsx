import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabaseClient";
import { useDataCache } from "../contexts/DataCacheContext";
import SongSection from "./home/Songs";
import ArtistSection from "./home/Artists";
import AppFooter from "./home/AppFooter";

interface Category {
  id: string;
  name: string;
  description: string;
}

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const { getCachedData } = useDataCache();
  const isLightMode = false;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const circleClass = isLightMode
    ? "bg-gray-200 text-gray-900 border-gray-300"
    : "bg-gray-800 text-white border-gray-700";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const data = await getCachedData('categories', async () => {
        const startTime = performance.now();
        console.log('🔄 [Discover] Fetching categories...');

        const { data: categoriesData, error } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });

        const fetchTime = performance.now() - startTime;
        console.log(`✅ [Discover] Categories fetched in ${fetchTime.toFixed(0)}ms`);
        console.log(`📊 [Discover] Retrieved ${categoriesData?.length || 0} categories`);

        if (error) throw error;
        return categoriesData || [];
      });

      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Categories Section */}
      {!loadingCategories && categories.length > 0 && (
        <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-8 text-white tracking-tight">Music <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Genres</span></h2>
          <div className="flex overflow-x-auto gap-5 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((category, idx) => {
              const colors = [
                'from-purple-600 to-pink-600',
                'from-blue-600 to-cyan-600',
                'from-rose-600 to-orange-600',
                'from-emerald-600 to-teal-600',
                'from-indigo-600 to-purple-600',
                'from-yellow-600 to-orange-600',
              ];
              const colorClass = colors[idx % colors.length];
              return (
                <button
                  key={category.id}
                  onClick={() => navigate(`/category/${category.id}`)}
                  className="group focus:outline-none transition-all duration-300 flex-shrink-0 w-48"
                  aria-label={`View ${category.name} albums`}
                >
                  <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-xl hover:shadow-purple-500/10 group-hover:scale-50">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-3xl mb-3 shadow-lg`}>
                      🎵
                    </div>
                    <h3 className="text-white font-bold text-sm sm:text-base group-hover:text-purple-300 transition-colors line-clamp-2">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )} 

      {/* Songs Sections */}
      <SongSection title="Featured Charts" isLightMode={isLightMode} limit={1} offset={0} />
      <ArtistSection title="Popular Artists" isLightMode={isLightMode} />
      <SongSection title="New Release Songs" isLightMode={isLightMode} limit={1} offset={1} />
      <SongSection title="Top Albums" isLightMode={isLightMode} limit={1} offset={2} />

      {/* Footer */}
      <AppFooter isLightMode={isLightMode} />
    </div>
  );
};

export default Discover;
