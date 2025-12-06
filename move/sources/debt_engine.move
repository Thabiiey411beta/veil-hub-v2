module veil_hub::debt_engine {
    use std::signer;

    struct Debt has key {
        collateral: u64,
        borrowed: u64,
        interest_rate: u64,
        last_update: u64,
    }

    struct DebtConfig has key {
        min_collateral_ratio: u64, // 180%
        liquidation_ratio: u64, // 120%
        base_rate: u64, // 2%
        optimal_utilization: u64, // 80%
        slope1: u64, // 3% per 10% util (0-80%)
        slope2: u64, // 20% per 10% util (80-100%)
        total_borrowed: u64,
        total_liquidity: u64,
        is_paused: bool,
    }

    public entry fun initialize(account: &signer) {
        move_to(account, DebtConfig {
            min_collateral_ratio: 180,
            liquidation_ratio: 120,
            base_rate: 200, // 2%
            optimal_utilization: 80,
            slope1: 30, // 3%
            slope2: 200, // 20%
            total_borrowed: 0,
            total_liquidity: 1000000_00000000, // 1M initial
            is_paused: false,
        });
    }

    public fun calculate_interest_rate(config: &DebtConfig): u64 {
        if (config.total_liquidity == 0) {
            return config.base_rate
        };
        
        let utilization = (config.total_borrowed * 100) / config.total_liquidity;
        
        if (utilization < config.optimal_utilization) {
            // 2% to 5%: base + (util * slope1 / optimal)
            config.base_rate + (utilization * config.slope1) / config.optimal_utilization
        } else {
            // 5% to 25%: 5% + ((util - 80) * slope2 / 20)
            500 + ((utilization - config.optimal_utilization) * config.slope2) / 20
        }
    }

    public entry fun borrow(account: &signer, collateral: u64, amount: u64) acquires DebtConfig {
        let config = borrow_global_mut<DebtConfig>(@veil_hub);
        assert!(!config.is_paused, 100);
        
        let ratio = (collateral * 100) / amount;
        assert!(ratio >= config.min_collateral_ratio, 1);

        let current_rate = calculate_interest_rate(config);
        config.total_borrowed = config.total_borrowed + amount;

        move_to(account, Debt {
            collateral,
            borrowed: amount,
            interest_rate: current_rate,
            last_update: 0,
        });
    }

    public entry fun repay(account: &signer, amount: u64) acquires Debt, DebtConfig {
        let config = borrow_global_mut<DebtConfig>(@veil_hub);
        let debt = borrow_global_mut<Debt>(signer::address_of(account));
        
        debt.borrowed = debt.borrowed - amount;
        config.total_borrowed = config.total_borrowed - amount;
    }

    public entry fun pause(account: &signer) acquires DebtConfig {
        assert!(signer::address_of(account) == @veil_hub, 99);
        let config = borrow_global_mut<DebtConfig>(@veil_hub);
        config.is_paused = true;
    }

    public entry fun unpause(account: &signer) acquires DebtConfig {
        assert!(signer::address_of(account) == @veil_hub, 99);
        let config = borrow_global_mut<DebtConfig>(@veil_hub);
        config.is_paused = false;
    }

    #[view]
    public fun get_current_rate(): u64 acquires DebtConfig {
        let config = borrow_global<DebtConfig>(@veil_hub);
        calculate_interest_rate(config)
    }

    #[view]
    public fun get_utilization(): u64 acquires DebtConfig {
        let config = borrow_global<DebtConfig>(@veil_hub);
        if (config.total_liquidity == 0) { return 0 };
        (config.total_borrowed * 100) / config.total_liquidity
    }
}
