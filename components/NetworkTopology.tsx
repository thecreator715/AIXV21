import React from 'react';

const NetworkTopology: React.FC = () => {
  return (
    <div className="h-full bg-black border border-aix-border rounded-sm p-4 relative overflow-hidden flex flex-col">
       <div className="flex items-center justify-between mb-2 text-zinc-500 uppercase tracking-wider text-[10px] border-b border-aix-border pb-2">
        <span><span className="mr-2">☊</span>NETWORK TOPOLOGY</span>
      </div>
      
      <div className="flex-1 w-full h-full relative flex items-center justify-center">
        {/* Simple SVG Graph */}
        <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Edges */}
          <line x1="50" y1="50" x2="100" y2="20" stroke="#333" strokeWidth="1" />
          <line x1="50" y1="50" x2="100" y2="80" stroke="#333" strokeWidth="1" />
          <line x1="150" y1="50" x2="100" y2="20" stroke="#333" strokeWidth="1" />
          <line x1="150" y1="50" x2="100" y2="80" stroke="#333" strokeWidth="1" />
          <line x1="100" y1="20" x2="100" y2="80" stroke="#333" strokeWidth="1" opacity="0.3" />

          {/* Nodes */}
          <circle cx="50" cy="50" r="2" fill="#555" />
          <circle cx="150" cy="50" r="2" fill="#555" />
          <circle cx="100" cy="20" r="2" fill="#555" />
          <circle cx="100" cy="80" r="2" fill="#555" />

          {/* Central Active Node */}
          <circle cx="100" cy="50" r="4" fill="#333" stroke="#555" strokeWidth="1" />
          <circle cx="100" cy="50" r="1.5" fill="#fff" className="animate-pulse" filter="url(#glow)" />
        </svg>
      </div>
    </div>
  );
};

export default NetworkTopology;
