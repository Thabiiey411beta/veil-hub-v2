module 0x42::treasury {
    use std::signer;
    use std::vector;
    use std::timestamp;
    use 0x42::governance;

    // Treasury collects revenue and seeds an InsuranceFund. The insurance allocation percent
    // is configurable for the first 24 months post-launch.

    resource struct Treasury { balance: u128, insurance_fund: InsuranceFund, insurance_percent_bps: u64, launch_time: u64 }
    resource struct InsuranceFund { balance: u128 }

    public fun init(account: &signer, initial_balance: u128, insurance_percent_bps: u64) {
        assert!(move_from<Treasury>(signer::address_of(account)).is_none(), 1);
        let now = timestamp::now_seconds();
        move_to(account, InsuranceFund { balance: 0u128 });
        move_to(account, Treasury { balance: initial_balance, insurance_fund: move_from<InsuranceFund>(signer::address_of(account)), insurance_percent_bps, launch_time: now });
    }

    // Collect revenue and auto-allocate to insurance fund according to config and time since launch.
    public fun collect_revenue(account: &signer, amount: u128) {
        let paused = governance::is_paused(&b"treasury".to_vector());
        assert!(!paused, 100);
        let t = borrow_global_mut<Treasury>(signer::address_of(account));
        let now = timestamp::now_seconds();
        let months = (now - t.launch_time) / (60u64 * 60u64 * 24u64 * 30u64);
        let mut alloc_bps = t.insurance_percent_bps;
        if (months > 24u64) { alloc_bps = 0u64; }
        let to_insure = amount * (alloc_bps as u128) / 10_000u128;
        let to_treasury = amount - to_insure;
        t.balance = t.balance + to_treasury;
        let mut inf = &mut t.insurance_fund;
        inf.balance = inf.balance + to_insure;
    }

    // Governance timelock hook to update insurance percent (must use queue_action -> apply)
    public fun update_insurance_percent(account: &signer, new_bps: u64) {
        let paused = governance::is_paused(&b"treasury".to_vector());
        assert!(!paused, 100);
        let t = borrow_global_mut<Treasury>(signer::address_of(account));
        t.insurance_percent_bps = new_bps;
    }

    public fun example_init(caller: &signer) {
        init(caller, 0u128, 500u64); // default 5% allocation for first 24 months
    }
}
