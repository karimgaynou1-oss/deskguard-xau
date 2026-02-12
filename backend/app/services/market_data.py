import numpy as np
import pandas as pd
from typing import List, Dict
import random
from datetime import datetime, timedelta

class MarketDataService:
    """Service for generating and managing market data for XAUUSD"""
    
    def __init__(self):
        self.base_price = 2050.0  # Base XAUUSD price
        self.last_price = self.base_price
        self.last_timestamp = datetime.now()
        
    def generate_realistic_price(self) -> float:
        """Generate realistic XAUUSD price movement"""
        # Gold typically moves in small increments
        change_percent = random.uniform(-0.0005, 0.0005)  # 0.05% max change
        self.last_price = self.last_price * (1 + change_percent)
        # Keep price within realistic bounds
        self.last_price = max(1800, min(2500, self.last_price))
        return round(self.last_price, 2)
    
    def get_current_price(self) -> Dict:
        """Get current XAUUSD price with metadata"""
        new_price = self.generate_realistic_price()
        old_price = self.last_price
        change = new_price - old_price
        change_percent = (change / old_price) * 100 if old_price != 0 else 0
        
        return {
            "symbol": "XAUUSD",
            "price": new_price,
            "timestamp": int(datetime.now().timestamp() * 1000),
            "change": round(change, 2),
            "changePercent": round(change_percent, 4)
        }
    
    def generate_candles(self, timeframe: str = "1m", count: int = 100) -> List[Dict]:
        """Generate historical candlestick data"""
        timeframe_minutes = self._get_timeframe_minutes(timeframe)
        candles = []
        
        current_time = datetime.now()
        price = self.base_price
        
        for i in range(count):
            candle_time = current_time - timedelta(minutes=timeframe_minutes * (count - i))
            
            # Generate OHLC
            open_price = price
            volatility = random.uniform(0.001, 0.003)  # 0.1% to 0.3% volatility
            
            high_price = open_price * (1 + random.uniform(0, volatility))
            low_price = open_price * (1 - random.uniform(0, volatility))
            close_price = random.uniform(low_price, high_price)
            volume = random.uniform(100, 1000)
            
            candles.append({
                "time": int(candle_time.timestamp()),
                "open": round(open_price, 2),
                "high": round(high_price, 2),
                "low": round(low_price, 2),
                "close": round(close_price, 2),
                "volume": round(volume, 2)
            })
            
            price = close_price
        
        return candles
    
    def _get_timeframe_minutes(self, timeframe: str) -> int:
        """Convert timeframe string to minutes"""
        mapping = {
            "1m": 1,
            "5m": 5,
            "15m": 15,
            "1h": 60,
            "4h": 240,
            "1d": 1440
        }
        return mapping.get(timeframe, 1)

market_data_service = MarketDataService()
