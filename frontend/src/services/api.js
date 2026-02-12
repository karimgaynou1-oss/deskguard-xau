import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const marketAPI = {
  getCurrentPrice: () => axios.get(`${API_BASE_URL}/api/market/price`),
  getCandles: (timeframe, count = 100) => 
    axios.get(`${API_BASE_URL}/api/market/candles`, { params: { timeframe, count } }),
  getIndicators: (timeframe = '1h', count = 200) => 
    axios.get(`${API_BASE_URL}/api/market/indicators`, { params: { timeframe, count } }),
};

export const riskAPI = {
  calculateRisk: (params) => {
    // Convert camelCase to snake_case for backend API
    const snakeCaseParams = {
      account_size: params.accountSize,
      risk_percentage: params.riskPercentage,
      entry_price: params.entryPrice,
      stop_loss: params.stopLoss,
      take_profit: params.takeProfit,
    };
    return axios.post(`${API_BASE_URL}/api/risk/calculate`, null, { params: snakeCaseParams });
  },
};

export const performanceAPI = {
  getMetrics: () => axios.get(`${API_BASE_URL}/api/performance/metrics`),
  getEquityCurve: () => axios.get(`${API_BASE_URL}/api/performance/equity-curve`),
};

export const createWebSocket = () => {
  return new WebSocket(`ws://localhost:8000/ws/prices`);
};
