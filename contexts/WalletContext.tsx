import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Client, Wallet, AccountLinesRequest, AccountObjectsRequest, AccountNFTsRequest } from 'xrpl';

export interface SavedWallet {
  address: string;
  seed: string;
  label: string;
}

export interface WalletContextType {
  wallet: Wallet | null;
  savedWallets: SavedWallet[];
  xrpBalance: string;
  aixBalance: string;
  nfts: any[];
  transactions: any[];
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  generateWallet: () => void;
  importWallet: (seed: string) => void;
  disconnectWallet: () => void;
  switchWallet: (address: string) => void;
  removeWallet: (address: string) => void;
  refreshBalances: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  sendNFT: (nftId: string, destination: string) => Promise<any>;
  burnNFT: (nftId: string) => Promise<any>;
  sendXRP: (amount: string, destination: string) => Promise<any>;
  sendAIX: (amount: string, destination: string) => Promise<any>;
  client: Client | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const AIX_ISSUER = 'rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz';
const AIX_CURRENCY = 'AIX';
const SAVED_WALLETS_KEY = 'aix_saved_wallets';
const ACTIVE_WALLET_KEY = 'aix_active_wallet';

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [savedWallets, setSavedWallets] = useState<SavedWallet[]>([]);
  const [xrpBalance, setXrpBalance] = useState<string>('0');
  const [aixBalance, setAixBalance] = useState<string>('0');
  const [nfts, setNfts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  // Load saved wallets on mount
  useEffect(() => {
    try {
      const storedWallets = localStorage.getItem(SAVED_WALLETS_KEY);
      const activeAddress = localStorage.getItem(ACTIVE_WALLET_KEY);
      
      if (storedWallets) {
        const parsedWallets: SavedWallet[] = JSON.parse(storedWallets);
        setSavedWallets(parsedWallets);
        
        if (activeAddress) {
          const active = parsedWallets.find(w => w.address === activeAddress);
          if (active) {
            setWallet(Wallet.fromSeed(active.seed));
          }
        }
      }
    } catch (err) {
      console.error("Error loading wallets from local storage", err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const newClient = new Client('wss://xrplcluster.com');
    setClient(newClient);

    newClient.on('connected', () => {
      if (isMounted) setIsConnected(true);
    });

    newClient.on('disconnected', () => {
      if (isMounted) setIsConnected(false);
    });

    const connectClient = async () => {
      try {
        await newClient.connect();
      } catch (err) {
        console.error("Failed to connect to XRPL:", err);
      }
    };

    connectClient();

    return () => {
      isMounted = false;
      setIsConnected(false);
      newClient.disconnect();
    };
  }, []);

  const ensureConnected = async () => {
    if (!client) return false;
    if (!client.isConnected()) {
      try {
        await client.connect();
        return true;
      } catch (err) {
        console.error("Failed to connect to XRPL:", err);
        return false;
      }
    }
    return true;
  };

  const refreshBalances = async () => {
    if (!wallet || !(await ensureConnected())) return;
    
    try {
      setError(null);
      // Get XRP Balance
      const response = await client!.request({
        command: 'account_info',
        account: wallet.address,
        ledger_index: 'validated'
      });
      
      const balanceDrops = response.result.account_data.Balance;
      setXrpBalance((Number(balanceDrops) / 1000000).toString());

      // Get AIX Balance
      const linesResponse = await client!.request({
        command: 'account_lines',
        account: wallet.address,
        peer: AIX_ISSUER
      } as AccountLinesRequest);

      const aixLine = linesResponse.result.lines.find(line => line.currency === AIX_CURRENCY);
      setAixBalance(aixLine ? aixLine.balance : '0');

      // Get NFTs
      const nftsResponse = await client!.request({
        command: 'account_nfts',
        account: wallet.address
      } as AccountNFTsRequest);

      setNfts(nftsResponse.result.account_nfts);

    } catch (err: any) {
      console.error("Error fetching balances:", err);
      const errorMessage = err.message || (err.data && err.data.error) || "";
      if (errorMessage.includes('actNotFound') || errorMessage.toLowerCase().includes('account not found')) {
        setXrpBalance('0');
        setAixBalance('0');
        setNfts([]);
        setError("Wallet is unfunded. Send at least 10 XRP to this address to activate it on the XRPL.");
      } else {
        setError(errorMessage || "Failed to fetch balances");
      }
    }
  };

  const fetchTransactions = async () => {
    if (!wallet || !(await ensureConnected())) return;
    try {
      const response = await client!.request({
        command: 'account_tx',
        account: wallet.address,
        limit: 10
      } as any);
      setTransactions(response.result.transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    if (wallet && isConnected) {
      refreshBalances();
      fetchTransactions();
    } else if (!wallet) {
      setXrpBalance('0');
      setAixBalance('0');
      setNfts([]);
      setTransactions([]);
    }
  }, [wallet, isConnected]);

  const saveWalletLocally = (newWallet: Wallet, label: string) => {
    setSavedWallets(prev => {
      const exists = prev.find(w => w.address === newWallet.address);
      if (exists) return prev;
      
      const updated = [...prev, { address: newWallet.address, seed: newWallet.seed!, label }];
      localStorage.setItem(SAVED_WALLETS_KEY, JSON.stringify(updated));
      return updated;
    });
    localStorage.setItem(ACTIVE_WALLET_KEY, newWallet.address);
  };

  const generateWallet = () => {
    try {
      const newWallet = Wallet.generate();
      setWallet(newWallet);
      saveWalletLocally(newWallet, `Wallet ${savedWallets.length + 1}`);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const importWallet = (seed: string) => {
    try {
      const importedWallet = Wallet.fromSeed(seed);
      setWallet(importedWallet);
      saveWalletLocally(importedWallet, `Imported ${savedWallets.length + 1}`);
      setError(null);
    } catch (err: any) {
      setError("Invalid seed. Please check and try again.");
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setError(null);
    localStorage.removeItem(ACTIVE_WALLET_KEY);
  };

  const switchWallet = (address: string) => {
    try {
      const target = savedWallets.find(w => w.address === address);
      if (target) {
        setWallet(Wallet.fromSeed(target.seed));
        localStorage.setItem(ACTIVE_WALLET_KEY, address);
      }
    } catch (err) {
      console.error("Error switching wallet:", err);
    }
  };

  const removeWallet = (address: string) => {
    setSavedWallets(prev => {
      const updated = prev.filter(w => w.address !== address);
      localStorage.setItem(SAVED_WALLETS_KEY, JSON.stringify(updated));
      return updated;
    });
    
    if (wallet?.address === address) {
      disconnectWallet();
    }
  };

  const sendNFT = async (nftId: string, destination: string) => {
    if (!wallet || !client || !isConnected) throw new Error("Wallet not connected");

    const tx = {
      TransactionType: 'NFTokenCreateOffer',
      Account: wallet.address,
      NFTokenID: nftId,
      Destination: destination,
      Amount: '0',
      Flags: 1 // tfNFTokenCreateOffer
    };
    
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    return await client.submitAndWait(signed.tx_blob);
  };

  const burnNFT = async (nftId: string) => {
    if (!wallet || !client || !isConnected) throw new Error("Wallet not connected");

    const tx = {
      TransactionType: 'NFTokenBurn',
      Account: wallet.address,
      NFTokenID: nftId
    };
    
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    return await client.submitAndWait(signed.tx_blob);
  };

  const sendXRP = async (amount: string, destination: string) => {
    if (!wallet || !client || !isConnected) throw new Error("Wallet not connected");

    const tx = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Destination: destination,
      Amount: (parseFloat(amount) * 1000000).toString()
    };
    
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    return await client.submitAndWait(signed.tx_blob);
  };

  const sendAIX = async (amount: string, destination: string) => {
    if (!wallet || !client || !isConnected) throw new Error("Wallet not connected");

    const tx = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Destination: destination,
      Amount: {
        currency: AIX_CURRENCY,
        issuer: AIX_ISSUER,
        value: amount
      }
    };
    
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    return await client.submitAndWait(signed.tx_blob);
  };

  return (
    <WalletContext.Provider value={{
      wallet,
      savedWallets,
      xrpBalance,
      aixBalance,
      nfts,
      transactions,
      isConnected,
      isConnecting,
      error,
      generateWallet,
      importWallet,
      disconnectWallet,
      switchWallet,
      removeWallet,
      refreshBalances,
      fetchTransactions,
      sendNFT,
      burnNFT,
      sendXRP,
      sendAIX,
      client
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
