from typing import Dict

class RiskManagementService:
    """Service for risk management calculations"""
    
    @staticmethod
    def calculate_position_size(
        account_size: float,
        risk_percentage: float,
        entry_price: float,
        stop_loss: float
    ) -> Dict:
        """Calculate position size based on risk parameters"""
        risk_amount = account_size * (risk_percentage / 100)
        price_difference = abs(entry_price - stop_loss)
        
        if price_difference == 0:
            return {
                "positionSize": 0,
                "riskAmount": 0,
                "message": "Invalid stop loss - same as entry price"
            }
        
        position_size = risk_amount / price_difference
        
        return {
            "positionSize": round(position_size, 4),
            "riskAmount": round(risk_amount, 2),
            "maxLoss": round(risk_amount, 2)
        }
    
    @staticmethod
    def calculate_risk_reward(
        entry_price: float,
        stop_loss: float,
        take_profit: float,
        position_size: float = 1.0
    ) -> Dict:
        """Calculate risk/reward ratio"""
        risk = abs(entry_price - stop_loss) * position_size
        reward = abs(take_profit - entry_price) * position_size
        
        if risk == 0:
            ratio = 0
        else:
            ratio = reward / risk
        
        return {
            "riskAmount": round(risk, 2),
            "rewardAmount": round(reward, 2),
            "riskRewardRatio": round(ratio, 2)
        }
    
    @staticmethod
    def calculate_full_risk_management(
        account_size: float,
        risk_percentage: float,
        entry_price: float,
        stop_loss: float,
        take_profit: float
    ) -> Dict:
        """Calculate complete risk management metrics"""
        position_data = RiskManagementService.calculate_position_size(
            account_size, risk_percentage, entry_price, stop_loss
        )
        
        position_size = position_data.get("positionSize", 0)
        
        risk_reward = RiskManagementService.calculate_risk_reward(
            entry_price, stop_loss, take_profit, position_size
        )
        
        return {
            "accountSize": account_size,
            "riskPercentage": risk_percentage,
            "entryPrice": entry_price,
            "stopLoss": stop_loss,
            "takeProfit": take_profit,
            "positionSize": position_size,
            "riskAmount": risk_reward["riskAmount"],
            "rewardAmount": risk_reward["rewardAmount"],
            "riskRewardRatio": risk_reward["riskRewardRatio"]
        }

risk_management_service = RiskManagementService()
