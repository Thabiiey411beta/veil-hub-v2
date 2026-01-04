module veil_hub::veil_token {
    use std::signer;
    use aptos_framework::coin::{Self, MintCapability, BurnCapability};
    use aptos_framework::managed_coin;

    const TOTAL_SUPPLY: u128 = 1_000_000_000_000_000_000; // 1B VEIL with 8 decimals
    const DECIMALS: u8 = 8;

    struct VEIL {}

    struct VeilCapabilities has key {
        mint_cap: MintCapability<VEIL>,
        burn_cap: BurnCapability<VEIL>,
    }

    public entry fun initialize(admin: &signer) {
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<VEIL>(
            admin,
            b"Veil Token",
            b"VEIL",
            DECIMALS,
            true,
        );
        coin::destroy_freeze_cap(freeze_cap);
        
        move_to(admin, VeilCapabilities {
            mint_cap,
            burn_cap,
        });
    }

    public fun mint(amount: u64): coin::Coin<VEIL> acquires VeilCapabilities {
        let caps = borrow_global<VeilCapabilities>(@veil_hub);
        coin::mint<VEIL>(amount, &caps.mint_cap)
    }

    public fun burn(coin: coin::Coin<VEIL>) acquires VeilCapabilities {
        let caps = borrow_global<VeilCapabilities>(@veil_hub);
        coin::burn<VEIL>(coin, &caps.burn_cap)
    }
}
