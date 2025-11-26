import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AIAgent from './components/AIAgent';
import ArtGallery from './components/ArtGallery';
import MusicLabel from './components/MusicLabel';
import TradeDex from './components/TradeDex';
import AmmLpPool from './components/AmmLpPool';
import About from './components/About';
import { NavigationItem } from './types';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavigationItem>(NavigationItem.HOME);

  const renderContent = () => {
    switch (activeItem) {
      case NavigationItem.HOME:
        return <Dashboard onNavigate={setActiveItem} />;
      case NavigationItem.AI_AGENT:
        return <AIAgent />;
      case NavigationItem.ART_GALLERY:
        return <ArtGallery />;
      case NavigationItem.MUSIC_LABEL:
        return <MusicLabel />;
      case NavigationItem.TRADE_DEX:
        return <TradeDex />;
      case NavigationItem.AMM_LP_POOL:
        return <AmmLpPool />;
      case NavigationItem.ABOUT:
        return <About />;
      default:
        // Placeholder for other routes
        return (
          <div className="flex items-center justify-center h-full text-zinc-500 font-mono">
            <div className="text-center">
              <h2 className="text-xl text-white mb-2">{activeItem.replace('_', ' ')}</h2>
              <p>MODULE INITIALIZATION PENDING...</p>
              <button 
                onClick={() => setActiveItem(NavigationItem.HOME)}
                className="mt-6 text-xs border border-zinc-700 px-4 py-2 hover:bg-zinc-800 transition-colors"
              >
                RETURN HOME
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-64 relative flex flex-col h-full overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;