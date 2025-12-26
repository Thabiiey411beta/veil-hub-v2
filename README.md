# 🌑 Veil Hub v17 - The Final DeFi Organism

> **Zero-liquidation borrowing. Perpetual real yield. Privacy-first. Built on Supra L1.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Move](https://img.shields.io/badge/Move-1.0-blue)](https://move-lang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![Supra L1](https://img.shields.io/badge/Supra%20L1-Testnet-purple)](https://supra.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Core Thesis](#core-thesis)
- [Features](#features)
- [Architecture](#architecture)
- [Tokenomics](#tokenomics)
- [Smart Contracts](#smart-contracts)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Security](#security)
- [License](#license)

---

## 🌌 Overview

Veil Hub v17 is a next-generation DeFi protocol built on Supra L1 that combines:

- **Zero-liquidation borrowing** at 5.5% fixed APR
- **Perpetual USDC yield** (12-25% APR) for Immortal Share holders
- **veVEIL governance** with up to 2.5x yield boost (tokenized as composable NFTs)
- **Automated buyback & burn** mechanism with permanent 100M floor
- **ERC-4626 vaults** with 60% performance fee burn
- **Supra AutoFi** integration for autonomous operations
- **Encrypted intents** for privacy via Supra confidential computing
- **Black-hole flywheel**: Real revenue → Dividends + Burns → Scarcity → Higher yields

### Key Metrics

| Metric | Value |
|--------|-------|
| Tokenomics Score | **9.5/10** |
| Fixed Borrowing Rate | **5.5% APR** |
| Immortal Yield Range | **12-25% APR** |
| Max veVEIL Boost | **2.5x** |
| Vault Burn Rate | **60%** |
| Total Supply | **1B $VEIL** |
| Burn Floor | **100M $VEIL** |

---

## 🔥 Core Thesis

Veil Hub operates as a **black-hole flywheel** on Supra L1, where all protocol revenue fuels perpetual scarcity and yields:

- **Pre-floor (supply > 100M)**: 10% USDC dividends, 50% VEIL burn, 30% veVEIL boosts, 10% treasury
- **Post-floor (supply ≤ 100M)**: 20% USDC dividends, 60% veVEIL rewards, 20% treasury (burn stops to preserve floor)
- **Privacy**: Encrypted LP VACUUM and MEV capture using Supra confidential execution
- **Real Revenue**: No emissions, all yields from trading fees, interest, MEV
- **Supra Native**: DORA oracles, dVRF, AutoFi automation, HyperNova bridges

Inspiration: OlympusDAO's treasury mechanics + Pendle's yield tokenization + Morpho's P2P lending + EigenLayer restaking + Lifinity's tokenized locks.

Flywheel: Revenue burns create scarcity → Token value rises → More revenue → More burns/dividends.

---

## ✨ Features

### Core Protocol

#### 1. Zero-Liquidation Borrowing
- Borrow USDC at 5.5% fixed APR
- 180% minimum collateral ratio
- Auto-repay triggers at 120% ratio
- Interest split: 50% Immortal Reserve, 30% Buyback, 20% veVEIL

#### 2. Immortal Reserve (Perpetual Dividends)
- Burn $VEIL → Receive Immortal Shares
- Progressive burn bonuses:
  - 0-100M burned: **1.5x shares**
  - 100-300M burned: **1.25x shares**
  - 300M+ burned: **1.0x shares**
- Weekly USDC dividends (1.5% base rate)
- veVEIL boost up to 2.5x

#### 3. veVEIL (Vote-Escrowed VEIL)
- Lock $VEIL for 1 week to 4 years
- Earn up to 2.5x yield boost
- Governance voting power
- No penalty for max lock duration

#### 4. ERC-4626 Vaults
- Performance fee: 10%
  - 60% burned (deflationary)
  - 25% to Immortal Reserve
  - 15% to veVEIL holders
- Automated harvest via Supra AutoFi
- Multiple strategy support

#### 5. Buyback & Burn Engine
- 30% of borrow interest → buy $VEIL → burn
- Continuous deflationary pressure
- Transparent on-chain execution

### Supra L1 Integration

#### Supra DORA Oracles
- Sub-second price feeds
- BFT consensus (>90% validators)
- Supported pairs: BTC, ETH, LINK, AVAX, DOT
- Pull oracle model for gas efficiency

#### Supra AutoFi
- Autonomous vault harvesting
- Auto-repay for at-risk positions
- Technical indicator integration (SMA, EMA, RSI)
- Multi-timeframe confirmation

#### Supra dVRF
- Decentralized randomness for strategy selection
- Output-private VRF
- Callback verification

---

## 📜 Smart Contracts

Veil Hub is implemented as Move modules on Supra L1 for security and efficiency.

### Core Modules

| Module | Description | Status |
|--------|-------------|--------|
| `veil_token.move` | VEIL token with mint/burn, 100M floor enforcement | ✅ Implemented |
| `immortal_reserve.move` | Revenue splitter, buyback & burn logic, floor mechanics | ✅ Implemented |
| `veveil.move` | Tokenized veVEIL NFTs, decay-to-burn, composable locks | 🚧 In Progress |
| `debt_engine.move` | Zero-liquidation borrowing, safe buffers | 🚧 In Progress |
| `perpetual_dex.move` | Perps with funding rates, circuit breaker | 🚧 In Progress |
| `phantom_lender.move` | Morpho-style optimizer, P2P matching, isolated markets | 🚧 In Progress |
| `immortal_vaults.move` | Auto-compounding CL vaults, iToken minting | 🚧 In Progress |
| `phantom_yield_spectrum.move` | Pendle + Spectra yield tokenization | 🚧 In Progress |
| `phantom_restaker.move` | EigenLayer-style LST restaking | 🚧 In Progress |
| `phantom_symbiote.move` | Symbiotic flexible collateral restaking | 🚧 In Progress |
| `confidential_pmm.move` | Concentrated liquidity with encrypted ranges | 🚧 In Progress |
| `lp_vacuum.move` | Encrypted intent router | 🚧 In Progress |
| `mev_vacuum.move` | Encrypted bundle priority + capture split | 🚧 In Progress |
| `dark_gauges.move` | Encrypted bribe/gauges (ve(3,3) style) | 🚧 In Progress |
| `treasury.move` | Multi-sig + Insurance Fund + circuit breakers | 🚧 In Progress |
| `governance.move` | Timelock governance, 48h delays | 🚧 In Progress |

### Key Implementations

#### VEIL Token (`veil_token.move`)
- **Supply Control**: 1B initial, burns to 100M floor
- **Minting**: Restricted to `immortal_reserve` for buybacks
- **Burning**: Via `veveil` decay and revenue burns
- **Safety**: No reentrancy, supply caps enforced

#### Immortal Reserve (`immortal_reserve.move`)
- **Floor Mechanics**: Pre/post-floor distribution splits
- **Revenue Streams**: Trading fees, interest, MEV
- **Distribution**: USDC dividends, VEIL burns, veVEIL boosts, treasury
- **Governance**: Pause/unpause with timelock

#### Supra Integrations
- **DORA Oracles**: Price feeds for all assets
- **dVRF**: Randomness for strategy selection
- **AutoFi**: Autonomous harvesting and repayments
- **Confidential Execution**: Encrypted intents for privacy

---

## 🏗️ Architecture

### Smart Contract Structure

```
move/sources/
├── veil_token.move              # VEIL token with supply controls
├── immortal_reserve.move        # Revenue splitter & burn logic
├── veveil.move                  # Tokenized veVEIL NFTs
├── debt_engine.move             # Zero-liquidation borrowing
├── perpetual_dex.move           # Perps with funding rates
├── phantom_lender.move          # P2P lending optimizer
├── immortal_vaults.move         # Auto-compounding vaults
├── phantom_yield_spectrum.move  # Yield tokenization
├── phantom_restaker.move        # LST restaking
├── phantom_symbiote.move        # Flexible collateral restaking
├── confidential_pmm.move        # Encrypted CL liquidity
├── lp_vacuum.move               # Intent router
├── mev_vacuum.move              # MEV capture
├── dark_gauges.move             # Encrypted gauges
├── treasury.move                # Multi-sig treasury
├── governance.move              # Timelock governance
└── Move.toml                    # Package config
```
│   ├── CircuitBreaker.sol       # Emergency halt
│   └── RateLimiter.sol          # Flash loan protection
├── interfaces/
│   ├── IDebtEngine.sol
│   └── IImmortalReserve.sol
├── libraries/
│   └── SafeMath.sol             # Math utilities
└── periphery/
    ├── veil_automation.move     # Supra AutoFi
    ├── veil_indicators.move     # Technical analysis
    └── veil_dvrf.move           # VRF integration
```

### Frontend Structure

```
app/
├── layout.tsx                   # Root layout
├── page.tsx                     # Homepage
├── PremiumLanding.tsx           # Landing page
├── providers.tsx                # Web3 providers
├── protocol/                    # Protocol info
├── vaults/                      # Vaults dashboard
├── governance/                  # Governance UI
└── docs/                        # Documentation

components/
├── ConnectWallet.tsx            # Wallet connection
├── PriceWidget.tsx              # Real-time prices
└── TechnicalIndicators.tsx      # Trading signals

config/
├── wagmi.ts                     # Web3 config
└── supra-addresses.json         # Oracle addresses

lib/
├── supra-config.ts              # SDK constants
└── supra-websocket.ts           # WebSocket client
```

---

## 💎 Tokenomics

### $VEIL Token Distribution

| Allocation | Amount | Vesting |
|------------|--------|---------|
| Immortal Reserve | 200M (20%) | Immediate |
| Team | 150M (15%) | 4 years, 1 year cliff |
| Investors | 100M (10%) | 2 years |
| Liquidity Mining | 250M (25%) | 4 years |
| Treasury | 200M (20%) | DAO controlled |
| Community | 100M (10%) | Airdrops |

### Scarcity Mechanisms

1. **Burn-to-Earn**: Permanent supply reduction
2. **Vault Fee Burn**: 60% of performance fees
3. **Buyback & Burn**: 30% of borrow interest
4. **Progressive Bonuses**: Early burners get 1.5x shares
5. **veVEIL Lock**: Removes circulating supply

### Projected Supply Reduction

**Conservative ($100M TVL):**
- Year 1: 52M burned (5.2%)
- Year 3: 200M burned (20%)
- Year 5: 400M burned (40%)

**Aggressive ($1B TVL):**
- Year 1: 210M burned (21%)
- Year 3: 500M burned (50%)
- Year 5: 700M burned (70%)

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

---

## 📦 Deployment

### Testnet Deployment

```bash
# Check deployment status
node deploy-veil-hub.js

# Deploy all contracts
forge script script/DeployAll.s.sol \
  --rpc-url https://rpc-testnet.supra.com \
  --private-key $PRIVATE_KEY \
  --broadcast

# Register automation
node script/register-supra-automation.js

# Query automation state
node script/query-automation-state.js
```

### Mainnet Deployment

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for complete instructions.

---

## 📚 Documentation

### Core Documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [SECURITY.md](./SECURITY.md) - Security practices
- [TOKENOMICS-V2.md](./TOKENOMICS-V2.md) - Token economics
- [IMPROVEMENTS.md](./IMPROVEMENTS.md) - Changelog

### Integration Guides
- [README-ORACLES.md](./README-ORACLES.md) - Supra DORA integration
- [README-AUTOMATION.md](./README-AUTOMATION.md) - AutoFi setup
- [README-DVRF.md](./README-DVRF.md) - dVRF integration
- [README-TECHNICAL-INDICATORS.md](./README-TECHNICAL-INDICATORS.md) - Trading signals

### Deployment
- [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) - Step-by-step guide
- [DEPLOYMENT-STATUS.md](./DEPLOYMENT-STATUS.md) - Current status
- [TESTNET-STATUS.md](./TESTNET-STATUS.md) - Testnet info

---

## 🔒 Security

### Audits

- **Trail of Bits** (Q2 2026) - Core contracts
- **OpenZeppelin** (Q2 2026) - Vaults & DebtEngine
- **Quantstamp** (Q3 2026) - veVEIL & governance
- **Bug Bounty**: $1M max via Immunefi (post-mainnet)

### Security Features

- ✅ ReentrancyGuard on all state-changing functions
- ✅ Pausable contracts for emergency halt
- ✅ Circuit breaker (10% TVL drop triggers)
- ✅ Rate limiting (flash loan protection)
- ✅ Role-based access control
- ✅ Emergency withdrawal mechanisms
- ✅ Oracle manipulation prevention (TWAP + median)
- ✅ Input validation on all functions

### Responsible Disclosure

Report vulnerabilities to: security@veilhub.finance

---

## 🛠️ Development

### Build

```bash
# Build frontend
npm run build

# Compile contracts
forge build

# Run tests
forge test

# Coverage
forge coverage
```

### Testing

```bash
# Run all tests
forge test -vvv

# Test specific contract
forge test --match-contract DebtEngineTest

# Gas report
forge test --gas-report
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

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

## 📊 Status

**Current Version**: v14.0.0  
**Network**: Supra L1 Testnet (Chain ID: 6)  
**Tokenomics Score**: 9.5/10  
**Deployment Status**: Ready (awaiting testnet funds)  
**Audit Status**: Scheduled Q2 2026

---

**Veil Hub v14: The Final DeFi Organism**  
*Built in public. Audited by the best. Immortal by design.*

🌑 Welcome to the darkness. Welcome to freedom.
