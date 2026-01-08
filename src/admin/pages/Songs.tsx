import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  FaSearch, FaEye, FaEdit, FaTrash, FaTimes, 
  FaMusic, FaClock, FaPlus, FaMicrophone, 
  FaPlayCircle, FaCalendarAlt, FaCompactDisc, FaSpinner
} from "react-icons/fa";
import { supabase } from "../../backend/supabaseClient";

interface Artist {
  id: string;
  name: string;
  image_url: string;
}

interface Album {
  id: string;
  title: string;
  cover_url: string;
}

interface Song {
  id: string;
  title: string;
  duration: number; // in seconds
  album_id: string | null;
  audio_url: string | null;
  created_at: string;
  updated_at: string;
  artists?: Artist[];
  album?: Album;
}

export default function SongsManager() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  const [formData, setFormData] = useState<Partial<Song>>({
    title: "",
    duration: 0,
    album_id: null,
    audio_url: ""
  });

  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const hasFetched = useRef(false);
  // Fetch data from Supabase
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchSongs();
    fetchArtists();
    fetchAlbums();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const startTime = performance.now();
      console.log('🔄 Fetching songs...');

      const { data: songsData, error } = await supabase
        .from('songs')
        .select(`
          id,
          title,
          duration,
          album_id,
          audio_url,
          created_at,
          updated_at,
          song_artist(
            artists(id, name, image_url)
          ),
          albums(id, title, cover_url)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      const fetchTime = performance.now() - startTime;
      console.log(`✅ Songs fetched in ${fetchTime.toFixed(0)}ms`);

      if (error) {
        console.error('❌ Fetch error:', error);
        throw error;
      }

      // Transform the data to match our interface
      const transformedSongs = (songsData || []).map((song: any) => ({
        id: song.id,
        title: song.title,
        duration: song.duration,
        album_id: song.album_id,
        audio_url: song.audio_url,
        created_at: song.created_at,
        updated_at: song.updated_at,
        artists: song.song_artist?.map((sa: any) => sa.artists).filter(Boolean) || [],
        album: song.albums || null
      }));

      console.log(`📊 Transformed ${transformedSongs.length} songs`);
      setSongs(transformedSongs);
    } catch (error) {
      console.error('Error fetching songs:', error);
      alert('Failed to fetch songs');
    } finally {
      setLoading(false);
    }
  };

  const fetchArtists = async () => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('id, name, image_url')
        .eq('status', true)
        .order('name');

      if (error) throw error;
      setAllArtists(data || []);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const { data, error } = await supabase
        .from('albums')
        .select('id, title, cover_url')
        .order('title');

      if (error) throw error;
      setAllAlbums(data || []);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Parse duration from mm:ss to seconds
  const parseDuration = (duration: string): number => {
    const [mins, secs] = duration.split(':').map(Number);
    return (mins || 0) * 60 + (secs || 0);
  };


  const filtered = useMemo(() => {
    return songs.filter((s) => {
      const artistNames = s.artists?.map(a => a.name).join(' ') || '';
      const matchSearch = s.title.toLowerCase().includes(query.toLowerCase()) || 
                         artistNames.toLowerCase().includes(query.toLowerCase());
      return matchSearch;
    });
  }, [songs, query]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this track?")) return;
    
    try {
      const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSongs(songs.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('Failed to delete song');
    }
  };

  const handleOpenEdit = (song: Song) => {
    setEditingSong(song);
    setFormData({
      title: song.title,
      duration: song.duration,
      album_id: song.album_id,
      audio_url: song.audio_url
    });
    setSelectedArtistIds(song.artists?.map(a => a.id) || []);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title) {
      alert('Please enter a song title');
      return;
    }

    try {
      if (editingSong) {
        // Update song
        const { error: updateError } = await supabase
          .from('songs')
          .update({
            title: formData.title,
            duration: formData.duration,
            album_id: formData.album_id || null,
            audio_url: formData.audio_url || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingSong.id);

        if (updateError) throw updateError;

        // Delete existing artist relationships
        await supabase
          .from('song_artist')
          .delete()
          .eq('song_id', editingSong.id);

        // Insert new artist relationships
        if (selectedArtistIds.length > 0) {
          const artistRelations = selectedArtistIds.map(artistId => ({
            song_id: editingSong.id,
            artist_id: artistId,
            primary_artist: true
          }));

          await supabase
            .from('song_artist')
            .insert(artistRelations);
        }

        await fetchSongs();
      } else {
        // Insert new song
        const { data: newSong, error: insertError } = await supabase
          .from('songs')
          .insert([{
            title: formData.title,
            duration: formData.duration || 0,
            album_id: formData.album_id || null,
            audio_url: formData.audio_url || null
          }])
          .select()
          .single();

        if (insertError) throw insertError;

        // Insert artist relationships
        if (selectedArtistIds.length > 0) {
          const artistRelations = selectedArtistIds.map(artistId => ({
            song_id: newSong.id,
            artist_id: artistId,
            primary_artist: true
          }));

          await supabase
            .from('song_artist')
            .insert(artistRelations);
        }

        await fetchSongs();
      }

      setShowModal(false);
      setEditingSong(null);
    } catch (error) {
      console.error('Error saving song:', error);
      alert('Failed to save song');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
  
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">Songs <span className="text-purple-400">Management</span></h2>
          <button 
            onClick={() => { 
              setEditingSong(null); 
              setFormData({ title: "", duration: 0, album_id: null, audio_url: "" }); 
              setSelectedArtistIds([]);
              setShowModal(true); 
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <FaPlus /> Add New Song
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[300px] relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="Search by title or artist..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <FaSpinner className="text-purple-400 text-4xl animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-bold">
                    <th className="px-6 py-5">Song & Artist</th>
                    <th className="px-6 py-5">Album</th>
                    <th className="px-6 py-5">Duration</th>
                    <th className="px-6 py-5">Created</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                {filtered.map(song => (
                  <tr key={song.id} className="group hover:bg-white/5 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {song.title[0]}
                        </div>
                        <div>
                          <p className="text-white font-bold leading-tight">{song.title}</p>
                          <div className="text-slate-500 text-sm flex items-center gap-1 mt-0.5">
                            <FaMicrophone size={10}/>
                            {song.artists && song.artists.length > 0 
                              ? song.artists.map(a => a.name).join(', ')
                              : 'No artists'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">
                      {song.album ? (
                        <div className="flex items-center gap-2">
                          <FaCompactDisc className="text-slate-500"/> 
                          {song.album.title}
                        </div>
                      ) : (
                        <span className="text-slate-600 text-sm">No album</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-mono flex items-center gap-2">
                      <FaClock className="text-slate-500" size={12}/>
                      {formatDuration(song.duration)}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                       <div className="flex items-center gap-2">
                         <FaCalendarAlt size={12}/> 
                         {new Date(song.created_at).toLocaleDateString()}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => handleOpenEdit(song)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400 hover:text-blue-300"><FaEdit/></button>
                        <button onClick={() => handleDelete(song.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400 hover:text-red-300"><FaTrash/></button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 opacity-20">🎵</div>
                  <p className="text-slate-400 text-lg">No songs found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* DYNAMIC MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">{editingSong ? 'Update Track' : 'Add New Track'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white"><FaTimes size={24}/></button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Song Title</label>
                <input 
                  required
                  value={formData.title || ''} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 text-white" 
                  placeholder="e.g. Midnight Dreams" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                    <FaClock /> Duration (MM:SS)
                  </label>
                  <input 
                    value={formatDuration(formData.duration || 0)} 
                    onChange={(e) => setFormData({...formData, duration: parseDuration(e.target.value)})} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 text-white" 
                    placeholder="3:45" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                    <FaCompactDisc /> Album
                  </label>
                  <select 
                    value={formData.album_id || ''} 
                    onChange={(e) => setFormData({...formData, album_id: e.target.value || null})} 
                    className="w-full bg-slate-800 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 text-white"
                  >
                    <option value="">No Album</option>
                    {allAlbums.map(album => (
                      <option key={album.id} value={album.id}>{album.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Audio URL (Optional)</label>
                <input 
                  value={formData.audio_url || ''} 
                  onChange={(e) => setFormData({...formData, audio_url: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 text-white" 
                  placeholder="https://example.com/song.mp3" 
                />
              </div>

              {/* Artists Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                  <FaMicrophone /> Select Artists
                </label>
                <div className="bg-slate-800 border border-white/10 rounded-xl p-3 max-h-40 overflow-y-auto">
                  {allArtists.length === 0 ? (
                    <p className="text-slate-500 text-sm">No artists available</p>
                  ) : (
                    <div className="space-y-2">
                      {allArtists.map(artist => (
                        <label key={artist.id} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg">
                          <input 
                            type="checkbox"
                            checked={selectedArtistIds.includes(artist.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedArtistIds([...selectedArtistIds, artist.id]);
                              } else {
                                setSelectedArtistIds(selectedArtistIds.filter(id => id !== artist.id));
                              }
                            }}
                            className="w-4 h-4 accent-purple-500"
                          />
                          <img 
                            src={artist.image_url || `https://ui-avatars.com/api/?name=${artist.name}&background=random`}
                            className="w-6 h-6 rounded-full object-cover"
                            alt=""
                          />
                          <span className="text-sm text-white">{artist.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:scale-105 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}