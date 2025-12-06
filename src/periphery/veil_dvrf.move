module veil_hub::veil_dvrf {
    use supra_framework::supra_vrf;
    use std::signer;
    use std::vector;

    struct RandomnessRequest has key {
        nonce: u64,
        last_random: vector<u8>,
    }

    const E_NOT_INITIALIZED: u64 = 1;

    fun init_module(account: &signer) {
        move_to(account, RandomnessRequest {
            nonce: 0,
            last_random: vector::empty(),
        });
    }

    /// Request random number for vault strategy selection
    public entry fun request_randomness(
        account: &signer,
        num_confirmations: u8,
        client_seed: vector<u8>
    ) acquires RandomnessRequest {
        let account_addr = signer::address_of(account);
        assert!(exists<RandomnessRequest>(account_addr), E_NOT_INITIALIZED);
        
        let state = borrow_global_mut<RandomnessRequest>(account_addr);
        state.nonce = state.nonce + 1;
        
        // Request dVRF from Supra network
        supra_vrf::rng_request(
            account,
            num_confirmations,
            client_seed,
            state.nonce
        );
    }

    /// Callback to receive random number from Supra dVRF
    public entry fun callback_randomness(
        _account: &signer,
        nonce: u64,
        random_bytes: vector<u8>
    ) acquires RandomnessRequest {
        let account_addr = @veil_hub;
        let state = borrow_global_mut<RandomnessRequest>(account_addr);
        
        if (nonce == state.nonce) {
            state.last_random = random_bytes;
        };
    }

    /// Get random strategy index (0-2) for vault rebalancing
    #[view]
    public fun get_random_strategy(): u8 acquires RandomnessRequest {
        let state = borrow_global<RandomnessRequest>(@veil_hub);
        if (vector::length(&state.last_random) > 0) {
            let first_byte = *vector::borrow(&state.last_random, 0);
            (first_byte % 3) // Returns 0, 1, or 2
        } else {
            0
        }
    }
}
