module veil_hub::veil_indicators {
    use supra_oracle::supra_oracle_ti;
    use std::option::{Self, Option};
    use std::signer;

    const BTC_USDT: u32 = 0;
    const ETH_USDT: u32 = 1;
    const SOL_USDT: u32 = 10;
    
    const ONE_HOUR: u64 = 3_600_000;
    const FOUR_HOURS: u64 = 14_400_000;
    const TOLERANCE: u64 = 1000; // 10% missing candles

    struct TradingSignal has copy, drop {
        is_bullish: bool,
        confidence: u8,
        timestamp: u64,
    }

    /// Check golden cross (9 EMA > 50 EMA) for bullish signal
    #[view]
    public fun check_golden_cross(pair_id: u32): Option<bool> {
        let (fast_ema, _, _) = supra_oracle_ti::compute_ema(pair_id, 9, ONE_HOUR, TOLERANCE);
        let (slow_ema, _, _) = supra_oracle_ti::compute_ema(pair_id, 50, ONE_HOUR, TOLERANCE);
        
        if (option::is_some(&fast_ema) && option::is_some(&slow_ema)) {
            let fast = *option::borrow(&fast_ema);
            let slow = *option::borrow(&slow_ema);
            option::some(fast > slow)
        } else {
            option::none()
        }
    }

    /// Check RSI for oversold/overbought conditions
    #[view]
    public fun check_rsi_signal(pair_id: u32): Option<u8> {
        let (rsi, _) = supra_oracle_ti::compute_rsi(pair_id, 14, FOUR_HOURS, TOLERANCE);
        
        if (option::is_some(&rsi)) {
            let rsi_value = *option::borrow(&rsi);
            let rsi_scaled = (rsi_value / 100000000) as u8; // Scale down from DECIMAL_BUFFER
            
            if (rsi_scaled < 30) {
                option::some(1) // Oversold - buy signal
            } else if (rsi_scaled > 70) {
                option::some(2) // Overbought - sell signal
            } else {
                option::some(0) // Neutral
            }
        } else {
            option::none()
        }
    }

    /// Get comprehensive trading signal combining multiple indicators
    #[view]
    public fun get_trading_signal(pair_id: u32): Option<TradingSignal> {
        let golden_cross = check_golden_cross(pair_id);
        let rsi_signal = check_rsi_signal(pair_id);
        
        if (option::is_none(&golden_cross) || option::is_none(&rsi_signal)) {
            return option::none()
        };
        
        let is_bullish = *option::borrow(&golden_cross);
        let rsi = *option::borrow(&rsi_signal);
        
        let confidence = if (is_bullish && rsi == 1) {
            90 // Strong buy
        } else if (!is_bullish && rsi == 2) {
            90 // Strong sell
        } else if (is_bullish) {
            60 // Moderate buy
        } else {
            40 // Weak signal
        };
        
        option::some(TradingSignal {
            is_bullish,
            confidence,
            timestamp: aptos_framework::timestamp::now_microseconds(),
        })
    }

    /// Check if it's safe to auto-harvest based on market conditions
    #[view]
    public fun should_auto_harvest(): bool {
        let btc_signal = get_trading_signal(BTC_USDT);
        let eth_signal = get_trading_signal(ETH_USDT);
        
        if (option::is_some(&btc_signal) && option::is_some(&eth_signal)) {
            let btc = option::borrow(&btc_signal);
            let eth = option::borrow(&eth_signal);
            
            // Harvest when both BTC and ETH show bullish signals with high confidence
            btc.is_bullish && eth.is_bullish && btc.confidence > 70 && eth.confidence > 70
        } else {
            false
        }
    }
}
