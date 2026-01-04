module veil_hub::immortal_reserve_v2 {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_framework::table::{Self, Table};
    use veil_hub::veil_token::VEIL;

    const WEEK_SECONDS: u64 = 604_800;
    const BASE_DIVIDEND_RATE: u64 = 15; // 1.5% = 15/1000
    const BORROW_INTEREST_TO_RESERVE: u64 = 50; // 50%
    const BORROW_INTEREST_TO_BUYBACK: u64 = 30; // 30%
    const BORROW_INTEREST_TO_VEVEIL: u64 = 20; // 20%

    struct ImmortalShare has store {
        amount: u64,
        lock_multiplier: u64,
        last_claim: u64,
    }

    struct ImmortalReserveStore has key {
        shares: Table<address, ImmortalShare>,
        total_shares: u64,
        usdc_balance: u64,
        last_distribution: u64,
    }

    public entry fun initialize(admin: &signer) {
        move_to(admin, ImmortalReserveStore {
            shares: table::new(),
            total_shares: 0,
            usdc_balance: 0,
            last_distribution: timestamp::now_seconds(),
        });
    }

    public entry fun deposit_shares(
        user: &signer,
        amount: u64,
        multiplier: u64,
    ) acquires ImmortalReserveStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<ImmortalReserveStore>(@veil_hub);
        let now = timestamp::now_seconds();

        let share = ImmortalShare {
            amount,
            lock_multiplier: multiplier,
            last_claim: now,
        };

        if (table::contains(&store.shares, user_addr)) {
            let old_share = table::remove(&mut store.shares, user_addr);
            store.total_shares = store.total_shares - old_share.amount;
        };

        table::add(&mut store.shares, user_addr, share);
        store.total_shares = store.total_shares + amount;
    }

    public fun calculate_dividend(user: address): u64 acquires ImmortalReserveStore {
        let store = borrow_global<ImmortalReserveStore>(@veil_hub);
        if (!table::contains(&store.shares, user)) {
            return 0
        };

        let share = table::borrow(&store.shares, user);
        let user_share_pct = (share.amount * 1_000_000) / store.total_shares;
        let base_dividend = (store.usdc_balance * BASE_DIVIDEND_RATE) / 1000;
        let boosted_dividend = (base_dividend * share.lock_multiplier) / 100;
        (boosted_dividend * user_share_pct) / 1_000_000
    }

    public entry fun claim_dividend(user: &signer) acquires ImmortalReserveStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<ImmortalReserveStore>(@veil_hub);
        
        let dividend = calculate_dividend(user_addr);
        if (dividend > 0 && store.usdc_balance >= dividend) {
            store.usdc_balance = store.usdc_balance - dividend;
            
            let share = table::borrow_mut(&mut store.shares, user_addr);
            share.last_claim = timestamp::now_seconds();
        };
    }

    public entry fun distribute_borrow_interest(
        admin: &signer,
        interest_amount: u64,
    ) acquires ImmortalReserveStore {
        let store = borrow_global_mut<ImmortalReserveStore>(@veil_hub);
        
        let to_reserve = (interest_amount * BORROW_INTEREST_TO_RESERVE) / 100;
        let to_buyback = (interest_amount * BORROW_INTEREST_TO_BUYBACK) / 100;
        let to_veveil = (interest_amount * BORROW_INTEREST_TO_VEVEIL) / 100;

        store.usdc_balance = store.usdc_balance + to_reserve;
    }

    public fun get_total_shares(): u64 acquires ImmortalReserveStore {
        let store = borrow_global<ImmortalReserveStore>(@veil_hub);
        store.total_shares
    }

    public fun get_reserve_balance(): u64 acquires ImmortalReserveStore {
        let store = borrow_global<ImmortalReserveStore>(@veil_hub);
        store.usdc_balance
    }
}
