import { supabase } from "./supabaseClient";

// Get current user UID from localStorage
const getCurrentUserUID = (): string | null => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    const userData = JSON.parse(user);
    return userData.uid || null;
  } catch {
    return null;
  }
};

// Track a song play/listen
export const trackSongPlay = async (songId: string): Promise<boolean> => {
  const uid = getCurrentUserUID();
  if (!uid) {
    console.error("User not logged in");
    return false;
  }

  try {
    const { error } = await supabase
      .from("user_listens")
      .insert({
        user_id: uid,
        song_id: songId,
      });

    if (error) {
      console.error("Error tracking play:", error);
      return false;
    }

    console.log(`✅ Tracked play for song ${songId}`);
    return true;
  } catch (error) {
    console.error("Error tracking play:", error);
    return false;
  }
};

// Get play count for a song (all users)
export const getSongPlayCount = async (songId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from("user_listens")
      .select("*", { count: "exact", head: true })
      .eq("song_id", songId);

    if (error) {
      console.error("Error getting play count:", error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error("Error getting play count:", error);
    return 0;
  }
};

// Get most played songs (global)
export const getMostPlayedSongs = async (limit: number = 25): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from("user_listens")
      .select(`
        song_id,
        songs(
          id,
          title,
          duration,
          songCover_url,
          album_id,
          song_artist(
            artists(id, name, image_url)
          ),
          albums(id, title, cover_url)
        )
      `)
      .order("listened_at", { ascending: false });

    if (error) {
      console.error("Error fetching most played:", error);
      return [];
    }

    // Count plays per song
    const playCountMap: { [key: string]: { count: number; song: any } } = {};
    
    (data || []).forEach((item: any) => {
      if (item.songs) {
        const songId = item.song_id;
        if (!playCountMap[songId]) {
          playCountMap[songId] = { count: 0, song: item.songs };
        }
        playCountMap[songId].count++;
      }
    });

    // Convert to array and sort by play count
    const songsWithPlayCount = Object.values(playCountMap)
      .map((item) => ({
        ...item.song,
        play_count: item.count,
        artists: item.song.song_artist?.map((sa: any) => sa.artists).filter(Boolean) || [],
        album: item.song.albums || null,
      }))
      .sort((a, b) => b.play_count - a.play_count)
      .slice(0, limit);

    return songsWithPlayCount;
  } catch (error) {
    console.error("Error fetching most played:", error);
    return [];
  }
};

// Get user's recently played songs
export const getRecentlyPlayed = async (limit: number = 25): Promise<any[]> => {
  const uid = getCurrentUserUID();
  if (!uid) return [];

  try {
    const { data, error } = await supabase
      .from("user_listens")
      .select(`
        song_id,
        listened_at,
        songs(
          id,
          title,
          duration,
          songCover_url,
          album_id,
          song_artist(
            artists(id, name, image_url)
          ),
          albums(id, title, cover_url)
        )
      `)
      .eq("user_id", uid)
      .order("listened_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching recently played:", error);
      return [];
    }

    return (data || []).map((item: any) => ({
      ...item.songs,
      listened_at: item.listened_at,
      artists: item.songs.song_artist?.map((sa: any) => sa.artists).filter(Boolean) || [],
      album: item.songs.albums || null,
    }));
  } catch (error) {
    console.error("Error fetching recently played:", error);
    return [];
  }
};

// Get user's listening stats
export const getUserListeningStats = async (): Promise<{
  totalPlays: number;
  uniqueSongs: number;
  topArtist: string | null;
}> => {
  const uid = getCurrentUserUID();
  if (!uid) return { totalPlays: 0, uniqueSongs: 0, topArtist: null };

  try {
    const { data, error } = await supabase
      .from("user_listens")
      .select(`
        song_id,
        songs(
          song_artist(
            artists(name)
          )
        )
      `)
      .eq("user_id", uid);

    if (error) {
      console.error("Error fetching stats:", error);
      return { totalPlays: 0, uniqueSongs: 0, topArtist: null };
    }

    const totalPlays = data?.length || 0;
    const uniqueSongs = new Set(data?.map((item) => item.song_id)).size;

    // Count artist plays
    const artistCounts: { [key: string]: number } = {};
    data?.forEach((item: any) => {
      const artists = item.songs?.song_artist || [];
      artists.forEach((sa: any) => {
        const artistName = sa.artists?.name;
        if (artistName) {
          artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
        }
      });
    });

    const topArtist = Object.entries(artistCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    return { totalPlays, uniqueSongs, topArtist };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { totalPlays: 0, uniqueSongs: 0, topArtist: null };
  }
};
