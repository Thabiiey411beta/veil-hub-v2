module veil_hub::phantom_index_v2 {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_framework::table::{Self, Table};
    use veil_hub::veil_token::VEIL;

    const TIER_BASIC_COST: u64 = 10_000_000_000; // 10k VEIL
    const TIER_PRO_COST: u64 = 25_000_000_000; // 25k VEIL
    const TIER_ENTERPRISE_COST: u64 = 100_000_000_000; // 100k VEIL

    // Pre-built indices APYs
    const INDEX_BTC_ETH_APY: u64 = 185; // 18.5%
    const INDEX_STABLE_APY: u64 = 82; // 8.2%
    const INDEX_DEFI_APY: u64 = 243; // 24.3%

    struct IndexPosition has store {
        amount: u64,
        index_id: u64,
        deposit_time: u64,
    }

    struct CustomIndex has store {
        creator: address,
        tier: u64,
        assets: vector<u64>,
        weights: vector<u64>,
        created_at: u64,
        rebalance_freq: u64,
    }

    struct IndexStore has key {
        positions: Table<address, IndexPosition>,
        custom_indices: Table<u64, CustomIndex>,
        total_indices: u64,
        btc_eth_tvl: u64,
        stable_tvl: u64,
        defi_tvl: u64,
        rebalance_count: u64,
        gas_saved: u64,
    }

    public entry fun initialize(admin: &signer) {
        move_to(admin, IndexStore {
            positions: table::new(),
            custom_indices: table::new(),
            total_indices: 0,
            btc_eth_tvl: 0,
            stable_tvl: 0,
            defi_tvl: 0,
            rebalance_count: 0,
            gas_saved: 0,
        });
    }

    fun get_index_apy(index_id: u64): u64 {
        if (index_id == 1) {
            INDEX_BTC_ETH_APY
        } else if (index_id == 2) {
            INDEX_STABLE_APY
        } else {
            INDEX_DEFI_APY
        }
    }

    public entry fn deposit_index(
        user: &signer,
        amount: u64,
        index_id: u64,
    ) acquires IndexStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<IndexStore>(@veil_hub);
        assert!(index_id >= 1 && index_id <= 3, 1);

        let position = IndexPosition {
            amount,
            index_id,
            deposit_time: timestamp::now_seconds(),
        };

        if (table::contains(&store.positions, user_addr)) {
            let old_pos = table::remove(&mut store.positions, user_addr);
            if (old_pos.index_id == 1) {
                store.btc_eth_tvl = store.btc_eth_tvl - old_pos.amount;
            } else if (old_pos.index_id == 2) {
                store.stable_tvl = store.stable_tvl - old_pos.amount;
            } else {
                store.defi_tvl = store.defi_tvl - old_pos.amount;
            };
        };

        table::add(&mut store.positions, user_addr, position);

        if (index_id == 1) {
            store.btc_eth_tvl = store.btc_eth_tvl + amount;
        } else if (index_id == 2) {
            store.stable_tvl = store.stable_tvl + amount;
        } else {
            store.defi_tvl = store.defi_tvl + amount;
        };
    }

    public entry fun create_custom_index(
        user: &signer,
        tier: u64,
        assets: vector<u64>,
        weights: vector<u64>,
        rebalance_freq: u64,
    ) acquires IndexStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<IndexStore>(@veil_hub);

        let cost = if (tier == 1) {
            TIER_BASIC_COST
        } else if (tier == 2) {
            TIER_PRO_COST
        } else {
            TIER_ENTERPRISE_COST
        };

        let index = CustomIndex {
            creator: user_addr,
            tier,
            assets,
            weights,
            created_at: timestamp::now_seconds(),
            rebalance_freq,
        };

        store.total_indices = store.total_indices + 1;
        table::add(&mut store.custom_indices, store.total_indices, index);
    }

    public entry fun rebalance_index(
        admin: &signer,
        index_id: u64,
    ) acquires IndexStore {
        let store = borrow_global_mut<IndexStore>(@veil_hub);
        store.rebalance_count = store.rebalance_count + 1;
        store.gas_saved = store.gas_saved + 1850; // ~$1850 per rebalance
    }

    public fun calculate_index_yield(user: address, index_id: u64): u64 acquires IndexStore {
        let store = borrow_global<IndexStore>(@veil_hub);
        if (!table::contains(&store.positions, user)) {
            return 0
        };

        let pos = table::borrow(&store.positions, user);
        assert!(pos.index_id == index_id, 2);

        let now = timestamp::now_seconds();
        let time_elapsed = now - pos.deposit_time;
        let apy = get_index_apy(index_id);

        let annual_yield = (pos.amount * apy) / 1000;
        (annual_yield * time_elapsed) / 31_536_000
    }

    public fun get_index_tvl(index_id: u64): u64 acquires IndexStore {
        let store = borrow_global<IndexStore>(@veil_hub);
        if (index_id == 1) {
            store.btc_eth_tvl
        } else if (index_id == 2) {
            store.stable_tvl
        } else {
            store.defi_tvl
        }
    }

    public fun get_rebalance_stats(): (u64, u64) acquires IndexStore {
        let store = borrow_global<IndexStore>(@veil_hub);
        (store.rebalance_count, store.gas_saved)
    }
}
