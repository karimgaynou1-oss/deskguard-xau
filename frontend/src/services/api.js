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
  calculateRisk: (params) => 
    axios.post(`${API_BASE_URL}/api/risk/calculate`, null, { params }),
};

export const performanceAPI = {
  getMetrics: () => axios.get(`${API_BASE_URL}/api/performance/metrics`),
  getEquityCurve: () => axios.get(`${API_BASE_URL}/api/performance/equity-curve`),
};

export const createWebSocket = () => {
  return new WebSocket(`ws://localhost:8000/ws/prices`);
};
