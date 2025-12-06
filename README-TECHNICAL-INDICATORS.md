# On-Chain Technical Indicators

## Overview
Veil Hub integrates Supra L1's on-chain technical indicators for autonomous trading decisions.

## Supported Indicators

### Simple Moving Average (SMA)
- **Periods**: 9, 20, 50, 200
- **Timeframes**: 5m, 15m, 1h, 4h, 1d
- **Use**: Trend identification

### Exponential Moving Average (EMA)
- **Periods**: 9, 20, 50, 200
- **Timeframes**: 5m, 15m, 1h, 4h, 1d
- **Use**: Fast trend detection, golden cross signals

### Relative Strength Index (RSI)
- **Periods**: 7, 14, 21
- **Timeframes**: 5m, 15m, 1h, 4h, 1d
- **Use**: Overbought (>70) / Oversold (<30) detection

## Trading Signals

### Golden Cross
```move
// 9 EMA crosses above 50 EMA = Bullish
let is_bullish = veil_indicators::check_golden_cross(BTC_USDT);
```

### RSI Signals
```move
// RSI < 30 = Oversold (Buy)
// RSI > 70 = Overbought (Sell)
let signal = veil_indicators::check_rsi_signal(ETH_USDT);
```

### Composite Signal
```move
// Combines multiple indicators for confidence score
let signal = veil_indicators::get_trading_signal(pair_id);
// Returns: { is_bullish, confidence (0-100), timestamp }
```

## Autonomous Harvesting

Auto-harvest only executes when:
1. 7 days have passed since last harvest
2. BTC and ETH both show bullish signals
3. Confidence score > 70%

```move
public entry fun auto_harvest_yields(account: &signer) {
    // Check time interval
    if (current_time < last_harvest + 7_days) return;
    
    // Check market conditions
    if (!veil_indicators::should_auto_harvest()) return;
    
    // Execute harvest
    harvest();
}
```

## Assets Supported (Phase 1)
- BTC_USDT (Pair ID: 0)
- ETH_USDT (Pair ID: 1)
- SOL_USDT (Pair ID: 10)
- BNB_USDT (Pair ID: 49)
- SUPRA_USDT (Pair ID: 500)

## Data Freshness
- Indicators calculated after candle closes
- 1h timeframe = indicator available 1 hour after period start
- Missing candles tolerance: 10%

## Gas Optimization
- Pre-calculated indicators (no raw candle queries)
- Cached values in storage
- View functions for read-only access
