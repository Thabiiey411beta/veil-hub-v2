module veil_hub::circuit_breaker_v2 {
    use std::signer;
    use aptos_framework::timestamp;

    const TVL_DROP_THRESHOLD: u64 = 10; // 10% TVL drop triggers circuit breaker
    const CIRCUIT_BREAKER_DURATION: u64 = 3600; // 1 hour

    struct CircuitBreakerState has key {
        is_paused: bool,
        pause_start: u64,
        last_tvl: u64,
        tvl_check_time: u64,
        emergency_admin: address,
    }

    public entry fun initialize(admin: &signer) {
        move_to(admin, CircuitBreakerState {
            is_paused: false,
            pause_start: 0,
            last_tvl: 0,
            tvl_check_time: timestamp::now_seconds(),
            emergency_admin: signer::address_of(admin),
        });
    }

    public entry fun check_tvl_drop(
        admin: &signer,
        current_tvl: u64,
    ) acquires CircuitBreakerState {
        let state = borrow_global_mut<CircuitBreakerState>(@veil_hub);
        let now = timestamp::now_seconds();

        if (state.last_tvl == 0) {
            state.last_tvl = current_tvl;
            state.tvl_check_time = now;
            return
        };

        let tvl_drop_pct = if (current_tvl < state.last_tvl) {
            ((state.last_tvl - current_tvl) * 100) / state.last_tvl
        } else {
            0
        };

        if (tvl_drop_pct >= TVL_DROP_THRESHOLD) {
            state.is_paused = true;
            state.pause_start = now;
        };

        state.last_tvl = current_tvl;
        state.tvl_check_time = now;
    }

    public entry fun emergency_pause(admin: &signer) acquires CircuitBreakerState {
        let state = borrow_global_mut<CircuitBreakerState>(@veil_hub);
        assert!(signer::address_of(admin) == state.emergency_admin, 1);
        state.is_paused = true;
        state.pause_start = timestamp::now_seconds();
    }

    public entry fun resume(admin: &signer) acquires CircuitBreakerState {
        let state = borrow_global_mut<CircuitBreakerState>(@veil_hub);
        assert!(signer::address_of(admin) == state.emergency_admin, 1);
        state.is_paused = false;
    }

    public fun is_paused(): bool acquires CircuitBreakerState {
        let state = borrow_global<CircuitBreakerState>(@veil_hub);
        if (!state.is_paused) {
            return false
        };

        let now = timestamp::now_seconds();
        let elapsed = now - state.pause_start;
        
        if (elapsed >= CIRCUIT_BREAKER_DURATION) {
            false
        } else {
            true
        }
    }

    public fun get_pause_time_remaining(): u64 acquires CircuitBreakerState {
        let state = borrow_global<CircuitBreakerState>(@veil_hub);
        if (!state.is_paused) {
            return 0
        };

        let now = timestamp::now_seconds();
        let elapsed = now - state.pause_start;
        
        if (elapsed >= CIRCUIT_BREAKER_DURATION) {
            0
        } else {
            CIRCUIT_BREAKER_DURATION - elapsed
        }
    }
}
