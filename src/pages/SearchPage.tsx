import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchContent, Song, Artist } from "../data/searchData";
import SongSection from "./home/Songs";
import ArtistSection from "./home/Artists";

interface SearchPageProps {
  isLightMode: boolean;
}

const SearchPage: React.FC<SearchPageProps> = ({ isLightMode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [recommendedArtists, setRecommendedArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  // Search Effect
  useEffect(() => {
    if (!query.trim()) {
      setSongs([]);
      setArtists([]);
      setRecommendedSongs([]);
      setRecommendedArtists([]);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const results = searchContent(query);
      setSongs(results.songs);
      setArtists(results.artists);

      // Recommended songs 
      const recSongs = results.songs.length
        ? searchContent("").songs.filter(
            (s) => !results.songs.find((rs) => rs.id === s.id)
          )
        : [];
      setRecommendedSongs(recSongs.slice(0, 5));

      // Recommended artists
      const recArtists = results.artists.length
        ? searchContent("").artists.filter(
            (a) => !results.artists.find((ra) => ra.id === a.id)
          )
        : [];
      setRecommendedArtists(recArtists.slice(0, 5));

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className={`bg-black text-white`}>
      <div className={`bg-gray-900 p-6 md:p-8`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Search Results</h1>
        {query.trim() ? (
          <p className={`text-lg ${isLightMode ? "text-gray-500" : "text-gray-400"}`}>
            Results for: <span className="font-semibold text-blue-500">"{query}"</span>
          </p>
        ) : (
          <p className={`text-lg ${isLightMode ? "text-gray-500" : "text-gray-400"}`}>
            Enter a search query to find songs and artists
          </p>
        )}
      </div>

      {!query.trim() ? (
        <div className="text-center py-20 px-6">
          <p className={`text-xl ${isLightMode ? "text-gray-400" : "text-gray-500"}`}>
            No search query. Try searching for songs or artists!
          </p>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={isLightMode ? "text-gray-500" : "text-gray-400"}>Searching...</p>
          </div>
        </div>
      ) : songs.length === 0 && artists.length === 0 ? (
        <div className="text-center py-20 px-6">
          <p className={`text-xl ${isLightMode ? "text-gray-400" : "text-gray-500"}`}>
            No results found for "{query}"
          </p>
        </div>
      ) : (
        <>
          {songs.length > 0 && (
            <SongSection songs={songs} title={`Songs (${songs.length})`} isLightMode={false} />
          )}

          {artists.length > 0 && (
            <ArtistSection artists={artists} title={`Artists (${artists.length})`} isLightMode={false} />
          )}

          {recommendedSongs.length > 0 && (
            <SongSection songs={recommendedSongs} title="You Might Also Like" isLightMode={false} />
          )}

          {recommendedArtists.length > 0 && (
            <ArtistSection artists={recommendedArtists} title="Recommended Artists" isLightMode={false} />
          )}
        </>
      )}
    </div>
  );

};

export default SearchPage;
