import React, { useState } from 'react';
import { riskAPI } from '../services/api';
import { Calculator, AlertTriangle } from 'lucide-react';

const RiskManagement = () => {
  const [formData, setFormData] = useState({
    accountSize: 10000,
    riskPercentage: 2,
    entryPrice: 2050,
    stopLoss: 2040,
    takeProfit: 2070,
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);
      const response = await riskAPI.calculateRisk(formData);
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error calculating risk:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-navy-800 rounded-lg p-6 border border-navy-700">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <Calculator className="w-5 h-5 mr-2 text-gold-500" />
        Risk Management Calculator
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Account Size ($)
          </label>
          <input
            type="number"
            name="accountSize"
            value={formData.accountSize}
            onChange={handleChange}
            className="w-full bg-navy-900 border border-navy-700 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Risk Per Trade (%)
          </label>
          <input
            type="number"
            name="riskPercentage"
            value={formData.riskPercentage}
            onChange={handleChange}
            step="0.1"
            className="w-full bg-navy-900 border border-navy-700 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Entry Price
            </label>
            <input
              type="number"
              name="entryPrice"
              value={formData.entryPrice}
              onChange={handleChange}
              step="0.01"
              className="w-full bg-navy-900 border border-navy-700 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Stop Loss
            </label>
            <input
              type="number"
              name="stopLoss"
              value={formData.stopLoss}
              onChange={handleChange}
              step="0.01"
              className="w-full bg-navy-900 border border-navy-700 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Take Profit
            </label>
            <input
              type="number"
              name="takeProfit"
              value={formData.takeProfit}
              onChange={handleChange}
              step="0.01"
              className="w-full bg-navy-900 border border-navy-700 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold py-3 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Calculate Risk'}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-navy-900 rounded-lg border border-navy-700 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Position Size:</span>
              <span className="font-semibold text-white">{result.positionSize.toFixed(4)} oz</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk Amount:</span>
              <span className="font-semibold text-red-500">${result.riskAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Reward Amount:</span>
              <span className="font-semibold text-green-500">${result.rewardAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-navy-700">
              <span className="text-gray-400">Risk/Reward Ratio:</span>
              <span className="font-bold text-gold-500">1:{result.riskRewardRatio.toFixed(2)}</span>
            </div>
            
            {result.riskRewardRatio < 1.5 && (
              <div className="flex items-start space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-500">
                  Low risk/reward ratio. Consider adjusting your take profit level.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskManagement;
