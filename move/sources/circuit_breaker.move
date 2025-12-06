module veil_hub::circuit_breaker {
    use std::signer;

    const ERROR_CIRCUIT_BREAKER_ACTIVE: u64 = 1;
    const ERROR_UNAUTHORIZED: u64 = 2;

    struct CircuitBreaker has key {
        is_paused: bool,
        last_tvl: u64,
        tvl_drop_threshold: u64, // 10% = 1000 bps
        pause_duration: u64, // 24 hours = 86400 seconds
        pause_start: u64,
        manual_pause: bool,
    }

    public entry fun initialize(account: &signer) {
        move_to(account, CircuitBreaker {
            is_paused: false,
            last_tvl: 0,
            tvl_drop_threshold: 1000, // 10%
            pause_duration: 86400, // 24 hours
            pause_start: 0,
            manual_pause: false,
        });
    }

    public fun check_circuit_breaker(current_tvl: u64) acquires CircuitBreaker {
        let cb = borrow_global_mut<CircuitBreaker>(@veil_hub);
        
        // Auto-unpause after duration (if not manual)
        if (cb.is_paused && !cb.manual_pause) {
            let current_time = 0; // timestamp::now_seconds();
            if (current_time > cb.pause_start + cb.pause_duration) {
                cb.is_paused = false;
            };
        };
        
        // Check if paused
        assert!(!cb.is_paused, ERROR_CIRCUIT_BREAKER_ACTIVE);
        
        // Check TVL drop (only if we have previous TVL)
        if (cb.last_tvl > 0) {
            let threshold_tvl = (cb.last_tvl * (10000 - cb.tvl_drop_threshold)) / 10000;
            if (current_tvl < threshold_tvl) {
                cb.is_paused = true;
                cb.pause_start = 0; // timestamp::now_seconds();
                cb.manual_pause = false;
            };
        };
        
        // Update last TVL
        cb.last_tvl = current_tvl;
    }

    public entry fun manual_pause(account: &signer) acquires CircuitBreaker {
        assert!(signer::address_of(account) == @veil_hub, ERROR_UNAUTHORIZED);
        let cb = borrow_global_mut<CircuitBreaker>(@veil_hub);
        cb.is_paused = true;
        cb.manual_pause = true;
        cb.pause_start = 0; // timestamp::now_seconds();
    }

    public entry fun manual_unpause(account: &signer) acquires CircuitBreaker {
        assert!(signer::address_of(account) == @veil_hub, ERROR_UNAUTHORIZED);
        let cb = borrow_global_mut<CircuitBreaker>(@veil_hub);
        cb.is_paused = false;
        cb.manual_pause = false;
    }

    public entry fun update_threshold(account: &signer, new_threshold: u64) acquires CircuitBreaker {
        assert!(signer::address_of(account) == @veil_hub, ERROR_UNAUTHORIZED);
        let cb = borrow_global_mut<CircuitBreaker>(@veil_hub);
        cb.tvl_drop_threshold = new_threshold;
    }

    #[view]
    public fun is_paused(): bool acquires CircuitBreaker {
        borrow_global<CircuitBreaker>(@veil_hub).is_paused
    }

    #[view]
    public fun get_status(): (bool, u64, u64) acquires CircuitBreaker {
        let cb = borrow_global<CircuitBreaker>(@veil_hub);
        (cb.is_paused, cb.last_tvl, cb.tvl_drop_threshold)
    }
}
