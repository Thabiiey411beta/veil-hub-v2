module veil_hub::staking_nft {
    use std::signer;
    use std::string::{Self, String};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::table::{Self, Table};
    use aptos_framework::timestamp;

    struct StakingNFT has key {
        name: String,
        description: String,
        uri: String,
        staked_amount: u64,
        staker: address,
        minted_at: u64,
    }

    struct StakingNFTStore has key {
        nfts: Table<address, Object<StakingNFT>>,
        total_stakers: u64,
        total_staked: u64,
    }

    public entry fun initialize(admin: &signer) {
        move_to(admin, StakingNFTStore {
            nfts: table::new(),
            total_stakers: 0,
            total_staked: 0,
        });
    }

    public entry fun mint_staking_nft(
        user: &signer,
        staked_amount: u64,
    ) acquires StakingNFTStore {
        let user_addr = signer::address_of(user);
        let store = borrow_global_mut<StakingNFTStore>(@veil_hub);

        let name = string::utf8(b"Veil Staker Achievement");
        let description = string::utf8(b"Veil Hub Staking Achievement NFT");
        let uri = string::utf8(b"ipfs://QmVeilStakingAchievement");

        let nft = StakingNFT {
            name,
            description,
            uri,
            staked_amount,
            staker: user_addr,
            minted_at: timestamp::now_seconds(),
        };

        let obj = object::new(nft);
        
        if (!table::contains(&store.nfts, user_addr)) {
            store.total_stakers = store.total_stakers + 1;
        };

        table::add(&mut store.nfts, user_addr, obj);
        store.total_staked = store.total_staked + staked_amount;
    }

    public fun get_staker_amount(staker: address): u64 acquires StakingNFTStore {
        let store = borrow_global<StakingNFTStore>(@veil_hub);
        if (table::contains(&store.nfts, staker)) {
            let obj = table::borrow(&store.nfts, staker);
            let nft = object::borrow(obj);
            nft.staked_amount
        } else {
            0
        }
    }

    public fun get_total_stakers(): u64 acquires StakingNFTStore {
        let store = borrow_global<StakingNFTStore>(@veil_hub);
        store.total_stakers
    }

    public fun get_total_staked(): u64 acquires StakingNFTStore {
        let store = borrow_global<StakingNFTStore>(@veil_hub);
        store.total_staked
    }
}
