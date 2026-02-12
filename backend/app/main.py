from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from typing import List
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import settings
from app.api import market_router, risk_router, performance_router
from app.services import market_data_service

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    asyncio.create_task(broadcast_prices())
    yield
    # Shutdown
    pass

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(market_router, prefix="/api/market", tags=["Market Data"])
app.include_router(risk_router, prefix="/api/risk", tags=["Risk Management"])
app.include_router(performance_router, prefix="/api/performance", tags=["Performance"])

@app.get("/")
async def root():
    return {
        "app": settings.app_name,
        "version": settings.app_version,
        "status": "running"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

# WebSocket endpoint for real-time price updates
@app.websocket("/ws/prices")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

async def broadcast_prices():
    """Broadcast price updates to all connected clients"""
    while True:
        try:
            price_data = market_data_service.get_current_price()
            await manager.broadcast(price_data)
            await asyncio.sleep(1)  # Update every second
        except Exception as e:
            print(f"Error broadcasting prices: {e}")
            await asyncio.sleep(1)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
