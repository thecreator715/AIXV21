import React, { useState } from 'react';
import { 
  Home, 
  Wallet,
  Palette, 
  Factory,
  Music, 
  ArrowLeftRight, 
  Droplets, 
  Trophy, 
  Bot, 
  Terminal,
  Info, 
  Share2,
  Cpu,
  Menu,
  X
} from 'lucide-react';
import { NavigationItem } from '../types';

interface SidebarProps {
  activeItem: NavigationItem;
  onNavigate: (item: NavigationItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: NavigationItem.HOME, label: 'HOME', icon: <Home size={18} /> },
    { id: NavigationItem.WALLET, label: 'WALLET', icon: <Wallet size={18} /> },
    { id: NavigationItem.ART_GALLERY, label: 'ART GALLERY', icon: <Palette size={18} /> },
    { id: NavigationItem.NFT_FACTORY, label: 'NFT FACTORY', icon: <Factory size={18} /> },
    { id: NavigationItem.MUSIC_LABEL, label: 'AIX MUSIC', icon: <Music size={18} /> },
    { id: NavigationItem.TRADE_DEX, label: 'TRADE DEX', icon: <ArrowLeftRight size={18} /> },
    { id: NavigationItem.AMM_LP_POOL, label: 'AMM LP POOL', icon: <Droplets size={18} /> },
    { id: NavigationItem.REWARDS, label: 'REWARDS', icon: <Trophy size={18} /> },
    { id: NavigationItem.ALPHA_AI, label: 'ALPHA AI', icon: <Cpu size={18} /> },
    { id: NavigationItem.ALPHA_AI_PLATFORM, label: 'ALPHA AI PLATFORM', icon: <Terminal size={18} /> },
    { id: NavigationItem.ABOUT, label: 'ABOUT', icon: <Info size={18} /> },
    { id: NavigationItem.SOCIALS, label: 'SOCIALS', icon: <Share2 size={18} /> },
  ];

  const handleMobileNavigate = (id: NavigationItem) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-black border-b border-aix-border flex items-center justify-between px-4 z-50">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded border border-zinc-700 flex items-center justify-center">
              <Cpu size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wider text-white">AIXONLINE</span>
              <span className="text-[10px] text-zinc-500 tracking-[0.2em]">.COM</span>
            </div>
         </div>
         <button 
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="text-zinc-400 hover:text-white p-2"
         >
           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black pt-20 px-4 pb-8 overflow-y-auto animate-in fade-in duration-200">
           <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileNavigate(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 text-sm tracking-wider transition-all duration-200 rounded-sm border-b border-zinc-900
                  ${activeItem === item.id 
                    ? 'text-white bg-zinc-900/50 border-l-2 border-l-white border-b-transparent' 
                    : 'text-zinc-500 hover:text-zinc-300'
                  }`}
              >
                <span className={`${activeItem === item.id ? 'text-white' : 'text-zinc-600'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mt-8 p-6 border border-aix-border rounded-sm bg-[#0a0a0a]">
            <div className="text-[10px] text-zinc-600 font-mono mb-1">CONNECTION</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-300">SECURE_TLS_1.3</span>
              <div className="w-1.5 h-1.5 rounded-full bg-aix-green shadow-[0_0_5px_#00ff41]"></div>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Existing) */}
      <div className="hidden md:flex w-64 h-screen bg-black border-r border-aix-border flex-col fixed left-0 top-0 z-50">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-aix-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded border border-zinc-700 flex items-center justify-center">
              <Cpu size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wider text-white">AIXONLINE</span>
              <span className="text-[10px] text-zinc-500 tracking-[0.2em]">.COM</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-xs tracking-wider transition-all duration-200 rounded-sm group
                ${activeItem === item.id 
                  ? 'bg-zinc-900 text-white border-l-2 border-white' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                }`}
            >
              <span className={`${activeItem === item.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Footer Status */}
        <div className="p-6 border-t border-aix-border">
          <div className="text-[10px] text-zinc-600 font-mono mb-1">CONNECTION</div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-300">SECURE_TLS_1.3</span>
            <div className="w-1.5 h-1.5 rounded-full bg-aix-green shadow-[0_0_5px_#00ff41]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;