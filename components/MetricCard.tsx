import React from 'react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface MetricCardProps {
  title: string;
  mainValue: string;
  subValue: string;
  subValueLabel?: string;
  statusText?: string;
  statusColor?: string;
  chartData?: { value: number }[];
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  mainValue, 
  subValue, 
  subValueLabel,
  statusText, 
  statusColor = 'text-aix-green',
  chartData,
  icon
}) => {
  return (
    <div className="bg-aix-panel border border-aix-border p-5 rounded-sm h-32 flex flex-col justify-between relative group hover:border-zinc-600 transition-colors">
      <div className="flex justify-between items-start">
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{title}</span>
        {icon && <div className="text-zinc-600">{icon}</div>}
      </div>

      <div className="flex items-end justify-between w-full">
        <div>
          <div className={`text-2xl font-bold font-sans tracking-tight ${statusText ? statusColor : 'text-white'}`}>
            {mainValue}
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            {subValue} {subValueLabel}
          </div>
        </div>

        {chartData && (
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#333" 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
