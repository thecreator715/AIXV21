import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AlphaAI from './components/AlphaAI';
import ArtGallery from './components/ArtGallery';
import MusicLabel from './components/MusicLabel';
import TradeDex from './components/TradeDex';
import AmmLpPool from './components/AmmLpPool';
import About from './components/About';
import Rewards from './components/Rewards';
import Socials from './components/Socials';
import WalletPage from './components/WalletPage';
import WalletDashboard from './components/WalletDashboard';
import { NavigationItem } from './types';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavigationItem>(NavigationItem.HOME);

  const renderContent = () => {
    switch (activeItem) {
      case NavigationItem.HOME:
        return <Dashboard onNavigate={setActiveItem} />;
      case NavigationItem.WALLET:
        return <WalletPage onNavigate={setActiveItem} />;
      case NavigationItem.DASHBOARD:
        return <WalletDashboard />;
      case NavigationItem.ALPHA_AI:
        return <AlphaAI />;
      case NavigationItem.ART_GALLERY:
        return <ArtGallery />;
      case NavigationItem.MUSIC_LABEL:
        return <MusicLabel />;
      case NavigationItem.TRADE_DEX:
        return <TradeDex />;
      case NavigationItem.AMM_LP_POOL:
        return <AmmLpPool />;
      case NavigationItem.REWARDS:
        return <Rewards />;
      case NavigationItem.ABOUT:
        return <About />;
      case NavigationItem.SOCIALS:
        return <Socials />;
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
      {/* Adjusted padding top for mobile header (pt-16) and left margin for desktop sidebar (md:ml-64) */}
      <div className="flex-1 md:ml-64 relative flex flex-col h-full overflow-hidden pt-16 md:pt-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;