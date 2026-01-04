module veil_hub::veveil_v2 {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_framework::table::{Self, Table};
    use veil_hub::veil_token::VEIL;

    const LOCK_1_WEEK: u64 = 604_800; // seconds
    const LOCK_1_MONTH: u64 = 2_592_000;
    const LOCK_3_MONTHS: u64 = 7_776_000;
    const LOCK_1_YEAR: u64 = 31_536_000;
    const LOCK_4_YEARS: u64 = 126_144_000;

    // Multipliers: 1.0x, 1.25x, 1.5x, 2.0x, 2.5x (stored as u64 * 100)
    const MULTIPLIER_1X: u64 = 100;
    const MULTIPLIER_1_25X: u64 = 125;
    const MULTIPLIER_1_5X: u64 = 150;
    const MULTIPLIER_2X: u64 = 200;
    const MULTIPLIER_2_5X: u64 = 250;

    struct VeVEILLock has store {
        amount: u64,
        lock_duration: u64,
        lock_start: u64,
        multiplier: u64,
    }

    struct VeVEILStore has key {
        locks: Table<address, VeVEILLock>,
        total_locked: u64,
    }

    public entry fun initialize(admin: &signer) {
        move_to(admin, VeVEILStore {
            locks: table::new(),
            total_locked: 0,
        });
    }

    fun get_multiplier(duration: u64): u64 {
        if (duration == LOCK_1_WEEK) {
            MULTIPLIER_1X
        } else if (duration == LOCK_1_MONTH) {
            MULTIPLIER_1_25X
        } else if (duration == LOCK_3_MONTHS) {
            MULTIPLIER_1_5X
        } else if (duration == LOCK_1_YEAR) {
            MULTIPLIER_2X
        } else if (duration == LOCK_4_YEARS) {
            MULTIPLIER_2_5X
        } else {
            MULTIPLIER_1X
        }
    }

    public entry fun lock(
        user: &signer,
        amount: u64,
        duration: u64,
    ) acquires VeVEILStore {
        let user_addr = signer::address_of(user);
        let multiplier = get_multiplier(duration);
        let now = timestamp::now_seconds();

        let store = borrow_global_mut<VeVEILStore>(@veil_hub);
        
        let lock = VeVEILLock {
            amount,
            lock_duration: duration,
            lock_start: now,
            multiplier,
        };

        if (table::contains(&store.locks, user_addr)) {
            let old_lock = table::remove(&mut store.locks, user_addr);
            store.total_locked = store.total_locked - old_lock.amount;
        };

        table::add(&mut store.locks, user_addr, lock);
        store.total_locked = store.total_locked + amount;
    }

    public fun get_voting_power(user: address): u64 acquires VeVEILStore {
        let store = borrow_global<VeVEILStore>(@veil_hub);
        if (table::contains(&store.locks, user)) {
            let lock = table::borrow(&store.locks, user);
            (lock.amount * lock.multiplier) / 100
        } else {
            0
        }
    }

    public fun get_yield_boost(user: address): u64 acquires VeVEILStore {
        let store = borrow_global<VeVEILStore>(@veil_hub);
        if (table::contains(&store.locks, user)) {
            let lock = table::borrow(&store.locks, user);
            lock.multiplier
        } else {
            100
        }
    }

    public fun get_total_locked(): u64 acquires VeVEILStore {
        let store = borrow_global<VeVEILStore>(@veil_hub);
        store.total_locked
    }
}
