import React from 'react';
import { Droplets } from 'lucide-react';

const AmmLpPool: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-black">
      <div className="px-6 py-4 border-b border-aix-border flex items-center justify-between bg-[#0a0a0a]">
        <div>
          <h1 className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
            AMM LP POOL <span className="text-zinc-500">//</span> LIQUIDITY INTERFACE
          </h1>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-aix-green rounded-full animate-pulse"></span>
            <span className="text-[10px] text-zinc-500 font-mono">CONNECTED</span>
        </div>
      </div>
      <div className="flex-1 relative bg-black">
        <iframe 
            src="https://xmagnetic.org/amm/AIX+rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz_XRP+XRP?network=mainnet"
            title="AMM LP Pool"
            className="w-full h-full border-none"
            allow="clipboard-write"
        />
      </div>
    </div>
  );
};

export default AmmLpPool;