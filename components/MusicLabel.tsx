import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Clock, 
  Music as MusicIcon, Heart, Repeat, Shuffle, User, ArrowLeft, 
  ShoppingBag, Check, BarChart2, Globe, Disc, ExternalLink,
  TrendingUp, Users, Radio
} from 'lucide-react';
import { Track } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWallet } from '../contexts/WalletContext';
import { xrpToDrops, convertStringToHex } from 'xrpl';
import { uploadJSONToIPFS } from '../services/pinataService';

const MOCK_TRACKS: Track[] = [
  { id: '1', title: 'Midnight Coffee', artist: 'MOKA', album: 'Late Nights', duration: '3:45', plays: '1.2M', price: '0.8 XRP' },
  { id: '2', title: 'Hidden Agenda', artist: 'SECRET SOCIETY', album: 'Classified', duration: '4:12', plays: '854K', price: '0.5 XRP' },
  { id: '3', title: 'Sky High', artist: 'SUPERFLY', album: 'Elevation', duration: '2:58', plays: '2.1M', price: '1.2 XRP' },
  { id: '4', title: 'Zen Garden', artist: 'DOJO', album: 'Meditation', duration: '5:01', plays: '500K', price: '0.8 XRP' },
  { id: '5', title: 'Desert Rose', artist: 'LAYLA', album: 'Oasis', duration: '3:22', plays: '980K', price: '0.8 XRP' },
  { id: '6', title: 'Espresso Shot', artist: 'MOKA', album: 'Morning Rush', duration: '4:45', plays: '3.4M', price: '1.5 XRP' },
  { id: '7', title: 'The Vault', artist: 'SECRET SOCIETY', album: 'Classified', duration: '3:11', plays: '120K', price: '0.5 XRP' },
  { id: '8', title: 'Supersonic', artist: 'SUPERFLY', album: 'Elevation', duration: '3:55', plays: '440K', price: '0.5 XRP' },
  { id: '9', title: 'Samurai Sword', artist: 'DOJO', album: 'Warrior', duration: '3:33', plays: '900K', price: '0.8 XRP' },
  { id: '10', title: 'Nightfall', artist: 'LAYLA', album: 'Oasis', duration: '2:45', plays: '300K', price: '0.5 XRP' },
];


const ARTISTS_DATA = [
  { name: 'MOKA', gradient: 'from-pink-500 to-rose-900', sc: 'soundcloud.com/moka', sp: 'spotify.com/artist/moka', it: 'music.apple.com/us/artist/moka', bp: 'beatport.com/artist/moka' },
  { name: 'SECRET SOCIETY', gradient: 'from-purple-500 to-indigo-900', sc: 'soundcloud.com/secretsociety', sp: 'spotify.com/artist/secretsociety', it: 'music.apple.com/us/artist/secretsociety', bp: 'beatport.com/artist/secretsociety' },
  { name: 'SUPERFLY', gradient: 'from-cyan-500 to-blue-900', sc: 'soundcloud.com/superfly', sp: 'spotify.com/artist/superfly', it: 'music.apple.com/us/artist/superfly', bp: 'beatport.com/artist/superfly' },
  { name: 'DOJO', gradient: 'from-emerald-500 to-teal-900', sc: 'soundcloud.com/dojo', sp: 'spotify.com/artist/dojo', it: 'music.apple.com/us/artist/dojo', bp: 'beatport.com/artist/dojo' },
  { name: 'LAYLA', gradient: 'from-orange-500 to-red-900', sc: 'soundcloud.com/layla', sp: 'spotify.com/artist/layla', it: 'music.apple.com/us/artist/layla', bp: 'beatport.com/artist/layla' },
];

const MOCK_ANALYTICS = Array.from({ length: 7 }, (_, i) => ({
  name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  plays: Math.floor(Math.random() * 5000) + 1000,
  likes: Math.floor(Math.random() * 1000) + 100,
}));

const MusicLabel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'artists' | 'newest'>('artists');
  const [selectedArtistName, setSelectedArtistName] = useState<string | null>(null);
  const [artistSubTab, setArtistSubTab] = useState<'overview' | 'analytics' | 'feeds' | 'nft' | 'owners'>('overview');
  
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [rssTracks, setRssTracks] = useState<Track[]>([]);
  const [loadingRss, setLoadingRss] = useState(false);
  const [rssError, setRssError] = useState<string | null>(null);
  const { wallet, client, isConnected, refreshBalances } = useWallet();
  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState('');
  const [mintSuccess, setMintSuccess] = useState('');

  useEffect(() => {
    if (selectedArtistName === 'SECRET SOCIETY') {
      setLoadingRss(true);
      setRssError(null);
      fetch('https://feeds.soundcloud.com/users/soundcloud:users:1682237552/sounds.rss')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
          const items = data.querySelectorAll("item");
          const tracks: Track[] = Array.from(items)
            .map((item, idx) => {
              const title = item.querySelector("title")?.textContent || "Unknown Title";
              const duration = item.querySelector("itunes\\:duration")?.textContent || "0:00";
              const audioUrl = item.querySelector("enclosure")?.getAttribute("url") || "";
              const coverUrl = item.querySelector("itunes\\:image")?.getAttribute("href") || "";
              return {
                id: `rss-${idx}`,
                title: title.replace('Secret Society - ', '').replace(' (Original Mix) *FREE DOWNLOAD*', ''),
                artist: 'SECRET SOCIETY',
                album: 'SoundCloud Feed',
                duration,
                plays: '0',
                price: '1.0 XRP',
                audioUrl,
                coverUrl
              };
            })
            .filter(track => track.title.includes('THE MASTER'));
          setRssTracks(tracks);
          setLoadingRss(false);
        })
        .catch(err => {
          console.error("Error fetching RSS:", err);
          setLoadingRss(false);
          setRssError("Failed to fetch RSS feed. This is likely a CORS restriction.");
        });
    } else {
      setRssTracks([]);
      setRssError(null);
    }
  }, [selectedArtistName]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack.audioUrl) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const getArtistTracks = (artistName: string) => {
    if (artistName === 'SECRET SOCIETY' && rssTracks.length > 0) {
      return rssTracks;
    }
    return MOCK_TRACKS.filter(t => t.artist === artistName);
  };
  
  const selectedArtistData = useMemo(() => 
    ARTISTS_DATA.find(a => a.name === selectedArtistName), 
  [selectedArtistName]);

  const [purchaseModal, setPurchaseModal] = useState<{track: Track | null, isOpen: boolean}>({track: null, isOpen: false});

  const handleBuyTrack = (track: Track, e: React.MouseEvent) => {
    e.stopPropagation();
    setPurchaseModal({track, isOpen: true});
    setMintError('');
    setMintSuccess('');
  };

  const handleMint = async () => {
    if (!wallet || !client || !isConnected) {
      setMintError('Please connect your XRPL wallet first.');
      return;
    }

    if (!purchaseModal.track) return;

    setIsMinting(true);
    setMintError('');
    setMintSuccess('');

    try {
      // 1. Upload NFT Metadata to IPFS via Pinata
      const metadata = {
        name: purchaseModal.track.title,
        description: `Royalty-sharing NFT for ${purchaseModal.track.title} by ${purchaseModal.track.artist}`,
        image: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", // Placeholder image or track cover
        attributes: [
          { trait_type: "Artist", value: purchaseModal.track.artist },
          { trait_type: "Album", value: purchaseModal.track.album },
          { trait_type: "Duration", value: purchaseModal.track.duration }
        ]
      };
      
      const ipfsUri = await uploadJSONToIPFS(metadata);
      console.log("Metadata uploaded to IPFS:", ipfsUri);

      // 2. Simulate minting transaction (in a real app, this would be an NFTokenMint transaction)
      // Since we are not the issuer, we simulate sending 1 XRP to the AIX NFT FACTORY
      const tx = {
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: xrpToDrops('1'), // 1 XRP
        Destination: 'rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz', // AIX NFT FACTORY
        Memos: [
          {
            Memo: {
              MemoData: convertStringToHex(ipfsUri),
              MemoType: convertStringToHex('NFT_URI')
            }
          }
        ]
      };

      const prepared = await client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta !== 'string' && result.result.meta.TransactionResult === 'tesSUCCESS') {
        setMintSuccess(`Successfully minted NFT for ${purchaseModal.track.title}! Metadata stored at ${ipfsUri}`);
        refreshBalances();
        setTimeout(() => {
          setPurchaseModal({track: null, isOpen: false});
        }, 3000);
      } else {
        const meta = result.result.meta as any;
        setMintError(`Minting failed: ${meta?.TransactionResult || 'Unknown error'}`);
      }
    } catch (err: any) {
      setMintError(`Error: ${err.message}`);
    } finally {
      setIsMinting(false);
    }
  };

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
      
      <div className="flex items-center gap-4 mr-4">
        {track.audioUrl && (
          <div className="text-[10px] text-aix-green border border-aix-green/30 bg-aix-green/10 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
            Playable
          </div>
        )}
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

  const renderContent = () => {
    // ADVANCED ARTIST PLATFORM
    if (selectedArtistName && selectedArtistData) {
      const tracks = getArtistTracks(selectedArtistName);
      return (
        <div className="animate-in fade-in duration-300">
           <button 
            onClick={() => setSelectedArtistName(null)} 
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm font-bold tracking-wider"
           >
             <ArrowLeft size={16} /> BACK TO ARTISTS
           </button>
           
           {/* Artist Hero */}
           <div className={`w-full h-64 rounded-xl bg-gradient-to-r ${selectedArtistData.gradient} relative overflow-hidden mb-8 shadow-2xl`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
              <div className="absolute bottom-6 left-8 flex items-end gap-6">
                <div className="w-32 h-32 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center shadow-xl overflow-hidden">
                  <User size={48} className="text-zinc-600" />
                </div>
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-black font-bold">✓</span>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Verified Artist</span>
                  </div>
                  <h1 className="text-5xl font-black tracking-tighter text-white drop-shadow-lg">{selectedArtistName}</h1>
                </div>
              </div>
           </div>

           {/* Artist Sub-Navigation */}
           <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 px-2">
             {['overview', 'analytics', 'feeds', 'nft', 'owners'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setArtistSubTab(tab as any)}
                 className={`pb-4 text-xs font-bold tracking-widest uppercase transition-colors relative ${
                   artistSubTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                 }`}
               >
                 {tab === 'nft' ? 'NFT Collection' : tab}
                 {artistSubTab === tab && (
                   <div className="absolute bottom-0 left-0 w-full h-0.5 bg-aix-green shadow-[0_0_8px_#00ff41]"></div>
                 )}
               </button>
             ))}
           </div>

           {/* Sub-Tab Content */}
           <div className="min-h-[400px]">
             {artistSubTab === 'overview' && (
               <div className="space-y-6">
                 <div className="flex items-center justify-between">
                   <h2 className="text-xl font-bold">Top Tracks</h2>
                   <button 
                      onClick={() => {
                        if (tracks.length > 0) {
                          setCurrentTrack(tracks[0]);
                          setIsPlaying(true);
                        }
                      }}
                      className="bg-aix-green text-black rounded-full px-6 py-2 font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors flex items-center gap-2"
                   >
                     <Play size={14} fill="black" /> Play All
                   </button>
                 </div>
                 <div className="space-y-1 bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50">
                   {tracks.length > 0 ? tracks.map((track, i) => renderTrackRow(track, i, false)) : (
                     <div className="text-zinc-500 py-8 text-center font-mono text-sm">NO TRACKS FOUND</div>
                   )}
                 </div>
               </div>
             )}

             {artistSubTab === 'analytics' && (
               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff5500]/10 rounded-bl-full"></div>
                     <div className="flex items-center gap-3 text-zinc-400 mb-4">
                       <Radio size={16} className="text-[#ff5500]" />
                       <span className="text-[10px] font-bold tracking-widest uppercase">SoundCloud Plays</span>
                     </div>
                     <div className="text-3xl font-black font-mono text-white">2.4M</div>
                     <div className="text-xs text-aix-green mt-2 flex items-center gap-1"><TrendingUp size={12}/> +12.5%</div>
                   </div>
                   <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-16 h-16 bg-[#1DB954]/10 rounded-bl-full"></div>
                     <div className="flex items-center gap-3 text-zinc-400 mb-4">
                       <Globe size={16} className="text-[#1DB954]" />
                       <span className="text-[10px] font-bold tracking-widest uppercase">Spotify Streams</span>
                     </div>
                     <div className="text-3xl font-black font-mono text-white">8.1M</div>
                     <div className="text-xs text-aix-green mt-2 flex items-center gap-1"><TrendingUp size={12}/> +24.2%</div>
                   </div>
                   <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full"></div>
                     <div className="flex items-center gap-3 text-zinc-400 mb-4">
                       <Users size={16} className="text-blue-400" />
                       <span className="text-[10px] font-bold tracking-widest uppercase">Total Followers</span>
                     </div>
                     <div className="text-3xl font-black font-mono text-white">145K</div>
                     <div className="text-xs text-aix-green mt-2 flex items-center gap-1"><TrendingUp size={12}/> +5.2%</div>
                   </div>
                   <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full"></div>
                     <div className="flex items-center gap-3 text-zinc-400 mb-4">
                       <Heart size={16} className="text-rose-500" />
                       <span className="text-[10px] font-bold tracking-widest uppercase">Engagement</span>
                     </div>
                     <div className="text-3xl font-black font-mono text-white">8.4%</div>
                     <div className="text-xs text-zinc-500 mt-2">Avg. across platforms</div>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                     <div className="flex items-center justify-between mb-6">
                       <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-400">7-Day Performance</h3>
                       <div className="flex items-center gap-4 text-xs">
                         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ff5500]"></div>Plays</div>
                         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00ff41]"></div>Likes</div>
                       </div>
                     </div>
                     <div className="h-72">
                       <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={MOCK_ANALYTICS}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                           <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                           <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} dx={-10} />
                           <Tooltip 
                             contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
                             itemStyle={{ color: '#fff' }}
                           />
                           <Line type="monotone" dataKey="plays" stroke="#ff5500" strokeWidth={3} dot={{ r: 4, fill: '#ff5500', strokeWidth: 0 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                           <Line type="monotone" dataKey="likes" stroke="#00ff41" strokeWidth={3} dot={{ r: 4, fill: '#00ff41', strokeWidth: 0 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                         </LineChart>
                       </ResponsiveContainer>
                     </div>
                   </div>
                   
                   <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col">
                     <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-400 mb-6">Top Locations</h3>
                     <div className="flex-1 flex flex-col justify-center space-y-6">
                       {[
                         { city: 'Los Angeles, US', percentage: 28, value: '45K' },
                         { city: 'London, UK', percentage: 22, value: '35K' },
                         { city: 'Berlin, DE', percentage: 18, value: '28K' },
                         { city: 'Tokyo, JP', percentage: 12, value: '19K' },
                         { city: 'Sydney, AU', percentage: 8, value: '12K' },
                       ].map((loc, i) => (
                         <div key={i}>
                           <div className="flex items-center justify-between text-xs mb-2">
                             <span className="text-white">{loc.city}</span>
                             <span className="text-zinc-500 font-mono">{loc.value} listeners</span>
                           </div>
                           <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                             <div className="h-full bg-zinc-400 rounded-full" style={{ width: `${loc.percentage}%` }}></div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {artistSubTab === 'feeds' && (
               <div className="space-y-6">
                 <h2 className="text-xl font-bold mb-4">Connected Platforms</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <a href={`https://${selectedArtistData.sc}`} target="_blank" rel="noreferrer" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-[#ff5500] transition-all hover:shadow-[0_0_30px_rgba(255,85,0,0.1)] group flex items-center justify-between relative overflow-hidden">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-[#ff5500]/5 rounded-full blur-3xl group-hover:bg-[#ff5500]/10 transition-colors"></div>
                     <div className="flex items-center gap-5 relative z-10">
                       <div className="w-14 h-14 rounded-full bg-[#ff5500]/10 flex items-center justify-center border border-[#ff5500]/20 group-hover:scale-110 transition-transform">
                         <Radio size={24} className="text-[#ff5500]" />
                       </div>
                       <div>
                         <div className="font-bold text-white text-lg mb-1">SoundCloud</div>
                         <div className="text-xs text-zinc-400 font-mono">{selectedArtistData.sc}</div>
                       </div>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#ff5500] group-hover:text-white text-zinc-500 transition-colors relative z-10">
                       <ExternalLink size={16} />
                     </div>
                   </a>
                   <a href={`https://${selectedArtistData.sp}`} target="_blank" rel="noreferrer" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-[#1DB954] transition-all hover:shadow-[0_0_30px_rgba(29,185,84,0.1)] group flex items-center justify-between relative overflow-hidden">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-[#1DB954]/5 rounded-full blur-3xl group-hover:bg-[#1DB954]/10 transition-colors"></div>
                     <div className="flex items-center gap-5 relative z-10">
                       <div className="w-14 h-14 rounded-full bg-[#1DB954]/10 flex items-center justify-center border border-[#1DB954]/20 group-hover:scale-110 transition-transform">
                         <Globe size={24} className="text-[#1DB954]" />
                       </div>
                       <div>
                         <div className="font-bold text-white text-lg mb-1">Spotify</div>
                         <div className="text-xs text-zinc-400 font-mono">{selectedArtistData.sp}</div>
                       </div>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#1DB954] group-hover:text-white text-zinc-500 transition-colors relative z-10">
                       <ExternalLink size={16} />
                     </div>
                   </a>
                   <a href={`https://${selectedArtistData.it}`} target="_blank" rel="noreferrer" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-[#FA243C] transition-all hover:shadow-[0_0_30px_rgba(250,36,60,0.1)] group flex items-center justify-between relative overflow-hidden">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-[#FA243C]/5 rounded-full blur-3xl group-hover:bg-[#FA243C]/10 transition-colors"></div>
                     <div className="flex items-center gap-5 relative z-10">
                       <div className="w-14 h-14 rounded-full bg-[#FA243C]/10 flex items-center justify-center border border-[#FA243C]/20 group-hover:scale-110 transition-transform">
                         <MusicIcon size={24} className="text-[#FA243C]" />
                       </div>
                       <div>
                         <div className="font-bold text-white text-lg mb-1">Apple Music</div>
                         <div className="text-xs text-zinc-400 font-mono">{selectedArtistData.it}</div>
                       </div>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#FA243C] group-hover:text-white text-zinc-500 transition-colors relative z-10">
                       <ExternalLink size={16} />
                     </div>
                   </a>
                   <a href={`https://${selectedArtistData.bp}`} target="_blank" rel="noreferrer" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-[#01FF95] transition-all hover:shadow-[0_0_30px_rgba(1,255,149,0.1)] group flex items-center justify-between relative overflow-hidden">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-[#01FF95]/5 rounded-full blur-3xl group-hover:bg-[#01FF95]/10 transition-colors"></div>
                     <div className="flex items-center gap-5 relative z-10">
                       <div className="w-14 h-14 rounded-full bg-[#01FF95]/10 flex items-center justify-center border border-[#01FF95]/20 group-hover:scale-110 transition-transform">
                         <Disc size={24} className="text-[#01FF95]" />
                       </div>
                       <div>
                         <div className="font-bold text-white text-lg mb-1">Beatport</div>
                         <div className="text-xs text-zinc-400 font-mono">{selectedArtistData.bp}</div>
                       </div>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#01FF95] group-hover:text-black text-zinc-500 transition-colors relative z-10">
                       <ExternalLink size={16} />
                     </div>
                   </a>
                 </div>

                 {selectedArtistName === 'SECRET SOCIETY' && (
                   <div className="mt-8">
                     <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                       <Radio size={20} className="text-[#ff5500]" />
                       SoundCloud RSS Feed
                     </h2>
                     {loadingRss ? (
                       <div className="text-zinc-500 text-sm font-mono animate-pulse">Loading feed...</div>
                     ) : (
                       <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50">
                         <div className="flex items-center text-zinc-500 text-xs border-b border-zinc-800 pb-3 mb-2 font-mono uppercase tracking-wider px-2">
                           <div className="w-10 text-center">#</div>
                           <div className="flex-1">Title</div>
                           <div className="flex-1 hidden md:block">Album</div>
                           <div className="mr-4">NFT Mint</div>
                           <div className="w-12 text-center"><Clock size={14} className="mx-auto"/></div>
                         </div>
                         <div className="space-y-1">
                           {rssTracks.map((track, i) => renderTrackRow(track, i))}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </div>
             )}

             {artistSubTab === 'nft' && (
               <div className="space-y-6">
                 <div className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-xl p-8 text-center relative overflow-hidden">
                   <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                   <div className="relative z-10">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-aix-green/10 mb-4 border border-aix-green/20 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                       <ShoppingBag size={32} className="text-aix-green" />
                     </div>
                     <h2 className="text-3xl font-black mb-2 tracking-tighter">Music Royalty NFTs</h2>
                     <p className="text-zinc-400 max-w-2xl mx-auto mb-6 text-sm leading-relaxed">
                       Own a piece of the music. There are exactly <strong className="text-white">100 NFTs</strong> minted per song. 
                       Each NFT grants the holder <strong className="text-aix-green">1% of all future royalties</strong> generated by the track across all streaming platforms.
                     </p>
                     <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                       <div className="bg-black/50 border border-zinc-800 px-6 py-4 rounded-xl backdrop-blur-sm">
                         <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Total Supply</div>
                         <div className="text-2xl font-black font-mono text-white">100<span className="text-sm text-zinc-500 font-sans font-normal ml-1">/ Track</span></div>
                       </div>
                       <div className="bg-black/50 border border-zinc-800 px-6 py-4 rounded-xl backdrop-blur-sm">
                         <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Royalty Share</div>
                         <div className="text-2xl font-black font-mono text-aix-green">1.00%<span className="text-sm text-zinc-500 font-sans font-normal ml-1">/ NFT</span></div>
                       </div>
                       <div className="bg-black/50 border border-zinc-800 px-6 py-4 rounded-xl backdrop-blur-sm">
                         <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Network</div>
                         <div className="text-2xl font-black font-mono text-blue-400">XRPL</div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {tracks.map(track => (
                     <div key={track.id} className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-600 transition-colors relative">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aix-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                       <div className={`h-40 bg-gradient-to-br ${selectedArtistData.gradient} relative flex items-center justify-center overflow-hidden`}>
                         {track.coverUrl ? (
                           <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                         ) : (
                           <Disc size={64} className="text-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
                         )}
                         <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full text-white border border-white/10 flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-aix-green animate-pulse"></div>
                           LIVE MINT
                         </div>
                         <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded text-zinc-300 border border-white/10">
                           {track.duration}
                         </div>
                       </div>
                       <div className="p-6">
                         <h3 className="font-bold text-lg mb-1 truncate text-white group-hover:text-aix-green transition-colors">{track.title}</h3>
                         <p className="text-xs text-zinc-500 mb-5">{track.album}</p>
                         
                         <div className="space-y-3 mb-6">
                           <div className="flex items-center justify-between text-xs">
                             <span className="text-zinc-500">Available Supply</span>
                             <span className="text-white font-mono bg-zinc-800 px-2 py-0.5 rounded">84 / 100</span>
                           </div>
                           <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                             <div className="h-full bg-aix-green w-[16%] rounded-full"></div>
                           </div>
                           <div className="flex items-center justify-between text-xs">
                             <span className="text-zinc-500">Royalty Share</span>
                             <span className="text-aix-green font-mono font-bold">1.00%</span>
                           </div>
                         </div>
                         
                         <button 
                           onClick={(e) => handleBuyTrack(track, e)}
                           className="w-full py-3.5 bg-zinc-800 hover:bg-aix-green hover:text-black text-white text-xs font-black tracking-widest uppercase rounded-lg transition-all shadow-[0_0_0_rgba(0,255,65,0)] hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] flex items-center justify-center gap-2"
                         >
                           <ShoppingBag size={14} />
                           Mint for {track.price}
                         </button>
                       </div>
                     </div>
                   ))}
                   {tracks.length === 0 && (
                     <div className="col-span-full text-center py-12 text-zinc-500 font-mono text-sm">
                       NO NFT COLLECTIONS AVAILABLE YET
                     </div>
                   )}
                 </div>
               </div>
             )}
           </div>
        </div>
      );
    }

    // ARTISTS GRID
    if (activeTab === 'artists') {
      return (
        <div className="animate-in fade-in duration-300">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {ARTISTS_DATA.map(artist => (
              <div 
                key={artist.name}
                onClick={() => setSelectedArtistName(artist.name)}
                className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer transition-all text-center group"
              >
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${artist.gradient} mb-4 overflow-hidden border-4 border-zinc-900 group-hover:border-zinc-700 transition-colors shadow-lg flex items-center justify-center`}>
                  <User size={40} className="text-white/50" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{artist.name}</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[6px] text-black font-bold">✓</span>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Verified</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // NEWEST TRACKS
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Newest Tracks Added</h2>
          <button 
            onClick={togglePlay}
            className="bg-aix-green text-black rounded-full px-6 py-2 font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors flex items-center gap-2"
          >
            {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" />} 
            {isPlaying ? 'Pause' : 'Play All'}
          </button>
        </div>
        <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50">
          <div className="flex items-center text-zinc-500 text-xs border-b border-zinc-800 pb-3 mb-2 font-mono uppercase tracking-wider px-2">
            <div className="w-10 text-center">#</div>
            <div className="flex-1">Title</div>
            <div className="flex-1 hidden md:block">Album</div>
            <div className="mr-4">NFT Mint</div>
            <div className="w-12 text-center"><Clock size={14} className="mx-auto"/></div>
          </div>
          <div className="space-y-1">
            {MOCK_TRACKS.map((track, i) => renderTrackRow(track, i))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white relative">
      {/* Top Navigation Bar */}
      <div className="h-16 flex items-center px-8 border-b border-zinc-800 bg-black/80 backdrop-blur sticky top-0 z-10 gap-8">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-aix-green/10 rounded flex items-center justify-center">
            <MusicIcon size={16} className="text-aix-green" />
          </div>
          <span className="font-black tracking-tighter text-lg">AIX MUSIC</span>
        </div>
        <button 
          onClick={() => { setActiveTab('artists'); setSelectedArtistName(null); }}
          className={`text-xs font-bold tracking-widest uppercase hover:text-white transition-colors relative h-full flex items-center ${activeTab === 'artists' && !selectedArtistName ? 'text-white' : 'text-zinc-500'}`}
        >
          ARTISTS
          {activeTab === 'artists' && !selectedArtistName && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-aix-green shadow-[0_0_8px_#00ff41]"></div>
          )}
        </button>
        <button 
           onClick={() => { setActiveTab('newest'); setSelectedArtistName(null); }}
           className={`text-xs font-bold tracking-widest uppercase hover:text-white transition-colors relative h-full flex items-center ${activeTab === 'newest' && !selectedArtistName ? 'text-white' : 'text-zinc-500'}`}
        >
          NEWEST TRACKS ADDED
          {activeTab === 'newest' && !selectedArtistName && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-aix-green shadow-[0_0_8px_#00ff41]"></div>
          )}
        </button>
        <div className="flex-1"></div>
        <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
          <div className="w-1.5 h-1.5 rounded-full bg-aix-green animate-pulse shadow-[0_0_5px_#00ff41]"></div>
          WEB3 SYNC ACTIVE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>

      {/* Player Bar */}
      <div className="h-24 bg-[#0a0a0a] border-t border-zinc-800 px-6 flex items-center justify-between z-20">
        {currentTrack.audioUrl && (
          <audio 
            ref={audioRef} 
            src={currentTrack.audioUrl} 
            onEnded={() => setIsPlaying(false)} 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
        <div className="flex items-center gap-4 w-[30%]">
          <div className="w-14 h-14 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center rounded-md shadow-lg">
             <MusicIcon className="text-zinc-500" />
          </div>
          <div>
             <div className="text-sm font-bold text-white hover:text-aix-green transition-colors cursor-pointer">{currentTrack.title}</div>
             <div className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer">{currentTrack.artist}</div>
          </div>
          <Heart size={16} className="text-zinc-600 hover:text-aix-green ml-2 cursor-pointer transition-colors" />
        </div>

        <div className="flex flex-col items-center max-w-[40%] w-full gap-3">
           <div className="flex items-center gap-6">
              <Shuffle size={16} className="text-zinc-500 hover:text-white cursor-pointer transition-colors" />
              <SkipBack size={20} className="text-zinc-400 hover:text-white cursor-pointer transition-colors" />
              <button 
                onClick={togglePlay}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                 {isPlaying ? <Pause size={18} fill="black" className="text-black" /> : <Play size={18} fill="black" className="text-black ml-1" />}
              </button>
              <SkipForward size={20} className="text-zinc-400 hover:text-white cursor-pointer transition-colors" />
              <Repeat size={16} className="text-zinc-500 hover:text-white cursor-pointer transition-colors" />
           </div>
           <div className="w-full flex items-center gap-3 text-[10px] font-mono text-zinc-500">
              <span>0:42</span>
              <div className="h-1.5 flex-1 bg-zinc-800 rounded-full relative group cursor-pointer overflow-hidden">
                 <div className="absolute top-0 left-0 h-full w-1/3 bg-zinc-400 group-hover:bg-aix-green rounded-full transition-colors"></div>
              </div>
              <span>{currentTrack.duration}</span>
           </div>
        </div>

        <div className="flex items-center justify-end gap-4 w-[30%]">
           <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded text-[10px] font-mono text-aix-green">
             <ShoppingBag size={12} />
             {currentTrack.price}
           </div>
           <div className="w-px h-6 bg-zinc-800 mx-2"></div>
           <div className="flex items-center gap-2 w-24">
              <Volume2 size={16} className="text-zinc-400" />
              <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group">
                 <div className="h-full w-2/3 bg-zinc-400 group-hover:bg-white rounded-full transition-colors"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {purchaseModal.isOpen && purchaseModal.track && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aix-green to-transparent"></div>
            <h3 className="text-2xl font-black mb-2 text-white">Mint NFT</h3>
            <p className="text-zinc-400 mb-6 text-sm">
              You are about to mint a royalty-sharing NFT for <strong className="text-white">{purchaseModal.track.title}</strong> by <strong className="text-white">{purchaseModal.track.artist}</strong>.
            </p>
            <div className="bg-black/50 border border-zinc-800 rounded-xl p-4 mb-6 flex items-center justify-between">
              <span className="text-zinc-500 text-sm font-bold uppercase tracking-wider">Price</span>
              <span className="text-aix-green font-mono font-bold text-xl flex items-center gap-2">
                <ShoppingBag size={18} />
                1 XRP
              </span>
            </div>

            {mintError && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm">{mintError}</div>}
            {mintSuccess && <div className="bg-aix-green/10 border border-aix-green/50 text-aix-green p-3 rounded-lg mb-4 text-sm">{mintSuccess}</div>}

            <div className="flex gap-4">
              <button 
                onClick={() => setPurchaseModal({track: null, isOpen: false})}
                disabled={isMinting}
                className="flex-1 py-3 px-4 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors font-bold text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleMint}
                disabled={isMinting || !wallet}
                className="flex-1 py-3 px-4 rounded-xl bg-aix-green text-black hover:bg-white transition-colors font-bold text-sm shadow-[0_0_15px_rgba(0,255,65,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isMinting ? 'Minting...' : (wallet ? 'Confirm Mint' : 'Connect Wallet')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicLabel;
