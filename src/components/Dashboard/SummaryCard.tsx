import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  onClick?: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, color, trend, description, onClick }) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-400 to-blue-600',
      icon: 'bg-blue-100 text-blue-600',
      accent: 'text-blue-600',
      glow: 'shadow-blue-200',
      border: 'border-blue-200'
    },
    green: {
      bg: 'from-green-400 to-green-600',
      icon: 'bg-green-100 text-green-600',
      accent: 'text-green-600',
      glow: 'shadow-green-200',
      border: 'border-green-200'
    },
    yellow: {
      bg: 'from-yellow-400 to-yellow-600',
      icon: 'bg-yellow-100 text-yellow-600',
      accent: 'text-yellow-600',
      glow: 'shadow-yellow-200',
      border: 'border-yellow-200'
    },
    red: {
      bg: 'from-red-400 to-red-600',
      icon: 'bg-red-100 text-red-600',
      accent: 'text-red-600',
      glow: 'shadow-red-200',
      border: 'border-red-200'
    },
    purple: {
      bg: 'from-purple-400 to-purple-600',
      icon: 'bg-purple-100 text-purple-600',
      accent: 'text-purple-600',
      glow: 'shadow-purple-200',
      border: 'border-purple-200'
    }
  };

  const colors = colorClasses[color];

  return (
    <div 
      className={`group relative bg-white rounded-3xl shadow-xl border-2 ${colors.border} overflow-hidden hover:shadow-2xl hover:${colors.glow} transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Enhanced Background Gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bg} opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 group-hover:opacity-20 transition-all duration-700`}></div>
      
      {/* Floating Particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300 delay-100"></div>
      
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-700 mb-3 group-hover:text-gray-800 transition-colors duration-200">{title}</p>
            <div className="relative">
              <p className="text-4xl md:text-5xl font-black text-gray-900 group-hover:scale-110 transition-transform duration-300 mb-2">{value}</p>
              {/* Enhanced underline */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full`}></div>
            </div>
            {description && (
              <p className="text-sm font-medium text-gray-600 mt-3 group-hover:text-gray-700 transition-colors duration-200">{description}</p>
            )}
          </div>
          
          {/* Enhanced Icon Container */}
          <div className={`relative p-5 rounded-3xl ${colors.icon} group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl ml-4`}>
            <Icon size={32} className="relative z-10" />
            {/* Icon glow effect */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${colors.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
          </div>
        </div>
        
        {trend && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${trend.isPositive ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'} transition-colors duration-200`}>
                <span className="text-xl font-bold">{trend.isPositive ? '↗' : '↘'}</span>
                <span className="text-sm font-bold">
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              </div>
              <span className="text-sm font-medium text-gray-500">vs last week</span>
            </div>
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colors.bg} animate-pulse group-hover:animate-bounce`}></div>
          </div>
        )}

        {/* Click indicator */}
        {onClick && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-1 text-xs font-medium text-gray-500">
              <span>Click to view</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced Hover Effect Border */}
      <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${colors.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 skew-x-12"></div>
    </div>
  );
};

export default SummaryCard;