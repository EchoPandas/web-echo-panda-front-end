
import React from 'react';
import { Music, Users, Globe, Clock } from 'lucide-react';

interface PlaylistHeroProps {
  playlistId?: string;
  title?: string;
  isLightMode?: boolean;
  songCount?: number;
  duration?: string;
}

export const PlaylistHero: React.FC<PlaylistHeroProps> = ({ 
  title = "My Playlist", 
  isLightMode = false,
  songCount = 0,
  duration = "0:00"
}) => {
  const gradientClass = isLightMode 
    ? 'bg-gradient-to-b from-blue-50 to-white' 
    : 'bg-gradient-to-b from-blue-950/40 via-blue-900/20 to-black';

  return (
    <header className={`px-8 pt-24 pb-10 ${gradientClass}`}>
      <div className="flex items-end gap-8">
        {/* Album Art */}
        <div className="relative group">
          <div className="w-64 h-64 bg-linear-to-br from-green-500/20 to-blue-600/20 shadow-2xl rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
            <Music className="w-24 h-24 text-white/30" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent rounded-2xl" />
          <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-black">
            <Users className="w-5 h-5 text-black" />
          </div>
        </div>
        
        {/* Playlist Info */}
        <div className="pb-6 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase bg-white/10 px-3 py-1.5 rounded-full text-blue-300 flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              Public Playlist
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-400">Updated today</span>
          </div>
          
          <h1 className="text-8xl font-black text-transprarent tracking-tighter mb-6 bg-linear-to-r from-white via-green-100 to-blue-200 bg-clip-text text-transparent">
            {title}
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-xs font-bold">Y</span>
              </div>
              <span className="text-white font-medium">Your Playlist</span>
            </div>
            
            <div className="flex items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-linear-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center">
                  <span className="text-xs">♪</span>
                </div>
                <span className="text-sm">{songCount} songs</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{duration}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">{songCount > 0 ? 'Ready to play' : 'Empty playlist'}</span>
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Followers</span>
              <span className="text-white font-bold">1</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Likes</span>
              <span className="text-white font-bold">0</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Plays</span>
              <span className="text-white font-bold">{songCount * 2}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};