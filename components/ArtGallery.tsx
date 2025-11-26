import React, { useState } from 'react';
import { Palette, Grid, List, Heart, ExternalLink, Search } from 'lucide-react';
import { NFTCollection } from '../types';

const COLLECTIONS: NFTCollection[] = [
  {
    id: 'fwendz',
    title: 'FWENDZ | xrp.cafe',
    description: 'FWENDZ BY MIYAMOTO represents a groundbreaking collection of only 500 exclusive NFTs that have been meticulously designed and crafted by the renowned artist Miyamoto.',
    url: 'https://xrp.cafe/collection/fwendz'
  },
  {
    id: 'beautifulpeople',
    title: 'AIX - Beautiful People V1',
    description: 'Beautiful People V1 by AIX is an exceptional collection that serves as a true testament to the captivating allure of digital art. Meticulous attention to detail.',
    url: 'https://xrp.cafe/collection/beautifulpeoplev1'
  },
  {
    id: 'superhero',
    title: 'AIX - Superhero Mutations V1',
    description: 'This collection showcases 30 stunning 1 of 1 rare NFTs, each featuring Superheroes that have undergone fascinating mutations. Prepare to be captivated.',
    url: 'https://xrp.cafe/collection/superheromutationsv1'
  },
  {
    id: 'pixelbros',
    title: 'AIX - PIXEL BROS V1',
    description: 'Welcome to the world of the Pixel Bros, a collective of digital 3D pixelated cyber hackers from the future. They utilize their skills for the greater good.',
    url: 'https://xrp.cafe/collection/pixelbros'
  },
  {
    id: 'aixapes',
    title: 'AIX - 3D ABSTRACT MUTANT APE CLUB',
    description: 'Dive into a world where creativity knows no bounds, and imagination takes center stage as we explore the depths of evolution and humanity.',
    url: 'https://xrp.cafe/collection/aixapes'
  },
  {
    id: 'zombieapes',
    title: 'Zombie Mutant Ape Club V1',
    description: 'The mighty Zombie Mutant Ape Club honors the illustrious Bored Ape Yacht Club by merging value and sheer amazingness on these gorgeous NFTs on XRPL.',
    url: 'https://xrp.cafe/collection/zombiemutantapeclub'
  },
  {
    id: 'koolkidzv1',
    title: 'KOOLKIDZ V1 (1st Generation)',
    description: 'Embark on an exhilarating journey through the fantastical world of 3700 TOTAL KOOLKIDZ. Ordinary kids morph into mutants, aliens, and monsters.',
    url: 'https://xrp.cafe/collection/koolkidz'
  },
  {
    id: 'koolkidzv2',
    title: 'KOOLKIDZ V2 (1st Generation)',
    description: 'Continuing the journey through the fantastical world of KOOLKIDZ. Vibrant and colorful universe where ordinary kids morph into mutants.',
    url: 'https://xrp.cafe/collection/koolkidzv2'
  },
  {
    id: 'koolkidzv3',
    title: 'KOOLKIDZ V3 (1st Generation)',
    description: 'The saga continues. Immerse yourself in a vibrant and colorful universe where ordinary kids morph into mutants, aliens, monsters.',
    url: 'https://xrp.cafe/collection/koolkidzv3'
  },
   {
    id: 'koolkidzv4',
    title: 'KOOLKIDZ V4 (1st Generation)',
    description: 'Navigate through challenges and obstacles as you strive to collect these unique digital identities.',
    url: 'https://xrp.cafe/collection/koolkidzv4'
  },
  {
    id: 'koolkidzv5',
    title: 'KOOLKIDZ V5 (1st Generation)',
    description: '5th installment of the legendary KOOLKIDZ series by Miyamoto.',
    url: 'https://xrp.cafe/collection/koolkidzv5'
  },
  {
    id: 'koolkidzv6',
    title: 'KOOLKIDZ V6 (1st Generation)',
    description: 'More mutants, more aliens, more monsters. The collection grows stronger.',
    url: 'https://xrp.cafe/collection/koolkidzv6'
  },
   {
    id: 'koolkidzv7',
    title: 'KOOLKIDZ V7 (1st Generation)',
    description: 'The final wave of the first generation. A must have for collectors.',
    url: 'https://xrp.cafe/collection/koolkidzv7'
  },
   {
    id: 'koolkidzv9',
    title: 'KOOLKIDZ V9 Halloween (2nd Gen)',
    description: 'Spooky special edition. Halloween Limited Edition 2nd Generation KOOLKIDZ.',
    url: 'https://xrp.cafe/collection/koolkidz-v9'
  },
   {
    id: 'koolkidzv10',
    title: 'KOOLKIDZ V10 Halloween (3rd Gen)',
    description: 'The latest evolution. 3rd Generation Halloween Limited Edition.',
    url: 'https://xrp.cafe/collection/koolkidzv10'
  }
];

// Helper to generate a consistent color gradient based on string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c1 = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  const c2 = ((hash * 2) & 0x00FFFFFF).toString(16).toUpperCase();
  return `linear-gradient(135deg, #${"00000".substring(0, 6 - c1.length) + c1}, #${"00000".substring(0, 6 - c2.length) + c2})`;
};

const ArtGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) newFavs.delete(id);
    else newFavs.add(id);
    setFavorites(newFavs);
  };

  const filteredCollections = COLLECTIONS.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-black p-8 overflow-y-auto">
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-aix-border pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
            <Palette className="text-purple-500" />
            ART GALLERY
          </h1>
          <p className="text-zinc-500 font-mono text-xs tracking-wider">CURATED NFT COLLECTIONS</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-aix-panel border border-aix-border rounded-full py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-purple-500 w-48 transition-all"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>

          <div className="flex bg-aix-panel rounded-lg p-1 border border-aix-border">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}`}>
        {filteredCollections.map((item) => (
          <a 
            key={item.id} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`group block bg-aix-panel border border-aix-border rounded-sm hover:border-purple-500/50 transition-all duration-300 overflow-hidden relative
              ${viewMode === 'list' ? 'flex h-24 items-center' : 'h-auto'}
            `}
          >
            {/* Image Placeholder */}
            <div 
              className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-square w-full' : 'w-24 h-full shrink-0'}`}
              style={{ background: stringToColor(item.title) }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              {viewMode === 'grid' && (
                 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                   <ExternalLink size={16} className="text-white drop-shadow-md" />
                 </div>
              )}
            </div>

            {/* Content */}
            <div className={`p-4 flex-1 flex flex-col justify-between ${viewMode === 'grid' ? 'h-40' : 'h-full'}`}>
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-sm font-bold text-white leading-tight group-hover:text-purple-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <button 
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="text-zinc-500 hover:text-red-500 transition-colors"
                  >
                    <Heart size={16} fill={favorites.has(item.id) ? "currentColor" : "none"} className={favorites.has(item.id) ? "text-red-500" : ""} />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
              
              {viewMode === 'grid' && (
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-dashed border-aix-border">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-600">xrp.cafe</span>
                  <div className="h-px flex-1 bg-zinc-800"></div>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArtGallery;
