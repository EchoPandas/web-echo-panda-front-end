import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const sampleArtists = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `Artist ${String(i + 1)}`,
}));
const ArtistSection = ({ title, isLightMode }) => {
    const bgClass = isLightMode ? "bg-gray-50" : "bg-gray-900";
    const textColor = isLightMode ? "text-gray-900" : "text-white";
    return (_jsxs("section", { className: `${bgClass} p-4 rounded-lg`, children: [_jsx("h2", { className: `text-2xl font-bold mb-4 ${textColor}`, children: title }), _jsx("div", { className: "flex space-x-4 overflow-x-auto scrollbar-hide", children: sampleArtists.map((artist) => (_jsxs("div", { className: "flex flex-col items-center shrink-0 w-32", children: [_jsx("div", { className: "h-32 w-32 rounded-full bg-gray-500 mb-2 hover:scale-105 transition" }), _jsx("p", { className: "text-center", children: artist.name })] }, artist.id))) })] }));
};
export default ArtistSection;
