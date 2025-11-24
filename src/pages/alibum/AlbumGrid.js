import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { albums } from "./albumData";
import AlbumCard from "./AlbumCard";
export default function AlbumGrid() {
    return (_jsxs("div", { className: "px-6 md:px-12 py-12 max-w-7xl mx-auto", children: [_jsx("div", { className: "grid grid-cols-5 gap-4 md:gap-6", children: albums.map((album, index) => (_jsx(AlbumCard, { album: album, index: index }, album.id))) }), _jsx("div", { className: "h-24" })] }));
}
