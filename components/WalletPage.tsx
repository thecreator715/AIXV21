import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Eye, EyeOff, Send, Download, RefreshCw, Wallet as WalletIcon, ArrowRightLeft, Image as ImageIcon } from 'lucide-react';
import { xrpToDrops, convertHexToString } from 'xrpl';
import { NavigationItem } from '../types';
import { resolveIPFSUrl } from '../services/pinataService';
import AddressBook from './AddressBook';

interface WalletPageProps {
  onNavigate: (item: NavigationItem) => void;
}

const NFTCard: React.FC<{ nft: any, sendNFT: (nftId: string, destination: string) => Promise<any>, burnNFT: (nftId: string) => Promise<any>, refreshBalances: () => Promise<void> }> = ({ nft, sendNFT, burnNFT, refreshBalances }) => {
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!nft.URI) {
        setLoading(false);
        return;
      }
      
      try {
        let decodedUri = nft.URI;
        // Check if it's a hex string
        if (/^[0-9A-Fa-f]+$/.test(nft.URI)) {
          try {
            decodedUri = convertHexToString(nft.URI);
          } catch (e) {
            console.warn("Failed to decode hex URI", e);
          }
        }
        
        const resolvedUrl = resolveIPFSUrl(decodedUri);
        
        // If it's a JSON metadata file or IPFS link
        if (resolvedUrl.endsWith('.json') || decodedUri.includes('ipfs') || decodedUri.startsWith('Qm') || decodedUri.startsWith('bafy')) {
          try {
            // Try to fetch as JSON first
            const response = await fetch(resolvedUrl);
            
            if (response.ok) {
              const text = await response.text();
              try {
                const data = JSON.parse(text);
                setMetadata(data);
              } catch (parseErr) {
                // If it's not valid JSON, assume it's an image
                setMetadata({ image: resolvedUrl });
              }
            } else {
              // If response is not ok, assume it's an image that might load directly
              setMetadata({ image: resolvedUrl });
            }
          } catch (fetchErr) {
            console.warn("Failed to fetch JSON, falling back to image", fetchErr);
            setMetadata({ image: resolvedUrl });
          }
        } else {
          // It might just be a direct image URL
          setMetadata({ image: resolvedUrl });
        }
      } catch (err) {
        console.error("Error fetching NFT metadata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [nft.URI]);

  const imageUrl = metadata?.image ? resolveIPFSUrl(metadata.image) : metadata?.image_url ? resolveIPFSUrl(metadata.image_url) : null;

  const handleSend = async () => {
    if (!destination) return;
    setIsSending(true);
    try {
      await sendNFT(nft.NFTokenID, destination);
      await refreshBalances();
    } catch (err) {
      console.error("Error sending NFT", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleBurn = async () => {
    setIsBurning(true);
    try {
      await burnNFT(nft.NFTokenID);
      await refreshBalances();
    } catch (err) {
      console.error("Error burning NFT", err);
    } finally {
      setIsBurning(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
      <div className="h-48 bg-zinc-800 flex items-center justify-center relative overflow-hidden group">
        {loading ? (
          <div className="animate-pulse flex items-center justify-center w-full h-full bg-zinc-800">
            <ImageIcon size={24} className="text-zinc-600" />
          </div>
        ) : imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={metadata?.name || 'NFT'} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-600">
            <ImageIcon size={32} className="mb-2 opacity-50" />
            <span className="font-mono text-xs">No Image Data</span>
          </div>
        )}
        
        {metadata?.name && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
            <h4 className="text-white font-bold truncate">{metadata.name}</h4>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-zinc-500 font-mono truncate mb-2" title={nft.NFTokenID}>
            <span className="text-zinc-400">ID:</span> {nft.NFTokenID.substring(0, 16)}...
          </div>
          <div className="text-xs text-zinc-500 font-mono truncate" title={nft.Issuer}>
            <span className="text-zinc-400">Issuer:</span> {nft.Issuer}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <input 
            type="text" 
            placeholder="Destination Address" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-mono"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleSend}
              disabled={isSending || !destination}
              className="flex-1 bg-aix-green/20 hover:bg-aix-green/30 text-aix-green text-[10px] font-bold px-2 py-2 rounded uppercase transition-colors border border-aix-green/30 disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
            <button 
              onClick={handleBurn}
              disabled={isBurning}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-500 text-[10px] font-bold px-2 py-2 rounded uppercase transition-colors border border-red-500/30 disabled:opacity-50"
            >
              {isBurning ? 'Burning...' : 'Burn'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletPage: React.FC<WalletPageProps> = ({ onNavigate }) => {
  const { 
    wallet, 
    savedWallets,
    xrpBalance, 
    aixBalance, 
    nfts, 
    isConnected, 
    generateWallet, 
    importWallet, 
    disconnectWallet, 
    switchWallet,
    removeWallet,
    refreshBalances,
    sendNFT,
    burnNFT,
    client, 
    error 
  } = useWallet();
  const [seedInput, setSeedInput] = useState('');
  const [showSeed, setShowSeed] = useState(false);
  const [activeTab, setActiveTab] = useState<'assets' | 'nfts' | 'send' | 'receive' | 'manage' | 'addressBook'>('assets');
  const [showCommandPopup, setShowCommandPopup] = useState(false);

  // Send form state
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendCurrency, setSendCurrency] = useState<'XRP' | 'AIX'>('XRP');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState('');

  const handleImport = () => {
    if (seedInput) {
      importWallet(seedInput);
      setSeedInput('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSend = async () => {
    if (!wallet || !client || !isConnected) return;
    
    setIsSending(true);
    setSendError('');
    setSendSuccess('');

    try {
      let tx: any;
      if (sendCurrency === 'XRP') {
        tx = {
          TransactionType: 'Payment',
          Account: wallet.address,
          Amount: xrpToDrops(sendAmount),
          Destination: sendAddress
        };
      } else {
        tx = {
          TransactionType: 'Payment',
          Account: wallet.address,
          Amount: {
            currency: 'AIX',
            value: sendAmount,
            issuer: 'rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz'
          },
          Destination: sendAddress
        };
      }

      const prepared = await client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta !== 'string' && result.result.meta.TransactionResult === 'tesSUCCESS') {
        setSendSuccess(`Successfully sent ${sendAmount} ${sendCurrency}!`);
        setSendAddress('');
        setSendAmount('');
        refreshBalances();
      } else {
        const meta = result.result.meta as any;
        setSendError(`Transaction failed: ${meta?.TransactionResult || 'Unknown error'}`);
      }
    } catch (err: any) {
      setSendError(`Error: ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

  if (!wallet) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#050505] text-white p-8 overflow-y-auto">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center my-auto">
          <div className="w-16 h-16 bg-aix-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <WalletIcon size={32} className="text-aix-green" />
          </div>
          <h2 className="text-2xl font-black mb-2">Connect XRPL Wallet</h2>
          <p className="text-zinc-400 mb-8 text-sm">
            Generate a new wallet or import an existing one using your seed phrase to access the AIX ecosystem.
          </p>
          
          {savedWallets.length > 0 && (
            <div className="mb-8 text-left">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">Saved Wallets</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {savedWallets.map((savedWallet, idx) => (
                  <div key={idx} className="bg-black border border-zinc-800 rounded-xl p-3 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                    <div className="truncate mr-3">
                      <div className="font-bold text-sm truncate">{savedWallet.label}</div>
                      <div className="text-xs text-zinc-500 font-mono truncate">{savedWallet.address.substring(0, 16)}...</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button 
                        onClick={() => switchWallet(savedWallet.address)}
                        className="bg-aix-green/10 hover:bg-aix-green/20 text-aix-green text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Connect
                      </button>
                      <button 
                        onClick={() => removeWallet(savedWallet.address)}
                        className="text-zinc-600 hover:text-red-500 transition-colors p-1.5"
                        title="Remove Wallet"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative flex items-center py-4 mt-2">
                <div className="flex-grow border-t border-zinc-800"></div>
                <span className="flex-shrink-0 mx-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t border-zinc-800"></div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <button 
              onClick={generateWallet}
              className="w-full py-3 bg-aix-green text-black font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Generate New Wallet
            </button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-zinc-800"></div>
              <span className="flex-shrink-0 mx-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-zinc-800"></div>
            </div>
            
            <div className="space-y-2">
              <input 
                type="password" 
                placeholder="Enter Wallet Seed (s...)" 
                value={seedInput}
                onChange={(e) => setSeedInput(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-aix-green font-mono text-sm"
              />
              <button 
                onClick={handleImport}
                disabled={!seedInput}
                className="w-full py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Import Wallet
              </button>
              {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
            </div>
          </div>
        </div>
        {showCommandPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl w-96">
              <h2 className="text-xl font-bold mb-4 text-white">XRPL CLI Commands</h2>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="p-2 bg-black rounded"><code>xrpl wallet create</code></li>
                <li className="p-2 bg-black rounded"><code>xrpl wallet balance</code></li>
                <li className="p-2 bg-black rounded"><code>xrpl tx send [amount] [to]</code></li>
              </ul>
              <button onClick={() => setShowCommandPopup(false)} className="mt-6 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-xl w-full transition-colors">Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white">
      <div className="h-16 flex items-center justify-between px-8 border-b border-zinc-800 bg-black/80 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <WalletIcon size={20} className="text-aix-green" />
          <span className="font-black tracking-tighter text-lg">MY WALLET</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-aix-green animate-pulse' : 'bg-red-500'}`}></div>
            {isConnected ? 'XRPL MAINNET' : 'DISCONNECTED'}
          </div>
          <button 
            onClick={disconnectWallet}
            className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest"
          >
            Disconnect
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {/* Wallet Info Card */}
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aix-green/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div>
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Wallet Address</div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="font-mono text-lg">{wallet.address}</div>
                  <button onClick={() => copyToClipboard(wallet.address)} className="text-zinc-500 hover:text-white transition-colors">
                    <Copy size={16} />
                  </button>
                </div>
                
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Wallet Seed</div>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-sm bg-black px-3 py-1.5 rounded border border-zinc-800">
                    {showSeed ? wallet.seed : '••••••••••••••••••••••••••••'}
                  </div>
                  <button onClick={() => setShowSeed(!showSeed)} className="text-zinc-500 hover:text-white transition-colors">
                    {showSeed ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-black/50 border border-zinc-800 rounded-xl p-4 min-w-[140px]">
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">XRP Balance</div>
                  <div className="text-2xl font-black font-mono">{Number(xrpBalance).toFixed(2)}</div>
                </div>
                <div className="bg-black/50 border border-zinc-800 rounded-xl p-4 min-w-[140px]">
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">AIX Balance</div>
                  <div className="text-2xl font-black font-mono text-aix-green">{Number(aixBalance).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 border-b border-zinc-800">
            {['assets', 'nfts', 'send', 'receive', 'manage', 'addressBook'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${
                  activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-aix-green shadow-[0_0_8px_#00ff41]"></div>
                )}
              </button>
            ))}
            <button onClick={() => setShowCommandPopup(true)} className="pb-4 text-sm font-bold tracking-widest uppercase text-indigo-400 hover:text-indigo-200 ml-auto">XRPL CLI</button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'addressBook' && (
              <AddressBook />
            )}
            {activeTab === 'assets' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Your Assets</h3>
                  <button onClick={refreshBalances} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                    <RefreshCw size={14} /> Refresh
                  </button>
                </div>
                
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">X</div>
                    <div>
                      <div className="font-bold">XRP</div>
                      <div className="text-xs text-zinc-500">Ripple</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold">{xrpBalance}</div>
                  </div>
                </div>
                
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-4 hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-aix-green/20 flex items-center justify-center text-aix-green font-bold">A</div>
                      <div>
                        <div className="font-bold">AIX</div>
                        <div className="text-xs text-zinc-500">AIX Token</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-aix-green">{aixBalance}</div>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-3 text-xs font-mono text-zinc-400 space-y-1">
                    <div className="flex justify-between"><span>Issuer:</span> <span className="text-zinc-300">rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz</span></div>
                    <div className="flex justify-between"><span>Currency:</span> <span className="text-zinc-300">AIX</span></div>
                    <div className="flex justify-between"><span>Supply:</span> <span className="text-zinc-300">100,000,000</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nfts' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">My NFTs</h3>
                  <button onClick={refreshBalances} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                    <RefreshCw size={14} /> Refresh
                  </button>
                </div>
                
                {nfts.length === 0 ? (
                  <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
                    <div className="text-zinc-500 mb-4">No NFTs found in this wallet.</div>
                    <button 
                      onClick={() => onNavigate(NavigationItem.MUSIC_LABEL)}
                      className="bg-aix-green text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors"
                    >
                      Mint AIX NFTs
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nfts.map((nft, idx) => (
                      <NFTCard key={idx} nft={nft} sendNFT={sendNFT} burnNFT={burnNFT} refreshBalances={refreshBalances} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'send' && (
              <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6">Send Funds</h3>
                
                {sendError && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm">{sendError}</div>}
                {sendSuccess && <div className="bg-aix-green/10 border border-aix-green/50 text-aix-green p-3 rounded-lg mb-4 text-sm">{sendSuccess}</div>}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Asset</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSendCurrency('XRP')}
                        className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${sendCurrency === 'XRP' ? 'bg-zinc-700 text-white' : 'bg-black text-zinc-500 border border-zinc-800'}`}
                      >
                        XRP
                      </button>
                      <button 
                        onClick={() => setSendCurrency('AIX')}
                        className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${sendCurrency === 'AIX' ? 'bg-aix-green/20 text-aix-green border border-aix-green/30' : 'bg-black text-zinc-500 border border-zinc-800'}`}
                      >
                        AIX
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Destination Address</label>
                    <input 
                      type="text" 
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                      placeholder="r..."
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-aix-green font-mono text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Amount</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-aix-green font-mono text-sm"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
                        {sendCurrency}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSend}
                    disabled={isSending || !sendAddress || !sendAmount}
                    className="w-full py-3 mt-4 bg-aix-green text-black font-bold rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSending ? 'Sending...' : (
                      <>
                        <Send size={18} />
                        Send {sendCurrency}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'receive' && (
              <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Receive Funds</h3>
                <p className="text-zinc-400 text-sm mb-8">Scan this QR code to receive XRP or AIX tokens on the XRPL Mainnet.</p>
                
                <div className="bg-white p-4 rounded-2xl inline-block mb-6">
                  <QRCodeSVG value={wallet.address} size={200} />
                </div>
                
                <div className="bg-black border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="font-mono text-sm truncate mr-4">{wallet.address}</div>
                  <button onClick={() => copyToClipboard(wallet.address)} className="text-aix-green hover:text-white transition-colors flex-shrink-0">
                    <Copy size={18} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'manage' && (
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Manage Wallets</h3>
                  <button 
                    onClick={disconnectWallet}
                    className="text-sm text-red-500 hover:text-red-400 font-bold transition-colors"
                  >
                    Disconnect Current Wallet
                  </button>
                </div>
                
                <div className="space-y-4">
                  {savedWallets.map((savedWallet, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-zinc-900 border rounded-xl p-4 flex items-center justify-between transition-colors ${
                        wallet.address === savedWallet.address 
                          ? 'border-aix-green shadow-[0_0_10px_rgba(0,255,65,0.1)]' 
                          : 'border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{savedWallet.label}</h4>
                          {wallet.address === savedWallet.address && (
                            <span className="bg-aix-green/20 text-aix-green text-[10px] px-2 py-0.5 rounded uppercase font-bold">Active</span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono">{savedWallet.address}</div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {wallet.address !== savedWallet.address && (
                          <button 
                            onClick={() => switchWallet(savedWallet.address)}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                          >
                            Switch
                          </button>
                        )}
                        <button 
                          onClick={() => removeWallet(savedWallet.address)}
                          className="text-zinc-500 hover:text-red-500 transition-colors p-2"
                          title="Remove Wallet"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <h4 className="font-bold mb-4">Add Another Wallet</h4>
                  <div className="flex gap-4">
                    <button 
                      onClick={generateWallet}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
                    >
                      Generate New Wallet
                    </button>
                    <button 
                      onClick={() => {
                        disconnectWallet();
                      }}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
                    >
                      Import Existing Wallet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
