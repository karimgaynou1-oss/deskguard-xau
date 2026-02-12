import React, { useState, useEffect } from 'react';
import { performanceAPI } from '../services/api';
import { TrendingUp, Award, Target, DollarSign } from 'lucide-react';

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await performanceAPI.getMetrics();
        setMetrics(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading || !metrics) {
    return (
      <div className="bg-navy-800 rounded-lg p-6 border border-navy-700">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-navy-700 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-navy-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total P&L',
      value: `$${metrics.totalPnL.toFixed(2)}`,
      icon: DollarSign,
      color: metrics.totalPnL >= 0 ? 'text-green-500' : 'text-red-500',
      bgColor: metrics.totalPnL >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
    },
    {
      label: 'Win Rate',
      value: `${metrics.winRate.toFixed(1)}%`,
      icon: Award,
      color: 'text-gold-500',
      bgColor: 'bg-gold-500/10',
    },
    {
      label: 'Total Trades',
      value: metrics.totalTrades,
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Profit Factor',
      value: metrics.profitFactor.toFixed(2),
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="bg-navy-800 rounded-lg p-6 border border-navy-700">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-gold-500" />
        Performance Metrics
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bgColor} rounded-lg p-4 border border-navy-700`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-navy-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Winning Trades:</span>
          <span className="text-green-500 font-semibold">{metrics.winningTrades}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Losing Trades:</span>
          <span className="text-red-500 font-semibold">{metrics.losingTrades}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Average Win:</span>
          <span className="text-green-500 font-semibold">${metrics.averageWin.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Average Loss:</span>
          <span className="text-red-500 font-semibold">${metrics.averageLoss.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Max Drawdown:</span>
          <span className="text-orange-500 font-semibold">{metrics.maxDrawdown.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
