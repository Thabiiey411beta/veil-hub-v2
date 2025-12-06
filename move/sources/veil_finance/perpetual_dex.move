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
        max_leverage: u64, // 50x = 5000 bps
        liquidation_threshold: u64, // 90% = 9000 bps
        total_volume: u128,
        total_fees_collected: u64,
    }

    public entry fun initialize(account: &signer) {
        move_to(account, PerpConfig {
            max_leverage: 5000, // 50x
            liquidation_threshold: 9000,
            total_volume: 0,
            total_fees_collected: 0,
        });

        move_to(account, Market {
            total_long: 0,
            total_short: 0,
            funding_rate: 0,
            last_funding_time: 0,
            accumulated_fees: 0,
        });
    }

    public entry fun open_position(
        account: &signer,
        collateral: u64,
        size: u64,
        is_long: bool,
        entry_price: u128
    ) acquires Market, PerpConfig {
        let market = borrow_global_mut<Market>(@veil_hub);
        let config = borrow_global_mut<PerpConfig>(@veil_hub);

        // Calculate fee (60% burn, 40% to veVEIL stakers)
        let fee = (size * TRADING_FEE_BPS) / 10000;
        let burn_amount = (fee * 60) / 100;
        market.accumulated_fees = market.accumulated_fees + burn_amount;
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

        // Calculate fee
        let fee = (position.size * TRADING_FEE_BPS) / 10000;
        market.accumulated_fees = market.accumulated_fees + fee;
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
}
