import React from 'react';
import { 
  Home, 
  Palette, 
  Music, 
  ArrowLeftRight, 
  Droplets, 
  Trophy, 
  Bot, 
  Info, 
  Share2,
  Cpu
} from 'lucide-react';
import { NavigationItem } from '../types';

interface SidebarProps {
  activeItem: NavigationItem;
  onNavigate: (item: NavigationItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
  
  const navItems = [
    { id: NavigationItem.HOME, label: 'HOME', icon: <Home size={18} /> },
    { id: NavigationItem.ART_GALLERY, label: 'ART GALLERY', icon: <Palette size={18} /> },
    { id: NavigationItem.MUSIC_LABEL, label: 'MUSIC LABEL', icon: <Music size={18} /> },
    { id: NavigationItem.TRADE_DEX, label: 'TRADE DEX', icon: <ArrowLeftRight size={18} /> },
    { id: NavigationItem.AMM_LP_POOL, label: 'AMM LP POOL', icon: <Droplets size={18} /> },
    { id: NavigationItem.REWARDS, label: 'REWARDS', icon: <Trophy size={18} /> },
    { id: NavigationItem.AI_AGENT, label: 'AI AGENT', icon: <Bot size={18} /> },
    { id: NavigationItem.ABOUT, label: 'ABOUT', icon: <Info size={18} /> },
    { id: NavigationItem.SOCIALS, label: 'SOCIALS', icon: <Share2 size={18} /> },
  ];

  return (
    <div className="w-64 h-screen bg-black border-r border-aix-border flex flex-col fixed left-0 top-0 z-50">
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
  );
};

export default Sidebar;