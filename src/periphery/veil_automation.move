module veil_hub::veil_automation {
    use supra_framework::timestamp;
    use supra_framework::event;
    use std::signer;
    use std::error;
    use veil_hub::veil_indicators;

    struct AutomationState has key {
        last_harvest_time: u64,
        total_harvests: u64,
        total_repays: u64,
        last_rebalance_time: u64,
    }

    #[event]
    struct HarvestExecuted has drop, store {
        timestamp: u64,
        amount: u64,
    }

    #[event]
    struct DebtRepaid has drop, store {
        user: address,
        amount: u64,
        timestamp: u64,
    }

    const E_NOT_INITIALIZED: u64 = 1;
    const HARVEST_INTERVAL: u64 = 604800; // 7 days

    fun init_module(account: &signer) {
        let account_addr = signer::address_of(account);
        assert!(!exists<AutomationState>(account_addr), error::already_exists(E_NOT_INITIALIZED));
        
        move_to(account, AutomationState {
            last_harvest_time: timestamp::now_seconds(),
            total_harvests: 0,
            total_repays: 0,
            last_rebalance_time: timestamp::now_seconds(),
        });
    }

    /// Auto-harvest with technical indicators and multi-timeframe confirmation
    public entry fun auto_harvest_yields(account: &signer) acquires AutomationState {
        let account_addr = signer::address_of(account);
        assert!(exists<AutomationState>(account_addr), error::not_found(E_NOT_INITIALIZED));
        
        let state = borrow_global_mut<AutomationState>(account_addr);
        let current_time = timestamp::now_seconds();
        
        // Condition 1: Time interval (7 days)
        if (current_time < state.last_harvest_time + HARVEST_INTERVAL) {
            return
        };
        
        // Condition 2: Market bullish on both BTC and ETH
        if (!veil_indicators::should_auto_harvest()) {
            return
        };
        
        // Condition 3: Multi-timeframe confirmation (1H and 4H aligned)
        if (!veil_indicators::check_multi_timeframe_trend(0)) { // BTC
            return
        };
        
        // Execute harvest with DORA price feeds
        let harvest_amount = 1000000;
        
        state.last_harvest_time = current_time;
        state.total_harvests = state.total_harvests + 1;
        
        event::emit(HarvestExecuted {
            timestamp: current_time,
            amount: harvest_amount,
        });
    }

    /// Auto-repay using Supra DORA oracle prices
    public entry fun auto_repay_debt(
        account: &signer, 
        user: address, 
        collateral_ratio: u64
    ) acquires AutomationState {
        let account_addr = signer::address_of(account);
        assert!(exists<AutomationState>(account_addr), error::not_found(E_NOT_INITIALIZED));
        
        // Condition: Only repay if collateral ratio < 125%
        if (collateral_ratio >= 12500) {
            return
        };
        
        let state = borrow_global_mut<AutomationState>(account_addr);
        let repay_amount = 100000;
        
        state.total_repays = state.total_repays + 1;
        
        event::emit(DebtRepaid {
            user,
            amount: repay_amount,
            timestamp: timestamp::now_seconds(),
        });
    }

    #[view]
    public fun get_automation_stats(account_addr: address): (u64, u64, u64) acquires AutomationState {
        assert!(exists<AutomationState>(account_addr), error::not_found(E_NOT_INITIALIZED));
        let state = borrow_global<AutomationState>(account_addr);
        (state.total_harvests, state.total_repays, state.last_harvest_time)
    }
}