module veil_hub::immortal_reserve {
    use std::signer;
    use supra_framework::coin::{Self, Coin};
    use veil_hub::veil_token::VeilToken;

    struct ImmortalShare has key {
        shares: u64,
        total_burned: u64,
    }

    struct Reserve has key {
        total_shares: u64,
        total_burned: u64,
        usdc_balance: u64,
    }

    public entry fun initialize(account: &signer) {
        move_to(account, Reserve {
            total_shares: 0,
            total_burned: 0,
            usdc_balance: 0,
        });
    }

    public entry fun burn_for_shares(account: &signer, amount: u64) acquires Reserve, ImmortalShare {
        let reserve = borrow_global_mut<Reserve>(@veil_hub);
        
        let bonus = if (reserve.total_burned < 100000000_00000000) {
            15 // 1.5x
        } else if (reserve.total_burned < 300000000_00000000) {
            12 // 1.25x
        } else {
            10 // 1.0x
        };

        let shares = (amount * bonus) / 10;
        
        reserve.total_shares = reserve.total_shares + shares;
        reserve.total_burned = reserve.total_burned + amount;

        if (!exists<ImmortalShare>(signer::address_of(account))) {
            move_to(account, ImmortalShare { shares: 0, total_burned: 0 });
        };

        let user_share = borrow_global_mut<ImmortalShare>(signer::address_of(account));
        user_share.shares = user_share.shares + shares;
        user_share.total_burned = user_share.total_burned + amount;
    }
}
