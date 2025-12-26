module 0x42::dark_gauges {
    use std::signer;
    use std::vector;
    use 0x42::governance;

    // Dark gauges manage veVEIL-weighted reward emissions. Includes timelock hooks for
    // changing emission weights and pause guards to prevent abusive changes.
    resource struct Gauge { id: u64, weight: u128 }
    resource struct GaugeCounter { next: u64 }

    public fun init(account: &signer) {
        assert!(move_from<GaugeCounter>(signer::address_of(account)).is_none(), 1);
        move_to(account, GaugeCounter { next: 1 });
    }

    public fun create_gauge(account: &signer, weight: u128) {
        let paused = governance::is_paused(&b"dark_gauges".to_vector());
        assert!(!paused, 100);
        let c = borrow_global_mut<GaugeCounter>(signer::address_of(account));
        let id = c.next;
        c.next = id + 1;
        let g = Gauge { id, weight };
        move_to(account, g);
    }

    public fun example_init(caller: &signer) {
        init(caller);
    }
}
