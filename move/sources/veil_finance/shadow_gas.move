module veil_hub::shadow_gas {
    use std::signer;
    use aptos_framework::coin;
    use veil_hub::veil_token::VeilToken;

    const SHADOW_GAS_PER_VEIL: u64 = 120000;
    const EXPIRY_DURATION: u64 = 7776000; // 90 days in seconds

    struct ShadowGasBalance has key {
        amount: u64,
        expiry: u64,
    }

    struct ShadowGasConfig has key {
        total_burned: u64,
        total_gas_issued: u64,
    }

    public entry fun initialize(account: &signer) {
        move_to(account, ShadowGasConfig {
            total_burned: 0,
            total_gas_issued: 0,
        });
    }

    public entry fun burn_veil_for_shadow_gas(
        account: &signer,
        veil_amount: u64
    ) acquires ShadowGasBalance, ShadowGasConfig {
        // Apply 60% burn cap, 40% to treasury
        let actual_burn = (veil_amount * 60) / 100;
        
        // Burn VEIL tokens
        let coins = coin::withdraw<VeilToken>(account, actual_burn);
        coin::burn(coins, &borrow_global<veil_hub::veil_token::VeilCap>(@veil_hub).burn_cap);

        // Calculate Shadow Gas
        let shadow_gas = veil_amount * SHADOW_GAS_PER_VEIL;
        let expiry = timestamp::now_seconds() + EXPIRY_DURATION;

        // Update or create balance
        let addr = signer::address_of(account);
        if (!exists<ShadowGasBalance>(addr)) {
            move_to(account, ShadowGasBalance {
                amount: shadow_gas,
                expiry,
            });
        } else {
            let balance = borrow_global_mut<ShadowGasBalance>(addr);
            balance.amount = balance.amount + shadow_gas;
            balance.expiry = expiry;
        };

        // Update config
        let config = borrow_global_mut<ShadowGasConfig>(@veil_hub);
        config.total_burned = config.total_burned + veil_amount;
        config.total_gas_issued = config.total_gas_issued + shadow_gas;
    }

    public fun consume_shadow_gas(
        account: &signer,
        amount: u64
    ) acquires ShadowGasBalance {
        let addr = signer::address_of(account);
        assert!(exists<ShadowGasBalance>(addr), 1);

        let balance = borrow_global_mut<ShadowGasBalance>(addr);
        assert!(balance.amount >= amount, 2);
        
        balance.amount = balance.amount - amount;
    }

    #[view]
    public fun get_shadow_gas_balance(addr: address): u64 acquires ShadowGasBalance {
        if (!exists<ShadowGasBalance>(addr)) {
            return 0
        };
        borrow_global<ShadowGasBalance>(addr).amount
    }
}
