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

// Check if a song is in user's favorites
export const isSongFavorite = async (songId: string): Promise<boolean> => {
  const uid = getCurrentUserUID();
  if (!uid) return false;

  try {
    const { data, error } = await supabase
      .from("user_favorite_songs")
      .select("*")
      .eq("user_id", uid)
      .eq("song_id", songId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking favorite:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};

// Add song to favorites
export const addToFavorites = async (songId: string): Promise<boolean> => {
  const uid = getCurrentUserUID();
  if (!uid) {
    console.error("User not logged in");
    return false;
  }

  try {
    const { error } = await supabase
      .from("user_favorite_songs")
      .insert({
        user_id: uid,
        song_id: songId,
      });

    if (error) {
      console.error("Error adding to favorites:", error);
      return false;
    }

    console.log(`✅ Song ${songId} added to favorites`);
    return true;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return false;
  }
};

// Remove song from favorites
export const removeFromFavorites = async (songId: string): Promise<boolean> => {
  const uid = getCurrentUserUID();
  if (!uid) {
    console.error("User not logged in");
    return false;
  }

  try {
    const { error } = await supabase
      .from("user_favorite_songs")
      .delete()
      .eq("user_id", uid)
      .eq("song_id", songId);

    if (error) {
      console.error("Error removing from favorites:", error);
      return false;
    }

    console.log(`✅ Song ${songId} removed from favorites`);
    return true;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return false;
  }
};

// Get all favorite songs for current user
export const getUserFavorites = async (): Promise<string[]> => {
  const uid = getCurrentUserUID();
  if (!uid) return [];

  try {
    const { data, error } = await supabase
      .from("user_favorite_songs")
      .select("song_id")
      .eq("user_id", uid);

    if (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }

    return (data || []).map((item) => item.song_id);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

// Toggle favorite status
export const toggleFavorite = async (songId: string): Promise<boolean> => {
  const isFav = await isSongFavorite(songId);
  
  if (isFav) {
    return await removeFromFavorites(songId);
  } else {
    return await addToFavorites(songId);
  }
};
