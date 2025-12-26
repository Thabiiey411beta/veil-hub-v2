module 0x42::immortal_vaults {
    use std::signer;
    use std::vector;
    use 0x42::governance;

    resource struct VaultConfig { paused: bool, allocation_bps: u64 }
    resource struct Vault { assets: u128 }

    public fun init(account: &signer, allocation_bps: u64) {
        assert!(move_from<VaultConfig>(signer::address_of(account)).is_none(), 1);
        move_to(account, VaultConfig { paused: false, allocation_bps });
        move_to(account, Vault { assets: 0u128 });
    }

    public fun deposit(account: &signer, amount: u128) {
        let paused = governance::is_paused(&b"immortal_vaults".to_vector());
        assert!(!paused, 100);
        let v = borrow_global_mut<Vault>(signer::address_of(account));
        v.assets = v.assets + amount;
    }

    public fun withdraw(account: &signer, amount: u128) {
        let paused = governance::is_paused(&b"immortal_vaults".to_vector());
        assert!(!paused, 100);
        let v = borrow_global_mut<Vault>(signer::address_of(account));
        assert!(v.assets >= amount, 2);
        v.assets = v.assets - amount;
    }

    public fun example_init(caller: &signer) {
        init(caller, 1000u64); // allocation bps example
    }
}
