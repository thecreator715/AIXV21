import React, { useState, useEffect } from 'react';
import { Copy, QrCode, Settings, Clock, BarChart2, Image as ImageIcon, ArrowRightLeft, RefreshCw } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const WalletDashboard: React.FC = () => {
  const { wallet, xrpBalance, aixBalance, nfts, transactions } = useWallet();

  // Mock data to mimic the screenshot
  const tokens = [
    { name: 'XRP', balance: xrpBalance, value: '' },
    { name: 'AIX', balance: aixBalance, value: '' },
  ];

  const displayTransactions = transactions.map((tx: any) => ({
    type: tx.tx?.TransactionType || 'Unknown',
    time: tx.tx?.date ? new Date(tx.tx.date * 1000).toLocaleString() : 'N/A',
    value: tx.tx?.Amount ? (typeof tx.tx.Amount === 'string' ? `${Number(tx.tx.Amount) / 1000000} XRP` : `${tx.tx.Amount.value} ${tx.tx.Amount.currency}`) : undefined
  }));

  if (!wallet) return <div className="p-8 text-zinc-500">Please connect your wallet.</div>;

  return (
    <div className="h-full bg-[#050505] text-white p-6 grid grid-cols-1 md:grid-cols-12 gap-6 font-mono overflow-y-auto">
      {/* Left Sidebar */}
      <div className="md:col-span-3 bg-[#0a0a0a] border border-zinc-800 rounded-sm p-6 flex flex-col items-center h-fit">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 mb-4 border-4 border-zinc-900"></div>
        <h2 className="text-xl font-bold mb-1">No username</h2>
        <div className="text-[10px] text-aix-green mb-4">Active an hour ago</div>
        <div className="text-[10px] text-zinc-500 mb-6 flex items-center gap-2 bg-black px-2 py-1 rounded">
          {wallet.address.substring(0, 10)}...{wallet.address.substring(wallet.address.length - 5)}
          <Copy size={12} className="cursor-pointer hover:text-white" />
        </div>
        <button className="w-full bg-aix-green text-black font-bold py-2 rounded-sm mb-4 text-xs hover:bg-aix-green/90">Connect</button>
        <div className="w-full space-y-2 text-[10px] text-zinc-400">
          <div className="p-3 border border-zinc-800 rounded-sm cursor-pointer hover:bg-zinc-900 flex justify-between">NFT data <span className='text-zinc-600'>&gt;</span></div>
          <div className="p-3 border border-zinc-800 rounded-sm cursor-pointer hover:bg-zinc-900 flex justify-between">Account settings <span className='text-zinc-600'>&gt;</span></div>
          <div className="p-3 border border-zinc-800 rounded-sm cursor-pointer hover:bg-zinc-900 flex justify-between">Historical data <span className='text-zinc-600'>&gt;</span></div>
        </div>
      </div>

      {/* Center Column */}
      <div className="md:col-span-5 space-y-6">
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-sm p-6">
          <div className="text-[10px] text-zinc-500 mb-1">Wallet Address</div>
          <div className="text-sm font-bold font-mono truncate">{wallet.address}</div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-sm p-6">
          <div className="flex gap-6 mb-6 text-[10px] text-zinc-500 uppercase tracking-wider">
            <span className="text-white border-b border-aix-green pb-1">All (235)</span>
            <span className='hover:text-zinc-300 cursor-pointer'>Tokens (144)</span>
            <span className='hover:text-zinc-300 cursor-pointer'>LP Tokens (91)</span>
          </div>
          <div className="space-y-4">
            {tokens.map((t, i) => (
              <div key={i} className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-zinc-800'></div>
                  <div className="font-bold text-sm">{t.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">{t.balance}</div>
                  <div className="text-[10px] text-zinc-500">{t.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-sm p-6">
          <h3 className="font-bold text-sm mb-4 flex justify-between">NFTs <span className='text-[10px] text-zinc-500 cursor-pointer hover:text-white'>View all</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {nfts.slice(0, 6).map((n, i) => (
              <div key={i} className="bg-black p-2 rounded-sm border border-zinc-900">
                <div className="h-20 bg-zinc-900 mb-2 rounded-sm"></div>
                <div className="text-[10px] font-bold truncate">{n.NFTokenID.substring(0, 10)}...</div>
                <div className="text-[9px] text-zinc-500">{n.Issuer.substring(0, 10)}...</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:col-span-4 space-y-6">
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-sm p-6">
          <h3 className="font-bold text-sm mb-6 flex justify-between items-center">
            Transactions 
            <div className='flex gap-2 text-zinc-500'>
                <RefreshCw size={14} className='cursor-pointer hover:text-white'/>
                <Settings size={14} className='cursor-pointer hover:text-white'/>
                <span className='text-[10px] cursor-pointer hover:text-white'>View all</span>
            </div>
          </h3>
          <div className="space-y-4">
            {displayTransactions.map((t, i) => (
              <div key={i} className="text-xs border-b border-zinc-900 pb-4">
                <div className="font-bold mb-1">{t.type}</div>
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>{t.time}</span>
                  {t.value && <span className="text-aix-green">{t.value}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
