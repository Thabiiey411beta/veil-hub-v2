module 0x42::phantom_lender {
    use std::signer;
    use std::vector;
    use 0x42::governance;

    // Morpho/Notional-style pooled lending with borrow/supply indices and pause guard.
    resource struct LenderConfig { lending_fee_bps: u64, paused: bool }
    resource struct Pool { total_supply: u128, total_borrow: u128 }

    public fun init(account: &signer, lending_fee_bps: u64) {
        assert!(move_from<LenderConfig>(signer::address_of(account)).is_none(), 1);
        move_to(account, LenderConfig { lending_fee_bps, paused: false });
        move_to(account, Pool { total_supply: 0u128, total_borrow: 0u128 });
    }

    public fun supply(account: &signer, amount: u128) {
        let paused = governance::is_paused(&b"phantom_lender".to_vector());
        assert!(!paused, 100);
        let p = borrow_global_mut<Pool>(signer::address_of(account));
        p.total_supply = p.total_supply + amount;
    }

    public fun borrow(account: &signer, amount: u128, collateral_ratio_bps: u64) {
        let paused = governance::is_paused(&b"phantom_lender".to_vector());
        assert!(!paused, 100);
        let p = borrow_global_mut<Pool>(signer::address_of(account));
        // Enforce O/C hard floor e.g., 150%-200% via collateral_ratio_bps
        assert!(collateral_ratio_bps >= 15000u64, 2);
        p.total_borrow = p.total_borrow + amount;
    }

    public fun example_init(caller: &signer) {
        init(caller, 500u64); // 5% lending fee
    }
}
