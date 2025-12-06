module veil_hub::debt_engine {
    use std::signer;

    struct Debt has key {
        collateral: u64,
        borrowed: u64,
        interest_rate: u64, // 550 = 5.5%
        last_update: u64,
    }

    struct DebtConfig has key {
        min_collateral_ratio: u64, // 180%
        liquidation_ratio: u64, // 120%
        interest_rate: u64, // 5.5%
    }

    public entry fun initialize(account: &signer) {
        move_to(account, DebtConfig {
            min_collateral_ratio: 180,
            liquidation_ratio: 120,
            interest_rate: 550,
        });
    }

    public entry fun borrow(account: &signer, collateral: u64, amount: u64) acquires DebtConfig {
        let config = borrow_global<DebtConfig>(@veil_hub);
        let ratio = (collateral * 100) / amount;
        
        assert!(ratio >= config.min_collateral_ratio, 1);

        move_to(account, Debt {
            collateral,
            borrowed: amount,
            interest_rate: config.interest_rate,
            last_update: 0,
        });
    }

    public entry fun repay(account: &signer, amount: u64) acquires Debt {
        let debt = borrow_global_mut<Debt>(signer::address_of(account));
        debt.borrowed = debt.borrowed - amount;
    }
}
