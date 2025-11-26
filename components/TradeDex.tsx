import React from 'react';
import { ExternalLink } from 'lucide-react';

const TradeDex: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-black">
      <div className="px-6 py-4 border-b border-aix-border flex items-center justify-between bg-[#0a0a0a]">
        <div>
          <h1 className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
            TRADE DEX <span className="text-zinc-500">//</span> XMANTIC TERMINAL
          </h1>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-aix-green rounded-full animate-pulse"></span>
            <span className="text-[10px] text-zinc-500 font-mono">LIVE FEED</span>
        </div>
      </div>
      <div className="flex-1 relative bg-black">
        <iframe 
            src="https://xmagnetic.org/dex/AIX+rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz_XRP+XRP?network=mainnet"
            title="Trade DEX"
            className="w-full h-full border-none"
            allow="clipboard-write"
        />
        <div className="absolute bottom-4 right-4 pointer-events-none opacity-50">
            <ExternalLink className="text-zinc-700 w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

export default TradeDex;