import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const sampleSongs = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Song ${String(i + 1)}`,
    artist: `Artist ${String(i + 1)}`,
}));
const SongSection = ({ title, isLightMode }) => {
    const bgClass = isLightMode ? "bg-gray-50" : "bg-gray-900";
    const textColor = isLightMode ? "text-gray-900" : "text-white";
    return (_jsxs("section", { className: `${bgClass} p-4 rounded-lg`, children: [_jsx("h2", { className: `text-2xl font-bold mb-4 ${textColor}`, children: title }), _jsx("div", { className: "flex space-x-4 overflow-x-auto scrollbar-hide", children: sampleSongs.map((song) => (_jsxs("div", { className: "min-w-[200px] p-4 rounded-lg bg-gray-700 text-white flex-shrink-0 hover:scale-105 transition", children: [_jsx("div", { className: "h-32 bg-gray-500 rounded-lg mb-2" }), _jsx("h3", { className: "font-semibold", children: song.title }), _jsx("p", { className: "text-sm text-gray-300", children: song.artist })] }, song.id))) })] }));
};
export default SongSection;
