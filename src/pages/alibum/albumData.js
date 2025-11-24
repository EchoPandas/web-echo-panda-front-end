export const albums = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Album ${(i + 1).toString()}`,
    artist: `Artist ${(i + 1).toString()}`,
    year: `202${(i % 10).toString()}`,
    color: "",
}));
