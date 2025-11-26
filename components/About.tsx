import React from 'react';
import { Info, Hexagon, Shield, Cpu, Zap, Gift, Users, Lock, Globe, Terminal, Database, FileText } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-black overflow-y-auto font-mono">
       {/* Top Header */}
      <div className="h-10 border-b border-aix-border flex items-center justify-between px-6 bg-[#0a0a0a] shrink-0">
        <div className="text-[10px] text-zinc-500 tracking-wider">
          SYSTEM <span className="mx-2">/</span> <span className="text-zinc-300">ABOUT</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
          <span className="text-zinc-500">VERSION_1.0</span>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-sm border border-aix-border bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-[#080808] p-6 md:p-10 mb-8 md:mb-12">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full mb-4">
                  <Terminal size={12} className="text-zinc-400" />
                  <span className="text-[10px] text-zinc-300 tracking-wider">SYSTEM MANIFESTO</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tighter">THE AIX PROTOCOL</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <p className="text-zinc-500 text-sm leading-relaxed">
                    AIX represents the intersection of algorithmic creativity and decentralized infrastructure. We leverage advanced neural networks to synthesize unique 1-of-1 digital artifacts, secured permanently on the XRP Ledger.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4">
                    Our mission is to redefine digital ownership by combining immersive AI art with a robust, community-first tokenomic model. No intermediaries. No pre-sales. Pure code and creativity.
                </p>
              </div>
           </div>
        </div>

        {/* Feature Grid - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Card 1: The Collection */}
            <div className="group bg-[#050505] border border-aix-border hover:border-zinc-600 p-6 md:p-8 rounded-sm transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-900 rounded-sm flex items-center justify-center mb-6 border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                    <Hexagon size={20} />
                </div>
                <div className="mb-2">
                    <h3 className="text-base font-bold text-white tracking-wide">NFT COLLECTION</h3>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">1 of 1 Masterpieces</p>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed">
                   The AIX NFT Collection serves as a testament to the capabilities of generative AI. Each piece is meticulously curated, ensuring that every holder owns a unique digital identity that cannot be replicated.
                </p>
            </div>

            {/* Card 2: AI Process */}
            <div className="group bg-[#050505] border border-aix-border hover:border-zinc-600 p-6 md:p-8 rounded-sm transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-900 rounded-sm flex items-center justify-center mb-6 border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                    <Cpu size={20} />
                </div>
                <div className="mb-2">
                    <h3 className="text-base font-bold text-white tracking-wide">NEURAL SYNTHESIS</h3>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Human-AI Collaboration</p>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed">
                   Our process begins with curated prompts that guide neural networks to explore new artistic frontiers. The result is a seamless fusion of human intent and machine learning precision.
                </p>
            </div>

            {/* Card 3: XRPL */}
            <div className="group bg-[#050505] border border-aix-border hover:border-zinc-600 p-6 md:p-8 rounded-sm transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-900 rounded-sm flex items-center justify-center mb-6 border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                    <Globe size={20} />
                </div>
                <div className="mb-2">
                    <h3 className="text-base font-bold text-white tracking-wide">XRPL INFRASTRUCTURE</h3>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Speed & Security</p>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed">
                   Built on the XRP Ledger for its unparalleled speed, negligible fees, and carbon-neutral footprint. We ensure your assets are secure, transferable, and truly decentralized.
                </p>
            </div>
        </div>

        {/* Feature Grid - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             {/* Card 4: Tokenomics */}
             <div className="group bg-[#050505] border border-aix-border hover:border-zinc-600 p-6 md:p-8 rounded-sm transition-all duration-300 flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                    <div className="w-12 h-12 bg-zinc-900 rounded-sm flex items-center justify-center border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                        <Zap size={20} />
                    </div>
                </div>
                <div>
                    <h3 className="text-base font-bold text-white tracking-wide mb-1">TOKEN UTILITY</h3>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">100% For Collectors</p>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                       We have allocated 100% of the token supply for NFT collectors. By holding an AIX NFT, you unlock daily staking rewards, earning AIX tokens via our automated protocol.
                    </p>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-zinc-900 text-[9px] text-zinc-400 border border-zinc-800">NO TEAM ALLOCATION</span>
                        <span className="px-2 py-1 bg-zinc-900 text-[9px] text-zinc-400 border border-zinc-800">NO VC FUNDING</span>
                    </div>
                </div>
            </div>

            {/* Card 5: Philosophy */}
            <div className="group bg-[#050505] border border-aix-border hover:border-zinc-600 p-6 md:p-8 rounded-sm transition-all duration-300 flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                    <div className="w-12 h-12 bg-zinc-900 rounded-sm flex items-center justify-center border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                        <Shield size={20} />
                    </div>
                </div>
                <div>
                    <h3 className="text-base font-bold text-white tracking-wide mb-1">BOOTSTRAPPED</h3>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">No Presale</p>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                       AIX is 100% self-funded. We avoided IDOs and presales to maintain full creative integrity. We believe true art should be valued for its intrinsic quality, not speculative hype.
                    </p>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-zinc-900 text-[9px] text-zinc-400 border border-zinc-800">ORGANIC GROWTH</span>
                        <span className="px-2 py-1 bg-zinc-900 text-[9px] text-zinc-400 border border-zinc-800">FAIR LAUNCH</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Creator Section */}
        <div className="group bg-[#0a0a0a] border border-aix-border hover:border-zinc-600 p-6 md:p-10 rounded-sm transition-all duration-300 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Database size={120} />
             </div>
             
             <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0">
                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 group-hover:border-white transition-colors">
                        <Users size={32} className="text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white tracking-wide">CHRISTOPHER BRADLEY</h3>
                        <span className="px-2 py-0.5 bg-zinc-800 text-[9px] text-zinc-400 tracking-wider">CREATOR & CURATOR</span>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-2xl mb-6">
                        A visionary entrepreneur with over 30 years of experience in machine architecture and 7+ years in crypto trading. AIX is the culmination of his commitment to innovation, allowing him to unleash imagination without limits. 
                        <br/><br/>
                        Mr. Bradley has generously gifted 100% of the AIX token supply to the AIX Foundation, ensuring that the entire 100,000,000 supply goes directly to the community. He retains 0% allocation.
                    </p>
                    <div className="inline-flex items-center gap-2 text-[10px] text-zinc-400 font-mono border-t border-zinc-800 pt-4">
                        <FileText size={12} />
                        <span>EST. 2024 // ALL RIGHTS RESERVED</span>
                    </div>
                </div>
             </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center pb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-800 rounded-full hover:bg-zinc-900 transition-colors cursor-pointer group">
                <Globe size={14} className="text-zinc-500 group-hover:text-white" />
                <span className="text-xs text-zinc-500 group-hover:text-white font-mono">POWERED BY AIXONLINE PROTOCOL</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;