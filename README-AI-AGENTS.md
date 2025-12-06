# Supra AI Agents Integration (Future)

## Overview
Supra AI Agents enable natural language interaction with blockchain operations using Supra L1 SDK.

## Agent Hub
**Repository**: https://github.com/Supra-Labs/Supra-agents-hub

## Base Agent Capabilities
- Create/manage Supra accounts
- Check balances and resources
- Fund accounts via faucet
- Query transaction history
- Fetch transaction details
- Read on-chain resources

## Potential Veil Hub AI Agent

### VeilAgent Commands
```
"what is my vault balance"
"deposit 100 USDC into vault"
"check my collateral ratio"
"harvest vault rewards"
"show me my borrowing position"
"what's the current ETH price"
"request random number for strategy"
"check technical indicators for BTC"
"claim my PoEL rewards"
"show my iAsset holdings"
```

### Implementation Concept
```typescript
// veil-agent.ts
import { SupraClient } from '@supra/sdk';

class VeilAgent {
  private client: SupraClient;
  
  async handleCommand(input: string) {
    if (input.includes('vault balance')) {
      return await this.getVaultBalance();
    }
    if (input.includes('deposit')) {
      return await this.depositToVault(amount, asset);
    }
    if (input.includes('collateral ratio')) {
      return await this.getCollateralRatio();
    }
    if (input.includes('ETH price')) {
      return await this.getOraclePrice('ETH_USDT');
    }
    if (input.includes('technical indicators')) {
      return await this.getTechnicalIndicators(asset);
    }
  }
  
  async getVaultBalance() {
    // Query veil_hub::vault module
    const resources = await this.client.getAccountResources(address);
    return parseVaultBalance(resources);
  }
  
  async getOraclePrice(pair: string) {
    // Query supra_oracle module
    const price = await this.client.view({
      function: 'supra_oracle::get_price',
      arguments: [pairId]
    });
    return formatPrice(price);
  }
  
  async getTechnicalIndicators(asset: string) {
    // Query veil_indicators module
    const signal = await this.client.view({
      function: 'veil_hub::veil_indicators::get_trading_signal',
      arguments: [pairId]
    });
    return formatSignal(signal);
  }
}
```

## Use Cases

### 1. Portfolio Management
```
User: "Show my Veil portfolio"
Agent: 
  Vault Balance: 1,000 USDC
  Collateral: 2.5 ETH ($8,750)
  Borrowed: 5,000 USDC
  Collateral Ratio: 175%
  Health: Good ✓
```

### 2. Market Analysis
```
User: "Should I harvest my vault now?"
Agent:
  Checking market conditions...
  - BTC: Bullish (EMA 9 > EMA 50)
  - ETH: Bullish (RSI: 58)
  - Multi-timeframe: Aligned ✓
  Recommendation: Yes, conditions favorable
```

### 3. Automated Actions
```
User: "Auto-harvest when market is bullish"
Agent:
  Setting up automation...
  - Monitoring: BTC, ETH indicators
  - Trigger: Both bullish + confidence >70%
  - Action: Harvest vault rewards
  Status: Active ✓
```

### 4. Risk Management
```
User: "Alert me if collateral ratio drops below 150%"
Agent:
  Risk monitor activated
  - Current ratio: 175%
  - Alert threshold: 150%
  - Notification: Enabled ✓
```

## Integration with Veil Modules

### Oracle Integration
```typescript
async getPrice(pair: string) {
  return await client.view({
    function: 'supra_oracle::supra_oracle_storage::get_price',
    arguments: [pairId]
  });
}
```

### Indicators Integration
```typescript
async getSignal(pair: string) {
  return await client.view({
    function: 'veil_hub::veil_indicators::get_trading_signal',
    arguments: [pairId]
  });
}
```

### dVRF Integration
```typescript
async requestRandomness() {
  return await client.submitTransaction({
    function: 'veil_hub::veil_dvrf::request_vault_randomness',
    arguments: [1, 0, 6]
  });
}
```

### PoEL Integration
```typescript
async claimRewards() {
  return await client.submitTransaction({
    function: 'poel::claim_rewards',
    arguments: []
  });
}
```

## Natural Language Processing

### Command Patterns
- **Balance queries**: "balance", "how much", "show me"
- **Deposits**: "deposit", "add", "put in"
- **Withdrawals**: "withdraw", "take out", "remove"
- **Market data**: "price", "indicators", "signal"
- **Actions**: "harvest", "claim", "borrow", "repay"

### Intent Recognition
```typescript
const intents = {
  CHECK_BALANCE: /balance|how much|show.*vault/i,
  DEPOSIT: /deposit|add.*vault|put.*in/i,
  WITHDRAW: /withdraw|take.*out|remove/i,
  GET_PRICE: /price|cost|worth/i,
  CHECK_INDICATORS: /indicator|signal|bullish|bearish/i,
  HARVEST: /harvest|claim.*reward/i,
  BORROW: /borrow|loan|take.*loan/i,
  REPAY: /repay|pay.*back|return/i
};
```

## Setup

### Prerequisites
```bash
npm install @supra/sdk
npm install openai  # For NLP
```

### Configuration
```typescript
const config = {
  rpcUrl: 'https://rpc-testnet.supra.com',
  veilHubAddress: '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915',
  privateKey: process.env.PRIVATE_KEY
};
```

## Benefits

1. **Accessibility**: Non-technical users can interact with DeFi
2. **Automation**: Set up complex strategies via conversation
3. **Monitoring**: Natural language alerts and notifications
4. **Education**: Agent explains concepts and risks
5. **Efficiency**: Faster than manual UI navigation

## Implementation Priority
**Low** - Advanced feature after core protocol is mature:
1. ✅ Core DeFi primitives
2. 🔄 Vaults & lending
3. 📋 Web UI
4. 📋 AI Agent interface

## Resources
- Supra Agents Hub: https://github.com/Supra-Labs/Supra-agents-hub
- Supra L1 SDK: https://docs.supra.com/sdk
- OpenBlocks.ai: Supra's AI infrastructure
