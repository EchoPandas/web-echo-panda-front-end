import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { albums } from "./albumData";
export default function AlbumHeader() {
    return (_jsxs("div", { className: "relative h-96 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105", style: {
                    backgroundImage: 'url("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                    filter: 'blur(2px) brightness(0.4)'
                } }), _jsx("div", { className: "absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black" }), _jsx("div", { className: "absolute inset-0 bg-linear-to-r from-purple-900/30 via-transparent to-pink-900/30" }), _jsx("div", { className: "relative z-10 h-full flex flex-col justify-end p-8 md:p-12", children: _jsxs("div", { className: "max-w-7xl mx-auto w-full", children: [_jsx("div", { className: "inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20", children: _jsx("span", { className: "text-sm font-medium", children: "Collection" }) }), _jsx("h1", { className: "text-6xl md:text-7xl font-black mb-4 bg-linear-to-r from-white via-white to-gray-300 bg-clip-text text-transparent tracking-tight", children: "Albums" }), _jsx("p", { className: "text-xl md:text-2xl text-gray-300 font-light", children: "Explore your music collection · " + albums.length.toString() + " albums" })] }) })] }));
}
