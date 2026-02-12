import React, { useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import PriceCard from './components/PriceCard';
import TradingChart from './components/TradingChart';
import TimeframeSelector from './components/TimeframeSelector';
import TechnicalIndicators from './components/TechnicalIndicators';
import RiskManagement from './components/RiskManagement';
import PerformanceMetrics from './components/PerformanceMetrics';
import './styles/index.css';
import { Coins } from 'lucide-react';

function App() {
  const { price, isConnected } = useWebSocket();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Header */}
      <header className="bg-navy-800 border-b border-navy-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gold-500 p-2 rounded-lg">
                <Coins className="w-6 h-6 text-navy-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DeskGuard XAU</h1>
                <p className="text-sm text-gray-400">Professional Trading Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Goldman Sachs Style</p>
              <p className="text-xs text-gold-500 font-semibold">Institutional Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Chart */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <PriceCard price={price} isConnected={isConnected} />
            <TimeframeSelector 
              selectedTimeframe={selectedTimeframe}
              onTimeframeChange={setSelectedTimeframe}
            />
            <TradingChart timeframe={selectedTimeframe} />
          </div>

          {/* Right Column - Indicators and Metrics */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <TechnicalIndicators timeframe={selectedTimeframe} />
            <PerformanceMetrics />
          </div>

          {/* Bottom Row - Risk Management */}
          <div className="col-span-12">
            <RiskManagement />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-800 border-t border-navy-700 mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <p>&copy; 2024 DeskGuard XAU. All rights reserved.</p>
            <p>Real-time XAUUSD Trading Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
