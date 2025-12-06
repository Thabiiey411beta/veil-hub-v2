# SupraNova Bridge Integration (Future)

## Overview
SupraNova is Supra's trustless cross-chain bridge using HyperNova protocol for Ethereum ↔ Supra asset transfers.

## Current Status
**Phase 1 (Live)**: Ethereum → Supra (Lock-Mint)
- ETH → supETH
- USDC → supUSDC
- USDT → supUSDT
- WBTC → supBTC
- SolvBTC → supSolvBTC

**Phase 2 (Coming)**: Supra → Ethereum (Burn-Release)

## Bridge Addresses

### Testnet
- **Ethereum Sepolia HyperNova**: `0x50888Fc24e1224E12f5C8a31310A47B98b2A7f75`
- **Ethereum Sepolia Token Bridge**: `0x71eb89D6D0d6ED44526dd8EAcb956735934eC2d5`
- **Supra Testnet HyperNova**: `0x3ab1136a5dbb76b923d2b02f95b042f5d80b70218a0395755eafb63d4eefc340`
- **Supra Testnet Token Bridge**: `0x76b38ad503118cb7749a835d965b023a2fe4801dba736bfa66e18d1f0339695c`

### Mainnet
- **Ethereum HyperNova**: `0xEF7238503Fdd7671d85F3Cc5e4B9d7D90e99bFF1`
- **Ethereum Token Bridge**: `0x7cECd42A15A691EF693512b1D508F1465ec5DA16`
- **Supra HyperNova**: `0xda20f7d0ec813c751926f06004a10bc6ee1eefc96798f6a1aa31447ee146f932`
- **Supra Token Bridge**: `0xda20f7d0ec813c751926f06004a10bc6ee1eefc96798f6a1aa31447ee146f932`

## Security Model

### HyperNova Trustless Validation
- **Sync Committee**: 512 validators, >90% signature threshold
- **Receipt Proof**: Transaction execution verification
- **Ancestry Proof**: Links blocks via Ethereum's consensus
- **BLS Signatures**: Cryptographic proof validation

### Fee Structure
| Tier | Amount | Fee |
|------|--------|-----|
| Micro | <$5K | 0.5% |
| Standard | $5K-$100K | 0.3% |
| Whale | >$100K | 0.2% |

## Transaction Limits (Mainnet)

| Asset | Max Global | Per Transaction |
|-------|-----------|-----------------|
| ETH | 23 ETH | 4.5 ETH |
| USDC | 100K | 20K |
| USDT | 100K | 20K |
| WBTC | 1 BTC | 0.2 BTC |
| SolvBTC | 1 | 0.2 |

## Future Veil Hub Integration

### Phase 1: Accept Bridged Assets
```solidity
// Accept supETH as collateral
function depositCollateral(uint256 amount) external {
    supETH.transferFrom(msg.sender, address(this), amount);
    // Add to user collateral
}
```

### Phase 2: iAssets Integration
- **iETH**: Liquid staking derivative with dual yield
- **iUSDC**: Stablecoin with staking rewards
- Use as collateral with higher LTV ratios

### Phase 3: Cross-Chain Vaults
- Deploy vaults accepting both native and bridged assets
- Unified liquidity across Ethereum and Supra
- Automated rebalancing via SupraNova

## Resources
- Bridge UI: https://bridge.supra.com
- Docs: https://docs.supra.com/supernova
- Explorer: https://suprascan.io

## Implementation Priority
**Low** - Focus on core DeFi primitives first:
1. ✅ Oracles (DORA)
2. ✅ Technical Indicators
3. ✅ dVRF
4. ✅ Automation
5. 🔄 Vaults & Lending
6. 📋 Bridge Integration (Future)
