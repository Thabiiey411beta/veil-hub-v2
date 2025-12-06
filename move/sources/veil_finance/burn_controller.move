module veil_hub::burn_controller {
    use std::signer;

    const RESERVE_FLOOR: u64 = 100000000_00000000; // 100M VEIL
    const PHASE_1_THRESHOLD: u64 = 500000000_00000000; // 500M
    const PHASE_2_THRESHOLD: u64 = 300000000_00000000; // 300M

    struct BurnConfig has key {
        total_supply: u64,
        total_burned: u64,
        daily_burn_limit: u64,
        last_update: u64,
    }

    public entry fun initialize(account: &signer) {
        move_to(account, BurnConfig {
            total_supply: 1000000000_00000000,
            total_burned: 0,
            daily_burn_limit: 0,
            last_update: 0,
        });
    }

    public fun calculate_max_burn(current_supply: u64): u64 {
        if (current_supply <= RESERVE_FLOOR) {
            return 0
        };

        let burnable = current_supply - RESERVE_FLOOR;
        let max_rate = if (current_supply > PHASE_1_THRESHOLD) {
            30 // 30% Phase 1
        } else if (current_supply > PHASE_2_THRESHOLD) {
            20 // 20% Phase 2
        } else {
            10 // 10% Phase 3
        };

        (burnable * max_rate) / (100 * 365) // Daily limit
    }

    public fun apply_burn_cap(
        requested_burn: u64,
        current_supply: u64
    ): u64 {
        let max_burn = calculate_max_burn(current_supply);
        if (requested_burn > max_burn) {
            max_burn
        } else {
            requested_burn
        }
    }

    #[view]
    public fun get_current_supply(): u64 acquires BurnConfig {
        let config = borrow_global<BurnConfig>(@veil_hub);
        config.total_supply - config.total_burned
    }

    #[view]
    public fun get_reserve_floor(): u64 {
        RESERVE_FLOOR
    }
}
