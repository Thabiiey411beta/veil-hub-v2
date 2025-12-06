# 🚀 Veil Hub v14 - Testnet Deployment Guide

## 📋 Prerequisites

### 1. Get Testnet Funds

**Deployer Address:**
```
0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915
```

**Faucet Options:**

1. **Supra Official Faucet**
   - URL: https://faucet.supra.com
   - Amount: 10 SUPRA per request
   - Cooldown: 24 hours

2. **Alternative: Bridge from Ethereum Sepolia**
   - Bridge: https://bridge.supra.com
   - Bridge testnet ETH → Supra testnet

3. **Discord Faucet**
   - Join: https://discord.gg/supra
   - Channel: #testnet-faucet
   - Command: `/faucet 0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915`

## 🔧 Deployment Steps

### Option 1: Automated Deployment (Recommended)

```bash
# 1. Fund the deployer address (see above)

# 2. Run deployment script
chmod +x deploy-complete.sh
./deploy-complete.sh
```

### Option 2: Manual Deployment

```bash
# 1. Install dependencies
npm install ethers@6

# 2. Fund deployer address

# 3. Deploy contracts
node deploy-testnet-simple.js

# 4. Check deployment
cat deployment-addresses.json
```

### Option 3: Foundry Deployment

```bash
# 1. Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# 2. Install dependencies
forge install OpenZeppelin/openzeppelin-contracts

# 3. Deploy
forge script script/DeployAll.s.sol:DeployAll \
  --rpc-url https://rpc-testnet.supra.com \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

## 📦 Contracts to Deploy

### Core Contracts
1. **VeilToken** - $VEIL ERC20 token
2. **MockUSDC** - Test USDC for testnet
3. **ImmortalReserve** - Dividend distribution
4. **DebtEngine** - Zero-liquidation borrowing
5. **VaultFactory** - Vault creation
6. **SupraOracle** - Price feeds
7. **VeilVRF** - Randomness
8. **VeilHub** - Main coordinator

### Security Contracts
9. **AccessControl** - Role-based permissions
10. **CircuitBreaker** - Emergency halt (integrated in VeilHub)

## 🔑 Deployment Addresses

After deployment, update `.env`:

```env
# Deployed Contracts
NEXT_PUBLIC_VEIL_TOKEN_ADDRESS=<VeilToken address>
NEXT_PUBLIC_USDC_ADDRESS=<MockUSDC address>
NEXT_PUBLIC_IMMORTAL_RESERVE_ADDRESS=<ImmortalReserve address>
NEXT_PUBLIC_DEBT_ENGINE_ADDRESS=<DebtEngine address>
NEXT_PUBLIC_VAULT_FACTORY_ADDRESS=<VaultFactory address>
NEXT_PUBLIC_SUPRA_ORACLE_ADDRESS=<SupraOracle address>
NEXT_PUBLIC_VEIL_VRF_ADDRESS=<VeilVRF address>
NEXT_PUBLIC_VEIL_HUB_ADDRESS=<VeilHub address>
```

## 💰 Funding Contracts

After deployment, fund these contracts:

```bash
# 1. Fund DebtEngine with USDC (for borrowing)
# Transfer 1,000,000 USDC to DebtEngine

# 2. Fund ImmortalReserve with USDC (for dividends)
# Transfer 500,000 USDC to ImmortalReserve

# 3. Fund VeilVRF with SUPRA (for randomness)
# Send 1 SUPRA to VeilVRF contract

# 4. Distribute VEIL tokens
# Transfer 100,000 VEIL to deployer for testing
```

## ✅ Post-Deployment Checklist

- [ ] All contracts deployed successfully
- [ ] Deployment addresses saved to `deployment-addresses.json`
- [ ] `.env` updated with contract addresses
- [ ] DebtEngine funded with 1M USDC
- [ ] ImmortalReserve funded with 500K USDC
- [ ] VeilVRF funded with 1 SUPRA
- [ ] Collateral added to DebtEngine (VEIL)
- [ ] Price set for VEIL ($1)
- [ ] VeilHub initialized with all addresses
- [ ] Contracts verified on SupraScan
- [ ] Frontend tested with deployed contracts

## 🔍 Verification

Verify contracts on SupraScan:

```bash
# Visit: https://testnet.suprascan.io
# Search for each contract address
# Click "Verify & Publish"
# Upload source code and constructor args
```

## 🧪 Testing

```bash
# 1. Start frontend
npm run dev

# 2. Connect wallet to Supra Testnet
# Network: Supra L1 Testnet
# Chain ID: 9999
# RPC: https://rpc-testnet.supra.com

# 3. Test features:
# - Connect wallet
# - View vaults
# - Open borrow position
# - Burn VEIL for Immortal Shares
# - Claim dividends
```

## 📊 Monitoring

Monitor deployed contracts:

1. **SupraScan Explorer**
   - https://testnet.suprascan.io
   - View transactions, events, balances

2. **Supra DORA Oracle**
   - Check price feeds
   - Monitor oracle updates

3. **Contract Events**
   - PositionOpened
   - VeilBurned
   - DividendsClaimed
   - Harvested

## 🐛 Troubleshooting

### Issue: Insufficient funds
**Solution:** Request more from faucet or bridge from Sepolia

### Issue: Transaction reverts
**Solution:** Check gas limit, increase to 5M gas

### Issue: Oracle not updating
**Solution:** Verify Supra Oracle address is correct

### Issue: VRF callback fails
**Solution:** Ensure VeilVRF has sufficient SUPRA balance

## 📞 Support

- **Discord:** https://discord.gg/veilhub
- **Twitter:** @VeilHub
- **Docs:** https://docs.veilhub.finance
- **GitHub:** https://github.com/veil-hub/veil-hub-v14

## 🎯 Next Steps

1. ✅ Deploy to testnet
2. ⏳ Test all features
3. ⏳ Run security audit
4. ⏳ Deploy to mainnet
5. ⏳ Launch bug bounty

---

**Current Status:** ⏳ Waiting for testnet funds

**Deployer Address:** `0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915`

**Get Funds:** https://faucet.supra.com
