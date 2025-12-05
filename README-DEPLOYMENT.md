# 🚀 SupraEVM Deployment Guide

## Prerequisites

1. **Starkey Wallet**: Download from [supra.com](https://supra.com)
2. **SUPRA Tokens**: For gas fees on SupraEVM
3. **Private Key**: Export from your wallet

## Quick Deploy

```bash
# Install dependencies
npm install

# Set your private key
export PRIVATE_KEY="your_private_key_here"

# Compile contracts
npm run compile

# Deploy to SupraEVM Mainnet
npm run deploy:supra

# Deploy to SupraEVM Testnet (for testing)
npm run deploy:dev
```

## Your Treasury Wallet
**Address**: `0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915`

This wallet will receive:
- Protocol treasury funds
- Performance fees
- Governance control

## SupraEVM Features Used

- **Native Account Abstraction**: Gasless transactions
- **Confidential Computing**: MEV protection
- **HyperNova Bridge**: Cross-chain swaps
- **DORA Oracles**: Sub-second price feeds

## Starkey Wallet Integration

The dApp supports Starkey wallet as the primary wallet for SupraEVM:
- Auto-detects Starkey extension
- Optimized for SupraEVM features
- Native SUPRA token support

## Post-Deployment

1. Update `.env` with deployed contract addresses
2. Verify contracts on SupraScan
3. Initialize protocol parameters
4. Set up oracle price feeds

## Network Details

- **Chain ID**: 1
- **RPC**: https://rpc-mainnet.supra.com
- **Explorer**: https://suprascan.io
- **Native Token**: SUPRA