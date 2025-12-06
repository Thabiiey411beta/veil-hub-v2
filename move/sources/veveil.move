module veil_hub::veveil {
    use std::signer;

    struct VeVEIL has key {
        locked_amount: u64,
        unlock_time: u64,
        veveil_balance: u64, // Time-weighted balance
    }

    struct VeVEILConfig has key {
        total_veveil: u64,
        total_locked: u64,
    }

    const MAX_LOCK_TIME: u64 = 126144000; // 4 years in seconds
    const MIN_LOCK_TIME: u64 = 604800; // 1 week

    public entry fun initialize(account: &signer) {
        move_to(account, VeVEILConfig {
            total_veveil: 0,
            total_locked: 0,
        });
    }

    public fun calculate_veveil(amount: u64, duration: u64): u64 {
        assert!(duration >= MIN_LOCK_TIME && duration <= MAX_LOCK_TIME, 1);
        let multiplier = 10 + (duration * 15) / MAX_LOCK_TIME; // 1.0x to 2.5x
        (amount * multiplier) / 10
    }

    public fun calculate_boost(user_veveil: u64, total_veveil: u64): u64 {
        if (total_veveil == 0) { return 10 }; // 1.0x base
        let base = 10; // 1.0x
        let bonus = (user_veveil * 15) / total_veveil; // Up to 1.5x bonus
        base + bonus // 1.0x to 2.5x total
    }

    public entry fun lock(account: &signer, amount: u64, duration: u64) acquires VeVEILConfig {
        let veveil_balance = calculate_veveil(amount, duration);
        let config = borrow_global_mut<VeVEILConfig>(@veil_hub);
        
        config.total_veveil = config.total_veveil + veveil_balance;
        config.total_locked = config.total_locked + amount;

        move_to(account, VeVEIL {
            locked_amount: amount,
            unlock_time: duration,
            veveil_balance,
        });
    }

    public entry fun unlock(account: &signer) acquires VeVEIL, VeVEILConfig {
        let veveil = move_from<VeVEIL>(signer::address_of(account));
        let config = borrow_global_mut<VeVEILConfig>(@veil_hub);
        
        config.total_veveil = config.total_veveil - veveil.veveil_balance;
        config.total_locked = config.total_locked - veveil.locked_amount;
        
        let VeVEIL { locked_amount: _, unlock_time: _, veveil_balance: _ } = veveil;
    }

    #[view]
    public fun get_user_boost(addr: address): u64 acquires VeVEIL, VeVEILConfig {
        if (!exists<VeVEIL>(addr)) { return 10 }; // 1.0x
        
        let veveil = borrow_global<VeVEIL>(addr);
        let config = borrow_global<VeVEILConfig>(@veil_hub);
        
        calculate_boost(veveil.veveil_balance, config.total_veveil)
    }

    #[view]
    public fun get_total_veveil(): u64 acquires VeVEILConfig {
        borrow_global<VeVEILConfig>(@veil_hub).total_veveil
    }
}
