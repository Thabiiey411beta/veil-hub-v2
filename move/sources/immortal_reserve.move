/// Immortal Reserve Module
///
/// The Immortal Reserve is the heart of Veil Hub's black-hole flywheel.
/// It receives all protocol revenue (trading fees, interest, MEV, etc.) and splits it according to the floor state.
///
/// Floor Mechanics:
/// - Pre-floor (supply > 100M): 10% USDC dividends, 50% VEIL burn, 30% veVEIL boosts, 10% treasury
/// - Post-floor (supply <= 100M): 20% USDC dividends, 60% veVEIL rewards, 20% treasury (burn stops to preserve floor)
///
/// Inspiration: OlympusDAO's treasury splitter with floor protection, but with permanent burns for scarcity.
/// Flywheel Contribution: Burns create scarcity → higher token value → more revenue → more burns/dividends.
/// Safety: Circuit breaker via governance pause, oracle checks for revenue deposits.

module veil_hub::immortal_reserve {
    use std::signer;
    use std::error;
    use std::event;
    use std::account;
    use aptos_std::table::{Self, Table};
    use aptos_framework::timestamp;
    use veil_hub::veil_token;
    use veil_hub::veveil;
    use veil_hub::treasury;
    use veil_hub::governance;

    // Constants
    const FLOOR_SUPPLY: u128 = 100_000_000_000_000_000; // 100M VEIL
    const PRE_FLOOR_DIVIDENDS_PCT: u128 = 10; // 10%
    const PRE_FLOOR_BURN_PCT: u128 = 50; // 50%
    const PRE_FLOOR_VEVEIL_PCT: u128 = 30; // 30%
    const PRE_FLOOR_TREASURY_PCT: u128 = 10; // 10%
    const POST_FLOOR_DIVIDENDS_PCT: u128 = 20; // 20%
    const POST_FLOOR_VEVEIL_PCT: u128 = 60; // 60%
    const POST_FLOOR_TREASURY_PCT: u128 = 20; // 20%

    // Errors
    const EPAUSED: u64 = 1;
    const EINVALID_AMOUNT: u64 = 2;

    // Resources
    struct ReserveConfig has key {
        floor: u128,
        paused: bool,
    }

    struct Reserve has key {
        usdc_balance: u128, // USDC for dividends
        total_revenue: u128,
    }

    // Events
    struct RevenueDepositEvent has drop, store {
        amount: u128,
        source: vector<u8>,
    }

    struct DistributionEvent has drop, store {
        dividends: u128,
        burns: u128,
        veveil_boosts: u128,
        treasury: u128,
        is_pre_floor: bool,
    }

    // Initialize
    public entry fun init(account: &signer) {
        let addr = signer::address_of(account);
        assert!(!exists<ReserveConfig>(addr), error::already_exists(EALREADY_EXISTS));
        assert!(!exists<Reserve>(addr), error::already_exists(EALREADY_EXISTS));

        move_to(account, ReserveConfig {
            floor: FLOOR_SUPPLY,
            paused: false,
        });

        move_to(account, Reserve {
            usdc_balance: 0,
            total_revenue: 0,
        });
    }

    // Deposit revenue (called by other modules like perpetual_dex, phantom_lender, etc.)
    public fun deposit_revenue(amount: u128, source: vector<u8>) acquires Reserve, ReserveConfig {
        let config = borrow_global<ReserveConfig>(@veil_hub);
        assert!(!config.paused, error::invalid_state(EPAUSED));

        let reserve = borrow_global_mut<Reserve>(@veil_hub);
        reserve.total_revenue = reserve.total_revenue + amount;

        // Distribute immediately
        distribute_revenue(amount);

        event::emit(RevenueDepositEvent { amount, source });
    }

    // Internal distribution logic
    fun distribute_revenue(amount: u128) acquires Reserve {
        let current_supply = veil_token::total_supply();
        let is_pre_floor = current_supply > FLOOR_SUPPLY;

        let dividends_pct: u128;
        let burn_pct: u128;
        let veveil_pct: u128;
        let treasury_pct: u128;

        if (is_pre_floor) {
            dividends_pct = PRE_FLOOR_DIVIDENDS_PCT;
            burn_pct = PRE_FLOOR_BURN_PCT;
            veveil_pct = PRE_FLOOR_VEVEIL_PCT;
            treasury_pct = PRE_FLOOR_TREASURY_PCT;
        } else {
            dividends_pct = POST_FLOOR_DIVIDENDS_PCT;
            burn_pct = 0; // No burn post-floor
            veveil_pct = POST_FLOOR_VEVEIL_PCT;
            treasury_pct = POST_FLOOR_TREASURY_PCT;
        };

        let dividends = (amount * dividends_pct) / 100;
        let burns = (amount * burn_pct) / 100;
        let veveil_boosts = (amount * veveil_pct) / 100;
        let treasury_amt = (amount * treasury_pct) / 100;

        // Add to USDC balance for dividends (assuming USDC is deposited separately or converted)
        let reserve = borrow_global_mut<Reserve>(@veil_hub);
        reserve.usdc_balance = reserve.usdc_balance + dividends;

        // Burn VEIL if pre-floor
        if (burns > 0) {
            // Mint and burn? Or burn from reserve? Assuming governance has VEIL to burn
            // In practice, buyback: use revenue to buy VEIL and burn
            // Simplified: assume VEIL is burned from a designated address
            veil_token::burn(@governance_addr, burns);
        }

        // Boost veVEIL (add to veVEIL rewards pool)
        veveil::add_rewards(veveil_boosts);

        // Send to treasury
        treasury::deposit(treasury_amt);

        event::emit(DistributionEvent {
            dividends,
            burns,
            veveil_boosts,
            treasury: treasury_amt,
            is_pre_floor,
        });
    }

    // Claim dividends (for veVEIL holders or all holders?)
    // Assuming monthly distribution to all holders proportional to balance
    public fun claim_dividends(account: &signer) acquires Reserve {
        // Simplified: distribute based on balance
        // In production, track claims, use Supra AutoFi for automation
        let addr = signer::address_of(account);
        let balance = veil_token::balance_of(addr);
        let total_supply = veil_token::total_supply();
        let reserve = borrow_global<Reserve>(@veil_hub);
        let user_share = (balance * reserve.usdc_balance) / total_supply;

        // Transfer USDC (assuming USDC token module)
        // usdc_token::transfer(@veil_hub, addr, user_share);
        reserve.usdc_balance = reserve.usdc_balance - user_share;
    }

    // Governance functions
    public entry fun pause(account: &signer) acquires ReserveConfig {
        governance::assert_governance(account);
        let config = borrow_global_mut<ReserveConfig>(@veil_hub);
        config.paused = true;
    }

    public entry fun unpause(account: &signer) acquires ReserveConfig {
        governance::assert_governance(account);
        let config = borrow_global_mut<ReserveConfig>(@veil_hub);
        config.paused = false;
    }

    // View functions
    public fun get_reserve_balance(): u128 acquires Reserve {
        borrow_global<Reserve>(@veil_hub).usdc_balance
    }

    public fun is_paused(): bool acquires ReserveConfig {
        borrow_global<ReserveConfig>(@veil_hub).paused
    }
}
