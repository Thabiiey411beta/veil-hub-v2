# Veil Hub v14 - Architecture Documentation

## 📁 Folder Structure

```
veil-hub-v2/
├── app/                          # Next.js 14 App Router
│   ├── docs/                     # Documentation pages
│   ├── governance/               # Governance UI
│   ├── protocol/                 # Protocol overview
│   ├── vaults/                   # Vaults dashboard
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── PremiumLanding.tsx        # Landing component
│   └── providers.tsx             # Web3 providers
│
├── components/                   # React components
│   ├── ConnectWallet.tsx         # Wallet connection
│   ├── PriceWidget.tsx           # Real-time prices
│   └── TechnicalIndicators.tsx   # Trading signals
│
├── config/                       # Configuration
│   ├── supra-addresses.json      # Oracle addresses
│   └── wagmi.ts                  # Web3 config
│
├── lib/                          # Utilities
│   └── supra-websocket.ts        # WebSocket client
│
├── src/                          # Smart contracts
│   ├── core/                     # Core protocol
│   │   ├── AccessControl.sol     # Role-based access
│   │   ├── DebtEngine.sol        # Borrowing engine
│   │   ├── ImmortalReserve.sol   # Dividend reserve
│   │   ├── SupraOracle.sol       # Price feeds
│   │   ├── SupraVRF.sol          # Randomness
│   │   ├── VaultFactory.sol      # Vault creation
│   │   ├── VeilHub.sol           # Main coordinator
│   │   └── VeilVault.sol         # ERC-4626 vault
│   │
│   ├── interfaces/               # Contract interfaces
│   │   ├── IDebtEngine.sol
│   │   └── IImmortalReserve.sol
│   │
│   ├── libraries/                # Shared libraries
│   │   └── SafeMath.sol          # Math utilities
│   │
│   ├── security/                 # Security modules
│   │   ├── CircuitBreaker.sol    # Emergency halt
│   │   └── RateLimiter.sol       # Anti-abuse
│   │
│   ├── periphery/                # Automation
│   │   ├── AutomationKeeper.sol  # Solidity keeper
│   │   ├── veil_automation.move  # Supra AutoFi
│   │   ├── veil_dvrf.move        # dVRF integration
│   │   └── veil_indicators.move  # Technical analysis
│   │
│   └── tokens/                   # Token contracts
│       └── VeilToken.sol         # $VEIL token
│
├── script/                       # Deployment scripts
│   ├── create-veil-index.sh
│   ├── deploy-automation.sh
│   ├── Deploy.s.sol
│   ├── setup-dvrf-subscription.sh
│   └── setup-dvrf-v3.sh
│
└── test/                         # Test suite
```

## 🔐 Security Architecture

### 1. Access Control
- **Role-Based**: Admin, Keeper, Vault, Oracle roles
- **Multi-sig**: Owner operations require multi-sig
- **Timelock**: Critical changes have 48h delay

### 2. Circuit Breaker
- **TVL Drop Detection**: Halts if >10% TVL drop in 1 hour
- **Manual Override**: Admin can reset after investigation
- **Gradual Resume**: Phased restart after circuit trip

### 3. Rate Limiting
- **Per-User Limits**: Prevents flash loan attacks
- **Time Windows**: Rolling 24h windows
- **Action-Specific**: Different limits for deposit/withdraw/borrow

### 4. Emergency Controls
- **Pausable**: All user-facing functions can pause
- **Emergency Withdraw**: Users can exit during shutdown
- **Oracle Fallback**: Secondary price feeds if primary fails

## 🏛️ Protocol Mechanism

### Debt Engine (Zero-Liquidation Borrowing)
```
User Flow:
1. Deposit collateral (BTC/ETH/LINK)
2. Borrow USDC at 5.5% fixed APR
3. Maintain 180% collateral ratio
4. Auto-repay triggers at 120% ratio
5. Close position anytime

Interest Distribution:
- 70% → Immortal Reserve
- 20% → veVEIL holders
- 10% → Treasury
```

### Immortal Reserve (Perpetual Dividends)
```
Mechanism:
1. Burn $VEIL → Receive Immortal Shares (1:1)
2. Shares earn USDC dividends weekly
3. Revenue sources:
   - Vault performance fees (30%)
   - Borrow interest (70%)
   - LP VACUUM profits (40%)

APY Calculation:
- Base: 12-15% from protocol fees
- Boosted: 20-25% with LP VACUUM
- Compounding: Auto-reinvest option
```

### Vault System (ERC-4626)
```
Performance Fees (10%):
- 50% → Burned (deflationary)
- 30% → Immortal Reserve
- 20% → veVEIL holders

Harvest Automation:
- Triggered by Supra AutoFi
- Conditions: 7 days + bullish signals
- Multi-timeframe confirmation
```

### Oracle Integration
```
Supra DORA Pull Oracle:
- Sub-second latency
- BFT consensus (>90% validators)
- Pair IDs: BTC=0, ETH=1, LINK=2
- Fallback: Time-weighted average

Price Validation:
- Max 5% deviation from TWAP
- Stale price rejection (>60s)
- Multi-oracle aggregation
```

## 🔄 Automation Flow

```
Supra AutoFi → veil_automation.move
                    ↓
            Check Conditions:
            - Time elapsed (7 days)
            - Market bullish (indicators)
            - Multi-timeframe confirm
                    ↓
            Execute Action:
            - Harvest vaults
            - Auto-repay at-risk positions
            - Rebalance reserves
                    ↓
            Distribute Fees:
            - Performance fees
            - Interest payments
            - LP VACUUM profits
```

## 🛡️ Security Enhancements

### 1. Input Validation
- All amounts > 0
- Address != address(0)
- Collateral ratio checks
- Price staleness checks

### 2. Reentrancy Protection
- ReentrancyGuard on all state-changing functions
- Checks-Effects-Interactions pattern
- No external calls before state updates

### 3. Integer Overflow Protection
- Solidity 0.8.24 built-in checks
- SafeMath library for complex calculations
- Explicit bounds checking

### 4. Oracle Manipulation Prevention
- TWAP fallback
- Multi-oracle aggregation
- Deviation limits
- Staleness checks

### 5. Flash Loan Protection
- Rate limiting per user
- Minimum holding periods
- Same-block deposit/withdraw prevention

## 📊 Gas Optimization

- Packed structs for storage efficiency
- Batch operations where possible
- View functions for read-only data
- Event emission for off-chain indexing
- Minimal storage writes

## 🚀 Deployment Checklist

- [ ] Deploy VeilToken
- [ ] Deploy ImmortalReserve
- [ ] Deploy DebtEngine
- [ ] Deploy VaultFactory
- [ ] Deploy SupraOracle
- [ ] Deploy SupraVRF
- [ ] Deploy VeilHub (coordinator)
- [ ] Initialize all contracts
- [ ] Set up role-based access
- [ ] Configure rate limits
- [ ] Deploy Move modules (automation)
- [ ] Register AutoFi tasks
- [ ] Fund dVRF subscription
- [ ] Verify all contracts
- [ ] Run security audit
- [ ] Launch bug bounty

## 📝 Testing Strategy

- Unit tests for each contract
- Integration tests for protocol flow
- Fuzzing for edge cases
- Formal verification for critical functions
- Mainnet fork testing
- Stress testing with high TVL
- Circuit breaker simulation
- Oracle failure scenarios
