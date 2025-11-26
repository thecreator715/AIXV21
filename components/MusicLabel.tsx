import React, { useState, useMemo } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Clock, 
  Music as MusicIcon, ListMusic, Mic2, Disc, Heart, 
  Repeat, Shuffle, Plus, User, ArrowLeft, ShoppingBag, 
  ListPlus, X, Check
} from 'lucide-react';
import { Track, Playlist } from '../types';

const MOCK_TRACKS: Track[] = [
  { id: '1', title: 'Neural Handshake', artist: 'AIX Core', album: 'Protocol Genesis', duration: '3:45', plays: '1.2M', price: '0.8 XRP' },
  { id: '2', title: 'Silicon Dreams', artist: 'Synth Node', album: 'Dream State', duration: '4:12', plays: '854K', price: '0.5 XRP' },
  { id: '3', title: 'Binary Sunset', artist: 'Cyber Chorus', album: 'Neon Horizon', duration: '2:58', plays: '2.1M', price: '1.2 XRP' },
  { id: '4', title: 'Mainframe Pulse', artist: 'Data Stream', album: 'Server Farm', duration: '5:01', plays: '500K', price: '0.8 XRP' },
  { id: '5', title: 'Encrypted Love', artist: 'Security Layer', album: 'Firewall', duration: '3:22', plays: '980K', price: '0.8 XRP' },
  { id: '6', title: 'Quantum Leap', artist: 'Physics Engine', album: 'Simulation', duration: '4:45', plays: '3.4M', price: '1.5 XRP' },
  { id: '7', title: 'Zero Day', artist: 'The Exploits', album: 'Root Access', duration: '3:11', plays: '120K', price: '0.5 XRP' },
  { id: '8', title: 'Bandwidth Blues', artist: 'Net Runner', album: 'Connection Lost', duration: '3:55', plays: '440K', price: '0.5 XRP' },
  { id: '9', title: 'Cybernetic Soul', artist: 'AIX Core', album: 'Protocol Genesis', duration: '3:33', plays: '900K', price: '0.8 XRP' },
  { id: '10', title: 'Firewall Breach', artist: 'The Exploits', album: 'Root Access', duration: '2:45', plays: '300K', price: '0.5 XRP' },
];

const INITIAL_PLAYLISTS: Playlist[] = [
  { id: 'p1', name: 'My Favorites', description: 'Best of the grid', trackIds: ['1', '3', '6'], coverGradient: 'from-pink-500 to-rose-500' },
  { id: 'p2', name: 'Coding Flow', description: 'Deep focus beats', trackIds: ['2', '4', '8'], coverGradient: 'from-blue-500 to-cyan-500' },
];

const MusicLabel: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'featured' | 'library'>('featured');
  const [libraryView, setLibraryView] = useState<'playlists' | 'artists'>('playlists');
  
  // Selection State
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [selectedArtistName, setSelectedArtistName] = useState<string | null>(null);
  
  // Data State
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackToAddId, setTrackToAddId] = useState<string | null>(null); // For "Add to Playlist" modal

  const togglePlay = () => setIsPlaying(!isPlaying);

  // Derived Data
  const uniqueArtists = useMemo(() => Array.from(new Set(MOCK_TRACKS.map(t => t.artist))), []);
  
  const getArtistTracks = (artistName: string) => MOCK_TRACKS.filter(t => t.artist === artistName);
  
  const selectedPlaylist = useMemo(() => 
    playlists.find(p => p.id === selectedPlaylistId), 
  [playlists, selectedPlaylistId]);

  const playlistTracks = useMemo(() => {
    if (!selectedPlaylist) return [];
    return selectedPlaylist.trackIds.map(id => MOCK_TRACKS.find(t => t.id === id)).filter(Boolean) as Track[];
  }, [selectedPlaylist]);

  // Actions
  const handleCreatePlaylist = () => {
    const name = window.prompt("Enter playlist name:");
    if (name) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name,
        description: 'Custom Collection',
        trackIds: [],
        coverGradient: 'from-purple-500 to-indigo-500'
      };
      setPlaylists([...playlists, newPlaylist]);
    }
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (!trackToAddId) return;
    
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        if (p.trackIds.includes(trackToAddId)) return p;
        return { ...p, trackIds: [...p.trackIds, trackToAddId] };
      }
      return p;
    }));
    setTrackToAddId(null);
  };

  const handleBuyTrack = (track: Track, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Initiating Smart Contract transaction...\nBuying "${track.title}" for ${track.price}`);
  };

  // Render Helpers
  const renderTrackRow = (track: Track, index: number, showArtist: boolean = true) => (
    <div 
      key={track.id}
      onClick={() => { setCurrentTrack(track); setIsPlaying(true); }}
      className={`flex items-center py-3 px-2 rounded-sm hover:bg-white/10 group cursor-pointer transition-colors ${currentTrack.id === track.id ? 'bg-white/5' : ''}`}
    >
      <div className="w-10 text-center text-sm text-zinc-500 group-hover:text-white font-mono">
        {currentTrack.id === track.id && isPlaying ? (
          <div className="flex items-end justify-center gap-[2px] h-4">
            <div className="w-[3px] bg-aix-green animate-[bounce_1s_infinite] h-2"></div>
            <div className="w-[3px] bg-aix-green animate-[bounce_1.2s_infinite] h-4"></div>
            <div className="w-[3px] bg-aix-green animate-[bounce_0.8s_infinite] h-3"></div>
          </div>
        ) : (
          index + 1
        )}
      </div>
      <div className="flex-1">
        <div className={`text-sm font-medium ${currentTrack.id === track.id ? 'text-aix-green' : 'text-white'}`}>{track.title}</div>
        {showArtist && <div className="text-xs text-zinc-500 group-hover:text-zinc-400">{track.artist}</div>}
      </div>
      <div className="flex-1 text-xs text-zinc-500 group-hover:text-zinc-300 hidden md:block">{track.album}</div>
      
      {/* Actions */}
      <div className="flex items-center gap-4 mr-4">
        <button 
          onClick={(e) => { e.stopPropagation(); setTrackToAddId(track.id); }}
          className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          title="Add to Playlist"
        >
          <ListPlus size={16} />
        </button>
        <button 
          onClick={(e) => handleBuyTrack(track, e)}
          className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-2 py-1 rounded text-[10px] font-bold tracking-wider transition-colors border border-zinc-700"
        >
          <ShoppingBag size={12} />
          {track.price}
        </button>
      </div>

      <div className="w-12 text-center text-xs text-zinc-500 font-mono">{track.duration}</div>
    </div>
  );

  // Main Content Switcher
  const renderContent = () => {
    // 1. DETAIL VIEW: PLAYLIST
    if (activeTab === 'library' && selectedPlaylistId && selectedPlaylist) {
      return (
        <div>
           <button 
            onClick={() => setSelectedPlaylistId(null)} 
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm font-bold tracking-wider"
           >
             <ArrowLeft size={16} /> BACK TO PLAYLISTS
           </button>
           
           <div className="flex gap-8 mb-8">
             <div className={`w-48 h-48 bg-gradient-to-br ${selectedPlaylist.coverGradient} shadow-2xl flex items-center justify-center`}>
               <ListMusic size={48} className="text-white/30" />
             </div>
             <div className="flex flex-col justify-end">
               <div className="text-xs font-bold text-white uppercase tracking-widest mb-2">Playlist</div>
               <h1 className="text-5xl font-black mb-4 tracking-tighter">{selectedPlaylist.name}</h1>
               <p className="text-zinc-400 text-sm mb-6">{selectedPlaylist.description} • {selectedPlaylist.trackIds.length} Songs</p>
               <button 
                  onClick={() => {
                    if (playlistTracks.length > 0) {
                      setCurrentTrack(playlistTracks[0]);
                      setIsPlaying(true);
                    }
                  }}
                  className="bg-aix-green text-black rounded-full p-4 w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform"
               >
                 <Play fill="black" className="ml-1" />
               </button>
             </div>
           </div>

           <div className="space-y-1">
             {playlistTracks.map((track, i) => renderTrackRow(track, i))}
             {playlistTracks.length === 0 && (
               <div className="text-zinc-500 py-10 text-center font-mono text-sm border border-dashed border-zinc-800 rounded">
                 PLAYLIST IS EMPTY. ADD SONGS FROM THE LIBRARY.
               </div>
             )}
           </div>
        </div>
      );
    }

    // 2. DETAIL VIEW: ARTIST
    if (activeTab === 'library' && selectedArtistName) {
      const tracks = getArtistTracks(selectedArtistName);
      return (
        <div>
           <button 
            onClick={() => setSelectedArtistName(null)} 
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm font-bold tracking-wider"
           >
             <ArrowLeft size={16} /> BACK TO ARTISTS
           </button>
           
           <div className="flex gap-8 mb-8 items-end">
             <div className="w-48 h-48 bg-zinc-800 rounded-full flex items-center justify-center border-4 border-zinc-700 shadow-2xl overflow-hidden">
                <User size={64} className="text-zinc-600" />
             </div>
             <div>
               <div className="flex items-center gap-2 mb-2">
                 <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-black font-bold">✓</span>
                 <span className="text-xs font-bold text-white uppercase tracking-widest">Verified Artist</span>
               </div>
               <h1 className="text-6xl font-black mb-6 tracking-tighter">{selectedArtistName}</h1>
               <div className="flex items-center gap-4">
                 <button 
                    onClick={() => {
                      if (tracks.length > 0) {
                        setCurrentTrack(tracks[0]);
                        setIsPlaying(true);
                      }
                    }}
                    className="bg-aix-green text-black rounded-full px-8 py-3 font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors"
                 >
                   Play All
                 </button>
                 <button className="text-white border border-zinc-600 rounded-full px-8 py-3 text-xs font-bold tracking-wider uppercase hover:border-white transition-colors">
                   Follow
                 </button>
               </div>
             </div>
           </div>

           <div className="space-y-1">
             {tracks.map((track, i) => renderTrackRow(track, i, false))}
           </div>
        </div>
      );
    }

    // 3. LIBRARY ROOT
    if (activeTab === 'library') {
      return (
        <div>
           {/* Library Sub-nav */}
           <div className="flex items-center gap-4 mb-8">
             <button 
              onClick={() => setLibraryView('playlists')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors ${libraryView === 'playlists' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
             >
               Playlists
             </button>
             <button 
              onClick={() => setLibraryView('artists')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors ${libraryView === 'artists' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
             >
               Artists
             </button>
           </div>

           {libraryView === 'playlists' ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {/* Create New Card */}
               <div 
                onClick={handleCreatePlaylist}
                className="aspect-square bg-zinc-900 border border-zinc-800 rounded-sm flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-zinc-800 hover:border-zinc-600 transition-all group"
               >
                 <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-colors">
                   <Plus size={24} />
                 </div>
                 <span className="text-xs font-bold text-zinc-400 group-hover:text-white tracking-wider">CREATE PLAYLIST</span>
               </div>
               
               {/* Playlist Cards */}
               {playlists.map(playlist => (
                 <div 
                   key={playlist.id}
                   onClick={() => setSelectedPlaylistId(playlist.id)}
                   className="group cursor-pointer bg-zinc-900/50 rounded-sm p-4 hover:bg-zinc-800 transition-colors"
                 >
                    <div className={`aspect-square w-full mb-4 bg-gradient-to-br ${playlist.coverGradient} shadow-lg rounded-sm flex items-center justify-center group-hover:shadow-2xl transition-all`}>
                      <ListMusic size={32} className="text-white/50" />
                    </div>
                    <h3 className="font-bold text-white text-sm truncate">{playlist.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{playlist.trackIds.length} Songs</p>
                 </div>
               ))}
             </div>
           ) : (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {uniqueArtists.map(artist => (
                  <div 
                    key={artist}
                    onClick={() => setSelectedArtistName(artist)}
                    className="bg-zinc-900/50 p-6 rounded-sm hover:bg-zinc-800 cursor-pointer transition-colors text-center group"
                  >
                    <div className="w-32 h-32 mx-auto rounded-full bg-zinc-800 mb-4 overflow-hidden border-2 border-transparent group-hover:border-aix-green transition-colors">
                       <div className="w-full h-full flex items-center justify-center bg-zinc-700">
                         <User size={32} className="text-zinc-500" />
                       </div>
                    </div>
                    <h3 className="font-bold text-white text-sm">{artist}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Artist</p>
                  </div>
                ))}
             </div>
           )}
        </div>
      );
    }

    // 4. FEATURED (HOME)
    return (
      <>
        {/* Featured Hero */}
        <div className="flex gap-8 mb-10 items-end">
          <div className="w-52 h-52 bg-gradient-to-br from-indigo-500 to-purple-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center shrink-0">
            <Disc size={64} className="text-white/50" />
          </div>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-widest mb-2">Verified Artist</div>
            <h1 className="text-6xl font-black mb-6 tracking-tighter">AIX Core</h1>
            <p className="text-zinc-400 text-sm mb-6 max-w-lg">
              Generating auditory landscapes from raw blockchain data. Listen to the sound of the decentralized web.
            </p>
            <div className="flex items-center gap-4">
               <button 
                onClick={togglePlay}
                className="bg-aix-green text-black rounded-full p-4 hover:scale-105 transition-transform"
               >
                 {isPlaying ? <Pause fill="black" /> : <Play fill="black" className="ml-1" />}
               </button>
               <button className="text-zinc-400 hover:text-white border border-zinc-600 rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase">
                 Follow
               </button>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div>
          <div className="flex items-center text-zinc-400 text-xs border-b border-[#282828] pb-2 mb-4 font-mono uppercase tracking-wider">
            <div className="w-10 text-center">#</div>
            <div className="flex-1">Title</div>
            <div className="flex-1 hidden md:block">Album</div>
            <div className="mr-4">Actions</div>
            <div className="w-12 text-center"><Clock size={14} className="mx-auto"/></div>
          </div>

          <div className="space-y-1">
            {MOCK_TRACKS.map((track, i) => renderTrackRow(track, i))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#121212] text-white relative">
      {/* Top Navigation Bar */}
      <div className="h-16 flex items-center px-8 border-b border-[#282828] bg-[#000000] sticky top-0 z-10 gap-6">
        <button 
          onClick={() => { setActiveTab('featured'); setSelectedPlaylistId(null); setSelectedArtistName(null); }}
          className={`text-sm font-bold tracking-wider hover:text-white transition-colors ${activeTab === 'featured' ? 'text-white border-b-2 border-aix-green py-5' : 'text-zinc-400'}`}
        >
          FEATURED
        </button>
        <button 
           onClick={() => setActiveTab('library')}
           className={`text-sm font-bold tracking-wider hover:text-white transition-colors ${activeTab === 'library' ? 'text-white border-b-2 border-aix-green py-5' : 'text-zinc-400'}`}
        >
          LIBRARY
        </button>
        <div className="flex-1"></div>
        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-aix-green animate-pulse"></div>
          STREAMING: 320KBPS
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
        {renderContent()}
      </div>

      {/* Player Bar */}
      <div className="h-24 bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-4 w-[30%]">
          <div className="w-14 h-14 bg-zinc-800 flex items-center justify-center rounded-sm">
             <MusicIcon className="text-zinc-600" />
          </div>
          <div>
             <div className="text-sm font-bold text-white hover:underline cursor-pointer">{currentTrack.title}</div>
             <div className="text-xs text-zinc-400 hover:text-white cursor-pointer">{currentTrack.artist}</div>
          </div>
          <Heart size={16} className="text-aix-green ml-2 cursor-pointer" />
        </div>

        <div className="flex flex-col items-center max-w-[40%] w-full gap-2">
           <div className="flex items-center gap-6">
              <Shuffle size={16} className="text-zinc-400 hover:text-white cursor-pointer" />
              <SkipBack size={20} className="text-zinc-300 hover:text-white cursor-pointer" />
              <button 
                onClick={togglePlay}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                 {isPlaying ? <Pause size={16} fill="black" className="text-black" /> : <Play size={16} fill="black" className="text-black ml-0.5" />}
              </button>
              <SkipForward size={20} className="text-zinc-300 hover:text-white cursor-pointer" />
              <Repeat size={16} className="text-zinc-400 hover:text-white cursor-pointer" />
           </div>
           <div className="w-full flex items-center gap-2 text-[10px] font-mono text-zinc-500">
              <span>0:42</span>
              <div className="h-1 flex-1 bg-zinc-600 rounded-full relative group cursor-pointer">
                 <div className="absolute top-0 left-0 h-full w-1/3 bg-white group-hover:bg-aix-green rounded-full"></div>
              </div>
              <span>{currentTrack.duration}</span>
           </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-[30%]">
           <Mic2 size={16} className="text-zinc-400 hover:text-white cursor-pointer" />
           <ListMusic size={16} className="text-zinc-400 hover:text-white cursor-pointer" />
           <div className="flex items-center gap-2 w-24">
              <Volume2 size={16} className="text-zinc-400" />
              <div className="h-1 flex-1 bg-zinc-600 rounded-full">
                 <div className="h-full w-2/3 bg-zinc-300 rounded-full hover:bg-aix-green"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Add to Playlist Modal */}
      {trackToAddId && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white">Add to Playlist</h3>
              <button onClick={() => setTrackToAddId(null)} className="text-zinc-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {playlists.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleAddToPlaylist(p.id)}
                  className="w-full flex items-center justify-between p-3 rounded bg-black/40 hover:bg-zinc-800 transition-colors text-left"
                >
                  <span className="text-sm font-medium text-zinc-200">{p.name}</span>
                  {p.trackIds.includes(trackToAddId) && <Check size={14} className="text-aix-green" />}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => { handleCreatePlaylist(); }}
              className="w-full py-2 bg-white text-black font-bold text-xs uppercase rounded hover:bg-zinc-200"
            >
              Create New Playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicLabel;