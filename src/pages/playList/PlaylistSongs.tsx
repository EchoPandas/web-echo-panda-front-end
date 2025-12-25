
import React, { useState } from 'react';
import { FaPlay, FaHeart, FaEllipsisH, FaPause, FaPlus, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

interface PlaylistSongsProps {
  playlistId?: string;
  songs?: any[];
  onDelete?: (songId: string) => void;
}

const PlaylistSongs: React.FC<PlaylistSongsProps> = ({ playlistId, songs = [], onDelete }) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<Set<number>>(new Set());

  const handlePlay = (index: number) => {
    setPlayingIndex(playingIndex === index ? null : index);
  };

  const toggleLike = (index: number) => {
    const newLiked = new Set(likedSongs);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedSongs(newLiked);
  };

  const toggleSelectSong = (index: number) => {
    const newSelected = new Set(selectedSongs);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedSongs(newSelected);
  };

  const handleDelete = (index: number) => {
    if (showDeleteConfirm === index) {
     
      if (onDelete && songs[index]) {
        onDelete(songs[index].id);
      }
      setShowDeleteConfirm(null);
    } else {
      
      setShowDeleteConfirm(index);
     
      setTimeout(() => {
        setShowDeleteConfirm(null);
      }, 3000);
    }
  };

  const deleteSelectedSongs = () => {
    if (selectedSongs.size > 0 && onDelete) {
      const songsToDelete = Array.from(selectedSongs).map(index => songs[index].id);
      songsToDelete.forEach(songId => onDelete(songId));
      setSelectedSongs(new Set());
    }
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="text-white">
      {/* Bulk Actions */}
      {selectedSongs.size > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-red-500/10 to-pink-500/10 border border-red-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">{selectedSongs.size}</span>
              </div>
              <div>
                <h4 className="font-bold text-white">{selectedSongs.size} song{selectedSongs.size !== 1 ? 's' : ''} selected</h4>
                <p className="text-sm text-gray-400">Click delete to remove from playlist</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={deleteSelectedSongs}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-full text-white font-medium transition-all hover:scale-105"
              >
                <FaTrash size={14} />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedSongs(new Set())}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {songs.length === 0 ? (
        <div className="text-center py-32">
          <div className="w-40 h-40 mx-auto bg-linear-to-br from-green-500/10 to-blue-500/10 rounded-full flex items-center justify-center mb-8 border border-white/5">
            <div className="text-6xl">🎵</div>
          </div>
          <h3 className="text-3xl font-bold mb-4 bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Your playlist is empty
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Start building your perfect playlist by adding songs with the + button
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-linear-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-8 py-3 rounded-full font-medium transition-all hover:scale-105 shadow-lg"
          >
            Discover Songs
          </button>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-white/5 bg-linear-to-b from-white/5 to-transparent">
        
          <div className="grid grid-cols-12 px-6 py-4 text-sm text-gray-400 bg-linear-to-r from-white/5 to-transparent border-b border-white/5">
            <div className="col-span-1 text-center">
              <button
                onClick={() => {
                  if (selectedSongs.size === songs.length) {
                    setSelectedSongs(new Set());
                  } else {
                    setSelectedSongs(new Set(Array.from({ length: songs.length }, (_, i) => i)));
                  }
                }}
                className="w-5 h-5 rounded border border-gray-500 flex items-center justify-center hover:border-white transition"
              >
                {selectedSongs.size === songs.length && (
                  <FaCheck size={10} className="text-green-500" />
                )}
              </button>
            </div>
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">TITLE</div>
            <div className="col-span-3">ALBUM</div>
            <div className="col-span-2">DATE ADDED</div>
            <div className="col-span-1 text-right">ACTIONS</div>
          </div>
          
        
          <div className="divide-y divide-white/5">
            {songs.map((song, index) => (
              <div 
                key={`${song.id}-${index}`} 
                className={`group grid grid-cols-12 items-center gap-4 px-6 py-4 transition-all duration-300 ${
                  selectedSongs.has(index) 
                    ? 'bg-linear-to-r from-blue-500/10 to-purple-500/10' 
                    : 'hover:bg-white/5'
                }`}
                onDoubleClick={() => handlePlay(index)}
              >
                {/* Select Checkbox */}
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => toggleSelectSong(index)}
                    className={`w-5 h-5 rounded border flex items-center justify-center transition ${
                      selectedSongs.has(index)
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-gray-500 hover:border-white'
                    }`}
                  >
                    {selectedSongs.has(index) && (
                      <FaCheck size={10} className="text-green-500" />
                    )}
                  </button>
                </div>

              
                <div className="col-span-1 relative">
                  <span className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                    {index + 1}
                  </span>
                  <button 
                    onClick={() => handlePlay(index)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {playingIndex === index ? (
                      <FaPause size={16} className="text-green-500" />
                    ) : (
                      <FaPlay size={16} className="text-white" />
                    )}
                  </button>
                </div>
                
                {/* Song Info with Image */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <img 
                      src={song.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'} 
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white truncate group-hover:text-green-400 transition-colors">
                      {song.title}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {song.artist || 'Unknown Artist'}
                    </p>
                  </div>
                </div>
                
                {/* Album */}
                <div className="col-span-3">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-default">
                    {song.album || 'Unknown Album'}
                  </span>
                </div>
                
                {/* Date Added */}
                <div className="col-span-2">
                  <span className="text-sm text-gray-500">{formatDate()}</span>
                </div>
                
                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => toggleLike(index)}
                    className={`transition-all ${likedSongs.has(index) ? 'text-red-500' : 'text-gray-500 hover:text-white'}`}
                  >
                    <FaHeart size={14} />
                  </button>
                  
                  {/* Delete Button */}
                  {showDeleteConfirm === index ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(index)}
                        className="w-7 h-7 rounded-full bg-linear-to-r from-green-500 to-green-600 flex items-center justify-center hover:scale-110 transition"
                        title="Confirm Delete"
                      >
                        <FaCheck size={10} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="w-7 h-7 rounded-full bg-linear-to-r from-red-500 to-red-600 flex items-center justify-center hover:scale-110 transition"
                        title="Cancel"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      title="Delete Song"
                    >
                      <FaTrash size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer Stats */}
          <div className="px-6 py-4 border-t border-white/5 bg-linear-to-r from-white/5 to-transparent">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-6">
                <span>{songs.length} songs</span>
                <span className="text-gray-600">•</span>
                <span>
                  {Math.floor(songs.reduce((acc, song) => {
                    const [min, sec] = (song.duration || '3:30').split(':').map(Number);
                    return acc + (min * 60) + (sec || 0);
                  }, 0) / 60)} min
                </span>
                {selectedSongs.size > 0 && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-green-500">{selectedSongs.size} selected</span>
                  </>
                )}
              </div>
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-green-500 hover:text-green-400 transition"
              >
                <FaPlus size={12} />
                <span>Add more songs</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistSongs;