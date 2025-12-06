module veil_hub::veil_token {
    use std::signer;
    use std::string::{Self, String};
    use supra_framework::coin::{Self, Coin};

    struct VeilToken has key {}

    struct VeilCap has key {
        mint_cap: coin::MintCapability<VeilToken>,
        burn_cap: coin::BurnCapability<VeilToken>,
        freeze_cap: coin::FreezeCapability<VeilToken>,
    }

    const TOTAL_SUPPLY: u64 = 1000000000_00000000; // 1B with 8 decimals

    public entry fun initialize(account: &signer) {
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<VeilToken>(
            account,
            string::utf8(b"Veil Token"),
            string::utf8(b"VEIL"),
            8,
            true,
        );

        move_to(account, VeilCap { mint_cap, burn_cap, freeze_cap });
        
        let coins = coin::mint<VeilToken>(TOTAL_SUPPLY, &mint_cap);
        coin::deposit(signer::address_of(account), coins);
    }

    public entry fun burn(account: &signer, amount: u64) acquires VeilCap {
        let caps = borrow_global<VeilCap>(@veil_hub);
        let coins = coin::withdraw<VeilToken>(account, amount);
        coin::burn(coins, &caps.burn_cap);
    }
}
