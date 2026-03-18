import React from 'react';
import { BarChart2, Activity, Globe, Palette, Music, Trophy, Bot, Info, Share2, Droplets } from 'lucide-react';
import MetricCard from './MetricCard';
import ModuleCard from './ModuleCard';
import SystemLogs from './SystemLogs';
import NetworkTopology from './NetworkTopology';
import { NavigationItem } from '../types';

interface DashboardProps {
    onNavigate: (item: NavigationItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const chartDataMock = Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }));

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto">
      {/* Header Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-[10px] tracking-widest text-zinc-500 font-mono">
          SYSTEM <span className="mx-2">/</span> <span className="text-white">HOME</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <div className="w-1.5 h-1.5 rounded-full bg-aix-green"></div>
          <span className="text-zinc-400">NET_LIVE</span>
          <span className="text-zinc-600 ml-2">V.3.2.1</span>
        </div>
      </div>

      {/* Hero Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 h-auto lg:h-[450px]">
        {/* Main Hero */}
        <div className="col-span-1 lg:col-span-8 bg-aix-panel border border-aix-border rounded-sm relative overflow-hidden grid-bg flex flex-col p-6 md:p-8 h-[500px] md:h-auto">
           {/* Background Overlay Text */}
           <div className="absolute right-0 top-0 text-[120px] md:text-[200px] font-bold text-white opacity-[0.02] leading-none pointer-events-none select-none">
             AIX
           </div>

           <div className="flex-1 z-10 flex flex-col justify-between md:block">
             <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 bg-aix-green/10 border border-aix-green/20 rounded-sm mb-6">
                <div className="w-1.5 h-1.5 bg-aix-green rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-aix-green tracking-widest uppercase">Mainframe Online</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2">
                AIX<span className="text-zinc-600">ONLINE</span>
                </h1>
                <p className="text-zinc-500 tracking-[0.3em] uppercase text-xs md:text-sm mb-8 md:mb-12">
                Advanced Intelligence Protocol
                </p>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:gap-x-12 md:gap-y-8 max-w-lg mb-8 md:mb-12">
               <div>
                 <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Total Supply</div>
                 <div className="text-base md:text-lg text-white font-medium">100,000,000</div>
               </div>
               <div>
                 <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Total Collections</div>
                 <div className="text-base md:text-lg text-white font-medium">15</div>
               </div>
               <div>
                 <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Total Songs</div>
                 <div className="text-base md:text-lg text-white font-medium">10</div>
               </div>
               <div>
                 <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Security</div>
                 <div className="text-base md:text-lg text-aix-green font-medium">ENCRYPTED</div>
               </div>
             </div>

             {/* Buttons */}
             <div className="flex flex-col md:flex-row gap-4">
               <button 
                onClick={() => onNavigate(NavigationItem.TRADE_DEX)}
                className="bg-white text-black px-6 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
               >
                 <BarChart2 size={14} fill="black" />
                 Open Dex Terminal
               </button>
               <button 
                onClick={() => onNavigate(NavigationItem.ABOUT)}
                className="bg-transparent border border-zinc-700 text-white px-6 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-900 hover:border-zinc-500 transition-colors"
               >
                 <Info size={14} />
                 System Manifesto
               </button>
             </div>
           </div>
        </div>

        {/* Right Side Widgets */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 h-[213px]">
             <SystemLogs />
          </div>
          <div className="flex-1 h-[213px]">
             <NetworkTopology />
          </div>
        </div>
      </div>

      <div className="border-t border-aix-border my-6"></div>

      <h3 className="text-[10px] text-zinc-500 uppercase tracking-wider mb-4">Live Metrics</h3>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Market Sentiment" 
          mainValue="BULLISH" 
          subValue="87%" 
          subValueLabel="POSITIVE"
          statusText="BULLISH"
          statusColor="text-aix-green"
          chartData={chartDataMock}
          icon={<Activity size={16} />}
        />
        <MetricCard 
          title="AIX Token Price" 
          mainValue="0.1542 XRP" 
          subValue="+2.5%" 
          subValueLabel="24H"
          statusText="0.1542 XRP"
          statusColor="text-white"
          chartData={chartDataMock}
          icon={<BarChart2 size={16} />}
        />
        <MetricCard 
          title="Total Staked" 
          mainValue="68.2%" 
          subValue="68,200,000" 
          subValueLabel="AIX"
          statusText="68.2%"
          statusColor="text-aix-accent"
          icon={<Globe size={16} />}
        />
        <MetricCard 
          title="Network Health" 
          mainValue="OPTIMAL" 
          subValue="12ms" 
          subValueLabel="LATENCY"
          statusText="OPTIMAL"
          statusColor="text-aix-green"
          icon={<Activity size={16} />}
        />
      </div>

       <div className="border-t border-aix-border my-6"></div>

       <h3 className="text-[10px] text-zinc-500 uppercase tracking-wider mb-4">System Modules</h3>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModuleCard 
          title="Art Gallery"
          description="NFT Collections & Showcases"
          icon={<Palette size={24} />}
          onClick={() => onNavigate(NavigationItem.ART_GALLERY)}
        />
         <ModuleCard 
          title="Music Label"
          description="Streaming & Artist Management"
          icon={<Music size={24} />}
          onClick={() => onNavigate(NavigationItem.MUSIC_LABEL)}
        />
         <ModuleCard 
          title="Rewards"
          description="Staking & Gamification"
          icon={<Trophy size={24} />}
          onClick={() => onNavigate(NavigationItem.REWARDS)}
        />
         <ModuleCard 
          title="Trade DEX"
          description="XMANTIC Terminal Interface"
          icon={<BarChart2 size={24} />}
          onClick={() => onNavigate(NavigationItem.TRADE_DEX)}
        />
        
        {/* Row 2 */}
        <ModuleCard 
          title="Liquidity Pool"
          description="xMagnetic AMM Interface"
          icon={<Droplets size={24} />}
          onClick={() => onNavigate(NavigationItem.AMM_LP_POOL)}
        />
         <ModuleCard 
          title="Wallet"
          description="Manage Assets & Keys"
          icon={<Globe size={24} />}
          onClick={() => onNavigate(NavigationItem.WALLET)}
        />
         <ModuleCard 
          title="Dashboard"
          description="Connected Wallet Details"
          icon={<Activity size={24} />}
          onClick={() => onNavigate(NavigationItem.DASHBOARD)}
        />
         <ModuleCard 
          title="Alpha AI"
          description="Advanced Intelligence Protocol"
          icon={<Bot size={24} />}
          onClick={() => onNavigate(NavigationItem.ALPHA_AI)}
        />
         <ModuleCard 
          title="About System"
          description="Documentation & Manifesto"
          icon={<Info size={24} />}
          onClick={() => onNavigate(NavigationItem.ABOUT)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
