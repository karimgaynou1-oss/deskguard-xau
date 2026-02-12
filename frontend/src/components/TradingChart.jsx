import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { marketAPI } from '../services/api';

const TradingChart = ({ timeframe = '1h' }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candleSeriesRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#001f54' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#0a2463' },
        horzLines: { color: '#0a2463' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await marketAPI.getCandles(timeframe, 200);
        const candles = response.data.candles;
        
        if (candleSeriesRef.current && candles.length > 0) {
          candleSeriesRef.current.setData(candles);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candles:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [timeframe]);

  return (
    <div className="bg-navy-800 rounded-lg p-4 border border-navy-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          XAUUSD Chart - {timeframe.toUpperCase()}
        </h3>
        {loading && (
          <span className="text-xs text-gray-400 animate-pulse">Loading...</span>
        )}
      </div>
      <div ref={chartContainerRef} className="rounded overflow-hidden" />
    </div>
  );
};

export default TradingChart;
