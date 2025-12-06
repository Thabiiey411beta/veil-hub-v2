module veil_hub::veil_dvrf {
    use supra_framework::supra_vrf;
    use std::signer;
    use std::vector;

    struct VRFState has key {
        nonce: u64,
        last_random: vector<u8>,
        permit: supra_vrf::SupraVRFPermit<VRFState>,
    }

    const E_NOT_INITIALIZED: u64 = 1;

    /// Initialize module and get VRF permit
    fun init_module(account: &signer) {
        let permit = supra_vrf::init_vrf_module<VRFState>(account);
        move_to(account, VRFState {
            nonce: 0,
            last_random: vector::empty(),
            permit,
        });
    }

    /// Request random number for vault strategy
    public entry fun request_vault_randomness(
        account: &signer,
        num_confirmations: u8
    ) acquires VRFState {
        let state = borrow_global_mut<VRFState>(@veil_hub);
        state.nonce = state.nonce + 1;
        
        supra_vrf::rng_request(
            account,
            &state.permit,
            num_confirmations,
            state.nonce
        );
    }

    /// Callback from Supra dVRF
    public entry fun vrf_callback(
        nonce: u64,
        random_bytes: vector<u8>
    ) acquires VRFState {
        let state = borrow_global_mut<VRFState>(@veil_hub);
        if (nonce == state.nonce) {
            state.last_random = random_bytes;
        };
    }

    /// Get random strategy (0-2)
    #[view]
    public fun get_random_strategy(): u8 acquires VRFState {
        let state = borrow_global<VRFState>(@veil_hub);
        if (vector::length(&state.last_random) > 0) {
            (*vector::borrow(&state.last_random, 0) % 3)
        } else {
            0
        }
    }
}
