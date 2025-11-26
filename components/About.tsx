import React from 'react';
import { Info, Hexagon, Shield, Cpu, Zap, Gift, Users, Lock, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-black overflow-y-auto">
       <div className="flex items-center justify-between px-8 py-6 border-b border-aix-border sticky top-0 bg-black/95 backdrop-blur z-10">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
            <Info className="text-aix-accent" />
            ABOUT SYSTEM
          </h1>
          <p className="text-zinc-500 font-mono text-xs tracking-wider">DOCUMENTATION & MANIFESTO</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded text-xs font-mono text-white border border-zinc-700">
          AIX PROTOCOL V1.0
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full p-8 pb-20 space-y-16">
        
        {/* Intro Section */}
        <section className="relative">
          <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-aix-accent to-transparent hidden lg:block"></div>
          <h2 className="text-4xl font-bold text-white mb-6">Welcome to the Future of Digital AI Art</h2>
          <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed space-y-4">
            <p>
              Welcome to AIX, where art meets technology in the most innovative and captivating way. We are a pioneering company that leverages the power of AI to create unique, one-of-a-kind digital art NFTs. Our mission is to redefine the boundaries of digital art and provide a platform to showcase AI art and connect with a global audience.
            </p>
            <p>
              We believe that art should be accessible, immersive, and reflective of the digital age we live in. By combining cutting-edge AI technology with artistic creativity, we push the boundaries of what is possible in the realm of digital art. Our curator works to create captivating and visually stunning digital art pieces that captivate and inspire.
            </p>
            <p>
              At AIX, we are committed to ensuring the authenticity, provenance, and security of each artwork. Digital ledger technology (DLT) provides a robust and transparent system for verifying the ownership and uniqueness of each digital art NFT on the XRPL, giving collectors the confidence and trust they deserve.
            </p>
          </div>
        </section>

        {/* Collection Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
             <div className="w-full aspect-square bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-aix-accent/20 to-transparent opacity-50"></div>
                <Hexagon size={120} className="text-white/10 group-hover:scale-110 transition-transform duration-700" strokeWidth={0.5} />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-aix-accent/50 tracking-widest">
                  1 OF 1 MASTERPIECE
                </div>
             </div>
           </div>
           <div className="order-1 md:order-2">
             <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-aix-accent"></span>
                AIX NFT Collection
             </h3>
             <h4 className="text-lg text-zinc-300 mb-4">Unmatched Digital AI 1 of 1 Masterpieces</h4>
             <p className="text-zinc-400 mb-4 leading-relaxed">
               Welcome to The AIX NFT Collection, an extraordinary showcase of unique and one-of-a-kind digital art NFTs created by AIX. Our collection represents the intersection of art, technology, and innovation, where AI-driven creativity takes center stage.
             </p>
             <p className="text-zinc-400 leading-relaxed">
                What sets The AIX NFT Collection apart is our commitment to creating truly unique and exclusive digital art NFTs. Leveraging the power of AI, we ensure that each artwork is a one-of-a-kind masterpiece. Our AI algorithms generate intricate patterns, textures, and compositions that are impossible to replicate.
             </p>
           </div>
        </section>

        {/* Collectors Section */}
        <section>
          <div className="bg-zinc-900/30 border border-aix-border p-8 rounded-sm">
             <div className="flex items-start gap-4 mb-6">
                <Users className="text-white w-8 h-8 shrink-0" />
                <div>
                   <h3 className="text-2xl font-bold text-white">AIX NFT Collectors</h3>
                   <p className="text-aix-accent text-sm font-mono mt-1">EXPERIENCE THE FUTURE OF COLLECTING</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 text-sm">
               <div>
                 <p className="mb-4">
                   Our ecosystem is designed to provide a seamless and immersive experience for collectors, allowing them to unlock the full potential of digital collectibles. With AIX, NFT Collectors have the opportunity to own one-of-a-kind digital assets that are authenticated and secured using DLT.
                 </p>
                 <p>
                    As a collector on our platform, you have the ability to buy, sell, and trade NFTs with other members of the community. This creates a vibrant marketplace where the value of NFTs is determined by the demand and preferences of the collectors themselves.
                 </p>
               </div>
               <div>
                  <p className="mb-4">
                    AIX is committed to ensuring the authenticity and provenance of each NFT. The XRPL allows for transparent ownership records and verifiable transactions.
                  </p>
                  <p>
                    We understand that collecting digital assets is not just about ownership, but also about the experience and community. That's why we foster a vibrant and inclusive community of collectors in our discord and twitter.
                  </p>
               </div>
             </div>
          </div>
        </section>

        {/* AI Process */}
        <section className="flex flex-col gap-6">
           <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Cpu className="text-aix-green" />
              AIX AI Process
           </h3>
           <div className="border-l-2 border-zinc-800 pl-6 space-y-6">
             <div className="relative">
               <div className="absolute -left-[31px] top-0 w-4 h-4 bg-black border-2 border-zinc-600 rounded-full"></div>
               <h4 className="text-white font-bold mb-2">Curated Foundation</h4>
               <p className="text-zinc-400 text-sm">The AI process of generation begins with our curator creating a diverse range of artistic styles, techniques, and inspirations.</p>
             </div>
             <div className="relative">
               <div className="absolute -left-[31px] top-0 w-4 h-4 bg-black border-2 border-zinc-600 rounded-full"></div>
               <h4 className="text-white font-bold mb-2">Algorithmic Synthesis</h4>
               <p className="text-zinc-400 text-sm">Our AI algorithms analyze patterns, textures, and compositions from a vast database of artistic references, allowing them to generate unique and visually striking elements.</p>
             </div>
             <div className="relative">
               <div className="absolute -left-[31px] top-0 w-4 h-4 bg-black border-2 border-aix-green rounded-full shadow-[0_0_10px_rgba(0,255,65,0.3)]"></div>
               <h4 className="text-white font-bold mb-2">Human-AI Collaboration</h4>
               <p className="text-zinc-400 text-sm">What sets our AI process apart is the seamless collaboration between technology and human creativity. AIX works closely with the detailed prompts of AI algorithms, guiding and refining the generated outputs.</p>
             </div>
           </div>
        </section>

        {/* Token Utility Grid */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">AIX Token Utility</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-aix-panel p-6 border border-aix-border hover:border-aix-accent transition-colors">
               <Zap className="text-aix-accent mb-4" />
               <h4 className="font-bold text-white mb-2">100% For Collectors</h4>
               <p className="text-xs text-zinc-400">We have allocated 100% of the token supply for NFT collectors. Every AIX NFT has the opportunity to acquire and own AIX tokens daily.</p>
             </div>
             <div className="bg-aix-panel p-6 border border-aix-border hover:border-aix-accent transition-colors">
               <Lock className="text-aix-accent mb-4" />
               <h4 className="font-bold text-white mb-2">Staking Rewards</h4>
               <p className="text-xs text-zinc-400">The AIX staking will rewards until the 100,000,000 total supply is distributed. You can compound for a later date.</p>
             </div>
             <div className="bg-aix-panel p-6 border border-aix-border hover:border-aix-accent transition-colors">
               <Globe className="text-aix-accent mb-4" />
               <h4 className="font-bold text-white mb-2">XRPL Security</h4>
               <p className="text-xs text-zinc-400">Leveraging the power of advanced distributed ledger technology using the XRPL. Ensuring secure and verifiable transactions.</p>
             </div>
          </div>
        </section>

        {/* Why AIX & XRPL */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div>
             <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">Why AIX?</h3>
             <p className="text-zinc-400 text-sm mb-4">
               One of the primary reasons to choose AIX is its commitment to decentralization. AIX ensures that 100% of the token supply is dedicated to the NFT collectors.
             </p>
             <p className="text-zinc-400 text-sm">
               By offering attractive daily NFT staking rewards, AIX enhances the overall experience for collectors and encourages active participation within the community.
             </p>
           </div>
           <div>
             <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">Why the XRPL?</h3>
             <p className="text-zinc-400 text-sm mb-4">
               The XRPL is a decentralized, open-source distributed ledger that offers a unique consensus algorithm designed for energy efficiency, speed, security and scalability.
             </p>
             <p className="text-zinc-400 text-sm">
               We can offer our users fast and secure transactions with low fees and high throughput.
             </p>
           </div>
        </section>

        {/* No Presale */}
        <section className="bg-gradient-to-r from-zinc-900 to-black p-8 border border-zinc-800 rounded-sm">
           <h3 className="text-2xl font-bold text-white mb-2">No Presale 100% Bootstrapped</h3>
           <p className="text-aix-green font-mono text-xs tracking-widest mb-6">FORGED WITH PASSION, FUNDED BY DEDICATION</p>
           <div className="text-zinc-400 text-sm space-y-4 columns-1 md:columns-2 gap-8">
              <p>Unlike many other projects, AIX is 100% bootstrapped, meaning we have self-funded our entire venture. This allows AIX to maintain full creative control.</p>
              <p>By avoiding a presale and or an IDO, we prioritize the quality and integrity of our art over short-term financial gains.</p>
              <p>We believe that true art should be appreciated for its intrinsic value and not solely for its speculative potential.</p>
           </div>
        </section>

        {/* Intellectual Property & Value */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield size={18} className="text-zinc-500" />
                AIX Intellectual Property
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                You Have 100% Control Over Your AIX NFT. When you purchase a NFT with AIX, you retain the intellectual property rights to your work.
              </p>
              <p className="text-zinc-400 text-sm">
                 This means that you have the exclusive right to reproduce, distribute, and display your art as you see fit.
              </p>
            </div>
            <div>
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                 <Gift size={18} className="text-zinc-500" />
                 Value After Purchase
               </h3>
               <p className="text-zinc-400 text-sm mb-4">
                  With AIX, your NFTs start working for you from day one, earning you daily staking rewards via our innovative custom AIX NFT staking bot.
               </p>
               <p className="text-zinc-400 text-sm bg-zinc-900/50 p-3 border-l-2 border-aix-accent">
                 Exclusive Gift: Each AIX NFT will come bundled with an exclusive 1/1 premium t-shirt. Available in 2024.
               </p>
            </div>
        </section>

         {/* Creator Section */}
         <section className="bg-aix-panel border border-aix-border p-8 rounded-sm">
            <h3 className="text-2xl font-bold text-white mb-6">Creator & Curator of AIX</h3>
            <div className="flex flex-col md:flex-row gap-8">
               <div className="flex-1 text-zinc-400 text-sm space-y-4">
                  <p className="font-bold text-white">Christopher Bradley</p>
                  <p>
                    A visionary entrepreneur with a wealth of experience in both the software and trading industries. With a career spanning 30+ years building on machines along with 15+ years in the traditional software business and 7+ years in crypto trading.
                  </p>
                  <p>
                    AIX is the culmination of his vast experience and unwavering commitment to innovation. At its core, AIX is a platform that allows Mr. Bradley to unleash his imagination without any limits.
                  </p>
                  <p>
                    Mr. Bradley has generously gifted 100% of the AIX token supply to the AIX foundation. This ensures that the entire supply, amounting to 100,000,000 tokens, goes directly to NFT collectors.
                  </p>
               </div>
               <div className="w-full md:w-1/3 bg-black border border-zinc-800 p-6 flex items-center justify-center flex-col text-center">
                  <div className="w-24 h-24 bg-zinc-800 rounded-full mb-4 flex items-center justify-center">
                    <User size={32} className="text-zinc-500" />
                  </div>
                  <div className="text-xs font-mono text-aix-green mb-2">0% ALLOCATION</div>
                  <p className="text-[10px] text-zinc-500">
                    Mr. Bradley retains 0% of the AIX token supply, exemplifying the true meaning of building for the long term.
                  </p>
               </div>
            </div>
         </section>

         <div className="text-center text-[10px] text-zinc-600 font-mono pt-12 border-t border-zinc-900">
            AIXONLINE PROTOCOL // EST 2024 // ALL RIGHTS RESERVED
         </div>

      </div>
    </div>
  );
};

export default About;

// Simple Icon component for the bottom section
const User = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);