import React, { useState, useEffect } from 'react';
import { marketAPI } from '../services/api';
import { Activity, TrendingUp, BarChart3 } from 'lucide-react';

const TechnicalIndicators = ({ timeframe = '1h' }) => {
  const [indicators, setIndicators] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        setLoading(true);
        const response = await marketAPI.getIndicators(timeframe);
        setIndicators(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching indicators:', error);
        setLoading(false);
      }
    };

    fetchIndicators();
    const interval = setInterval(fetchIndicators, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [timeframe]);

  if (loading || !indicators) {
    return (
      <div className="bg-navy-800 rounded-lg p-6 border border-navy-700">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-navy-700 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-navy-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const indicatorGroups = [
    {
      title: 'Moving Averages',
      icon: TrendingUp,
      items: [
        { label: 'SMA 20', value: indicators.sma_20 },
        { label: 'SMA 50', value: indicators.sma_50 },
        { label: 'EMA 12', value: indicators.ema_12 },
        { label: 'EMA 26', value: indicators.ema_26 },
      ],
    },
    {
      title: 'Momentum',
      icon: Activity,
      items: [
        { label: 'RSI', value: indicators.rsi, suffix: '' },
      ],
    },
    {
      title: 'MACD',
      icon: BarChart3,
      items: [
        { label: 'MACD', value: indicators.macd },
        { label: 'Signal', value: indicators.macd_signal },
        { label: 'Histogram', value: indicators.macd_histogram },
      ],
    },
    {
      title: 'Bollinger Bands',
      icon: BarChart3,
      items: [
        { label: 'Upper', value: indicators.bb_upper },
        { label: 'Middle', value: indicators.bb_middle },
        { label: 'Lower', value: indicators.bb_lower },
      ],
    },
  ];

  return (
    <div className="bg-navy-800 rounded-lg p-6 border border-navy-700">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-gold-500" />
        Technical Indicators
      </h3>
      
      <div className="space-y-6">
        {indicatorGroups.map((group, idx) => (
          <div key={idx} className="border-b border-navy-700 last:border-0 pb-4 last:pb-0">
            <div className="flex items-center mb-3">
              <group.icon className="w-4 h-4 mr-2 text-gray-400" />
              <h4 className="text-sm font-semibold text-gray-300">{group.title}</h4>
            </div>
            <div className="space-y-2">
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm font-semibold text-white">
                    {item.value !== null && item.value !== undefined
                      ? `${item.value.toFixed(2)}${item.suffix || ''}`
                      : 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalIndicators;
