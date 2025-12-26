module 0x42::immortal_reserve {
    use std::signer;
    use std::vector;
    use std::timestamp;
    use 0x42::governance;

    // Immutable floor amount protects reserve floor; post-floor redirection sends excess
    // revenue into growth strategies / treasury.
    resource struct ReserveConfig { floor: u128, redirect_address: address }
    resource struct Reserve { balance: u128 }

    public fun init(account: &signer, floor: u128, redirect: address) {
        assert!(move_from<ReserveConfig>(signer::address_of(account)).is_none(), 1);
        move_to(account, ReserveConfig { floor, redirect_address: redirect });
        move_to(account, Reserve { balance: 0u128 });
    }

    // Deposit revenue to reserve; enforce floor behavior: if reserve below floor, fill it first,
    // after floor reached, redirect a portion or full amount to redirect_address (e.g., treasury).
    public fun deposit(account: &signer, amount: u128) {
        // Pause guard
        let paused = governance::is_paused(&b"immortal_reserve".to_vector());
        assert!(!paused, 100);
        let rc = borrow_global_mut<ReserveConfig>(signer::address_of(account));
        let r = borrow_global_mut<Reserve>(signer::address_of(account));
        if (r.balance < rc.floor) {
            let need = rc.floor - r.balance;
            if (amount <= need) {
                r.balance = r.balance + amount;
                return;
            } else {
                r.balance = rc.floor;
                let leftover = amount - need;
                // Redirect leftover to treasury/growth
                // In practice: call another module to credit; here we simply emit via a TODO.
            }
        } else {
            // Already above floor, redirect according to policy (could be % or full amount)
            // Placeholder: send to redirect_address via cross-module call in production.
        }
    }

    public fun example_init(caller: &signer) {
        init(caller, 1_000_000_000u128, signer::address_of(caller));
    }
}
