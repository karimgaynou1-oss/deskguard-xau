from fastapi import APIRouter
from app.models.schemas import PerformanceMetrics
import random

router = APIRouter()

@router.get("/metrics", response_model=PerformanceMetrics)
async def get_performance_metrics():
    """Get trading performance metrics"""
    total_trades = random.randint(50, 200)
    win_rate = random.uniform(0.45, 0.65)
    winning_trades = int(total_trades * win_rate)
    losing_trades = total_trades - winning_trades
    
    avg_win = random.uniform(150, 300)
    avg_loss = random.uniform(80, 150)
    
    total_pnl = (winning_trades * avg_win) - (losing_trades * avg_loss)
    profit_factor = (winning_trades * avg_win) / (losing_trades * avg_loss) if losing_trades > 0 else 0
    
    return {
        "totalTrades": total_trades,
        "winningTrades": winning_trades,
        "losingTrades": losing_trades,
        "winRate": round(win_rate * 100, 2),
        "totalPnL": round(total_pnl, 2),
        "averageWin": round(avg_win, 2),
        "averageLoss": round(avg_loss, 2),
        "profitFactor": round(profit_factor, 2),
        "maxDrawdown": round(random.uniform(5, 15), 2)
    }

@router.get("/equity-curve")
async def get_equity_curve():
    """Get equity curve data"""
    starting_balance = 10000
    balance = starting_balance
    curve_data = []
    
    for i in range(60):  # 60 days
        change_percent = random.uniform(-0.02, 0.03)  # -2% to +3%
        balance = balance * (1 + change_percent)
        curve_data.append({
            "day": i + 1,
            "balance": round(balance, 2),
            "profit": round(balance - starting_balance, 2)
        })
    
    return {"starting_balance": starting_balance, "data": curve_data}
