import React from 'react';
import { Trophy, Shield, CheckCircle, Link as LinkIcon, ExternalLink, MessageSquare } from 'lucide-react';

const Rewards: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-black overflow-y-auto font-mono">
      {/* Top Header */}
      <div className="h-10 border-b border-aix-border flex items-center justify-between px-6 bg-[#0a0a0a] shrink-0">
        <div className="text-[10px] text-zinc-500 tracking-wider">
          SYSTEM <span className="mx-2">/</span> <span className="text-zinc-300">REWARDS</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-aix-green shadow-[0_0_5px_#00ff41]"></div>
          <span className="hidden sm:inline text-zinc-500">NET_LIVE</span>
          <span className="text-zinc-600 ml-2">V.3.2.1</span>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
        
        {/* Main Banner */}
        <div className="relative overflow-hidden rounded-sm border border-aix-border bg-gradient-to-r from-[#111] to-[#050505] p-6 md:p-10 mb-8 group">
            <div className="absolute top-0 right-0 p-4 md:p-8 text-right">
                <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-2">Current APY</div>
                <div className="text-3xl md:text-5xl font-bold text-white tracking-tighter group-hover:text-aix-green transition-colors duration-500">DYNAMIC</div>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-aix-panel border border-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                    <Trophy className="text-yellow-500" size={24} />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-white tracking-widest uppercase">NFT STAKING SYSTEM</h1>
            </div>
            
            <p className="text-zinc-400 font-mono text-xs md:text-sm max-w-2xl leading-relaxed border-l-2 border-zinc-800 pl-4">
                Initialize your AIX staking protocols to earn daily rewards. Follow the secure setup procedure below to link your XRPL wallet and verify humanity.
            </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Step 01 */}
            <div className="bg-[#050505] border border-aix-border rounded-sm p-6 md:p-8 relative group hover:border-zinc-600 transition-colors hover:bg-zinc-900/10">
                <div className="absolute top-0 left-0 bg-zinc-900 px-3 py-1 text-[10px] text-zinc-500 font-mono border-b border-r border-aix-border">STEP 01</div>
                
                <div className="mt-6 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/5 flex items-center justify-center mb-6 border border-green-500/20 text-green-500 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
                        <Shield size={24} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 tracking-wider">VERIFY ACCOUNT</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-8 h-12 font-sans">
                        Verification is required to CHAT & STAKE. Perform a simple humanity check to secure the ecosystem.
                    </p>
                    <a 
                        href="https://discord.gg/ZaAEpDhFyU" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#111] border border-zinc-800 text-zinc-300 hover:text-white hover:border-aix-green text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg"
                    >
                        VERIFY ON DISCORD <ExternalLink size={12} />
                    </a>
                </div>
            </div>

            {/* Step 02 */}
             <div className="bg-[#050505] border border-aix-border rounded-sm p-6 md:p-8 relative group hover:border-zinc-600 transition-colors hover:bg-zinc-900/10">
                <div className="absolute top-0 left-0 bg-zinc-900 px-3 py-1 text-[10px] text-zinc-500 font-mono border-b border-r border-aix-border">STEP 02</div>
                
                <div className="mt-6 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/5 flex items-center justify-center mb-6 border border-blue-500/20 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                        <CheckCircle size={24} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 tracking-wider">SET TRUSTLINE</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-8 h-12 font-sans">
                        Establish a connection between your XUMM account and the AIX token to enable staking capabilities.
                    </p>
                    <a 
                        href="https://discord.gg/ZaAEpDhFyU" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#111] border border-zinc-800 text-zinc-300 hover:text-white hover:border-blue-500 text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg"
                    >
                        SETUP TRUSTLINE <ExternalLink size={12} />
                    </a>
                </div>
            </div>

            {/* Step 03 */}
             <div className="bg-[#050505] border border-aix-border rounded-sm p-6 md:p-8 relative group hover:border-zinc-600 transition-colors hover:bg-zinc-900/10">
                <div className="absolute top-0 left-0 bg-zinc-900 px-3 py-1 text-[10px] text-zinc-500 font-mono border-b border-r border-aix-border">STEP 03</div>
                
                <div className="mt-6 mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/5 flex items-center justify-center mb-6 border border-purple-500/20 text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                        <LinkIcon size={24} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 tracking-wider">LINK WALLET</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-8 h-12 font-sans">
                        Finalize integration by linking your XUMM Wallet. This enables daily automated rewards distribution.
                    </p>
                    <div className="w-full py-4 bg-black border border-zinc-800 text-aix-green text-sm font-mono text-center mb-2 tracking-[0.2em] shadow-inner">
                        /link
                    </div>
                    <div className="text-[9px] text-zinc-600 text-center uppercase tracking-wider">
                        ENTER COMMAND IN DISCORD
                    </div>
                </div>
            </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
             <div className="h-px bg-zinc-800 flex-1"></div>
             <h2 className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <span className="text-aix-green font-bold">&gt;_</span> REWARD PROTOCOLS
            </h2>
             <div className="h-px bg-zinc-800 flex-1"></div>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-[#0a0a0a] border border-aix-border p-6 flex flex-col sm:flex-row items-start gap-6 rounded-sm hover:border-zinc-700 transition-colors">
                <div className="bg-zinc-900 p-4 rounded-sm border border-zinc-800 shrink-0">
                    <MessageSquare size={24} className="text-zinc-500" />
                </div>
                <div>
                    <div className="text-aix-green font-mono text-sm mb-2 tracking-wider">/rewards view</div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">VIEW AVAILABLE REWARDS</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                        Displays a comprehensive holographic list of all AIX rewards you are currently eligible to claim based on your staking tier.
                    </p>
                </div>
             </div>

             <div className="bg-[#0a0a0a] border border-aix-border p-6 flex flex-col sm:flex-row items-start gap-6 rounded-sm hover:border-zinc-700 transition-colors">
                <div className="bg-zinc-900 p-4 rounded-sm border border-zinc-800 shrink-0">
                    <MessageSquare size={24} className="text-zinc-500" />
                </div>
                <div>
                    <div className="text-aix-green font-mono text-sm mb-2 tracking-wider">/rewards claim</div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">CLAIM DAILY AIX</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                        Initiates the secure claiming process. Follow the bot prompts to transfer your daily accrued AIX tokens directly to your wallet.
                    </p>
                </div>
             </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 text-center text-zinc-700 text-[10px] font-mono max-w-2xl mx-auto uppercase tracking-wider pb-8">
            By participating in the AIX Staking Program, you agree to the decentralized protocol standards. 
            Stay engaged with the community to maximize your tier benefits.
        </div>

      </div>
    </div>
  );
};

export default Rewards;