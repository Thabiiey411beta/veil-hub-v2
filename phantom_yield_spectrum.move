module 0x42::phantom_yield_spectrum {
    use std::signer;
    use std::vector;
    use 0x42::governance;

    // Spectrum of yield strategies; governance can add RWA tokenized treasuries later.
    resource struct SpectrumConfig { strategies: vector<vector<u8>> }

    public fun init(account: &signer) {
        assert!(move_from<SpectrumConfig>(signer::address_of(account)).is_none(), 1);
        move_to(account, SpectrumConfig { strategies: vector::empty<vector<u8>>() });
    }

    // Governance-addable RWA support hook (v1.1 readiness): strategies can be tokenized.
    public fun add_strategy(account: &signer, strategy_id: vector<u8>) {
        let paused = governance::is_paused(&b"phantom_yield_spectrum".to_vector());
        assert!(!paused, 100);
        let cfg = borrow_global_mut<SpectrumConfig>(signer::address_of(account));
        vector::push_back(&mut cfg.strategies, strategy_id);
    }

    public fun example_init(caller: &signer) {
        init(caller);
    }
}
