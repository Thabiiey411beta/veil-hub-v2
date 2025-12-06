module veil_hub::immortal_reserve {
    use std::signer;
    use aptos_framework::coin;

    struct ImmortalShare has key {
        shares: u64,
        total_burned: u64,
    }

    struct RevenueSource has store {
        source_id: u8, // 1=Borrow, 2=Vaults, 3=Perps, 4=Shadow
        allocation_pct: u64,
        total_contributed: u64,
    }

    struct Reserve has key {
        total_shares: u64,
        total_burned: u64,
        usdc_balance: u64,
        reserve_buffer: u64, // 6 months of dividends
        revenue_sources: vector<RevenueSource>,
        last_dividend: u64,
    }

    public entry fun initialize(account: &signer) {
        let sources = vector::empty<RevenueSource>();
        vector::push_back(&mut sources, RevenueSource { source_id: 1, allocation_pct: 40, total_contributed: 0 }); // Borrow
        vector::push_back(&mut sources, RevenueSource { source_id: 2, allocation_pct: 30, total_contributed: 0 }); // Vaults
        vector::push_back(&mut sources, RevenueSource { source_id: 3, allocation_pct: 20, total_contributed: 0 }); // Perps
        vector::push_back(&mut sources, RevenueSource { source_id: 4, allocation_pct: 10, total_contributed: 0 }); // Shadow

        move_to(account, Reserve {
            total_shares: 0,
            total_burned: 0,
            usdc_balance: 0,
            reserve_buffer: 0,
            revenue_sources: sources,
            last_dividend: 0,
        });
    }

    public entry fun burn_for_shares(account: &signer, amount: u64) acquires Reserve, ImmortalShare {
        let reserve = borrow_global_mut<Reserve>(@veil_hub);
        
        let bonus = if (reserve.total_burned < 100000000_00000000) {
            15 // 1.5x
        } else if (reserve.total_burned < 300000000_00000000) {
            12 // 1.25x
        } else {
            10 // 1.0x
        };

        let shares = (amount * bonus) / 10;
        
        reserve.total_shares = reserve.total_shares + shares;
        reserve.total_burned = reserve.total_burned + amount;

        if (!exists<ImmortalShare>(signer::address_of(account))) {
            move_to(account, ImmortalShare { shares: 0, total_burned: 0 });
        };

        let user_share = borrow_global_mut<ImmortalShare>(signer::address_of(account));
        user_share.shares = user_share.shares + shares;
        user_share.total_burned = user_share.total_burned + amount;
    }

    public entry fun add_revenue(account: &signer, source_id: u8, amount: u64) acquires Reserve {
        let reserve = borrow_global_mut<Reserve>(@veil_hub);
        
        // Find source and update
        let i = 0;
        let len = vector::length(&reserve.revenue_sources);
        while (i < len) {
            let source = vector::borrow_mut(&mut reserve.revenue_sources, i);
            if (source.source_id == source_id) {
                source.total_contributed = source.total_contributed + amount;
                break
            };
            i = i + 1;
        };
        
        reserve.usdc_balance = reserve.usdc_balance + amount;
    }

    public fun calculate_dividend(reserve: &Reserve): u64 {
        if (reserve.total_shares == 0) { return 0 };
        
        let weekly_revenue = reserve.usdc_balance / 52;
        let buffer_target = weekly_revenue * 26; // 6 months
        
        if (reserve.reserve_buffer < buffer_target) {
            // Build buffer: 50% to buffer, 50% to dividends
            weekly_revenue / 2
        } else {
            // Pay full dividends
            weekly_revenue
        }
    }

    #[view]
    public fun get_dividend_rate(): u64 acquires Reserve {
        let reserve = borrow_global<Reserve>(@veil_hub);
        if (reserve.total_shares == 0) { return 0 };
        
        let annual_dividend = calculate_dividend(reserve) * 52;
        (annual_dividend * 100) / reserve.total_shares
    }

    #[view]
    public fun get_buffer_status(): (u64, u64) acquires Reserve {
        let reserve = borrow_global<Reserve>(@veil_hub);
        let weekly_revenue = reserve.usdc_balance / 52;
        let buffer_target = weekly_revenue * 26;
        (reserve.reserve_buffer, buffer_target)
    }
}
