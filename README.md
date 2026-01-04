# 🌑 Veil Hub v14 - The Final DeFi Organism

> **Zero-liquidation borrowing. Perpetual real yield. Privacy-first. Built on Supra L1.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![Supra L1](https://img.shields.io/badge/Supra%20L1-Testnet-purple)](https://supra.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tokenomics](#tokenomics)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Security](#security)
- [License](#license)

---

## 🌌 Overview

Veil Hub v14 is a next-generation DeFi protocol built on Supra L1 that combines:

- **Zero-liquidation borrowing** at 5.5% fixed APR
- **Perpetual USDC yield** (12-25% APR) for Immortal Share holders
- **veVEIL governance** with up to 2.5x yield boost
- **Automated buyback & burn** mechanism
- **ERC-4626 vaults** with 60% performance fee burn
- **Supra AutoFi** integration for autonomous operations

### Key Metrics

| Metric | Value |
|--------|-------|
| Tokenomics Score | **9.5/10** |
| Fixed Borrowing Rate | **5.5% APR** |
| Immortal Yield Range | **12-25% APR** |
| Max veVEIL Boost | **2.5x** |
| Vault Burn Rate | **60%** |
| Total Supply | **1B $VEIL** |

---

## ✨ Features

### Core Protocol

#### 1. Zero-Liquidation Borrowing
- Borrow USDC at 5.5% fixed APR
- 180% minimum collateral ratio
- Auto-repay triggers at 120% ratio
- Interest split: 50% Immortal Reserve, 30% Buyback, 20% veVEIL

#### 2. Immortal Reserve (Perpetual Dividends)
- Lock $VEIL → Receive Immortal Shares
- Progressive lock bonuses:
  - 1 Week: **1.0x shares**
  - 1 Month: **1.25x shares**
  - 3 Months: **1.5x shares**
  - 1 Year: **2.0x shares**
  - 4 Years: **2.5x shares**
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

## 🏗️ Architecture

### Smart Contract Structure

```
src/
├── core/
│   ├── VeilHub.sol              # Main coordinator
│   ├── DebtEngine.sol           # Borrowing logic
│   ├── ImmortalReserve.sol      # Dividend distribution
│   ├── VeilVault.sol            # ERC-4626 vaults
│   ├── VaultFactory.sol         # Vault creation
│   ├── BuybackEngine.sol        # Automated buyback
│   ├── TokenDistribution.sol    # Vesting schedules
│   ├── SupraOracle.sol          # Price feeds
│   ├── SupraVRF.sol             # Randomness
│   └── AccessControl.sol        # Role management
├── tokens/
│   ├── VeilToken.sol            # $VEIL ERC20
│   └── VeVEIL.sol               # Vote-escrowed VEIL
├── security/
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

1. **Lock-to-Earn**: Earn yield by locking VEIL
2. **Vault Fee Burn**: 60% of performance fees
3. **Buyback & Burn**: 30% of borrow interest
4. **Progressive Bonuses**: Longer locks get higher multipliers
5. **veVEIL Lock**: Removes circulating supply

### Projected Lock Growth

**Conservative ($100M TVL):**
- Year 1: 200M locked (20%)
- Year 3: 350M locked (35%)
- Year 5: 550M locked (55%)

**Aggressive ($1B TVL):**
- Year 1: 300M locked (30%)
- Year 3: 500M locked (50%)
- Year 5: 700M locked (70%)

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
