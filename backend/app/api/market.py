from fastapi import APIRouter, Query
from typing import Optional
from app.models.schemas import Candle, PriceData, TechnicalIndicators
from app.services import market_data_service, indicator_service

router = APIRouter()

@router.get("/price", response_model=PriceData)
async def get_current_price():
    """Get current XAUUSD price"""
    price_data = market_data_service.get_current_price()
    return price_data

@router.get("/candles")
async def get_candles(
    timeframe: str = Query("1m", description="Timeframe: 1m, 5m, 15m, 1h, 4h, 1d"),
    count: int = Query(100, description="Number of candles", ge=1, le=1000)
):
    """Get historical candlestick data"""
    candles = market_data_service.generate_candles(timeframe, count)
    return {"timeframe": timeframe, "candles": candles}

@router.get("/indicators", response_model=TechnicalIndicators)
async def get_indicators(
    timeframe: str = Query("1h", description="Timeframe for indicators"),
    count: int = Query(200, description="Number of candles for calculation")
):
    """Get technical indicators for XAUUSD"""
    candles = market_data_service.generate_candles(timeframe, count)
    indicators = indicator_service.calculate_all_indicators(candles)
    return indicators
