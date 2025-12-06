module veil_hub::veil_dvrf {
    use aptos_std::table::{Self, Table};
    use std::string;
    use supra_addr::deposit::{Self, SupraVRFPermit};
    use supra_addr::supra_vrf;

    struct VeilVRF has store {}

    struct VRFState has key {
        permit: SupraVRFPermit<VeilVRF>,
        random_numbers: Table<u64, vector<u256>>,
    }

    /// Initialize module and get VRF permit
    fun init_module(sender: &signer) {
        let permit = deposit::init_vrf_module<VeilVRF>(sender);
        move_to(sender, VRFState {
            permit,
            random_numbers: table::new(),
        });
    }

    /// Request random number for vault strategy
    public entry fun request_vault_randomness(
        rng_count: u8,
        client_seed: u64,
        num_confirmations: u64
    ) acquires VRFState {
        let callback_function = string::utf8(b"vault_callback");
        let state = borrow_global_mut<VRFState>(@veil_hub);
        
        let nonce = supra_vrf::rng_request_v2<VeilVRF>(
            &state.permit,
            callback_function,
            rng_count,
            client_seed,
            num_confirmations
        );
        
        table::add(&mut state.random_numbers, nonce, vector::empty());
    }

    /// Callback from Supra dVRF V3
    public entry fun vault_callback(
        nonce: u64,
        message: vector<u8>,
        signature: vector<u8>,
        caller_address: address,
        rng_count: u8,
        client_seed: u64,
    ) acquires VRFState {
        let verified_num: vector<u256> = supra_vrf::verify_callback(
            nonce,
            message,
            signature,
            caller_address,
            rng_count,
            client_seed
        );
        
        let state = borrow_global_mut<VRFState>(@veil_hub);
        let random_numbers = table::borrow_mut(&mut state.random_numbers, nonce);
        *random_numbers = verified_num;
    }

    /// Get random strategy (0-2)
    #[view]
    public fun get_random_strategy(nonce: u64): u8 acquires VRFState {
        let state = borrow_global<VRFState>(@veil_hub);
        if (table::contains(&state.random_numbers, nonce)) {
            let randoms = table::borrow(&state.random_numbers, nonce);
            if (vector::length(randoms) > 0) {
                ((*vector::borrow(randoms, 0) % 3) as u8)
            } else {
                0
            }
        } else {
            0
        }
    }
}
