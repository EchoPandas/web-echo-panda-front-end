import { songs as allSongs, Song } from "../data/searchData";

const interestToSongIds: Record<string, number[]> = {
  Pop: [2,5,7,11,12,13,16,18],
  Rock: [10,15,24,25,17],
  "Hip-Hop": [1,6,19],
  Indie: [23,24,25],
  Electronic: [5,18],
  Jazz: [],
  Classical: [],
  "K-Pop": [],
  Latin: [19,11],
  "R&B": [1,6,9],
  Country: [26,27],
  Alternative: [17,15,23],
};

export async function getRecommendationsForInterests(interests: string[], max = 8): Promise<Song[]> {
  // naive mapping-based recommender for MVP
  const ids = new Set<number>();
  interests.forEach((i) => {
    const list = interestToSongIds[i] || [];
    list.forEach((id) => ids.add(id));
  });

  let results = allSongs.filter((s) => ids.has(s.id));
  if (results.length === 0) {
    // fallback: return first `max` songs
    results = allSongs.slice(0, max);
  }

  return results.slice(0, max);
}
