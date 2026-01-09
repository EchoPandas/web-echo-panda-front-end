import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../backend/supabaseClient";
import { CacheService } from "../../backend/cacheService";
import AlbumCard from "../../components/AlbumCard";
import { FaSpinner } from "react-icons/fa";

interface Artist {
  id: string;
  name: string;
  image_url: string;
}

interface Album {
  id: string;
  title: string;
  cover_url: string;
  type?: string;
  release_date?: string;
  artists?: Artist[];
}

interface Props {
  title?: string;
  isLightMode?: boolean;
  limit?: number;
  offset?: number; // for deduping across sections
}

const SongSection: React.FC<Props> = ({
  title = "Songs",
  isLightMode = true,
  limit = 10,
  offset = 0,
}) => {
  const bgClass = "bg-black";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset]);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      
      // Check cache first
      const cacheKey = CacheService.getPaginationKey('albums', limit, offset);
      const cachedData = CacheService.get<Album[]>(cacheKey);
      
      if (cachedData) {
        setAlbums(cachedData);
        setLoading(false);
        return;
      }
      
      // Fetch from Supabase if not cached
      const { data, error } = await supabase
        .from('albums')
        .select(`
          id,
          title,
          cover_url,
          type,
          release_date,
          album_artist(
            artists(id, name, image_url)
          )
        `)
        .order('created_at', { ascending: false })
        .range(Math.max(0, offset), Math.max(0, offset) + Math.max(1, limit) - 1);

      if (error) throw error;

      const transformedAlbums: Album[] = (data || []).map((album: any) => ({
        id: album.id,
        title: album.title,
        cover_url: album.cover_url,
        type: album.type,
        release_date: album.release_date,
        artists: album.album_artist?.map((aa: any) => aa.artists).filter(Boolean) || []
      }));

      // Cache the result for 30 minutes
      CacheService.set(cacheKey, transformedAlbums, 30);
      setAlbums(transformedAlbums);
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    const cacheKey = CacheService.getPaginationKey('albums', limit, offset);
    CacheService.remove(cacheKey);
    await fetchAlbums();
  };

  const handlePlay = (id: string) => {
    setPlayingId(id);
    window.setTimeout(() => setPlayingId((current) => (current === id ? null : current)), 2000);
  };

  if (loading) {
    return (
      <section className={`${bgClass} p-4 md:p-6 lg:p-8 rounded-lg mt-8 mb-8`}>
        <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-4 ${textColor}`}>
          {title}
        </h2>
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="text-purple-400 text-3xl animate-spin" />
        </div>
      </section>
    );
  }

  if (albums.length === 0) {
    return (
      <section className={`${bgClass} p-4 md:p-6 lg:p-8 rounded-lg mt-8 mb-8`}>
        <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-4 ${textColor}`}>
          {title}
        </h2>
        <div className="text-center py-12 text-zinc-500">No albums available</div>
      </section>
    );
  }

  return (
    <section className={`${bgClass} p-4 md:p-6 lg:p-8 rounded-lg mt-8 mb-8`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold ${textColor}`}>
          {title}
        </h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className={`p-2 hover:opacity-70 disabled:opacity-40 transition-opacity ${textColor}`}
          aria-label="Refresh albums"
        >
          <svg className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
        <div className="flex gap-4 md:gap-6">
          {albums.map((album) => (
            <div key={album.id} className="w-[160px] sm:w-[180px] md:w-[200px] flex-shrink-0">
              <AlbumCard album={album} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SongSection;
