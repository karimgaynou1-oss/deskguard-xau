import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const PriceCard = ({ price, isConnected }) => {
  if (!price) {
    return (
      <div className="bg-navy-800 rounded-lg p-6 border border-navy-700">
        <div className="animate-pulse">
          <div className="h-4 bg-navy-700 rounded w-24 mb-4"></div>
          <div className="h-8 bg-navy-700 rounded w-32 mb-2"></div>
          <div className="h-4 bg-navy-700 rounded w-20"></div>
        </div>
      </div>
    );
  }

  const isPositive = price.change >= 0;

  return (
    <div className="bg-navy-800 rounded-lg p-6 border border-navy-700 hover:border-gold-500 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-400 tracking-wider">
          {price.symbol}
        </h2>
        <div className={`flex items-center space-x-1 ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse-slow' : 'bg-red-500'}`}></div>
          <span className="text-xs">{isConnected ? 'LIVE' : 'OFFLINE'}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-4xl font-bold text-white mb-1">
          ${price.price.toFixed(2)}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {isPositive ? (
          <TrendingUp className="w-5 h-5 text-green-500" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-500" />
        )}
        <span className={`text-lg font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{price.change.toFixed(2)}
        </span>
        <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          ({isPositive ? '+' : ''}{price.changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};

export default PriceCard;
