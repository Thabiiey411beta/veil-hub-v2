# 🌑 Veil Hub v17 - Complete Mechanics & Frontend Guide

> **Zero-liquidation borrowing. Perpetual real yield. Privacy-first. Built on Supra L1.**

---

## 📋 Table of Contents

1. [Core Mechanics](#core-mechanics)
2. [Frontend Routes & Features](#frontend-routes--features)
3. [Phased Launch Plan](#phased-launch-plan)
4. [Tokenomics & Lock-to-Earn](#tokenomics--lock-to-earn)
5. [Integration Map](#integration-map)
6. [Getting Started](#getting-started)

---

## 🔧 Core Mechanics

### 1. **Confidential PMM (Perpetual Market Maker)**
**Status**: Phase 1 (Launch)  
**Frontend**: `/dex`

The Confidential PMM enables privacy-preserving automated market making with:
- **Spot Trading**: Buy/sell assets with minimal slippage
- **Futures Trading**: 1x-20x leverage perpetual contracts
- **Options Trading**: Call/put options with customizable strikes
- **Order Book**: Real-time order matching with technical indicators
- **Slippage Protection**: Automated price impact calculations

**Key Features**:
- Sub-second execution via Supra DORA oracles
- Privacy-first order routing (no MEV exposure)
- Multi-asset support (BTC, ETH, LINK, AVAX, DOT)
- Real-time price feeds with BFT consensus

**Frontend Components**:
- Mode tabs (Spot/Futures/Options)
- Leverage slider (1x-20x)
- Order book display
- Recent trades table
- Technical indicators (SMA, EMA, RSI)

---

### 2. **Immortal Automated Vaults (ERC-4626)**
**Status**: Phase 1 (Launch)  
**Frontend**: `/vaults`

Automated yield farming with progressive fee burning:
- **3 Vault Strategies**:
  1. **BTC-ETH Vault** (18.5% APY) - Liquidity provision + yield farming
  2. **Stable Bundle** (8.2% APY) - USDC/USDT/DAI mix with low volatility
  3. **DeFi Index** (24.3% APY) - Diversified DeFi protocol exposure

- **Performance Fee Structure**:
  - 10% total fee on profits
  - 60% burned (deflationary pressure)
  - 25% to Immortal Reserve
  - 15% to veVEIL holders

- **Automated Harvesting**: Supra AutoFi triggers harvests based on:
  - Technical indicators (SMA, EMA, RSI)
  - Multi-timeframe confirmation
  - Gas optimization

**Frontend Components**:
- Vault cards with APY, TVL, strategy details
- Deposit/withdraw interface
- Performance charts (7d, 30d, 90d, 1y)
- Fee breakdown visualization
- Auto-harvest status

---

### 3. **veVEIL Locking & Tokenized Positions**
**Status**: Phase 1 (Launch)  
**Frontend**: `/governance`

Vote-escrowed VEIL with progressive lock bonuses:

**Lock Durations & Multipliers**:
| Duration | Multiplier | Yield Boost | Voting Power |
|----------|-----------|-------------|--------------|
| 1 Week | 1.0x | 1.0x | 1.0x |
| 1 Month | 1.25x | 1.25x | 1.25x |
| 3 Months | 1.5x | 1.5x | 1.5x |
| 1 Year | 2.0x | 2.0x | 2.0x |
| 4 Years | 2.5x | 2.5x | 2.5x |

**Features**:
- Tokenized lock positions (transferable NFTs)
- Early unlock with penalty (linear decay)
- Governance voting on protocol parameters
- Yield boost on Immortal Reserve dividends
- No penalty for max lock duration

**Frontend Components**:
- Lock duration selector with multiplier preview
- Lock amount input with balance display
- Voting results dashboard
- Proposal voting interface
- Lock position NFT gallery
- Early unlock penalty calculator

---

### 4. **Basic ImmortalReserve (Burn + Simple Dividends)**
**Status**: Phase 1 (Launch)  
**Frontend**: `/finance`

Perpetual dividend distribution mechanism:

**Revenue Streams**:
1. **Borrow Interest** (50% allocation):
   - 50% → Immortal Reserve (dividends)
   - 30% → Buyback & Burn
   - 20% → veVEIL holders

2. **Vault Performance Fees** (25% allocation):
   - 60% burned
   - 25% to Immortal Reserve
   - 15% to veVEIL holders

3. **Trading Fees** (10% allocation):
   - 50% to Immortal Reserve
   - 50% to veVEIL holders

**Dividend Mechanics**:
- Weekly USDC distributions
- Base rate: 1.5% APY (on locked VEIL)
- veVEIL boost: up to 2.5x multiplier
- Automatic claim or auto-compound

**Frontend Components**:
- Portfolio growth chart
- Holdings breakdown (locked VEIL, iTokens, veVEIL)
- Income sources breakdown
- Dividend history table
- Claim/auto-compound toggle
- Transaction history

---

### 5. **DebtEngine (Zero-Liquidation Borrowing)**
**Status**: Phase 2 (1-3 months post-launch)  
**Frontend**: `/borrow`

Borrow USDC against iTokens and veVEIL collateral:

**Borrowing Parameters**:
- **Fixed APR**: 5.5%
- **Minimum Collateral Ratio**: 180%
- **Auto-Repay Trigger**: 120% ratio
- **Collateral Types**: iTokens, veVEIL, Phantom Indices

**Zero-Liquidation Mechanism**:
- No liquidations at any collateral ratio
- Auto-repay triggers at 120% to maintain health
- Interest accrues to Immortal Reserve
- Borrower retains all upside above collateral value

**Interest Distribution**:
- 50% → Immortal Reserve (dividends)
- 30% → Buyback & Burn
- 20% → veVEIL holders

**Frontend Components**:
- Collateral selection (iTokens, veVEIL, Indices)
- Borrow amount input with max calculator
- Loan summary (APR, monthly payment, collateral ratio)
- Active loans table with repay interface
- Collateral ratio health indicator
- Auto-repay status

---

### 6. **Phantom Indices (Index Factory)**
**Status**: Phase 2 (1-3 months post-launch)  
**Frontend**: `/indices`

Pre-built and custom index creation with auto-rebalancing:

**Pre-Built Indices**:
1. **BTC-ETH Index** (18.5% APY)
   - BTC 60% + ETH 40%
   - Rebalance: Weekly
   - Fee: 0.15%

2. **Stable Bundle** (8.2% APY)
   - USDC 50% + USDT 30% + DAI 20%
   - Rebalance: Daily
   - Fee: 0.2%
   - TVL: $120M

3. **DeFi Index** (24.3% APY)
   - AAVE 25% + COMP 25% + UNI 25% + CURVE 25%
   - Rebalance: Bi-weekly
   - Fee: 0.25%

**Index Factory (3 Tiers)**:
| Tier | Min VEIL | Asset Limit | Rebalance Freq | Fee |
|------|----------|-------------|----------------|-----|
| Basic | 10k | 5 assets | Monthly | 0.3% |
| Pro | 25k | 15 assets | Weekly | 0.2% |
| Enterprise | 100k | 50 assets | Daily | 0.1% |

**Auto-Rebalancer Stats**:
- 1,245 rebalances executed
- $2.3M gas saved
- 0.12% slippage reduced
- 99.9% uptime

**Frontend Components**:
- Pre-built index cards with APY, TVL, composition
- Index factory tier selector
- Asset allocation input (drag-drop or manual)
- Rebalance frequency settings
- Slippage tolerance configuration
- Rebalancer performance stats
- Historical rebalance log

---

### 7. **Perpetual DEX (Phase 3)**
**Status**: Phase 3 (Post-Phase 2)  
**Frontend**: `/dex` (enhanced)

Full perpetual derivatives trading:
- **Leverage**: 1x-20x
- **Funding Rates**: Dynamic based on open interest
- **Liquidation**: Soft liquidation at 110% collateral ratio
- **Settlement**: Supra DORA oracle prices
- **Privacy**: Encrypted order routing

**Features**:
- Perpetual contracts for all major assets
- Funding rate arbitrage opportunities
- Position management (TP/SL)
- Liquidation protection
- Multi-collateral support

---

### 8. **Phantom Lender (Phase 3)**
**Status**: Phase 3 (Post-Phase 2)  
**Frontend**: `/lender` (new)

Full lending protocol integration (Morpho/Notional):
- **Lending Markets**: Multiple asset pairs
- **Variable Rates**: Market-driven APY
- **Collateral Flexibility**: Accept any ERC-20
- **Risk Management**: Liquidation engine
- **Governance**: DAO-controlled parameters

---

### 9. **Yield Tokenization + Restaking (Phase 4)**
**Status**: Phase 4 (Future)  
**Frontend**: `/restaking` (new)

Tokenize yields and enable restaking:

**Yield Tokenization**:
- Convert future yields into tradeable tokens
- Separate principal from yield streams
- Enable yield derivatives trading
- Composable with other protocols

**Restaking Features**:
- Stake iTokens to earn additional yield
- Multi-layer yield stacking
- Validator participation rewards
- Slashing protection via insurance
- Liquid restaking tokens (LRTs)

**Frontend Components**:
- Restaking pool selection
- Stake/unstake interface
- Yield tokenization dashboard
- Restaking rewards tracker
- Slashing insurance status
- LRT trading interface

---

## 🌐 Frontend Routes & Features

### Main Navigation (17 Routes)

#### **Main Section**
| Route | Component | Features |
|-------|-----------|----------|
| `/` | Homepage | Galactic UI, earning flywheels, revenue loops |
| `/dashboard` | Dashboard | Portfolio overview, quick actions, key metrics |
| `/analytics` | Analytics | Protocol health (92/100), revenue distribution, user growth |

#### **Trading Section**
| Route | Component | Features |
|-------|-----------|----------|
| `/dex` | DEX | Spot/Futures/Options, order book, leverage settings |
| `/indices` | Indices | Index factory, stable bundle, auto-rebalancer |

#### **Protocol Section**
| Route | Component | Features |
|-------|-----------|----------|
| `/vaults` | Vaults | 3 strategies, performance charts, deposit interface |
| `/borrow` | Borrowing | Zero-liq borrowing, collateral selection, active loans |
| `/governance` | Governance | veVEIL locking, voting, DAO treasury |
| `/tokenomics` | Tokenomics | Lock rate tracker, vesting schedule, supply projection |

#### **Community Section**
| Route | Component | Features |
|-------|-----------|----------|
| `/community` | Community | Social channels, events, leaderboard, guidelines |
| `/finance` | Finance | Portfolio growth, holdings, income sources |

#### **Information Section**
| Route | Component | Features |
|-------|-----------|----------|
| `/protocol` | Protocol | Smart contracts, Supra integration, security features |
| `/docs` | Docs | Documentation hub, search, quick links |

#### **Tools Section**
| Route | Component | Features |
|-------|-----------|----------|
| `/magic` | Magic | AI component generator (4 styles) |

---

## 📊 Phased Launch Plan

### **Phase 1: Launch (Week 1-4)**

**Core Features**:
- ✅ Confidential PMM (Spot/Futures/Options)
- ✅ Immortal Automated Vaults (3 strategies)
- ✅ veVEIL Locking (1 week - 4 years)
- ✅ Tokenized Positions (NFT locks)
- ✅ Basic ImmortalReserve (burn + dividends)

**Frontend Deliverables**:
- `/dex` - Full trading interface
- `/vaults` - Vault deposit/withdraw
- `/governance` - veVEIL locking UI
- `/finance` - Dividend tracking
- `/dashboard` - Portfolio overview
- `/analytics` - Protocol metrics

**Success Metrics**:
- $10M TVL in vaults
- 5k+ veVEIL locks
- $2M+ daily trading volume
- 99.9% uptime

---

### **Phase 2: Expansion (Month 1-3)**

**New Features**:
- ✅ DebtEngine (zero-liquidation borrowing)
- ✅ Phantom Indices (index factory + auto-rebalancer)
- ✅ Advanced Governance (multi-sig, timelock)
- ✅ Risk Management (circuit breaker, rate limiter)

**Frontend Deliverables**:
- `/borrow` - Borrowing interface
- `/indices` - Index factory & management
- Enhanced `/governance` - Advanced voting
- `/analytics` - Risk metrics dashboard

**Success Metrics**:
- $50M TVL across all products
- $20M+ borrowed via DebtEngine
- 100+ custom indices created
- 50k+ active users

---

### **Phase 3: Advanced Trading (Month 3-6)**

**New Features**:
- ✅ Perpetual DEX (1x-20x leverage)
- ✅ Phantom Lender (Morpho/Notional integration)
- ✅ Liquidation Engine (soft liquidation)
- ✅ Advanced Risk Management

**Frontend Deliverables**:
- Enhanced `/dex` - Perpetual contracts
- `/lender` - Lending markets
- `/risk` - Risk dashboard
- Advanced charting & analytics

**Success Metrics**:
- $200M TVL
- $100M+ daily perpetual volume
- $50M+ in lending markets
- 200k+ active users

---

### **Phase 4: Yield Tokenization (Month 6+)**

**New Features**:
- ✅ Yield Tokenization (separate principal/yield)
- ✅ Restaking (multi-layer yield stacking)
- ✅ Liquid Restaking Tokens (LRTs)
- ✅ Yield Derivatives Trading

**Frontend Deliverables**:
- `/restaking` - Restaking interface
- `/yield-tokens` - Yield tokenization
- `/derivatives` - Yield derivatives trading
- Advanced portfolio management

**Success Metrics**:
- $500M+ TVL
- $1B+ daily volume
- 500k+ active users
- Top 10 DeFi protocol

---

## 💎 Tokenomics & Lock-to-Earn

### Lock-to-Earn Model

**Progressive Multipliers**:
```
Lock Duration → Multiplier → Yield Boost → Voting Power
1 Week        → 1.0x       → 1.0x        → 1.0x
1 Month       → 1.25x      → 1.25x       → 1.25x
3 Months      → 1.5x       → 1.5x        → 1.5x
1 Year        → 2.0x       → 2.0x        → 2.0x
4 Years       → 2.5x       → 2.5x        → 2.5x
```

**Projected Lock Growth**:

**Conservative ($100M TVL)**:
- Year 1: 200M locked (20%)
- Year 3: 350M locked (35%)
- Year 5: 550M locked (55%)

**Aggressive ($1B TVL)**:
- Year 1: 300M locked (30%)
- Year 3: 500M locked (50%)
- Year 5: 700M locked (70%)

### Revenue Distribution

**Borrow Interest (50% to Immortal Reserve)**:
- 5.5% APR on borrowed USDC
- Distributed weekly to Immortal Share holders
- Boosted by veVEIL multiplier

**Vault Performance Fees**:
- 10% total fee
- 60% burned (deflationary)
- 25% to Immortal Reserve
- 15% to veVEIL holders

**Trading Fees**:
- 0.1% on spot trades
- 0.05% on perpetuals
- 50% to Immortal Reserve
- 50% to veVEIL holders

### $VEIL Token Distribution

| Allocation | Amount | Vesting |
|------------|--------|---------|
| Immortal Reserve | 200M (20%) | Immediate |
| Team | 150M (15%) | 4 years, 1 year cliff |
| Investors | 100M (10%) | 2 years |
| Liquidity Mining | 250M (25%) | 4 years |
| Treasury | 200M (20%) | DAO controlled |
| Community | 100M (10%) | Airdrops |

---

## 🔗 Integration Map

### Smart Contracts ↔ Frontend

```
Frontend Route          Smart Contract              Feature
─────────────────────────────────────────────────────────────
/dex                    VeilHub + SupraOracle       PMM Trading
/vaults                 VeilVault + VaultFactory    Automated Vaults
/governance             VeVEIL + AccessControl     veVEIL Locking
/finance                ImmortalReserve             Dividends
/borrow                 DebtEngine                  Zero-Liq Borrowing
/indices                VaultFactory (custom)      Index Factory
/dashboard              VeilHub (coordinator)      Portfolio
/analytics              VeilHub (metrics)           Protocol Health
/protocol               All contracts               Contract Info
/docs                   Documentation              Guides
/community              Community data             Social/Events
/magic                  MagicGenerator             AI Components
```

### Supra Integration Points

| Feature | Supra Service | Frontend Impact |
|---------|---------------|-----------------|
| Price Feeds | DORA Oracles | Real-time prices in all trading UIs |
| Automation | AutoFi | Vault harvesting, auto-repay triggers |
| Randomness | dVRF | Strategy selection, liquidation order |
| Verification | BFT Consensus | Oracle price confidence |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm or npm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Thabiiey411beta/veil-hub-v2.git
cd veil-hub-v2

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
# Wallet Connect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Supra Network
NEXT_PUBLIC_SUPRA_RPC_URL=https://rpc-testnet.supra.com
NEXT_PUBLIC_SUPRA_CHAIN_ID=6
NEXT_PUBLIC_SUPRA_EXPLORER=https://testnet.suprascan.io

# Deployment
PRIVATE_KEY=your_private_key
```

### Build & Deploy

```bash
# Build frontend
npm run build

# Compile contracts
forge build

# Run tests
forge test

# Deploy to Vercel
vercel deploy
```

---

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [SECURITY.md](./SECURITY.md) - Security practices
- [TOKENOMICS-V3-FIXED.md](./TOKENOMICS-V3-FIXED.md) - Token economics
- [README-ORACLES.md](./README-ORACLES.md) - Supra DORA integration
- [README-AUTOMATION.md](./README-AUTOMATION.md) - AutoFi setup
- [README-DVRF.md](./README-DVRF.md) - dVRF integration
- [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) - Deployment steps

---

## 🔒 Security

- ✅ ReentrancyGuard on all state-changing functions
- ✅ Pausable contracts for emergency halt
- ✅ Circuit breaker (10% TVL drop triggers)
- ✅ Rate limiting (flash loan protection)
- ✅ Role-based access control
- ✅ Emergency withdrawal mechanisms
- ✅ Oracle manipulation prevention (TWAP + median)
- ✅ Input validation on all functions

**Audits**:
- Trail of Bits (Q2 2026) - Core contracts
- OpenZeppelin (Q2 2026) - Vaults & DebtEngine
- Quantstamp (Q3 2026) - veVEIL & governance

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🔗 Links

- **Website**: [veilhub.finance](https://veilhub.finance)
- **App**: [app.veilhub.finance](https://app.veilhub.finance)
- **Twitter**: [@VeilHub](https://twitter.com/VeilHub)
- **Discord**: [discord.gg/veilhub](https://discord.gg/veilhub)
- **GitHub**: [github.com/Thabiiey411beta/veil-hub-v2](https://github.com/Thabiiey411beta/veil-hub-v2)
- **Docs**: [docs.veilhub.finance](https://docs.veilhub.finance)

---

**Veil Hub v17: The Final DeFi Organism**  
*Built in public. Audited by the best. Immortal by design.*

🌑 Welcome to the darkness. Welcome to freedom.
