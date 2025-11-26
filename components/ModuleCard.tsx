import React from 'react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-aix-black border border-aix-border p-6 rounded-sm cursor-pointer hover:border-zinc-500 hover:bg-zinc-900/30 transition-all group h-full flex flex-col justify-between"
    >
      <div className="mb-4 text-zinc-400 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed font-mono">{description}</p>
      </div>
    </div>
  );
};

export default ModuleCard;
