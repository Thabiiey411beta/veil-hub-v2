module veil_hub::debt_engine_v2 {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_framework::table::{Self, Table};
    use veil_hub::veil_token::VEIL;

    const BORROW_APR: u64 = 55; // 5.5% = 55/1000
    const MIN_COLLATERAL_RATIO: u64 = 180; // 180%
    const AUTO_REPAY_RATIO: u64 = 120; // 120%
    const SECONDS_PER_YEAR: u64 = 31_536_000;

    struct Loan has store {
        collateral_amount: u64,
        borrowed_amount: u64,
        borrow_start: u64,
        interest_accrued: u64,
    }

    struct DebtEngineStore has key {
        loans: Table<address, Loan>,
        total_borrowed: u64,
        total_collateral: u64,
    }

    public entry fun initialize(admin: &signer) {
        move_to(admin, DebtEngineStore {
            loans: table::new(),
            total_borrowed: 0,
            total_collateral: 0,
        });
    }

    public entry fun borrow(
        user: &signer,
        collateral_amount: u64,
        borrow_amount: u64,
    ) acquires DebtEngineStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<DebtEngineStore>(@veil_hub);

        // Verify collateral ratio: collateral >= borrow * 1.8
        let required_collateral = (borrow_amount * MIN_COLLATERAL_RATIO) / 100;
        assert!(collateral_amount >= required_collateral, 1);

        let loan = Loan {
            collateral_amount,
            borrowed_amount: borrow_amount,
            borrow_start: timestamp::now_seconds(),
            interest_accrued: 0,
        };

        if (table::contains(&store.loans, user_addr)) {
            let old_loan = table::remove(&mut store.loans, user_addr);
            store.total_collateral = store.total_collateral - old_loan.collateral_amount;
            store.total_borrowed = store.total_borrowed - old_loan.borrowed_amount;
        };

        table::add(&mut store.loans, user_addr, loan);
        store.total_collateral = store.total_collateral + collateral_amount;
        store.total_borrowed = store.total_borrowed + borrow_amount;
    }

    public fun calculate_interest(user: address): u64 acquires DebtEngineStore {
        let store = borrow_global<DebtEngineStore>(@veil_hub);
        if (!table::contains(&store.loans, user)) {
            return 0
        };

        let loan = table::borrow(&store.loans, user);
        let now = timestamp::now_seconds();
        let time_elapsed = now - loan.borrow_start;
        
        let annual_interest = (loan.borrowed_amount * BORROW_APR) / 1000;
        (annual_interest * time_elapsed) / SECONDS_PER_YEAR
    }

    public fun get_collateral_ratio(user: address): u64 acquires DebtEngineStore {
        let store = borrow_global<DebtEngineStore>(@veil_hub);
        if (!table::contains(&store.loans, user)) {
            return 0
        };

        let loan = table::borrow(&store.loans, user);
        let total_debt = loan.borrowed_amount + calculate_interest(user);
        
        if (total_debt == 0) {
            return 0
        };
        
        (loan.collateral_amount * 100) / total_debt
    }

    public fun should_auto_repay(user: address): bool acquires DebtEngineStore {
        let ratio = get_collateral_ratio(user);
        ratio <= AUTO_REPAY_RATIO && ratio > 0
    }

    public entry fun repay_loan(
        user: &signer,
        repay_amount: u64,
    ) acquires DebtEngineStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<DebtEngineStore>(@veil_hub);

        let loan = table::borrow_mut(&mut store.loans, user_addr);
        let interest = calculate_interest(user_addr);
        let total_debt = loan.borrowed_amount + interest;

        assert!(repay_amount <= total_debt, 2);

        if (repay_amount >= total_debt) {
            let removed_loan = table::remove(&mut store.loans, user_addr);
            store.total_borrowed = store.total_borrowed - removed_loan.borrowed_amount;
            store.total_collateral = store.total_collateral - removed_loan.collateral_amount;
        } else {
            loan.borrowed_amount = loan.borrowed_amount - repay_amount;
            loan.interest_accrued = 0;
            loan.borrow_start = timestamp::now_seconds();
        };
    }

    public fun get_total_borrowed(): u64 acquires DebtEngineStore {
        let store = borrow_global<DebtEngineStore>(@veil_hub);
        store.total_borrowed
    }

    public fun get_total_collateral(): u64 acquires DebtEngineStore {
        let store = borrow_global<DebtEngineStore>(@veil_hub);
        store.total_collateral
    }
}
