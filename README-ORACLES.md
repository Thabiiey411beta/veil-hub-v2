# 🔮 Veil Hub Supra DORA Oracle Integration

## Overview
Veil Hub uses **Supra DORA (Distributed Oracle Agreement)** for ultra-low latency, Byzantine Fault Tolerant price feeds.

## Key Features

### DORA V2 Pull Oracle
- ✅ **Sub-second latency** - Fastest oracle in DeFi
- ✅ **21 data sources** - Aggregated with BFT consensus
- ✅ **Tribe-Clan architecture** - Anti-collusion randomness
- ✅ **dVRF security** - Decentralized verifiable randomness
- ✅ **On-chain verification** - Cryptographic proof validation

## Supported Price Pairs

| Asset | Pair Index | Usage |
|-------|-----------|-------|
| ETH/USD | 0 | Collateral valuation |
| BTC/USD | 1 | Collateral valuation |
| USDC/USD | 49 | Stablecoin peg verification |

## Oracle Addresses

### Testnet
- **Pull Oracle**: `0x...` (Get from https://docs.supra.com/oracles/pull-model)

### Mainnet
- **Pull Oracle**: `0x...` (Get from https://docs.supra.com/oracles/pull-model)

## How It Works

### 1. Price Data Flow
```
Supra Nodes → Median Calculation → BFT Consensus → S-Value → On-chain Verification
```

### 2. Integration Points

**Debt Engine:**
- Collateral ratio calculations
- Liquidation threshold monitoring
- Auto-repay triggers

**LP VACUUM:**
- Asset price verification
- Yield calculations
- Rebalancing decisions

**Immortal Reserve:**
- USDC peg verification
- Dividend calculations

## Usage Example

```solidity
// Get ETH price with proof
bytes memory proof = getProofFromDORA(); // From Web2 client
(uint256 price, uint256 timestamp, uint256 round) = 
    supraOracle.getPairPrice(proof, 0); // ETH_USD

// Calculate collateral value
uint256 collateralValue = supraOracle.getCollateralValue(
    proof,
    0, // ETH_USD
    1 ether
);
```

## Web2 Client Setup

### JavaScript (Node.js)
```bash
npm install @supra/pull-oracle-client
```

```javascript
const { PullServiceClient } = require('@supra/pull-oracle-client');

const client = new PullServiceClient('https://rpc-testnet-dora-2.supra.com');
const proof = await client.getProof([0, 1, 49]); // ETH, BTC, USDC
```

### Rust
```bash
cargo add supra-pull-oracle
```

```rust
let client = PullServiceClient::new("https://rpc-testnet-dora-2.supra.com");
let proof = client.get_proof(vec![0, 1, 49]).await?;
```

## Automation Integration

Supra Automation tasks automatically fetch DORA proofs and update prices:

```bash
# Auto-update prices every block
supra move automation register \
  --function-id "veil_hub::veil_automation::auto_repay_debt" \
  --args address:USER u64:COLLATERAL_RATIO
```

## Security Features

- **Byzantine Fault Tolerance**: Tolerates up to 33% malicious nodes
- **Anti-Collusion**: dVRF randomness prevents validator collusion
- **Cryptographic Verification**: All proofs verified on-chain
- **Multi-Source Aggregation**: 21 independent data sources
- **Outlier Detection**: Abnormal values filtered before consensus

## Benefits Over Traditional Oracles

| Feature | Supra DORA | Chainlink | Pyth |
|---------|-----------|-----------|------|
| Latency | <1s | 10-60s | 1-2s |
| Data Sources | 21 | 7-15 | 70+ |
| Consensus | BFT | Median | Median |
| Anti-Collusion | dVRF | None | None |
| Native L1 | ✅ | ❌ | ❌ |

## Monitoring

### Check Oracle Status
```bash
curl https://rpc-testnet.supra.com/rpc/v2/oracle/status
```

### View Price Feed
```bash
curl https://rpc-testnet.supra.com/rpc/v2/oracle/price/0
```

## Resources

- **DORA Whitepaper**: https://supra.com/whitepapers/dora
- **Pull Oracle Docs**: https://docs.supra.com/oracles/pull-model
- **Data Feeds List**: https://docs.supra.com/oracles/data-feeds
- **Network Addresses**: https://docs.supra.com/networks