# iAssets & PoEL Integration (Future)

## Overview
PoEL (Proof of Efficient Liquidity) enables dual-yield iAssets: staking rewards + DeFi fees.

## iAsset Addresses

### Testnet
| iAsset | Address |
|--------|---------|
| iETH | `0xe78614f0dca0a899d0994546a4db6a9372b31d23270a70874396a9d6998adba1` |
| iUSDC | `0x7762f3583728573ad0e02367ba06d35fdd75bc6bac5985038d24f1fa4b3f661c` |
| iSUPRA | `0x7bc27446b62b0539e39b185551747b13368c1f26d30eaa62113f0a18de78eb0` |
| iSolvBTC | `0x5e551a49289e147661c6c60fd01b12d8a02fe6946d52baeff6d662c0dae00469` |

### Mainnet
| iAsset | Address |
|--------|---------|
| iETH | `0xa0040c97616048b6e0409e048d5f3cb9cfa0caa91dce0505390ac7ec8a132a86` |
| iUSDC | `0x90a8e901e02ac1539af4a865bbe4a6b96edc27375488803cfbbd6875ec57b281` |
| iSUPRA | `0x80f0251b74c76f1c477b9209ade65ffb5cfecd9b259875c3865ad645f6c33a3d` |
| iWBTC | `0xbc8d1fb1ea5f22dd931935cbdcb128bbb205e567a6b5225fe6994f8bafc8702a` |
| iUSDT | `0xceff14089bde0d4f512dcd3b6f3df6794346c58115b8d97e043f92ff08cd1fca` |

## PoEL Module
**Address**: `0xda20f7d0ec813c751926f06004a10bc6ee1eefc96798f6a1aa31447ee146f932`

## Dual Yield Model

1. **Staking Rewards**: $SUPRA borrowed against collateral and delegated
2. **DeFi Fees**: iAssets used as liquidity in Veil vaults/pools

## Integration Methods

### View Rewards
```move
// Check allocatable rewards
let allocatable = poel::get_allocatable_rewards(user_address, iasset_object);

// Check user reward status
let rewards_info = poel::get_user_rewards(user_address);
// Returns: allocated, withdrawable, withdrawn amounts
```

### Claim Flow
```move
// 1. Update rewards (allocate)
poel::update_rewards(&signer, iasset_object);

// 2. Claim rewards (lock for withdrawal)
poel::claim_rewards(&signer);

// 3. Wait for lockup cycle
let timer = poel::get_withdraw_timer_for_user(user_address);

// 4. Withdraw after timer expires
poel::withdraw_rewards(&signer);
```

## Veil Hub Integration Plan

### Phase 1: Accept iAssets as Collateral
```move
module veil_hub::iasset_vault {
    use poel::poel;
    
    public entry fun deposit_iasset(
        account: &signer,
        iasset: Object<Metadata>,
        amount: u64
    ) {
        // Transfer iAsset to vault
        // Credit user collateral
        // Start earning PoEL rewards
    }
    
    public entry fun claim_vault_rewards(
        account: &signer,
        iasset: Object<Metadata>
    ) {
        // Update rewards for vault
        poel::update_rewards(account, iasset);
        
        // Claim and redistribute to depositors
        poel::claim_rewards(account);
    }
}
```

### Phase 2: Stimulus Rewards
- Veil vaults receive stimulus rewards for holding iAssets
- Redistribute to LPs proportionally
- Boost APY for iAsset liquidity providers

### Phase 3: Multi-Yield Vaults
- Base APY: PoEL staking rewards
- Stimulus APY: Liquidity incentives
- Vault APY: Veil strategy performance
- **Total APY**: Sum of all three sources

## Reward Distribution

### For Vault Contracts
```move
// Vault holds iAssets, accrues rewards
struct VaultRewards has key {
    total_iasset_balance: u64,
    last_reward_update: u64,
    accumulated_rewards: u64,
}

// Periodic reward claim
public entry fun harvest_vault_rewards(vault: &signer) {
    let allocatable = poel::get_allocatable_rewards(@vault, iasset);
    if (allocatable > 0) {
        poel::update_rewards(vault, iasset);
        poel::claim_rewards(vault);
    }
}
```

## Key Concepts

### Pre-minted iAssets
- Deposited assets are pre-minted (not transferable)
- Wait 2 epochs (~4 hours)
- Finalize mint to activate rewards

### Collateralization
- iAssets backed by locked collateral
- $SUPRA borrowed and delegated
- Dynamic collateralization rates

### Lockup Cycle
- Claim rewards → locked for withdrawal
- Wait for lockup cycle to complete
- Withdraw after timer expires

## Benefits for Veil Hub

1. **Higher Yields**: Dual income streams
2. **Capital Efficiency**: Same assets, multiple purposes
3. **Liquidity Attraction**: Bootstrap TVL with yield-bearing assets
4. **Network Security**: Contribute to Supra validator delegation

## Implementation Priority
**Medium** - After core vaults are live:
1. ✅ Core DeFi primitives
2. 🔄 Basic vaults & lending
3. 📋 iAssets integration
4. 📋 Stimulus rewards optimization

## Resources
- PoEL Docs: https://docs.supra.com/poel
- iAssets UI: https://iassets.supra.com
- Contract: `0xda20f7d0ec813c751926f06004a10bc6ee1eefc96798f6a1aa31447ee146f932`
