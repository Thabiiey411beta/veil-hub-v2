module veil_hub::vault_v2 {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_framework::table::{Self, Table};
    use veil_hub::veil_token::VEIL;

    const PERFORMANCE_FEE: u64 = 10; // 10%
    const FEE_BURN_RATE: u64 = 60; // 60% burned
    const FEE_TO_RESERVE: u64 = 25; // 25% to reserve
    const FEE_TO_VEVEIL: u64 = 15; // 15% to veVEIL

    // Strategy APYs: 18.5%, 8.2%, 24.3%
    const STRATEGY_BTC_ETH_APY: u64 = 185; // 18.5%
    const STRATEGY_STABLE_APY: u64 = 82; // 8.2%
    const STRATEGY_DEFI_APY: u64 = 243; // 24.3%

    struct VaultShare has store {
        amount: u64,
        deposit_time: u64,
        last_harvest: u64,
    }

    struct Vault has key {
        strategy_id: u64,
        shares: Table<address, VaultShare>,
        total_shares: u64,
        total_assets: u64,
        accumulated_fees: u64,
    }

    public entry fun initialize_vault(admin: &signer, strategy_id: u64) {
        assert!(strategy_id >= 1 && strategy_id <= 3, 1);
        
        move_to(admin, Vault {
            strategy_id,
            shares: table::new(),
            total_shares: 0,
            total_assets: 0,
            accumulated_fees: 0,
        });
    }

    fun get_strategy_apy(strategy_id: u64): u64 {
        if (strategy_id == 1) {
            STRATEGY_BTC_ETH_APY
        } else if (strategy_id == 2) {
            STRATEGY_STABLE_APY
        } else {
            STRATEGY_DEFI_APY
        }
    }

    public entry fun deposit(
        user: &signer,
        amount: u64,
        strategy_id: u64,
    ) acquires Vault {
        let user_addr = signer::address_of(user);
        let vault = borrow_global_mut<Vault>(@veil_hub);
        assert!(vault.strategy_id == strategy_id, 2);

        let now = timestamp::now_seconds();
        let share = VaultShare {
            amount,
            deposit_time: now,
            last_harvest: now,
        };

        if (table::contains(&vault.shares, user_addr)) {
            let old_share = table::remove(&mut vault.shares, user_addr);
            vault.total_shares = vault.total_shares - old_share.amount;
        };

        table::add(&mut vault.shares, user_addr, share);
        vault.total_shares = vault.total_shares + amount;
        vault.total_assets = vault.total_assets + amount;
    }

    public fun calculate_yield(user: address, strategy_id: u64): u64 acquires Vault {
        let vault = borrow_global<Vault>(@veil_hub);
        assert!(vault.strategy_id == strategy_id, 2);

        if (!table::contains(&vault.shares, user)) {
            return 0
        };

        let share = table::borrow(&vault.shares, user);
        let now = timestamp::now_seconds();
        let time_elapsed = now - share.deposit_time;
        let apy = get_strategy_apy(strategy_id);

        let annual_yield = (share.amount * apy) / 1000;
        (annual_yield * time_elapsed) / 31_536_000
    }

    public entry fun harvest(
        user: &signer,
        strategy_id: u64,
    ) acquires Vault {
        let user_addr = signer::address_of(user);
        let vault = borrow_global_mut<Vault>(@veil_hub);
        assert!(vault.strategy_id == strategy_id, 2);

        let yield_earned = calculate_yield(user_addr, strategy_id);
        if (yield_earned == 0) {
            return
        };

        let fee = (yield_earned * PERFORMANCE_FEE) / 100;
        let burned = (fee * FEE_BURN_RATE) / 100;
        let to_reserve = (fee * FEE_TO_RESERVE) / 100;
        let to_veveil = (fee * FEE_TO_VEVEIL) / 100;

        vault.accumulated_fees = vault.accumulated_fees + fee;
        vault.total_assets = vault.total_assets + yield_earned;

        let share = table::borrow_mut(&mut vault.shares, user_addr);
        share.last_harvest = timestamp::now_seconds();
    }

    public entry fun withdraw(
        user: &signer,
        amount: u64,
        strategy_id: u64,
    ) acquires Vault {
        let user_addr = signer::address_of(user);
        let vault = borrow_global_mut<Vault>(@veil_hub);
        assert!(vault.strategy_id == strategy_id, 2);

        let share = table::borrow_mut(&mut vault.shares, user_addr);
        assert!(share.amount >= amount, 3);

        share.amount = share.amount - amount;
        vault.total_shares = vault.total_shares - amount;
        vault.total_assets = vault.total_assets - amount;

        if (share.amount == 0) {
            table::remove(&mut vault.shares, user_addr);
        };
    }

    public fun get_vault_tvl(strategy_id: u64): u64 acquires Vault {
        let vault = borrow_global<Vault>(@veil_hub);
        assert!(vault.strategy_id == strategy_id, 2);
        vault.total_assets
    }

    public fun get_vault_apy(strategy_id: u64): u64 {
        get_strategy_apy(strategy_id)
    }
}
