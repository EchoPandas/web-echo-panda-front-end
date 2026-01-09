import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../backend/supabaseClient";
import { CacheService } from "../../backend/cacheService";
import { FaSpinner } from "react-icons/fa";

interface Artist {
  id: string;
  name: string;
  image_url?: string;
}

interface Props {
  title?: string;
  isLightMode?: boolean;
  limit?: number; // how many artists to show
  layout?: "carousel" | "grid"; // display style
}

const ArtistSection: React.FC<Props> = ({ title = "Artists", isLightMode = true, limit = 10, layout = "carousel" }) => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const bgClass = "bg-transparent";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

  useEffect(() => {
    fetchArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      
      // Check cache first
      const cacheKey = `artists_limit${limit}`;
      const cachedData = CacheService.get<Artist[]>(cacheKey);
      
      if (cachedData) {
        setArtists(cachedData);
        setLoading(false);
        return;
      }
      
      // Fetch from Supabase if not cached
      const { data, error } = await supabase
        .from('artists')
        .select('id, name, image_url')
        .eq('status', true)
        .order('created_at', { ascending: false })
        .limit(Math.max(1, limit));

      if (error) throw error;
      
      // Cache the result for 30 minutes
      CacheService.set(cacheKey, data || [], 30);
      setArtists(data || []);
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    const cacheKey = `artists_limit${limit}`;
    CacheService.remove(cacheKey);
    await fetchArtists();
  };

  return (
    <section className={`${bgClass} p-4 rounded-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-bold ${textColor}`}>{title}</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className={`p-2 hover:opacity-70 disabled:opacity-40 transition-opacity ${textColor}`}
          aria-label="Refresh artists"
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {layout === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {artists.map((artist) => (
            <button
              key={artist.id}
              onClick={() => navigate(`/artist/${artist.id}`)}
              className="group focus:outline-none"
              aria-label={`Open artist ${artist.name}`}
            >
              <div className="mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-600/60 ring-1 ring-white/10 overflow-hidden transition-transform duration-200 group-hover:scale-105">
                {artist.image_url ? (
                  <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-600/60" />
                )}
              </div>
              <p className={`mt-3 text-center text-sm sm:text-base font-medium truncate ${textColor}`}>{artist.name}</p>
            </button>
          ))}
        </div>
      ) : (
        <div
          className="flex gap-6 overflow-x-auto scroll-hide pb-3 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {artists.map((artist) => (
            <button
              key={artist.id}
              onClick={() => navigate(`/artist/${artist.id}`)}
              className="flex flex-col items-center shrink-0 w-28 sm:w-32 snap-start cursor-pointer group"
              aria-label={`Open artist ${artist.name}`}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-600/60 ring-1 ring-white/10 overflow-hidden transition-transform duration-200 group-hover:scale-105">
                {artist.image_url ? (
                  <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-600/60" />
                )}
              </div>
              <p className={`mt-2 text-center text-sm font-medium truncate ${textColor}`}>{artist.name}</p>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ArtistSection;
