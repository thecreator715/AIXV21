import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Cpu, Settings, Plus, Chip } from 'lucide-react';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAgent: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'AIX CORE ONLINE. General support and platform navigation. How can I assist you?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessage(input);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Error: Unable to establish link with neural core.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-aix-black font-mono overflow-hidden">
      {/* Top Bar / Breadcrumb */}
      <div className="h-10 border-b border-aix-border flex items-center justify-between px-6 bg-[#0a0a0a]">
        <div className="text-[10px] text-zinc-500 tracking-wider">
          SYSTEM <span className="mx-2">/</span> <span className="text-zinc-300">AI CHAT</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-aix-green shadow-[0_0_5px_#00ff41]"></div>
          <span className="text-zinc-500">NET_LIVE</span>
          <span className="text-zinc-600 ml-2">V.3.2.1</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Agent Roster */}
        <div className="w-72 border-r border-aix-border bg-[#050505] flex flex-col">
          <div className="p-5 border-b border-aix-border">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <User size={14} className="text-zinc-400" />
              Agent Roster
            </h3>
          </div>
          
          <div className="flex-1 p-3 space-y-2">
            {/* Active Agent */}
            <div className="bg-[#111] border border-aix-border rounded-sm p-3 cursor-pointer hover:border-zinc-600 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-aix-green"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black border border-aix-green/30 rounded-sm flex items-center justify-center text-aix-green">
                  <Cpu size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-aix-green transition-colors">AIX CORE</div>
                  <div className="text-[10px] text-zinc-500">System Assistant</div>
                </div>
              </div>
            </div>
            
            {/* Inactive Agent Placeholder */}
             <div className="opacity-50 border border-transparent p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-black border border-zinc-800 rounded-sm flex items-center justify-center text-zinc-700">
                  <Bot size={20} />
                </div>
                <div>
                   <div className="text-xs font-bold text-zinc-500">TRADING BOT</div>
                   <div className="text-[10px] text-zinc-700">Offline</div>
                </div>
             </div>
          </div>

          <div className="p-4 border-t border-aix-border">
            <button className="w-full py-3 border border-zinc-800 bg-[#0a0a0a] hover:bg-[#111] text-zinc-400 hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
              <Plus size={12} />
              Train New Agent
            </button>
          </div>
        </div>

        {/* Right Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#050505] relative">
          
          {/* Chat Header */}
          <div className="h-16 border-b border-aix-border flex items-center justify-between px-6 bg-[#0a0a0a]/50">
             <div className="flex items-center gap-3">
                <User size={18} className="text-zinc-500" />
                <span className="text-sm font-bold text-white tracking-widest">AIX CORE</span>
                <Settings size={14} className="text-zinc-600 hover:text-white cursor-pointer ml-2" />
             </div>
             <div className="px-2 py-1 bg-aix-green/10 border border-aix-green/20 rounded-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-aix-green animate-pulse"></div>
                <span className="text-[10px] font-bold text-aix-green tracking-wider">ONLINE</span>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                 <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{msg.role === 'user' ? 'USER' : 'AIX CORE'}</span>
                    <span className="text-[10px] text-zinc-700">{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                 </div>
                 <div className={`max-w-[80%] p-4 rounded-sm border text-sm leading-relaxed font-sans
                    ${msg.role === 'model' 
                      ? 'bg-transparent border-transparent text-aix-green/90 font-mono pl-0 border-l-2 border-l-aix-green' 
                      : 'bg-[#111] border-zinc-800 text-white'}`}>
                    {msg.text}
                 </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">AIX CORE</span>
                 </div>
                 <div className="text-aix-green/50 text-sm font-mono animate-pulse">
                   _ THINKING...
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 pt-0">
            <div className="bg-[#0a0a0a] border border-aix-border rounded-sm flex flex-col p-2 focus-within:border-zinc-600 transition-colors">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Message AIX CORE..."
                className="w-full bg-transparent text-white text-sm p-2 focus:outline-none resize-none h-12 font-sans placeholder:text-zinc-700"
              />
              <div className="flex justify-between items-center px-2 pt-2 border-t border-zinc-900">
                 <div className="text-[10px] text-zinc-700 font-mono">SECURE_CHANNEL_ESTABLISHED</div>
                 <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-[#111] hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-sm transition-colors disabled:opacity-30"
                 >
                   <Send size={14} />
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIAgent;