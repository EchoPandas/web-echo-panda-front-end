interface Artist {
  id: string;
  name: string;
  image_url: string;
  bio: string;
  gender: string;
  role: string;
}

interface Props {
  artist: Artist;
}

export default function HeroBanner({ artist }: Props) {
  return (
    <div className="relative w-full h-[350px] rounded-xl overflow-hidden border-2 border-purple-500/50">
     
      <img
        src={artist.image_url || "https://images.unsplash.com/photo-1511192336575-5a79af67a629"}
        alt={artist.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
     
      <div className="absolute inset-0 bg-linear-to-r from-purple-600/40 via-pink-500/40 to-blue-600/40 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-black/20"></div>

   
      <div className="absolute bottom-6 left-6">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse">
          {artist.name}
        </h1>
        <p className="text-white/80 text-lg mt-2 font-semibold">{artist.role}</p>
  
        <div className="h-1 w-32 bg-linear-to-r from-purple-400 to-pink-400 rounded-full mt-2 shadow-[0_0_10px_#a855f7]"></div>
      </div>

   
      <div className="absolute top-4 right-4 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_15px_#a855f7] animate-bounce"></div>
      <div className="absolute top-8 right-8 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] animate-bounce delay-75"></div>
    </div>
  );
}