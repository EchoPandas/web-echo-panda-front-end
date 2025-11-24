export interface AlbumItem {
  id: number;
  title: string;
  artist: string;
  year: string;
  color: string;
}

export const albums: AlbumItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Album ${(i + 1).toString()}`,
  artist: `Artist ${(i + 1).toString()}`,
  year: `202${(i % 10).toString()}`,
  color: "",
}));
