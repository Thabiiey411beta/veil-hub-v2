# 🚀 Real Deployment Instructions

## Current Status

✅ Move modules written (5 modules)  
✅ 25 SUPRA in deployer wallet  
✅ Account active on testnet  
❌ Modules NOT deployed yet (only simulated)  
❌ AutoFi NOT active (needs deployed modules)  

## Why No Transactions?

**The modules are simulated, not actually on-chain.** AutoFi requires real deployed Move modules to execute automated tasks.

## Deploy for Real

### Option 1: Supra CLI (Recommended)

```bash
# 1. Install Supra CLI
curl -fsSL https://cli.supra.com/install.sh | bash

# 2. Navigate to move directory
cd move/

# 3. Compile modules
supra move compile

# 4. Publish to testnet
supra move publish \
  --network testnet \
  --private-key 0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3

# 5. Initialize each module
supra move run \
  --function 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e::veil_token::initialize \
  --network testnet \
  --private-key 0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3

supra move run \
  --function 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e::immortal_reserve::initialize \
  --network testnet \
  --private-key 0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3

supra move run \
  --function 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e::debt_engine::initialize \
  --network testnet \
  --private-key 0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3

supra move run \
  --function 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e::buyback_engine::initialize \
  --network testnet \
  --private-key 0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3
```

### Option 2: Supra SDK (Alternative)

The SDK requires compiled bytecode. Compile with CLI first, then use SDK to publish.

## After Deployment

### 1. Register AutoFi Tasks

```bash
node scripts/register-supra-automation.js
```

### 2. Verify Deployment

```bash
# Check modules
supra account list-modules --address 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e

# Check VEIL balance
supra account balance --address 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e
```

### 3. Test Operations

```bash
# Burn VEIL for shares
supra move run \
  --function 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e::immortal_reserve::burn_for_shares \
  --args u64:100000000000 \
  --network testnet \
  --private-key YOUR_KEY

# Lock veVEIL
supra move run \
  --function 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e::veveil::lock \
  --args u64:1000000000000 u64:126144000 \
  --network testnet \
  --private-key YOUR_KEY
```

## Deployment Checklist

- [ ] Install Supra CLI
- [ ] Compile Move modules
- [ ] Publish modules to testnet
- [ ] Initialize veil_token
- [ ] Initialize immortal_reserve
- [ ] Initialize debt_engine
- [ ] Initialize buyback_engine
- [ ] Register AutoFi tasks
- [ ] Test burn operation
- [ ] Test lock operation
- [ ] Test borrow operation
- [ ] Verify transactions on explorer

## Resources

- **Supra CLI Docs**: https://docs.supra.com/cli
- **Move Language**: https://move-language.github.io/move/
- **Testnet Explorer**: https://testnet.suprascan.io
- **Deployer Address**: 0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e

## Support

If you need help with deployment:
1. Check Supra Discord: https://discord.gg/supra
2. Review Move examples: https://github.com/Entropy-Foundation/supra-framework
3. Contact Supra support for CLI issues
