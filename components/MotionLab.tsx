import React, { useState, useEffect } from 'react';
import { Film, Loader2, Play, Lock, Zap } from 'lucide-react';
import { generateVideo } from '../services/geminiService';

const MotionLab: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    const has = await (window as any).aistudio?.hasSelectedApiKey();
    setHasKey(!!has);
  };

  const handleUnlock = async () => {
    try {
      await (window as any).aistudio?.openSelectKey();
      await checkKey();
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setVideoUrl(null);
    setStatusMessage('Initializing Veo-3.1 Neural Engine...');

    try {
      // Simulate steps for UX since video gen takes time
      const statusInterval = setInterval(() => {
        const msgs = [
          'Compiling scene geometry...',
          'Synthesizing temporal coherence...',
          'Rendering light pathways...',
          'Applying cinematic post-processing...',
          'Finalizing output stream...'
        ];
        setStatusMessage(msgs[Math.floor(Math.random() * msgs.length)]);
      }, 4000);

      const url = await generateVideo(prompt);
      
      clearInterval(statusInterval);
      setVideoUrl(url);
    } catch (error) {
      console.error(error);
      setStatusMessage('Error: Generation sequence failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-black">
        <div className="max-w-md w-full bg-aix-panel border border-aix-border p-8 rounded-sm text-center">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-700">
            <Lock size={32} className="text-zinc-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">ACCESS RESTRICTED</h2>
          <p className="text-zinc-500 mb-8 font-mono text-sm">
            Motion Lab requires a high-throughput API key to access Veo-3.1 video generation capabilities.
          </p>
          <button
            onClick={handleUnlock}
            className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <Zap size={14} fill="black" />
            Connect API Key
          </button>
          <div className="mt-4 text-[10px] text-zinc-600">
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-zinc-400">
              Billing Information
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-8 border-b border-aix-border pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
            <Film className="text-aix-green" />
            MOTION LAB
          </h1>
          <p className="text-zinc-500 font-mono text-xs tracking-wider">VEO-3.1 GENERATIVE VIDEO SUITE</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded text-xs font-mono text-aix-green border border-aix-green/20">
          <span className="w-2 h-2 bg-aix-green rounded-full animate-pulse"></span>
          SYSTEM READY
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-aix-panel border border-aix-border p-6 rounded-sm">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 block">
              Prompt Directive
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the motion scene you wish to generate... (e.g., A neon hologram of a cat driving at top speed)"
              className="w-full h-40 bg-black border border-aix-border rounded-sm p-4 text-white text-sm font-mono focus:border-aix-green focus:outline-none transition-colors resize-none placeholder:text-zinc-700"
            />
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-[10px] text-zinc-600 font-mono">
                MODEL: VEO-3.1-FAST-PREVIEW <br/>
                RES: 720P / 16:9
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="px-6 py-3 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Play size={14} fill="black" />
                    Generate Sequence
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-zinc-900/20 border border-aix-border p-6 rounded-sm flex-1">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Output Log</h3>
            <div className="space-y-2 font-mono text-xs">
              <div className="text-zinc-600">[INFO] Interface initialized</div>
              <div className="text-zinc-600">[INFO] Connection established</div>
              {isGenerating && (
                <div className="text-aix-green animate-pulse">
                  &gt; {statusMessage}
                </div>
              )}
              {videoUrl && (
                <div className="text-blue-400">
                  [SUCCESS] Render complete. Asset loaded.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Viewport */}
        <div className="bg-black border border-aix-border rounded-sm p-1 flex items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
          <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-600 z-10">VIEWPORT_01</div>
          
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop 
              className="w-full h-auto max-h-full rounded-sm shadow-2xl border border-zinc-800"
            />
          ) : isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-2 border-zinc-800 border-t-aix-green rounded-full animate-spin"></div>
              <div className="text-xs font-mono text-zinc-500 animate-pulse">RENDERING...</div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 opacity-30">
              <Film size={48} className="text-zinc-500" />
              <div className="text-xs font-mono text-zinc-500">AWAITING INPUT</div>
            </div>
          )}
          
          {/* Decorative lines */}
          <div className="absolute bottom-4 right-4 flex gap-1">
             <div className="w-1 h-4 bg-zinc-800"></div>
             <div className="w-1 h-6 bg-zinc-800"></div>
             <div className="w-1 h-3 bg-zinc-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotionLab;
