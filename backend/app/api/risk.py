from fastapi import APIRouter, Query
from app.models.schemas import RiskManagement
from app.services import risk_management_service

router = APIRouter()

@router.post("/calculate", response_model=RiskManagement)
async def calculate_risk_management(
    account_size: float = Query(..., description="Account size in USD"),
    risk_percentage: float = Query(..., description="Risk percentage per trade", ge=0.1, le=10),
    entry_price: float = Query(..., description="Entry price"),
    stop_loss: float = Query(..., description="Stop loss price"),
    take_profit: float = Query(..., description="Take profit price")
):
    """Calculate risk management metrics"""
    result = risk_management_service.calculate_full_risk_management(
        account_size, risk_percentage, entry_price, stop_loss, take_profit
    )
    return result
