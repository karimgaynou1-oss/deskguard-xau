from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Candle(BaseModel):
    time: int
    open: float
    high: float
    low: float
    close: float
    volume: float

class PriceData(BaseModel):
    symbol: str
    price: float
    timestamp: int
    change: float
    changePercent: float

class TechnicalIndicators(BaseModel):
    sma_20: Optional[float] = None
    sma_50: Optional[float] = None
    ema_12: Optional[float] = None
    ema_26: Optional[float] = None
    rsi: Optional[float] = None
    macd: Optional[float] = None
    macd_signal: Optional[float] = None
    macd_histogram: Optional[float] = None
    bb_upper: Optional[float] = None
    bb_middle: Optional[float] = None
    bb_lower: Optional[float] = None

class RiskManagement(BaseModel):
    accountSize: float
    riskPercentage: float
    entryPrice: float
    stopLoss: float
    takeProfit: float
    positionSize: float
    riskAmount: float
    rewardAmount: float
    riskRewardRatio: float

class PerformanceMetrics(BaseModel):
    totalTrades: int
    winningTrades: int
    losingTrades: int
    winRate: float
    totalPnL: float
    averageWin: float
    averageLoss: float
    profitFactor: float
    maxDrawdown: float
