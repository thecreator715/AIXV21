import React from 'react';
import { Share2, Users, Radio, ExternalLink, Globe, ShieldCheck } from 'lucide-react';

const Socials: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-black overflow-y-auto font-mono">
      {/* Top Header */}
      <div className="h-10 border-b border-aix-border flex items-center justify-between px-6 bg-[#0a0a0a] shrink-0">
        <div className="text-[10px] text-zinc-500 tracking-wider">
          SYSTEM <span className="mx-2">/</span> <span className="text-zinc-300">SOCIAL GRID</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-aix-green shadow-[0_0_5px_#00ff41]"></div>
          <span className="hidden sm:inline text-zinc-500">UPLINK_ESTABLISHED</span>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-sm border border-aix-border bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#080808] p-6 md:p-10 mb-8 md:mb-12">
           <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full mb-4">
                      <Radio size={12} className="text-aix-green animate-pulse" />
                      <span className="text-[10px] text-zinc-300 tracking-wider">LIVE DATA FEED</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tighter">COMMUNITY NEXUS</h1>
                  <p className="text-zinc-500 text-xs md:text-sm max-w-lg leading-relaxed">
                      Establish a direct neural link with the AIX Hivemind. Join the governance channels and follow the creators.
                  </p>
              </div>
           </div>
        </div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Creator */}
            <a 
              href="https://x.com/MIYAMOTOGALLERY" 
              target="_blank" 
              rel="noreferrer"
              className="group bg-[#050505] border border-aix-border hover:border-zinc-500 p-6 md:p-8 rounded-sm transition-all duration-300 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} className="text-white" />
                </div>
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors">
                    <XLogo size={28} />
                </div>
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-aix-green transition-colors">MIYAMOTO</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Creator & Lead Artist</p>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed mb-6 font-sans">
                    The visionary mind behind the AIX Protocol art galleries. Follow for exclusive 1/1 reveals and artistic direction.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-aix-green"></span>
                    @MIYAMOTOGALLERY
                </div>
            </a>

            {/* Card 2: AIX Official */}
            <a 
              href="https://x.com/AIX_ONLINE" 
              target="_blank" 
              rel="noreferrer"
              className="group bg-[#050505] border border-aix-border hover:border-zinc-500 p-6 md:p-8 rounded-sm transition-all duration-300 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} className="text-white" />
                </div>
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors">
                    <XLogo size={28} />
                </div>
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-aix-green transition-colors">AIX ONLINE</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Official Protocol Feed</p>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed mb-6 font-sans">
                    The central broadcast channel for system updates, partnership announcements, and ecosystem expansion news.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-aix-green"></span>
                    @AIX_ONLINE
                </div>
            </a>

            {/* Card 3: Discord */}
            <a 
              href="https://discord.gg/WbMrRVPgJW" 
              target="_blank" 
              rel="noreferrer"
              className="group bg-[#050505] border border-aix-border hover:border-[#5865F2] p-6 md:p-8 rounded-sm transition-all duration-300 relative overflow-hidden"
            >
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} className="text-white" />
                </div>
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 group-hover:bg-[#5865F2] group-hover:text-white transition-colors text-zinc-400">
                    <DiscordLogo size={32} />
                </div>
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-[#5865F2] transition-colors">DISCORD SERVER</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Community Hub</p>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed mb-6 font-sans">
                    Join the verified holder channels, participate in governance, and connect with other AIX collectors.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <div className="flex -space-x-2">
                         <div className="w-4 h-4 rounded-full bg-zinc-800 border border-black"></div>
                         <div className="w-4 h-4 rounded-full bg-zinc-700 border border-black"></div>
                         <div className="w-4 h-4 rounded-full bg-zinc-600 border border-black"></div>
                    </div>
                    JOIN THE HIVE
                </div>
            </a>

            {/* Card 4: Trustline */}
            <a 
              href="https://xrpl.services/?issuer=rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz&currency=AIX&limit=100000000" 
              target="_blank" 
              rel="noreferrer"
              className="group bg-[#050505] border border-aix-border hover:border-aix-green p-6 md:p-8 rounded-sm transition-all duration-300 relative overflow-hidden"
            >
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} className="text-white" />
                </div>
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 group-hover:bg-aix-green group-hover:text-black transition-colors text-zinc-400">
                    <ShieldCheck size={32} />
                </div>
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-aix-green transition-colors">AIX TRUSTLINE</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">XRPL Network Integration</p>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed mb-6 font-sans">
                    Secure your connection to the ecosystem. Establish a trustline on the XRP Ledger to hold and transact AIX tokens.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-aix-green"></span>
                    XRPL.SERVICES
                </div>
            </a>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center pb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-800 rounded-full hover:bg-zinc-900 transition-colors cursor-pointer group">
                <Globe size={14} className="text-zinc-500 group-hover:text-white" />
                <span className="text-xs text-zinc-500 group-hover:text-white font-mono">AIXONLINE.COM GLOBAL NETWORK</span>
            </div>
        </div>

      </div>
    </div>
  );
};

// Custom SVG Icons
const XLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231h0.001Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const DiscordLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 127.14 96.36" 
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
);

export default Socials;