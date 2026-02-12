import numpy as np
import pandas as pd
from typing import List, Dict, Optional

class IndicatorService:
    """Service for calculating technical indicators"""
    
    @staticmethod
    def calculate_sma(data: List[float], period: int) -> Optional[float]:
        """Calculate Simple Moving Average"""
        if len(data) < period:
            return None
        return round(np.mean(data[-period:]), 2)
    
    @staticmethod
    def calculate_ema(data: List[float], period: int) -> Optional[float]:
        """Calculate Exponential Moving Average"""
        if len(data) < period:
            return None
        df = pd.DataFrame(data, columns=['price'])
        ema = df['price'].ewm(span=period, adjust=False).mean()
        return round(ema.iloc[-1], 2)
    
    @staticmethod
    def calculate_rsi(data: List[float], period: int = 14) -> Optional[float]:
        """Calculate Relative Strength Index"""
        if len(data) < period + 1:
            return None
        
        df = pd.DataFrame(data, columns=['price'])
        delta = df['price'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return round(rsi.iloc[-1], 2)
    
    @staticmethod
    def calculate_macd(data: List[float], fast: int = 12, slow: int = 26, signal: int = 9) -> Dict:
        """Calculate MACD (Moving Average Convergence Divergence)"""
        if len(data) < slow:
            return {"macd": None, "signal": None, "histogram": None}
        
        df = pd.DataFrame(data, columns=['price'])
        ema_fast = df['price'].ewm(span=fast, adjust=False).mean()
        ema_slow = df['price'].ewm(span=slow, adjust=False).mean()
        macd_line = ema_fast - ema_slow
        signal_line = macd_line.ewm(span=signal, adjust=False).mean()
        histogram = macd_line - signal_line
        
        return {
            "macd": round(macd_line.iloc[-1], 2),
            "signal": round(signal_line.iloc[-1], 2),
            "histogram": round(histogram.iloc[-1], 2)
        }
    
    @staticmethod
    def calculate_bollinger_bands(data: List[float], period: int = 20, std_dev: int = 2) -> Dict:
        """Calculate Bollinger Bands"""
        if len(data) < period:
            return {"upper": None, "middle": None, "lower": None}
        
        df = pd.DataFrame(data, columns=['price'])
        middle = df['price'].rolling(window=period).mean()
        std = df['price'].rolling(window=period).std()
        upper = middle + (std * std_dev)
        lower = middle - (std * std_dev)
        
        return {
            "upper": round(upper.iloc[-1], 2),
            "middle": round(middle.iloc[-1], 2),
            "lower": round(lower.iloc[-1], 2)
        }
    
    @staticmethod
    def calculate_all_indicators(candles: List[Dict]) -> Dict:
        """Calculate all technical indicators from candle data"""
        if not candles:
            return {}
        
        close_prices = [candle['close'] for candle in candles]
        
        indicators = {
            "sma_20": IndicatorService.calculate_sma(close_prices, 20),
            "sma_50": IndicatorService.calculate_sma(close_prices, 50),
            "ema_12": IndicatorService.calculate_ema(close_prices, 12),
            "ema_26": IndicatorService.calculate_ema(close_prices, 26),
            "rsi": IndicatorService.calculate_rsi(close_prices, 14),
        }
        
        macd = IndicatorService.calculate_macd(close_prices)
        indicators.update({
            "macd": macd["macd"],
            "macd_signal": macd["signal"],
            "macd_histogram": macd["histogram"]
        })
        
        bb = IndicatorService.calculate_bollinger_bands(close_prices)
        indicators.update({
            "bb_upper": bb["upper"],
            "bb_middle": bb["middle"],
            "bb_lower": bb["lower"]
        })
        
        return indicators

indicator_service = IndicatorService()
