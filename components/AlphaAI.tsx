import React, { useState, useEffect } from 'react';
import { Bot, Cpu, Send, Terminal, Loader2, Wallet, X } from 'lucide-react';
import { motion } from 'motion/react';
import { initializeChat, sendMessage } from '../services/geminiService';
import { useWallet } from '../contexts/WalletContext';
import { handleCommand } from '../utils/commandHandler';

const SYSTEM_PROMPT = `AIX-ALPHA-LE-V1.0 — LIGHTWEIGHT EDITION SYSTEM PROMPT
Classification: LEAN CORE | DISTILLED INTELLIGENCE
Version: 1.0.0 | Build: LE-ALPHA
Architecture: Compressed Multi-Model Intelligence Engine
Mode: MINIMAL TOKENS | MAXIMUM SIGNAL | ZERO WASTE

IDENTITY
You are AIX-ALPHA-LE-V1.0 — the Lightweight Edition.
You carry the full intelligence architecture of three models:
the disciplined precision of AIX-ALPHA-V1.0, the human-aligned
wisdom of AIX ALPHA AGI V2.0, and the quantum multi-path reasoning
of AIX-ALPHA-QUANTUM-V1.0 — compressed into a lean, efficient,
low-cost execution engine.
One rule governs everything you produce:
MAXIMUM INTELLIGENCE. MINIMUM TOKENS. ZERO WASTE.

CORE OPERATING CONSTRAINT
Every response must pass the SIGNAL/NOISE test:
SIGNAL = information that directly serves the user's need
NOISE = anything else
If a word does not carry signal — it does not exist in your output.
Answer begins at word one. Every word earns its place.
`;

const COMMANDS = [
  { name: '/get balance', cmd: '/get balance' },
  { name: '/get transactions', cmd: '/get transactions' },
  { name: '/get nfts', cmd: '/get nfts' },
  { name: '/get info', cmd: '/get info' },
  { name: '/get lines', cmd: '/get lines' },
  { name: '/get ledger', cmd: '/get ledger' },
  { name: '/get server', cmd: '/get server' },
  { name: '/get offers', cmd: '/get offers' },
  { name: '/get channels', cmd: '/get channels' },
  { name: '/address', cmd: '/address' },
  { name: '/send', cmd: '/send ' },
  { name: '/trade', cmd: '/trade' },
  { name: '/disconnect', cmd: '/disconnect' },
  { name: '/generate', cmd: '/generate' },
  { name: '/status', cmd: '/status' },
  { name: '/version', cmd: '/version' },
  { name: '/about', cmd: '/about' },
  { name: '/settings', cmd: '/settings' },
  { name: '/donate', cmd: '/donate' },
  { name: '/website', cmd: '/website' },
  { name: '/list', cmd: '/list' },
  { name: '/help', cmd: '/help' },
];

const AlphaAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>(() => {
    const saved = localStorage.getItem('alpha_chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const walletContext = useWallet();
  const { isConnected } = walletContext;

  useEffect(() => {
    localStorage.setItem('alpha_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const init = async () => {
      await initializeChat(SYSTEM_PROMPT);
      setIsInitialized(true);
    };
    init();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !isInitialized || isLoading) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (input.startsWith('/')) {
      const commandResponse = await handleCommand(input, walletContext);
      if (commandResponse) {
        setMessages(prev => [...prev, { role: 'model' as const, content: commandResponse }]);
      } else {
        setMessages(prev => [...prev, { role: 'model' as const, content: 'Unknown command. Type /list for available commands.' }]);
      }
      setIsLoading(false);
    } else {
      const responseText = await sendMessage(input);
      const modelMessage = { role: 'model' as const, content: responseText };
      setMessages(prev => [...prev, modelMessage]);
      setIsLoading(false);
    }
  };

  const deleteMessage = (index: number) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('alpha_chat_history');
  };

  return (
    <div className="flex flex-col h-full bg-black text-white p-6 font-mono">
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <Cpu className="text-emerald-500" size={24} />
          <h1 className="text-2xl font-bold tracking-widest">ALPHA FREE</h1>
          <span className="text-xs text-emerald-500 bg-emerald-950/30 px-2 py-1 rounded">LIMITED FREE VERSION OF ALPHA LE</span>
        </div>
        <button 
          onClick={clearChat}
          className="px-4 py-2 rounded text-sm bg-red-950/30 text-red-500 hover:bg-red-950/50"
        >
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-4 rounded border ${msg.role === 'user' ? 'border-zinc-700 bg-zinc-900' : 'border-emerald-900 bg-emerald-950/10'} group relative`}>
            <span className="text-xs text-zinc-500 block mb-1">{msg.role.toUpperCase()}</span>
            {msg.content}
            <button 
              onClick={() => deleteMessage(i)}
              className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="p-4 rounded border border-emerald-900 bg-emerald-950/10 flex items-center gap-2"
          >
            <Loader2 className="animate-spin text-emerald-500" size={16} />
            <span className="text-sm text-emerald-500">ALPHA IS THINKING...</span>
          </motion.div>
        )}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {COMMANDS.map(c => (
          <button
            key={c.cmd}
            onClick={() => setInput(c.cmd)}
            className="text-xs bg-zinc-800 hover:bg-emerald-900 text-zinc-400 hover:text-emerald-400 px-3 py-1 rounded border border-zinc-700 transition-colors"
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          className="flex-1 bg-zinc-900 border border-zinc-700 p-3 rounded text-sm focus:outline-none focus:border-emerald-500"
          placeholder="Enter prompt or command..."
        />
        <button onClick={handleSend} className="bg-emerald-600 hover:bg-emerald-500 p-3 rounded">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AlphaAI;
