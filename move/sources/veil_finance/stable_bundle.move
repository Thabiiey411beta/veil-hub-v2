module veil_hub::stable_bundle {
    use std::signer;
    use std::vector;

    const PROTOCOL_AAVE: u8 = 1;
    const PROTOCOL_CURVE: u8 = 2;
    const PROTOCOL_COMPOUND: u8 = 3;

    struct Strategy has store {
        protocol: u8,
        allocation: u64, // Percentage out of 100
        current_apr: u64, // Basis points
        total_deposited: u64,
    }

    struct StableVault has key {
        name: vector<u8>,
        total_shares: u64,
        strategies: vector<Strategy>,
        total_aum: u64,
        last_rebalance: u64,
        benchmark_apr: u64, // 400 = 4%
    }

    struct UserShares has key {
        shares: u64,
        entry_time: u64,
    }

    struct BundleConfig has key {
        entry_fee: u64, // 20 = 0.2%
        exit_fee: u64, // 20 = 0.2%
        mgmt_fee: u64, // 30 = 0.3% annually
        perf_fee: u64, // 500 = 5%
        rebalance_threshold: u64, // 200 = 2% APR difference
    }

    public entry fun initialize(account: &signer) {
        move_to(account, BundleConfig {
            entry_fee: 20,
            exit_fee: 20,
            mgmt_fee: 30,
            perf_fee: 500,
            rebalance_threshold: 200,
        });
    }

    public entry fun create_bundle(
        account: &signer,
        name: vector<u8>,
        benchmark_apr: u64
    ) {
        let strategies = vector::empty<Strategy>();
        
        // Initialize with equal allocation
        vector::push_back(&mut strategies, Strategy {
            protocol: PROTOCOL_AAVE,
            allocation: 40,
            current_apr: 500, // 5%
            total_deposited: 0,
        });
        
        vector::push_back(&mut strategies, Strategy {
            protocol: PROTOCOL_CURVE,
            allocation: 30,
            current_apr: 400, // 4%
            total_deposited: 0,
        });
        
        vector::push_back(&mut strategies, Strategy {
            protocol: PROTOCOL_COMPOUND,
            allocation: 30,
            current_apr: 450, // 4.5%
            total_deposited: 0,
        });

        move_to(account, StableVault {
            name,
            total_shares: 0,
            strategies,
            total_aum: 0,
            last_rebalance: 0,
            benchmark_apr,
        });
    }

    public entry fun deposit(
        account: &signer,
        vault_addr: address,
        amount: u64
    ) acquires StableVault, BundleConfig, UserShares {
        let config = borrow_global<BundleConfig>(@veil_hub);
        let vault = borrow_global_mut<StableVault>(vault_addr);

        // Calculate entry fee
        let fee = (amount * config.entry_fee) / 10000;
        let burn_amount = veil_hub::burn_controller::apply_burn_cap(
            fee / 2,
            veil_hub::burn_controller::get_current_supply()
        );

        // Mint shares
        let net_amount = amount - fee;
        let shares = if (vault.total_shares == 0) {
            net_amount
        } else {
            (net_amount * vault.total_shares) / vault.total_aum
        };

        vault.total_shares = vault.total_shares + shares;
        vault.total_aum = vault.total_aum + net_amount;

        // Distribute to strategies
        distribute_to_strategies(vault, net_amount);

        // Create or update user shares
        let addr = signer::address_of(account);
        if (!exists<UserShares>(addr)) {
            move_to(account, UserShares {
                shares,
                entry_time: 0, // timestamp::now_seconds()
            });
        } else {
            let user = borrow_global_mut<UserShares>(addr);
            user.shares = user.shares + shares;
        };
    }

    public entry fun withdraw(
        account: &signer,
        vault_addr: address,
        shares: u64
    ) acquires StableVault, BundleConfig, UserShares {
        let config = borrow_global<BundleConfig>(@veil_hub);
        let vault = borrow_global_mut<StableVault>(vault_addr);
        let user = borrow_global_mut<UserShares>(signer::address_of(account));

        assert!(user.shares >= shares, 1);

        // Calculate value
        let value = (shares * vault.total_aum) / vault.total_shares;

        // Calculate exit fee
        let fee = (value * config.exit_fee) / 10000;
        let burn_amount = veil_hub::burn_controller::apply_burn_cap(
            fee / 2,
            veil_hub::burn_controller::get_current_supply()
        );

        // Burn shares
        vault.total_shares = vault.total_shares - shares;
        vault.total_aum = vault.total_aum - value;
        user.shares = user.shares - shares;

        // Withdraw from strategies proportionally
        withdraw_from_strategies(vault, value);
    }

    public entry fun auto_rebalance(
        account: &signer,
        vault_addr: address
    ) acquires StableVault, BundleConfig {
        let config = borrow_global<BundleConfig>(@veil_hub);
        let vault = borrow_global_mut<StableVault>(vault_addr);

        // Find best strategy
        let best_idx = 0u64;
        let best_apr = 0u64;
        let i = 0;
        
        while (i < vector::length(&vault.strategies)) {
            let strategy = vector::borrow(&vault.strategies, i);
            if (strategy.current_apr > best_apr) {
                best_apr = strategy.current_apr;
                best_idx = i;
            };
            i = i + 1;
        };

        // Check if rebalance needed
        let current_strategy = vector::borrow(&vault.strategies, 0);
        if (best_apr - current_strategy.current_apr < config.rebalance_threshold) {
            return // No rebalance needed
        };

        // Shift 10% to best strategy
        let shift_amount = vault.total_aum / 10;
        shift_allocation(vault, best_idx, shift_amount);

        vault.last_rebalance = 0; // timestamp::now_seconds()
    }

    fun distribute_to_strategies(vault: &mut StableVault, amount: u64) {
        let i = 0;
        while (i < vector::length(&vault.strategies)) {
            let strategy = vector::borrow_mut(&mut vault.strategies, i);
            let allocation_amount = (amount * strategy.allocation) / 100;
            strategy.total_deposited = strategy.total_deposited + allocation_amount;
            i = i + 1;
        };
    }

    fun withdraw_from_strategies(vault: &mut StableVault, amount: u64) {
        let i = 0;
        while (i < vector::length(&vault.strategies)) {
            let strategy = vector::borrow_mut(&mut vault.strategies, i);
            let withdraw_amount = (amount * strategy.allocation) / 100;
            strategy.total_deposited = strategy.total_deposited - withdraw_amount;
            i = i + 1;
        };
    }

    fun shift_allocation(vault: &mut StableVault, to_idx: u64, amount: u64) {
        // Simplified: shift from lowest APR to highest
        let from_idx = 0u64;
        let lowest_apr = 10000u64;
        
        let i = 0;
        while (i < vector::length(&vault.strategies)) {
            let strategy = vector::borrow(&vault.strategies, i);
            if (strategy.current_apr < lowest_apr && i != to_idx) {
                lowest_apr = strategy.current_apr;
                from_idx = i;
            };
            i = i + 1;
        };

        // Move allocation
        let from_strategy = vector::borrow_mut(&mut vault.strategies, from_idx);
        from_strategy.allocation = from_strategy.allocation - 10;
        from_strategy.total_deposited = from_strategy.total_deposited - amount;

        let to_strategy = vector::borrow_mut(&mut vault.strategies, to_idx);
        to_strategy.allocation = to_strategy.allocation + 10;
        to_strategy.total_deposited = to_strategy.total_deposited + amount;
    }

    #[view]
    public fun get_bundle_apr(vault_addr: address): u64 acquires StableVault {
        let vault = borrow_global<StableVault>(vault_addr);
        
        // Weighted average APR
        let total_apr = 0u128;
        let i = 0;
        while (i < vector::length(&vault.strategies)) {
            let strategy = vector::borrow(&vault.strategies, i);
            total_apr = total_apr + ((strategy.current_apr as u128) * (strategy.allocation as u128));
            i = i + 1;
        };
        
        ((total_apr / 100) as u64)
    }

    #[view]
    public fun get_user_balance(addr: address, vault_addr: address): u64 acquires UserShares, StableVault {
        if (!exists<UserShares>(addr)) {
            return 0
        };
        
        let user = borrow_global<UserShares>(addr);
        let vault = borrow_global<StableVault>(vault_addr);
        
        (user.shares * vault.total_aum) / vault.total_shares
    }
}
