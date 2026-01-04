module veil_hub::restaking_v2 {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_framework::table::{Self, Table};
    use veil_hub::veil_token::VEIL;

    // Pool APYs: Base + Restaking
    const POOL_VEIL_BASE_APY: u64 = 120; // 12%
    const POOL_VEIL_RESTAKING_APY: u64 = 85; // 8.5%
    const POOL_STABLE_BASE_APY: u64 = 82; // 8.2%
    const POOL_STABLE_RESTAKING_APY: u64 = 45; // 4.5%
    const POOL_DEFI_BASE_APY: u64 = 243; // 24.3%
    const POOL_DEFI_RESTAKING_APY: u64 = 128; // 12.8%

    struct RestakingPosition has store {
        amount: u64,
        pool_id: u64,
        stake_time: u64,
        lrt_balance: u64,
        earned_yield: u64,
        earned_restaking: u64,
    }

    struct RestakingPool has store {
        pool_id: u64,
        base_apy: u64,
        restaking_apy: u64,
        tvl: u64,
        validators: u64,
        insurance_pool: u64,
        slashing_risk: u64,
    }

    struct RestakingStore has key {
        positions: Table<address, RestakingPosition>,
        pools: Table<u64, RestakingPool>,
        total_staked: u64,
        total_validators: u64,
    }

    public entry fun initialize(admin: &signer) {
        let store = RestakingStore {
            positions: table::new(),
            pools: table::new(),
            total_staked: 0,
            total_validators: 0,
        };

        // Initialize 3 pools
        table::add(&mut store.pools, 1, RestakingPool {
            pool_id: 1,
            base_apy: POOL_VEIL_BASE_APY,
            restaking_apy: POOL_VEIL_RESTAKING_APY,
            tvl: 85_000_000_000,
            validators: 245,
            insurance_pool: 50_000_000_000,
            slashing_risk: 1, // Low
        });

        table::add(&mut store.pools, 2, RestakingPool {
            pool_id: 2,
            base_apy: POOL_STABLE_BASE_APY,
            restaking_apy: POOL_STABLE_RESTAKING_APY,
            tvl: 120_000_000_000,
            validators: 512,
            insurance_pool: 100_000_000_000,
            slashing_risk: 0, // Very Low
        });

        table::add(&mut store.pools, 3, RestakingPool {
            pool_id: 3,
            base_apy: POOL_DEFI_BASE_APY,
            restaking_apy: POOL_DEFI_RESTAKING_APY,
            tvl: 45_000_000_000,
            validators: 128,
            insurance_pool: 25_000_000_000,
            slashing_risk: 2, // Medium
        });

        move_to(admin, store);
    }

    public entry fun stake(
        user: &signer,
        amount: u64,
        pool_id: u64,
    ) acquires RestakingStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<RestakingStore>(@veil_hub);
        assert!(pool_id >= 1 && pool_id <= 3, 1);

        let lrt_amount = amount; // 1:1 LRT minting
        let position = RestakingPosition {
            amount,
            pool_id,
            stake_time: timestamp::now_seconds(),
            lrt_balance: lrt_amount,
            earned_yield: 0,
            earned_restaking: 0,
        };

        if (table::contains(&store.positions, user_addr)) {
            let old_pos = table::remove(&mut store.positions, user_addr);
            let pool = table::borrow_mut(&mut store.pools, old_pos.pool_id);
            pool.tvl = pool.tvl - old_pos.amount;
        };

        table::add(&mut store.positions, user_addr, position);
        
        let pool = table::borrow_mut(&mut store.pools, pool_id);
        pool.tvl = pool.tvl + amount;
        store.total_staked = store.total_staked + amount;
    }

    public fun calculate_yield(user: address, pool_id: u64): u64 acquires RestakingStore {
        let store = borrow_global<RestakingStore>(@veil_hub);
        if (!table::contains(&store.positions, user)) {
            return 0
        };

        let pos = table::borrow(&store.positions, user);
        assert!(pos.pool_id == pool_id, 2);

        let pool = table::borrow(&store.pools, pool_id);
        let now = timestamp::now_seconds();
        let time_elapsed = now - pos.stake_time;

        let annual_base_yield = (pos.amount * pool.base_apy) / 1000;
        (annual_base_yield * time_elapsed) / 31_536_000
    }

    public fun calculate_restaking_rewards(user: address, pool_id: u64): u64 acquires RestakingStore {
        let store = borrow_global<RestakingStore>(@veil_hub);
        if (!table::contains(&store.positions, user)) {
            return 0
        };

        let pos = table::borrow(&store.positions, user);
        assert!(pos.pool_id == pool_id, 2);

        let pool = table::borrow(&store.pools, pool_id);
        let now = timestamp::now_seconds();
        let time_elapsed = now - pos.stake_time;

        let annual_restaking = (pos.amount * pool.restaking_apy) / 1000;
        (annual_restaking * time_elapsed) / 31_536_000
    }

    public fun get_total_apy(pool_id: u64): u64 acquires RestakingStore {
        let store = borrow_global<RestakingStore>(@veil_hub);
        let pool = table::borrow(&store.pools, pool_id);
        pool.base_apy + pool.restaking_apy
    }

    public entry fun claim_rewards(
        user: &signer,
        pool_id: u64,
    ) acquires RestakingStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<RestakingStore>(@veil_hub);

        let yield_earned = calculate_yield(user_addr, pool_id);
        let restaking_earned = calculate_restaking_rewards(user_addr, pool_id);

        let pos = table::borrow_mut(&mut store.positions, user_addr);
        pos.earned_yield = pos.earned_yield + yield_earned;
        pos.earned_restaking = pos.earned_restaking + restaking_earned;
        pos.stake_time = timestamp::now_seconds();
    }

    public entry fun unstake(
        user: &signer,
        pool_id: u64,
    ) acquires RestakingStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<RestakingStore>(@veil_hub);

        let pos = table::remove(&mut store.positions, user_addr);
        let pool = table::borrow_mut(&mut store.pools, pool_id);
        pool.tvl = pool.tvl - pos.amount;
        store.total_staked = store.total_staked - pos.amount;
    }

    public fun get_pool_tvl(pool_id: u64): u64 acquires RestakingStore {
        let store = borrow_global<RestakingStore>(@veil_hub);
        let pool = table::borrow(&store.pools, pool_id);
        pool.tvl
    }

    public fun get_pool_validators(pool_id: u64): u64 acquires RestakingStore {
        let store = borrow_global<RestakingStore>(@veil_hub);
        let pool = table::borrow(&store.pools, pool_id);
        pool.validators
    }

    public fun get_insurance_coverage(pool_id: u64): u64 acquires RestakingStore {
        let store = borrow_global<RestakingStore>(@veil_hub);
        let pool = table::borrow(&store.pools, pool_id);
        pool.insurance_pool
    }
}
