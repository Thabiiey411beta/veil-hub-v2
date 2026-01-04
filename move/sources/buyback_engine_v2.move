module veil_hub::buyback_engine_v2 {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_framework::table::{Self, Table};
    use veil_hub::veil_token::VEIL;

    const BORROW_INTEREST_TO_BUYBACK: u64 = 30; // 30%
    const VAULT_FEE_TO_BUYBACK: u64 = 0; // Vault fees go to reserve/veVEIL
    const TRADING_FEE_TO_BUYBACK: u64 = 0; // Trading fees split between reserve/veVEIL

    struct BuybackEvent has store {
        timestamp: u64,
        usdc_spent: u64,
        veil_bought: u64,
        veil_burned: u64,
    }

    struct BuybackEngineStore has key {
        events: Table<u64, BuybackEvent>,
        event_count: u64,
        total_usdc_spent: u64,
        total_veil_burned: u64,
        usdc_balance: u64,
    }

    public entry fun initialize(admin: &signer) {
        move_to(admin, BuybackEngineStore {
            events: table::new(),
            event_count: 0,
            total_usdc_spent: 0,
            total_veil_burned: 0,
            usdc_balance: 0,
        });
    }

    public entry fun receive_borrow_interest(
        admin: &signer,
        interest_amount: u64,
    ) acquires BuybackEngineStore {
        let store = borrow_global_mut<BuybackEngineStore>(@veil_hub);
        let buyback_amount = (interest_amount * BORROW_INTEREST_TO_BUYBACK) / 100;
        store.usdc_balance = store.usdc_balance + buyback_amount;
    }

    public entry fun execute_buyback(
        admin: &signer,
        usdc_amount: u64,
        veil_price: u64, // Price in USDC with 8 decimals
    ) acquires BuybackEngineStore {
        let store = borrow_global_mut<BuybackEngineStore>(@veil_hub);
        assert!(store.usdc_balance >= usdc_amount, 1);

        // Calculate VEIL amount: usdc_amount / veil_price
        let veil_amount = (usdc_amount * 100_000_000) / veil_price;

        let event = BuybackEvent {
            timestamp: timestamp::now_seconds(),
            usdc_spent: usdc_amount,
            veil_bought: veil_amount,
            veil_burned: veil_amount,
        };

        store.event_count = store.event_count + 1;
        table::add(&mut store.events, store.event_count, event);

        store.usdc_balance = store.usdc_balance - usdc_amount;
        store.total_usdc_spent = store.total_usdc_spent + usdc_amount;
        store.total_veil_burned = store.total_veil_burned + veil_amount;
    }

    public fun get_total_burned(): u64 acquires BuybackEngineStore {
        let store = borrow_global<BuybackEngineStore>(@veil_hub);
        store.total_veil_burned
    }

    public fun get_total_spent(): u64 acquires BuybackEngineStore {
        let store = borrow_global<BuybackEngineStore>(@veil_hub);
        store.total_usdc_spent
    }

    public fun get_buyback_efficiency(): u64 acquires BuybackEngineStore {
        let store = borrow_global<BuybackEngineStore>(@veil_hub);
        if (store.total_usdc_spent == 0) {
            return 0
        };
        (store.total_veil_burned * 1_000_000) / store.total_usdc_spent
    }

    public fun get_usdc_balance(): u64 acquires BuybackEngineStore {
        let store = borrow_global<BuybackEngineStore>(@veil_hub);
        store.usdc_balance
    }
}
