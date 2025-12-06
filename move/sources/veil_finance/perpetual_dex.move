module veil_hub::perpetual_dex {
    use std::signer;

    const TRADING_FEE_BPS: u64 = 5; // 0.05% = 5 bps

    struct Position has key {
        collateral: u64,
        size: u64,
        entry_price: u128,
        is_long: bool,
        funding_index: u64,
    }

    struct Market has key {
        total_long: u64,
        total_short: u64,
        funding_rate: u64, // basis points per day
        last_funding_time: u64,
        accumulated_fees: u64,
    }

    struct PerpConfig has key {
        max_leverage: u64, // Dynamic: 20x-50x
        liquidation_threshold: u64, // 95% = 9500 bps (safer)
        insurance_fund: u64,
        total_volume: u128,
        total_fees_collected: u64,
        funding_rate_cap: u64, // ±0.1% per hour = 10 bps
    }

    public entry fun initialize(account: &signer) {
        move_to(account, PerpConfig {
            max_leverage: 5000, // 50x default
            liquidation_threshold: 9500, // 95%
            insurance_fund: 0,
            total_volume: 0,
            total_fees_collected: 0,
            funding_rate_cap: 10, // 0.1% per hour
        });

        move_to(account, Market {
            total_long: 0,
            total_short: 0,
            funding_rate: 0,
            last_funding_time: 0,
            accumulated_fees: 0,
        });
    }

    public fun calculate_max_leverage(volatility: u64): u64 {
        if (volatility > 100) {
            2000 // 20x in high volatility
        } else if (volatility > 50) {
            3500 // 35x in medium volatility
        } else {
            5000 // 50x in low volatility
        }
    }

    public entry fun open_position(
        account: &signer,
        collateral: u64,
        size: u64,
        is_long: bool,
        entry_price: u128,
        volatility: u64
    ) acquires Market, PerpConfig {
        let market = borrow_global_mut<Market>(@veil_hub);
        let config = borrow_global_mut<PerpConfig>(@veil_hub);

        // Check leverage against volatility
        let max_lev = calculate_max_leverage(volatility);
        let leverage = (size * 100) / collateral;
        assert!(leverage <= max_lev, 1);

        // Calculate fee: 20% insurance, 50% burn, 30% veVEIL
        let fee = (size * TRADING_FEE_BPS) / 10000;
        let to_insurance = (fee * 20) / 100;
        let to_burn = (fee * 50) / 100;
        let to_veveil = (fee * 30) / 100;
        
        // Apply burn cap
        let actual_burn = veil_hub::burn_controller::apply_burn_cap(
            to_burn,
            veil_hub::burn_controller::get_current_supply()
        );
        
        // Excess goes to insurance
        config.insurance_fund = config.insurance_fund + to_insurance + (to_burn - actual_burn);
        market.accumulated_fees = market.accumulated_fees + actual_burn;
        config.total_fees_collected = config.total_fees_collected + fee;
        config.total_volume = config.total_volume + (size as u128);

        // Update market
        if (is_long) {
            market.total_long = market.total_long + size;
        } else {
            market.total_short = market.total_short + size;
        };

        // Create position
        move_to(account, Position {
            collateral,
            size,
            entry_price,
            is_long,
            funding_index: 0,
        });
    }

    public entry fun close_position(account: &signer) acquires Position, Market, PerpConfig {
        let addr = signer::address_of(account);
        let position = move_from<Position>(addr);
        
        let market = borrow_global_mut<Market>(@veil_hub);
        let config = borrow_global_mut<PerpConfig>(@veil_hub);

        // Calculate fee with same split
        let fee = (position.size * TRADING_FEE_BPS) / 10000;
        let to_insurance = (fee * 20) / 100;
        let to_burn = (fee * 50) / 100;
        
        let actual_burn = veil_hub::burn_controller::apply_burn_cap(
            to_burn,
            veil_hub::burn_controller::get_current_supply()
        );
        
        config.insurance_fund = config.insurance_fund + to_insurance + (to_burn - actual_burn);
        market.accumulated_fees = market.accumulated_fees + actual_burn;
        config.total_fees_collected = config.total_fees_collected + fee;

        // Update market
        if (position.is_long) {
            market.total_long = market.total_long - position.size;
        } else {
            market.total_short = market.total_short - position.size;
        };

        let Position { collateral: _, size: _, entry_price: _, is_long: _, funding_index: _ } = position;
    }

    #[view]
    public fun get_total_fees(): u64 acquires PerpConfig {
        borrow_global<PerpConfig>(@veil_hub).total_fees_collected
    }

    #[view]
    public fun get_total_volume(): u128 acquires PerpConfig {
        borrow_global<PerpConfig>(@veil_hub).total_volume
    }

    #[view]
    public fun get_insurance_fund(): u64 acquires PerpConfig {
        borrow_global<PerpConfig>(@veil_hub).insurance_fund
    }

    #[view]
    public fun get_max_leverage_for_volatility(volatility: u64): u64 {
        calculate_max_leverage(volatility)
    }
}
