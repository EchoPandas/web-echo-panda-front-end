import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, FaPause, FaStepBackward, FaStepForward, 
  FaRedo, FaRandom, FaVolumeUp, FaVolumeDown, FaVolumeMute
} from 'react-icons/fa';

interface PlayerProps {
  song?: {
    title: string;
    artist: string;
    coverUrl: string;
  };
}

const Player: React.FC<PlayerProps> = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [currentTime, setCurrentTime] = useState(316); 
  const [duration] = useState(341);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleProgressMouseMove(e);
    };

    const handleMouseUp = () => {
      handleProgressMouseUp();
    };

    if (isDraggingProgress) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingProgress]);

  const mockSong = song || {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000'
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleShuffle = () => setIsShuffled(!isShuffled);
  const handleRepeat = () => setIsRepeated(!isRepeated);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newTime = percentage * duration;
      setCurrentTime(newTime);
      // In a real app, you would set the audio seek here
    }
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingProgress(true);
    handleProgressClick(e);
  };

  const handleProgressMouseMove = (e: MouseEvent) => {
    if (isDraggingProgress && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newTime = percentage * duration;
      setCurrentTime(newTime);
    }
  };

  const handleProgressMouseUp = () => {
    setIsDraggingProgress(false);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newVolume = Math.max(0, Math.min(1, x / rect.width));
      setVolume(newVolume);
      setPreviousVolume(newVolume);
      setIsMuted(false);
    }
  };

  const handleVolumeIconClick = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const progressPercentage = (currentTime / duration) * 100;

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <FaVolumeMute size={16} />;
    if (volume < 0.5) return <FaVolumeDown size={16} />;
    return <FaVolumeUp size={16} />;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-black/95 backdrop-blur-md border-t border-white/10 h-20 md:h-24 px-3 md:px-6 z-50 flex items-center pointer-events-none">
      
      {/* LEFT: Song Info (flex-1) */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded overflow-hidden flex-shrink-0 shadow-md">
          <img src={mockSong.coverUrl} alt={mockSong.title} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 pointer-events-auto">
          <h4 className="text-white text-[13px] md:text-sm font-semibold truncate hover:underline cursor-pointer">
            {mockSong.title}
          </h4>
          <p className="text-[11px] md:text-xs text-gray-400 truncate hover:text-white cursor-pointer">
            {mockSong.artist}
          </p>
        </div>
      </div>

      {/* CENTER: Player Controls (flex-[2]) */}
      <div className="flex-[2] flex flex-col items-center justify-center max-w-[400px] md:max-w-[600px] px-2 md:px-4">
        {/* Buttons */}
        <div className="flex items-center gap-4 md:gap-6 text-gray-400 mb-1.5">
          <FaRandom 
            size={14} 
            className={`hidden sm:block cursor-pointer transition-colors pointer-events-auto ${isShuffled ? 'text-blue-500' : 'hover:text-white'}`}
            onClick={handleShuffle}
          />
          <FaStepBackward size={18} className="hover:text-white cursor-pointer transition-colors pointer-events-auto" />
          <button 
            onClick={handlePlayPause}
            className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          >
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
          </button>
          <FaStepForward size={18} className="hover:text-white cursor-pointer transition-colors pointer-events-auto" />
          <FaRedo 
            size={14} 
            className={`hidden sm:block cursor-pointer transition-colors pointer-events-auto ${isRepeated ? 'text-blue-500' : 'hover:text-white'}`}
            onClick={handleRepeat}
          />
        </div>

        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 md:gap-3">
          <span className="text-[10px] text-gray-500 w-8 text-right">{formatTime(currentTime)}</span>
          <div 
            ref={progressRef}
            className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group relative pointer-events-auto"
            onMouseDown={handleProgressMouseDown}
          >
            <div 
              className="h-full bg-white group-hover:bg-blue-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progressPercentage}% - 5px)` }}
            />
          </div>
          <span className="text-[10px] text-gray-500 w-8">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT: Extra Utilities (flex-1) */}
      <div className="flex-1 flex items-center justify-end gap-3 md:gap-4 text-gray-400">
        
        <div className="flex items-center gap-2 group">
          <div className="cursor-pointer hover:text-white pointer-events-auto" onClick={handleVolumeIconClick}>
            {getVolumeIcon()}
          </div>
          <div 
            ref={volumeRef}
            className="hidden sm:block w-16 md:w-24 h-1 bg-white/20 rounded-full cursor-pointer relative pointer-events-auto"
            onClick={handleVolumeClick}
          >
            <div 
              className="h-full bg-white group-hover:bg-blue-500 rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Player;