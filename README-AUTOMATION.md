# 🤖 Veil Hub Supra Automation

## Overview
Veil Hub runs **fully autonomously** on Supra L1 using native automation. No external bots or keepers required.

## Automated Functions

### 1. Auto-Harvest Yields (Weekly)
- **Trigger**: Every 7 days
- **Action**: Harvests LP VACUUM yields and distributes to Immortal Reserve
- **Gas**: ~100,000 units
- **Function**: `veil_automation::auto_harvest_yields`

### 2. Auto-Repay Debt (Block-level)
- **Trigger**: When collateral ratio < 125%
- **Action**: Repays debt from vault yields to prevent liquidation
- **Gas**: ~150,000 units
- **Function**: `veil_automation::auto_repay_debt`

## Deployment

```bash
# Make script executable
chmod +x script/deploy-automation.sh

# Deploy to Supra L1 Testnet
./script/deploy-automation.sh
```

## Monitoring

### Check Automation Stats
```bash
supra move tool view \
  --function-id '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915::veil_automation::get_automation_stats' \
  --args address:0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915 \
  --rpc-url https://rpc-testnet.supra.com
```

### View on SupraScan
Visit: https://testnet.suprascan.io/address/0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915

## How It Works

1. **Task Registration**: Tasks registered once via Supra CLI
2. **Validator Execution**: Supra validators check conditions at end of each block
3. **Automatic Execution**: When conditions met, actions execute automatically
4. **Fee Payment**: Fees deducted from protocol treasury transparently

## Benefits

- ✅ **Zero Downtime**: Runs directly in validator logic
- ✅ **No External Dependencies**: No keeper bots or relayers
- ✅ **Deterministic**: Same execution across all nodes
- ✅ **Cost Efficient**: Transparent fee structure
- ✅ **Instant**: Executes within same block as condition check

## Fee Structure

- **Registration Fee**: One-time flat fee
- **Automation Fee**: Per epoch based on gas commitment
- **Congestion Fee**: Applied when registry >80% full
- **Gas Fee**: Per execution based on actual usage

Your treasury address pays all fees automatically.