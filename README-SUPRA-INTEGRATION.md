# Supra DORA Oracle Integration

## Overview
Veil Hub v14 uses **Supra DORA (Distributed Oracle Agreement)** for sub-second price feeds with BFT consensus.

## Contract Addresses

### Testnet (Chain ID: 9999)
- **Pull Oracle**: `0x6bf7b21145Cbd7BB0b9916E6eB24EDA8A675D7C0`
- **Storage Contract**: `0x6Cd59830AAD978446e6cc7f6cc173aF7656Fb917`
- **RPC**: `https://rpc-testnet.supra.com`

### Mainnet (Chain ID: 999)
- **Pull Oracle**: TBD (deploy after testnet validation)
- **Storage Contract**: TBD
- **RPC**: `https://rpc-mainnet.supra.com`

## Supported Price Pairs

| Pair | ID | Category |
|------|----|----|
| BTC_USDT | 0 | Supra Premium |
| ETH_USDT | 1 | Supra Premium |
| LINK_USDT | 2 | Supra Premium |
| DOGE_USDT | 3 | Supra Premium |
| AVAX_USDT | 5 | Supra Premium |

## Deployment

```bash
# Set environment variables
export PRIVATE_KEY=0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3
export RPC_URL=https://rpc-testnet.supra.com

# Deploy contracts
forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast
```

## Usage in Smart Contracts

```solidity
// Get ETH price
bytes memory proof = getProofFromSupraAPI();
(uint256 price, uint256 timestamp, uint256 round) = oracle.getPairPrice(proof, 1);

// Get collateral value
uint256 value = oracle.getCollateralValue(proof, 1, ethAmount);
```

## Features
- **Sub-second latency**: Prices updated in <1s
- **BFT consensus**: Byzantine fault tolerant
- **Pull model**: On-demand price verification
- **Derived pairs**: Convert any pair using multiplication/division
