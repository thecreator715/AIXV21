import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Cpu, Settings, Plus, Trash2, X, Save, Edit, BrainCircuit, Terminal, MessageSquare, Menu } from 'lucide-react';
import { initializeChat, sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

// Constants
const STORAGE_AGENTS_KEY = 'aix_agents_v1';
const STORAGE_HISTORY_KEY = 'aix_chat_histories_v1';
const MAX_AGENTS = 5;

interface AgentProfile {
  id: string;
  name: string;
  role: string;
  systemInstruction: string;
  isCore?: boolean;
  createdAt: number;
}

// Default Core Agent
const CORE_AGENT: AgentProfile = {
  id: 'core-01',
  name: 'AIX CORE',
  role: 'System Assistant',
  systemInstruction: 'You are AIX CORE, the central nervous system of AIXONLINE. You are an advanced AI assistant. Your responses should be formatted like a terminal output. Use clear, concise language. Use bullet points for lists. Be helpful, technical, and slightly futuristic. If asked about the platform, explain you are the AIX Protocol interface.',
  isCore: true,
  createdAt: Date.now()
};

const AIAgent: React.FC = () => {
  // --- State ---
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [isMobileAgentMenuOpen, setIsMobileAgentMenuOpen] = useState(false); // Mobile Agent Menu State
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load Agents from Storage
  const [agents, setAgents] = useState<AgentProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AGENTS_KEY);
      return saved ? JSON.parse(saved) : [CORE_AGENT];
    } catch {
      return [CORE_AGENT];
    }
  });

  // Load Histories from Storage
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Rehydrate Dates
        Object.keys(parsed).forEach(key => {
          parsed[key] = parsed[key].map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        });
        return parsed;
      }
    } catch { }
    return { [CORE_AGENT.id]: createInitialMessage(CORE_AGENT) };
  });

  const [activeAgentId, setActiveAgentId] = useState<string>(agents[0].id);

  // Form State for Training
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formInstruction, setFormInstruction] = useState('');

  // --- Helpers ---
  function createInitialMessage(agent: AgentProfile): ChatMessage[] {
    return [{
      id: 'init',
      role: 'model',
      text: `Greetings. I am ${agent.name}.\n\nMy purpose is to assist you with ${agent.role}.\n\nAwaiting your directive...`,
      timestamp: new Date()
    }];
  }

  // --- Effects ---

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_AGENTS_KEY, JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(chatHistories));
  }, [chatHistories]);

  // Initialize Chat Session when Agent Changes
  useEffect(() => {
    const initSession = async () => {
      const currentAgent = agents.find(a => a.id === activeAgentId) || agents[0];
      const currentHistory = chatHistories[activeAgentId] || [];
      
      // Convert history for Gemini
      const geminiHistory = currentHistory
        .filter(m => m.id !== 'init') // Skip internal logic messages if any
        .slice(-20) // Keep context manageable
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      await initializeChat(currentAgent.systemInstruction, geminiHistory);
      scrollToBottom();
    };

    initSession();
  }, [activeAgentId, agents, chatHistories]);

  const scrollToBottom = () => {
    setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // --- Handlers ---

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const textToSend = input;
    setInput('');
    setIsLoading(true);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    // Optimistic Update
    setChatHistories(prev => ({
      ...prev,
      [activeAgentId]: [...(prev[activeAgentId] || []), userMsg]
    }));

    scrollToBottom();

    try {
      const responseText = await sendMessage(textToSend);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setChatHistories(prev => ({
        ...prev,
        [activeAgentId]: [...(prev[activeAgentId] || []), botMsg]
      }));

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Purge memory for this specific agent?")) {
      const currentAgent = agents.find(a => a.id === activeAgentId) || agents[0];
      const initial = createInitialMessage(currentAgent);
      setChatHistories(prev => ({
        ...prev,
        [activeAgentId]: initial
      }));
    }
  };

  const handleDeleteAgent = (agentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Decommission this agent permanently?")) {
        setAgents(prev => prev.filter(a => a.id !== agentId));
        const newHistories = { ...chatHistories };
        delete newHistories[agentId];
        setChatHistories(newHistories);
        
        if (activeAgentId === agentId) {
            setActiveAgentId(agents[0].id);
        }
    }
  };

  const openTrainingModal = (agent?: AgentProfile) => {
    if (agent) {
        setEditingAgentId(agent.id);
        setFormName(agent.name);
        setFormRole(agent.role);
        setFormInstruction(agent.systemInstruction);
    } else {
        setEditingAgentId(null);
        setFormName('');
        setFormRole('');
        setFormInstruction('');
    }
    setIsTrainingModalOpen(true);
    setIsMobileAgentMenuOpen(false); // Close mobile menu if open
  };

  const saveAgent = () => {
    if (!formName || !formInstruction) return;

    if (editingAgentId) {
        // Update Existing
        setAgents(prev => prev.map(a => {
            if (a.id === editingAgentId) {
                return { 
                    ...a, 
                    name: formName, 
                    role: formRole, 
                    systemInstruction: formInstruction 
                };
            }
            return a;
        }));
    } else {
        // Create New
        if (agents.length >= MAX_AGENTS) {
            alert("Maximum agent capacity reached. Decommission an agent to train a new one.");
            return;
        }
        const newAgent: AgentProfile = {
            id: `agent-${Date.now()}`,
            name: formName,
            role: formRole || 'Specialized Unit',
            systemInstruction: formInstruction,
            createdAt: Date.now()
        };
        setAgents(prev => [...prev, newAgent]);
        setChatHistories(prev => ({
            ...prev,
            [newAgent.id]: createInitialMessage(newAgent)
        }));
        setActiveAgentId(newAgent.id);
    }
    setIsTrainingModalOpen(false);
  };

  // --- Render ---

  const currentAgent = agents.find(a => a.id === activeAgentId) || agents[0];
  const currentMessages = chatHistories[activeAgentId] || [];

  const AgentList = () => (
    <>
      {agents.map(agent => (
        <div 
            key={agent.id}
            onClick={() => { setActiveAgentId(agent.id); setIsMobileAgentMenuOpen(false); }}
            className={`border rounded-sm p-3 cursor-pointer transition-all group relative overflow-hidden
                ${activeAgentId === agent.id 
                    ? 'bg-[#111] border-aix-green/50' 
                    : 'bg-black border-transparent hover:border-zinc-800'}`}
        >
            {activeAgentId === agent.id && <div className="absolute top-0 left-0 w-[2px] h-full bg-aix-green"></div>}
            
            <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border
                    ${activeAgentId === agent.id ? 'bg-black border-aix-green/30 text-aix-green' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
                    {agent.isCore ? <Cpu size={16} /> : <Bot size={16} />}
                </div>
                <div className="flex-1 overflow-hidden">
                    <div className={`text-xs font-bold truncate font-mono ${activeAgentId === agent.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                        {agent.name}
                    </div>
                    <div className="text-[10px] text-zinc-600 truncate font-mono">{agent.role}</div>
                </div>
                
                {/* Agent Actions */}
                {activeAgentId === agent.id && (
                      <div className="flex flex-col gap-1">
                        <button 
                            onClick={(e) => { e.stopPropagation(); openTrainingModal(agent); }}
                            className="text-zinc-500 hover:text-white"
                            title="Retrain Protocol"
                        >
                            <Settings size={12} />
                        </button>
                        {!agent.isCore && (
                            <button 
                                onClick={(e) => handleDeleteAgent(agent.id, e)}
                                className="text-zinc-500 hover:text-red-500"
                                title="Decommission"
                            >
                                <Trash2 size={12} />
                            </button>
                        )}
                      </div>
                )}
            </div>
        </div>
    ))}

    {agents.length < MAX_AGENTS && (
        <button 
            onClick={() => openTrainingModal()}
            className="w-full py-3 border border-dashed border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors rounded-sm mt-4 font-mono"
        >
            <Plus size={12} />
            Train New Agent
        </button>
    )}
    </>
  );

  return (
    <div className="h-full flex flex-col bg-black font-mono overflow-hidden relative">
      {/* Top Bar */}
      <div className="h-10 border-b border-aix-border flex items-center justify-between px-4 md:px-6 bg-[#0a0a0a] shrink-0">
        <div className="text-[10px] text-zinc-500 tracking-wider flex items-center gap-2">
          {/* Mobile Agent Menu Toggle */}
          <button 
            onClick={() => setIsMobileAgentMenuOpen(true)}
            className="md:hidden text-zinc-400 hover:text-white"
          >
             <BrainCircuit size={16} />
          </button>
          <span className="hidden md:inline">SYSTEM <span className="mx-2">/</span> <span className="text-zinc-300">AI AGENT</span></span>
          <span className="md:hidden text-zinc-300">AI AGENT</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-aix-green shadow-[0_0_5px_#00ff41]"></div>
          <span className="text-zinc-500">NET_LIVE</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Agent Roster (Desktop) */}
        <div className="w-72 border-r border-aix-border bg-[#050505] flex flex-col hidden md:flex">
          <div className="p-5 border-b border-aix-border">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BrainCircuit size={14} className="text-aix-green" />
              Neural Network
            </h3>
            <div className="text-[10px] text-zinc-500 mt-1 font-mono">
                Capacity: {agents.length} / {MAX_AGENTS} Units
            </div>
          </div>
          
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            <AgentList />
          </div>
        </div>

        {/* Mobile Agent Sidebar Overlay */}
        {isMobileAgentMenuOpen && (
          <div className="absolute inset-0 z-40 bg-black/95 flex flex-col md:hidden animate-in slide-in-from-left duration-200">
             <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Select Agent</h3>
                 <button onClick={() => setIsMobileAgentMenuOpen(false)} className="text-zinc-500"><X/></button>
             </div>
             <div className="p-4 space-y-2 overflow-y-auto flex-1">
                <AgentList />
             </div>
          </div>
        )}

        {/* Right Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#050505] relative w-full">
          
          {/* Chat Header */}
          <div className="h-16 border-b border-aix-border flex items-center justify-between px-4 md:px-6 bg-[#0a0a0a]/50 backdrop-blur-sm z-10 shrink-0">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-aix-green/10 flex items-center justify-center border border-aix-green/20">
                     {currentAgent.isCore ? <Cpu size={16} className="text-aix-green"/> : <Bot size={16} className="text-aix-green"/>}
                </div>
                <div>
                    <div className="text-sm font-bold text-white tracking-widest font-mono">{currentAgent.name}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono truncate max-w-[120px] md:max-w-none">{currentAgent.role}</div>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <button 
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 text-[10px] text-zinc-600 hover:text-red-500 transition-colors uppercase tracking-wider font-bold"
                  title="Clear Local History"
                >
                  <Trash2 size={12} />
                  <span className="hidden sm:inline">Purge Memory</span>
                </button>
                <div className="px-2 py-1 bg-aix-green/10 border border-aix-green/20 rounded-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-aix-green animate-pulse"></div>
                    <span className="text-[10px] font-bold text-aix-green tracking-wider font-mono hidden sm:inline">ONLINE</span>
                </div>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 bg-black">
            {currentMessages.map((msg) => (
              <div key={msg.id} className="flex flex-col animate-in fade-in duration-300">
                 {/* Metadata Line */}
                 <div className={`flex items-center gap-3 mb-2 font-mono text-[10px] uppercase tracking-wider border-l-2 pl-3 ${msg.role === 'model' ? 'border-aix-green text-aix-green' : 'border-zinc-700 text-zinc-500'}`}>
                    <span className="font-bold">
                        {msg.role === 'user' ? 'USER_COMMAND' : currentAgent.name}
                    </span>
                    <span className="opacity-50">
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}
                    </span>
                 </div>
                 
                 {/* Message Content */}
                 <div className={`pl-4 text-xs md:text-sm font-medium font-mono whitespace-pre-wrap leading-relaxed max-w-4xl
                    ${msg.role === 'model' ? 'text-zinc-100' : 'text-zinc-400'}`}>
                    {msg.text}
                 </div>
              </div>
            ))}
             
             {isLoading && (
              <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2 font-mono text-[10px] uppercase tracking-wider border-l-2 pl-3 border-aix-green text-aix-green">
                    <span className="font-bold">{currentAgent.name}</span>
                 </div>
                 <div className="pl-4 text-aix-green/50 text-sm font-mono animate-pulse flex items-center gap-2">
                   <span className="inline-block w-2 h-4 bg-aix-green/50 animate-pulse"></span>
                   PROCESSING_DATA_STREAM...
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 pt-0 bg-black shrink-0">
            <div className="bg-[#0a0a0a] border border-aix-border rounded-sm flex flex-col p-3 focus-within:border-aix-green/50 transition-colors shadow-lg">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={`ENTER_COMMAND_FOR_${currentAgent.name.replace(/\s+/g, '_')}...`}
                className="w-full bg-transparent text-white text-xs md:text-sm p-1 focus:outline-none resize-none h-14 font-mono placeholder:text-zinc-700"
              />
              <div className="flex justify-between items-center pt-2 border-t border-zinc-900 mt-1">
                 <div className="text-[10px] text-zinc-700 font-mono flex items-center gap-2">
                    <Terminal size={10} />
                    <span className="hidden sm:inline">SECURE_UPLINK_ESTABLISHED</span>
                    <span className="sm:hidden">SECURE</span>
                 </div>
                 <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-1.5 bg-[#111] hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-sm transition-colors disabled:opacity-30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"
                 >
                   TRANSMIT <Send size={10} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Training Modal */}
      {isTrainingModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-black border border-aix-green/30 shadow-[0_0_30px_rgba(0,255,65,0.1)] rounded-sm flex flex-col animate-in fade-in zoom-in duration-200 max-h-full overflow-y-auto">
                <div className="p-4 border-b border-aix-border flex justify-between items-center bg-[#0a0a0a]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                        <BrainCircuit size={16} className="text-aix-green"/>
                        {editingAgentId ? 'RETRAIN NEURAL PROTOCOL' : 'INITIALIZE NEW AGENT'}
                    </h3>
                    <button onClick={() => setIsTrainingModalOpen(false)} className="text-zinc-500 hover:text-white">
                        <X size={16} />
                    </button>
                </div>
                
                <div className="p-6 md:p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-aix-green mb-2 block font-bold font-mono">Agent Designation (Name)</label>
                            <input 
                                type="text" 
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                placeholder="e.g. OMEGA_TRADER_V2"
                                className="w-full bg-[#050505] border border-aix-border p-3 text-white text-xs font-mono focus:border-aix-green focus:outline-none placeholder:text-zinc-700"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-aix-green mb-2 block font-bold font-mono">Primary Directive (Role)</label>
                            <input 
                                type="text" 
                                value={formRole}
                                onChange={(e) => setFormRole(e.target.value)}
                                placeholder="e.g. Advanced Market Analysis & Prediction"
                                className="w-full bg-[#050505] border border-aix-border p-3 text-white text-xs font-mono focus:border-aix-green focus:outline-none placeholder:text-zinc-700"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-aix-green mb-2 block font-bold font-mono">Core Programming (System Prompt)</label>
                            <p className="text-[10px] text-zinc-500 mb-3 font-mono">
                                Define the behavioral parameters, knowledge base, and personality traits.
                            </p>
                            <textarea 
                                value={formInstruction}
                                onChange={(e) => setFormInstruction(e.target.value)}
                                placeholder="You are a specialized AI assistant. You speak in a robotic tone. You are an expert in..."
                                className="w-full h-32 md:h-40 bg-[#050505] border border-aix-border p-3 text-white text-xs font-mono focus:border-aix-green focus:outline-none resize-none leading-relaxed placeholder:text-zinc-700"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-aix-border flex justify-end gap-3 bg-[#0a0a0a]">
                    <button 
                        onClick={() => setIsTrainingModalOpen(false)}
                        className="px-6 py-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors font-mono tracking-wider"
                    >
                        ABORT
                    </button>
                    <button 
                        onClick={saveAgent}
                        disabled={!formName || !formInstruction}
                        className="px-6 py-2 bg-aix-green text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2 font-mono"
                    >
                        <Save size={14} />
                        {editingAgentId ? 'OVERWRITE' : 'COMPILE'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AIAgent;