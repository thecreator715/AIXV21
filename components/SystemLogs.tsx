import React, { useEffect, useState, useRef } from 'react';
import { SystemLog } from '../types';

const INITIAL_LOGS: SystemLog[] = [
  { id: '1', timestamp: '5:07:11 PM', message: 'XRPL Mainnet connection established [wss://s2.ripple.com]', type: 'success' },
  { id: '2', timestamp: '5:07:11 PM', message: 'Syncing ledger 82390123...', type: 'success' },
  { id: '3', timestamp: '5:07:11 PM', message: 'Sentiment analysis module active.', type: 'success' },
  { id: '4', timestamp: '5:07:11 PM', message: 'DEX liquidity pools indexed.', type: 'success' },
  { id: '5', timestamp: '5:07:11 PM', message: 'System integrity check: PASSED', type: 'success' },
  { id: '6', timestamp: '5:07:11 PM', message: 'Awaiting user directive...', type: 'warning' },
  { id: '7', timestamp: '5:07:11 PM', message: 'Traffic spike detected on Node-04', type: 'success' },
  { id: '8', timestamp: '5:07:11 PM', message: 'Optimizing render pipeline for Motion Lab...', type: 'success' },
  { id: '9', timestamp: '5:07:11 PM', message: 'Initializing AIX kernel...', type: 'success' },
];

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>(INITIAL_LOGS);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: SystemLog = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('en-US'),
        message: `System heartbeat tick: ${Math.random().toString(36).substring(7).toUpperCase()}`,
        type: 'info'
      };
      setLogs(prev => [...prev.slice(1), newLog]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col font-mono text-xs p-4 bg-black border border-aix-border rounded-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 text-zinc-500 uppercase tracking-wider text-[10px] border-b border-aix-border pb-2">
        <span>&gt;_ SYSTEM LOGS</span>
        <div className="w-2 h-2 bg-aix-green rounded-full animate-pulse"></div>
      </div>
      
      <div className="flex-1 overflow-hidden relative" ref={containerRef}>
        <div className="absolute bottom-0 left-0 w-full space-y-1.5">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2">
              <span className="text-zinc-600 shrink-0">{log.timestamp}</span>
              <span className={`${
                log.type === 'error' ? 'text-red-500' :
                log.type === 'warning' ? 'text-yellow-500' :
                'text-aix-green'
              }`}>
                {log.message}
              </span>
            </div>
          ))}
          <div className="text-aix-green animate-pulse">_</div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
