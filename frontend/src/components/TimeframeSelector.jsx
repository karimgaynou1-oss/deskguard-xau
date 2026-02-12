import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const TimeframeSelector = ({ selectedTimeframe, onTimeframeChange }) => {
  const timeframes = [
    { value: '1m', label: '1M' },
    { value: '5m', label: '5M' },
    { value: '15m', label: '15M' },
    { value: '1h', label: '1H' },
    { value: '4h', label: '4H' },
    { value: '1d', label: '1D' },
  ];

  return (
    <div className="bg-navy-800 rounded-lg p-4 border border-navy-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gold-500" />
          Timeframe
        </h3>
      </div>
      
      <div className="grid grid-cols-6 gap-2">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => onTimeframeChange(tf.value)}
            className={`py-2 px-3 rounded font-semibold text-sm transition-all ${
              selectedTimeframe === tf.value
                ? 'bg-gold-500 text-navy-900'
                : 'bg-navy-900 text-gray-400 hover:bg-navy-700 hover:text-white border border-navy-700'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeframeSelector;
