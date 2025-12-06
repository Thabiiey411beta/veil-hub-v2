module veil_hub::veveil {
    use std::signer;

    struct VeVEIL has key {
        locked_amount: u64,
        unlock_time: u64,
        voting_power: u64,
    }

    const MAX_LOCK_TIME: u64 = 126144000; // 4 years in seconds
    const MIN_LOCK_TIME: u64 = 604800; // 1 week

    public entry fun lock(account: &signer, amount: u64, duration: u64) {
        assert!(duration >= MIN_LOCK_TIME && duration <= MAX_LOCK_TIME, 1);
        
        let boost = (duration * 15) / MAX_LOCK_TIME + 10; // 1.0x to 2.5x
        let voting_power = (amount * boost) / 10;

        move_to(account, VeVEIL {
            locked_amount: amount,
            unlock_time: duration,
            voting_power,
        });
    }

    public entry fun unlock(account: &signer) acquires VeVEIL {
        let veveil = move_from<VeVEIL>(signer::address_of(account));
        let VeVEIL { locked_amount: _, unlock_time: _, voting_power: _ } = veveil;
    }
}
