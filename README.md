# DeskGuard XAU - XAUUSD Trading Dashboard

Professional institutional trading dashboard for XAUUSD (Gold/USD) with real-time data, technical indicators, and risk management tools.

## Features

- **Multi-timeframe Analysis**: 1m, 5m, 15m, 1h, 4h, 1d charts
- **TradingView Charts**: Professional candlestick visualization
- **Technical Indicators**: SMA, EMA, RSI, MACD, Bollinger Bands
- **Risk Management**: Position sizing, risk/reward calculator
- **Performance Tracking**: Equity curve, win rate, P&L analysis
- **Real-time Updates**: WebSocket-based price streaming
- **Institutional Theme**: Dark Goldman Sachs inspired design

## Tech Stack

### Backend
- FastAPI (Python web framework)
- WebSocket for real-time data
- NumPy & Pandas for calculations
- Technical Analysis library (ta)

### Frontend
- React + Vite
- TradingView Lightweight Charts
- TailwindCSS for styling
- Axios for API communication

## Getting Started

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Market Data
- `GET /api/market/price` - Get current XAUUSD price
- `GET /api/market/candles` - Get historical candlestick data
- `GET /api/market/indicators` - Get technical indicators
- `WS /ws/prices` - WebSocket for real-time price updates

### Risk Management
- `POST /api/risk/calculate` - Calculate position size and risk metrics

### Performance
- `GET /api/performance/metrics` - Get trading performance metrics
- `GET /api/performance/equity-curve` - Get equity curve data

## Project Structure

```
deskguard-xau/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── api/                 # API routes
│   │   │   ├── market.py        # Market data endpoints
│   │   │   ├── risk.py          # Risk management endpoints
│   │   │   └── performance.py   # Performance endpoints
│   │   ├── services/            # Business logic
│   │   │   ├── market_data.py   # Market data generation
│   │   │   ├── indicators.py    # Technical indicators
│   │   │   └── risk_management.py # Risk calculations
│   │   └── models/              # Data models
│   │       └── schemas.py       # Pydantic models
│   ├── requirements.txt
│   └── config.py
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom hooks
│   │   ├── styles/              # CSS/styling
│   │   └── App.jsx              # Main app component
│   ├── package.json
│   └── vite.config.js
└── docker-compose.yml
```

## Development

### Running with Docker

```bash
docker-compose up
```

### Environment Variables

Create a `.env` file in the backend directory:

```
APP_NAME="DeskGuard XAU Trading Dashboard"
APP_VERSION="1.0.0"
```

## Features in Detail

### Technical Indicators
- **SMA (Simple Moving Average)**: 20 and 50 periods
- **EMA (Exponential Moving Average)**: 12 and 26 periods
- **RSI (Relative Strength Index)**: 14 period
- **MACD**: 12, 26, 9 configuration
- **Bollinger Bands**: 20 period, 2 standard deviations

### Risk Management
- Position size calculator based on account risk
- Risk/Reward ratio analysis
- Stop-loss and take-profit level optimization
- Maximum drawdown tracking

### Performance Metrics
- Total trades and win rate
- Average win/loss analysis
- Profit factor calculation
- Equity curve visualization
- Monthly returns breakdown

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
