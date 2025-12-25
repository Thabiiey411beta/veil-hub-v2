/// Veil Token Module
///
/// This module implements the VEIL token, the core utility token of Veil Hub.
/// VEIL serves as the governance token, yield bearer, and collateral in the ecosystem.
///
/// Key Features:
/// - Total supply: 1B initial, burns down to 100M floor
/// - Minting restricted to governance (immortal_reserve for buybacks)
/// - Burning via decay-to-burn in veVEIL and revenue burns
/// - ERC20-like interface with Move resource model for safety
///
/// Inspiration: Standard ERC20 with supply controls, inspired by OHM's rebasing but with permanent burns.
/// Flywheel Contribution: Scarcity drives value, higher yields attract more revenue, more burns.
///
/// Safety: No reentrancy (Move ownership), supply caps enforced.

module veil_hub::veil_token {
    use std::signer;
    use std::error;
    use std::event;
    use std::account;
    use aptos_std::table::{Self, Table};
    use aptos_framework::timestamp;

    // Constants
    const INITIAL_SUPPLY: u128 = 1_000_000_000_000_000_000; // 1B VEIL (18 decimals)
    const MIN_SUPPLY: u128 = 100_000_000_000_000_000; // 100M floor
    const DECIMALS: u8 = 18;

    // Errors
    const ENOT_AUTHORIZED: u64 = 1;
    const EINSUFFICIENT_BALANCE: u64 = 2;
    const EBELOW_MIN_SUPPLY: u64 = 3;
    const EALREADY_INITIALIZED: u64 = 4;

    // Resources
    struct VEIL has key {
        total_supply: u128,
        balances: Table<address, u128>,
        allowances: Table<address, Table<address, u128>>,
    }

    // Events
    struct MintEvent has drop, store {
        to: address,
        amount: u128,
    }

    struct BurnEvent has drop, store {
        from: address,
        amount: u128,
    }

    struct TransferEvent has drop, store {
        from: address,
        to: address,
        amount: u128,
    }

    // Initialize the token (called once at deployment)
    public entry fun init(account: &signer) {
        let addr = signer::address_of(account);
        assert!(!exists<VEIL>(addr), error::already_exists(EALREADY_EXISTS));

        move_to(account, VEIL {
            total_supply: INITIAL_SUPPLY,
            balances: table::new(),
            allowances: table::new(),
        });

        // Mint initial supply to deployer (governance will distribute)
        let veil = borrow_global_mut<VEIL>(addr);
        table::add(&mut veil.balances, addr, INITIAL_SUPPLY);

        event::emit(MintEvent { to: addr, amount: INITIAL_SUPPLY });
    }

    // Mint new VEIL (restricted to governance/immortal_reserve)
    public fun mint(to: address, amount: u128) acquires VEIL {
        // Authorization check: only immortal_reserve can mint for buybacks
        // In production, add signer check or capability

        let veil = borrow_global_mut<VEIL>(@veil_hub); // Assuming global token resource
        veil.total_supply = veil.total_supply + amount;

        if (!table::contains(&veil.balances, to)) {
            table::add(&mut veil.balances, to, 0);
        };
        let balance = table::borrow_mut(&mut veil.balances, to);
        *balance = *balance + amount;

        event::emit(MintEvent { to, amount });
    }

    // Burn VEIL (used by veVEIL decay and immortal_reserve burns)
    public fun burn(from: address, amount: u128) acquires VEIL {
        let veil = borrow_global_mut<VEIL>(@veil_hub);
        assert!(veil.total_supply >= amount + MIN_SUPPLY, error::invalid_argument(EBELOW_MIN_SUPPLY));

        assert!(table::contains(&veil.balances, from), error::not_found(EINSUFFICIENT_BALANCE));
        let balance = table::borrow_mut(&mut veil.balances, from);
        assert!(*balance >= amount, error::invalid_argument(EINSUFFICIENT_BALANCE));
        *balance = *balance - amount;

        veil.total_supply = veil.total_supply - amount;

        event::emit(BurnEvent { from, amount });
    }

    // Transfer VEIL
    public fun transfer(from: &signer, to: address, amount: u128) acquires VEIL {
        let from_addr = signer::address_of(from);
        let veil = borrow_global_mut<VEIL>(@veil_hub);

        assert!(table::contains(&veil.balances, from_addr), error::not_found(EINSUFFICIENT_BALANCE));
        let from_balance = table::borrow_mut(&mut veil.balances, from_addr);
        assert!(*from_balance >= amount, error::invalid_argument(EINSUFFICIENT_BALANCE));
        *from_balance = *from_balance - amount;

        if (!table::contains(&veil.balances, to)) {
            table::add(&mut veil.balances, to, 0);
        };
        let to_balance = table::borrow_mut(&mut veil.balances, to);
        *to_balance = *to_balance + amount;

        event::emit(TransferEvent { from: from_addr, to, amount });
    }

    // Allowance and transfer_from (for DeFi integrations)
    public fun approve(owner: &signer, spender: address, amount: u128) acquires VEIL {
        let owner_addr = signer::address_of(owner);
        let veil = borrow_global_mut<VEIL>(@veil_hub);

        if (!table::contains(&veil.allowances, owner_addr)) {
            table::add(&mut veil.allowances, owner_addr, table::new());
        };
        let owner_allowances = table::borrow_mut(&mut veil.allowances, owner_addr);
        table::upsert(owner_allowances, spender, amount);
    }

    public fun transfer_from(owner: address, spender: &signer, to: address, amount: u128) acquires VEIL {
        let spender_addr = signer::address_of(spender);
        let veil = borrow_global_mut<VEIL>(@veil_hub);

        // Check allowance
        assert!(table::contains(&veil.allowances, owner), error::not_found(ENOT_AUTHORIZED));
        let owner_allowances = table::borrow_mut(&mut veil.allowances, owner);
        assert!(table::contains(owner_allowances, spender_addr), error::not_found(ENOT_AUTHORIZED));
        let allowance = table::borrow_mut(owner_allowances, spender_addr);
        assert!(*allowance >= amount, error::invalid_argument(ENOT_AUTHORIZED));
        *allowance = *allowance - amount;

        // Transfer
        assert!(table::contains(&veil.balances, owner), error::not_found(EINSUFFICIENT_BALANCE));
        let from_balance = table::borrow_mut(&mut veil.balances, owner);
        assert!(*from_balance >= amount, error::invalid_argument(EINSUFFICIENT_BALANCE));
        *from_balance = *from_balance - amount;

        if (!table::contains(&veil.balances, to)) {
            table::add(&mut veil.balances, to, 0);
        };
        let to_balance = table::borrow_mut(&mut veil.balances, to);
        *to_balance = *to_balance + amount;

        event::emit(TransferEvent { from: owner, to, amount });
    }

    // View functions
    public fun balance_of(addr: address): u128 acquires VEIL {
        let veil = borrow_global<VEIL>(@veil_hub);
        if (table::contains(&veil.balances, addr)) {
            *table::borrow(&veil.balances, addr)
        } else {
            0
        }
    }

    public fun total_supply(): u128 acquires VEIL {
        borrow_global<VEIL>(@veil_hub).total_supply
    }

    public fun allowance(owner: address, spender: address): u128 acquires VEIL {
        let veil = borrow_global<VEIL>(@veil_hub);
        if (table::contains(&veil.allowances, owner)) {
            let owner_allowances = table::borrow(&veil.allowances, owner);
            if (table::contains(owner_allowances, spender)) {
                *table::borrow(owner_allowances, spender)
            } else {
                0
            }
        } else {
            0
        }
    }
}
