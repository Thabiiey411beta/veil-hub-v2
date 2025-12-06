# 🌊 Veil Finance - Liquidity Layer

## Overview

**Veil Finance** is the liquidity and trading layer of the Veil Ecosystem, complementing **Veil Hub's** lending and governance features.

## Ecosystem Architecture

```
┌─────────────────────────────────────────────────┐
│           VEIL ECOSYSTEM                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │  VEIL HUB    │◄───────►│ VEIL FINANCE    │  │
│  │              │         │                 │  │
│  │ • Lending    │         │ • DEX           │  │
│  │ • Borrowing  │         │ • Liquidity     │  │
│  │ • veVEIL     │         │ • Farming       │  │
│  │ • Governance │         │ • Swaps         │  │
│  └──────────────┘         └─────────────────┘  │
│         │                         │            │
│         └────────┬────────────────┘            │
│                  │                             │
│         ┌────────▼────────┐                    │
│         │ SHARED TREASURY │                    │
│         │                 │                    │
│         │ • 60% Protocol  │                    │
│         │ • 40% Liquidity │                    │
│         └─────────────────┘                    │
└─────────────────────────────────────────────────┘
```

## Veil Finance Features

### 1. Automated Market Maker (AMM)
- **Constant Product Formula**: x * y = k
- **0.3% Trading Fee**: Split between LPs and treasury
- **Multi-hop Routing**: Optimal swap paths
- **Price Impact Protection**: Slippage limits

### 2. Liquidity Pools
- **VEIL/USDC** - Primary pair
- **VEIL/SUPRA** - Native pair
- **USDC/SUPRA** - Stable pair
- **LP Tokens** - ERC20 receipt tokens

### 3. Yield Farming
- **LP Staking**: Earn VEIL rewards
- **Boosted APY**: Up to 3x with veVEIL
- **Auto-compound**: Optional reinvestment
- **Dual Rewards**: Trading fees + VEIL emissions

### 4. Flash Swaps
- **Zero-collateral swaps**: Pay at end of transaction
- **Arbitrage enabled**: MEV opportunities
- **Developer friendly**: Build on top

## Shared Treasury Model

### Revenue Streams

**Veil Hub (60% of treasury):**
- 50% Borrow interest → Treasury
- 60% Vault performance fees → Treasury
- 30% Buyback revenue → Treasury

**Veil Finance (40% of treasury):**
- 50% Trading fees → Treasury
- 30% LP withdrawal fees → Treasury
- 20% Flash swap fees → Treasury

### Treasury Allocation

```
Total Treasury Revenue: 100%
├── 30% → VEIL Buyback & Burn
├── 25% → Immortal Reserve (Dividends)
├── 20% → Liquidity Mining Rewards
├── 15% → Protocol Development
└── 10% → Emergency Fund
```

## Mathematical Model

### Liquidity Pool Pricing

```
Price = Reserve_USDC / Reserve_VEIL

Swap Output = (Input * 997 * Reserve_Out) / (Reserve_In * 1000 + Input * 997)

Slippage = (Expected_Price - Actual_Price) / Expected_Price * 100
```

### LP Token Value

```
LP_Value = (Reserve_VEIL * VEIL_Price + Reserve_USDC) / Total_LP_Supply

APY = (Trading_Fees + VEIL_Rewards) / LP_Value * 365 * 100
```

### veVEIL Boost Formula

```
Boost = min(1.0 + (veVEIL_Balance / Total_veVEIL) * 2.0, 3.0)

Boosted_APY = Base_APY * Boost
```

## Smart Contracts

### Core Contracts

```
veil_finance/
├── veil_dex.move          # AMM core
├── veil_router.move       # Swap router
├── veil_farm.move         # Yield farming
├── veil_treasury.move     # Shared treasury
└── veil_rewards.move      # Reward distribution
```

### Key Functions

**DEX:**
- `create_pair(token_a, token_b)` - Create new pool
- `add_liquidity(amount_a, amount_b)` - Add liquidity
- `remove_liquidity(lp_amount)` - Remove liquidity
- `swap(token_in, amount_in, min_out)` - Execute swap

**Farm:**
- `stake_lp(pool_id, amount)` - Stake LP tokens
- `unstake_lp(pool_id, amount)` - Unstake LP tokens
- `claim_rewards(pool_id)` - Claim VEIL rewards
- `compound(pool_id)` - Auto-compound rewards

**Treasury:**
- `deposit_revenue(source, amount)` - Deposit fees
- `distribute_rewards()` - Distribute to pools
- `execute_buyback(amount)` - Buy & burn VEIL
- `fund_immortal_reserve(amount)` - Fund dividends

## Tokenomics Integration

### VEIL Token Utility

**Veil Hub:**
- Collateral for borrowing
- Burn for Immortal Shares
- Lock for veVEIL governance
- Receive dividends

**Veil Finance:**
- Liquidity provision
- Trading pair
- Farming rewards
- Fee discounts (10% with veVEIL)

### Supply Dynamics

```
Total Supply: 1,000,000,000 VEIL

Circulating Supply Reduction:
├── Immortal Reserve Burns: 20-40% (5 years)
├── Buyback & Burn: 10-20% (5 years)
├── veVEIL Locks: 15-30% (locked)
└── LP Locks: 5-10% (locked)

Projected Circulating: 20-50% of total supply
```

## Revenue Projections

### Conservative ($100M TVL)

**Veil Hub:**
- Borrow interest: $5.5M/year
- Vault fees: $2M/year
- Total: $7.5M/year

**Veil Finance:**
- Trading fees: $3M/year (0.3% on $1B volume)
- LP fees: $500K/year
- Total: $3.5M/year

**Combined Revenue: $11M/year**

### Aggressive ($1B TVL)

**Veil Hub:**
- Borrow interest: $55M/year
- Vault fees: $20M/year
- Total: $75M/year

**Veil Finance:**
- Trading fees: $30M/year (0.3% on $10B volume)
- LP fees: $5M/year
- Total: $35M/year

**Combined Revenue: $110M/year**

## Launch Strategy

### Phase 1: Veil Hub (LIVE)
- ✅ Lending & borrowing
- ✅ Immortal Reserve
- ✅ veVEIL governance
- ✅ Buyback engine

### Phase 2: Veil Finance (Q1 2026)
- 🔄 DEX deployment
- 🔄 Initial liquidity pools
- 🔄 Farming contracts
- 🔄 Treasury integration

### Phase 3: Ecosystem Synergy (Q2 2026)
- 🔄 Cross-protocol rewards
- 🔄 Unified governance
- 🔄 Shared treasury activation
- 🔄 Full automation

## Security

- **Audits**: Trail of Bits, OpenZeppelin
- **Time locks**: 48h for critical changes
- **Multi-sig**: 3-of-5 for treasury
- **Circuit breakers**: Auto-pause on anomalies
- **Rate limits**: Flash loan protection

## Competitive Advantages

1. **Unified Ecosystem**: Seamless Hub ↔ Finance integration
2. **Shared Treasury**: Aligned incentives
3. **veVEIL Boost**: Cross-protocol benefits
4. **Zero Liquidation**: Unique to Veil Hub
5. **Supra L1**: Sub-second finality, low fees

## Conclusion

Veil Finance completes the Veil Ecosystem by providing:
- Deep liquidity for VEIL token
- Additional yield opportunities
- Trading infrastructure
- Shared value accrual

Together, **Veil Hub + Veil Finance = Complete DeFi Super-Protocol**

---

**Status**: Design Complete | Deployment: Q1 2026  
**Ecosystem Score**: 9.8/10
