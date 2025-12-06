module veil_hub::buyback_engine {
    use std::signer;

    struct PricePoint has store {
        price: u64,
        timestamp: u64,
    }

    struct BuybackConfig has key {
        usdc_reserve: u64,
        veil_burned: u64,
        last_buyback: u64,
        twap_window: u64, // 24 hours
        max_slippage: u64, // 2% = 200 bps
        min_liquidity: u64, // $100k min
        price_history: vector<PricePoint>,
    }

    const ERROR_HIGH_SLIPPAGE: u64 = 1;
    const ERROR_LOW_LIQUIDITY: u64 = 2;

    public entry fun initialize(account: &signer) {
        move_to(account, BuybackConfig {
            usdc_reserve: 0,
            veil_burned: 0,
            last_buyback: 0,
            twap_window: 86400, // 24 hours
            max_slippage: 200, // 2%
            min_liquidity: 100000_000000, // $100k
            price_history: vector::empty<PricePoint>(),
        });
    }

    public fun calculate_twap(price_history: &vector<PricePoint>, window: u64): u64 {
        let len = vector::length(price_history);
        if (len == 0) { return 0 };
        
        let sum = 0u128;
        let count = 0u64;
        let current_time = 0; // timestamp::now_seconds();
        
        let i = 0;
        while (i < len) {
            let point = vector::borrow(price_history, i);
            if (current_time - point.timestamp <= window) {
                sum = sum + (point.price as u128);
                count = count + 1;
            };
            i = i + 1;
        };
        
        if (count == 0) { return 0 };
        ((sum / (count as u128)) as u64)
    }

    public entry fun execute_buyback(
        account: &signer,
        usdc_amount: u64,
        current_price: u64,
        pool_liquidity: u64
    ) acquires BuybackConfig {
        let config = borrow_global_mut<BuybackConfig>(@veil_hub);
        
        // Check liquidity
        assert!(pool_liquidity >= config.min_liquidity, ERROR_LOW_LIQUIDITY);
        
        // Calculate TWAP
        let twap = calculate_twap(&config.price_history, config.twap_window);
        
        // Check slippage (only if TWAP exists)
        if (twap > 0) {
            let slippage = if (current_price > twap) {
                ((current_price - twap) * 10000) / twap
            } else {
                ((twap - current_price) * 10000) / twap
            };
            assert!(slippage <= config.max_slippage, ERROR_HIGH_SLIPPAGE);
        };
        
        // Max 5% of pool per buyback
        let max_buy = (pool_liquidity * 5) / 100;
        let actual_buy = if (usdc_amount > max_buy) { max_buy } else { usdc_amount };
        
        config.usdc_reserve = config.usdc_reserve + actual_buy;
        config.last_buyback = 0; // timestamp::now_seconds();
        
        // Update price history
        vector::push_back(&mut config.price_history, PricePoint {
            price: current_price,
            timestamp: 0,
        });
        
        // Keep only last 24 points (1 per hour)
        if (vector::length(&config.price_history) > 24) {
            vector::remove(&mut config.price_history, 0);
        };
    }

    public entry fun burn_bought_veil(account: &signer, amount: u64) acquires BuybackConfig {
        let config = borrow_global_mut<BuybackConfig>(@veil_hub);
        config.veil_burned = config.veil_burned + amount;
    }

    #[view]
    public fun get_twap(): u64 acquires BuybackConfig {
        let config = borrow_global<BuybackConfig>(@veil_hub);
        calculate_twap(&config.price_history, config.twap_window)
    }
}
