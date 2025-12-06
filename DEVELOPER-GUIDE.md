# 🛠️ Developer Guide - Veil Hub v14

## Quick Start

```bash
# Clone and install
git clone https://github.com/Thabiiey411beta/veil-hub-v2.git
cd veil-hub-v2
npm install

# Start dev server
npm run dev

# Build contracts
cd move && aptos move compile

# Deploy to testnet
node deploy-veil-hub.js
```

---

## Contract Architecture

### Core Contracts

#### 1. debt_engine.move - Dynamic Borrowing
```move
// Borrow USDC with dynamic rates
public entry fun borrow(account: &signer, collateral: u64, amount: u64)

// Current rate based on utilization
#[view]
public fun get_current_rate(): u64  // Returns 200-2500 (2-25%)

// Current utilization
#[view]
public fun get_utilization(): u64  // Returns 0-100
```

**Rate Formula:**
- 0-80% utilization: 2% + (util × 3% / 80)
- 80-100% utilization: 5% + ((util - 80) × 20% / 20)

**Examples:**
- 20% util → 2.75% APR (bear market)
- 50% util → 3.88% APR
- 80% util → 5% APR (optimal)
- 90% util → 15% APR (bull market)

---

#### 2. immortal_reserve.move - Perpetual Dividends
```move
// Burn VEIL for Immortal Shares
public entry fun burn_for_shares(account: &signer, amount: u64)

// Add revenue from any source
public entry fun add_revenue(account: &signer, source_id: u8, amount: u64)

// Get current dividend rate
#[view]
public fun get_dividend_rate(): u64  // Returns APR in bps
```

**Revenue Sources:**
- Source 1 (Borrow): 40% allocation
- Source 2 (Vaults): 30% allocation
- Source 3 (Perps): 20% allocation
- Source 4 (Shadow): 10% allocation

**Burn Bonuses:**
- 0-100M burned: 1.5x shares
- 100-300M burned: 1.25x shares
- 300M+ burned: 1.0x shares

---

#### 3. veveil.move - Governance & Boost
```move
// Lock VEIL for veVEIL
public entry fun lock(account: &signer, amount: u64, duration: u64)

// Get your boost multiplier
#[view]
public fun get_user_boost(addr: address): u64  // Returns 10-25 (1.0x-2.5x)

// Get total veVEIL
#[view]
public fun get_total_veveil(): u64
```

**Boost Formula:**
```
veVEIL_balance = amount × (1.0 + duration / 4_years × 1.5)
Your_boost = 1.0 + (your_veVEIL / total_veVEIL) × 1.5
```

**Examples:**
- Lock 10k VEIL for 4 years → 25k veVEIL
- If total veVEIL = 200M → Your boost = 1.00019x
- If you have 10M veVEIL → Your boost = 1.075x

---

#### 4. buyback_engine.move - Automated Buybacks
```move
// Execute buyback with TWAP protection
public entry fun execute_buyback(
    account: &signer,
    usdc_amount: u64,
    current_price: u64,
    pool_liquidity: u64
)

// Get 24-hour TWAP
#[view]
public fun get_twap(): u64
```

**Safety Checks:**
- ✅ Current price within 2% of TWAP
- ✅ Pool liquidity > $100k
- ✅ Max 5% of pool per buyback
- ✅ Price history tracked (24 points)

---

#### 5. perpetual_dex.move - Private Perps
```move
// Open position with dynamic leverage
public entry fun open_position(
    account: &signer,
    collateral: u64,
    size: u64,
    is_long: bool,
    entry_price: u128,
    volatility: u64  // 0-100+
)

// Get max leverage for current volatility
#[view]
public fun get_max_leverage_for_volatility(volatility: u64): u64

// Get insurance fund balance
#[view]
public fun get_insurance_fund(): u64
```

**Dynamic Leverage:**
- Volatility > 100: 20x max (high risk)
- Volatility 50-100: 35x max (medium risk)
- Volatility < 50: 50x max (low risk)

**Fee Split:**
- 20% → Insurance fund
- 50% → Burn (capped)
- 30% → veVEIL stakers

---

#### 6. circuit_breaker.move - Emergency Protection
```move
// Check before any operation
public fun check_circuit_breaker(current_tvl: u64)

// Manual controls (admin only)
public entry fun manual_pause(account: &signer)
public entry fun manual_unpause(account: &signer)

// Get status
#[view]
public fun is_paused(): bool
```

**Auto-Pause Triggers:**
- TVL drops > 10% → Pause for 24 hours
- Manual pause → Indefinite until unpause

---

## Frontend Integration

### Connect to Supra

```typescript
import { SupraClient } from '@supra/sdk';

const client = new SupraClient({
  rpcUrl: 'https://rpc-testnet.supra.com',
  chainId: 6,
});
```

### Call Contract Functions

```typescript
// Get current borrow rate
const rate = await client.view({
  function: '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e::debt_engine::get_current_rate',
  type_arguments: [],
  arguments: [],
});

console.log(`Current rate: ${rate[0] / 100}%`);

// Borrow USDC
const tx = await client.submitTransaction({
  sender: account.address(),
  payload: {
    function: '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e::debt_engine::borrow',
    type_arguments: [],
    arguments: [
      collateral,  // u64
      amount,      // u64
    ],
  },
});
```

### Get User Data

```typescript
// Get user's veVEIL boost
const boost = await client.view({
  function: '0x...::veveil::get_user_boost',
  type_arguments: [],
  arguments: [userAddress],
});

console.log(`Your boost: ${boost[0] / 10}x`);

// Get Immortal Share balance
const shares = await client.getAccountResource(
  userAddress,
  '0x...::immortal_reserve::ImmortalShare'
);

console.log(`Your shares: ${shares.data.shares}`);
```

---

## Testing

### Unit Tests

```bash
# Test all contracts
cd move && aptos move test

# Test specific module
aptos move test --filter debt_engine
```

### Integration Tests

```typescript
// test/integration.test.ts
describe('Veil Hub Integration', () => {
  it('should calculate dynamic rates correctly', async () => {
    // Set utilization to 20%
    await setUtilization(20);
    const rate = await getRate();
    expect(rate).toBe(275); // 2.75%
  });

  it('should apply burn caps', async () => {
    const supply = 1000000000;
    const requested = 100000000;
    const actual = await applyBurnCap(requested, supply);
    expect(actual).toBeLessThanOrEqual(requested);
  });
});
```

---

## Common Patterns

### Check Circuit Breaker

```move
// In every state-changing function
public entry fun my_function(account: &signer) acquires MyResource {
    let tvl = calculate_tvl();
    veil_hub::circuit_breaker::check_circuit_breaker(tvl);
    
    // ... rest of function
}
```

### Apply Burn Cap

```move
// Before any burn
let actual_burn = veil_hub::burn_controller::apply_burn_cap(
    requested_burn,
    veil_hub::burn_controller::get_current_supply()
);

// Use actual_burn instead of requested_burn
burn_veil(actual_burn);
```

### Calculate Fees with Split

```move
// Standard fee split
let fee = (amount * FEE_BPS) / 10000;
let to_insurance = (fee * 20) / 100;
let to_burn = (fee * 50) / 100;
let to_veveil = (fee * 30) / 100;

// Apply burn cap
let actual_burn = apply_burn_cap(to_burn);

// Excess to insurance
let excess = to_burn - actual_burn;
insurance_fund += to_insurance + excess;
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Contracts compiled
- [ ] Testnet deployment successful
- [ ] Frontend integration tested
- [ ] Audit completed

### Deployment Steps
1. Deploy burn_controller.move
2. Deploy circuit_breaker.move
3. Deploy core contracts (debt_engine, immortal_reserve, veveil)
4. Deploy finance contracts (perpetual_dex, shadow_gas)
5. Deploy buyback_engine.move
6. Initialize all contracts
7. Set up automation (Supra AutoFi)
8. Verify all view functions
9. Test emergency pause
10. Monitor for 24 hours

### Post-Deployment
- [ ] Monitor TVL
- [ ] Check utilization rates
- [ ] Verify dividend distributions
- [ ] Test buyback execution
- [ ] Monitor insurance fund
- [ ] Check burn caps working

---

## Troubleshooting

### "Circuit breaker active"
- Check TVL drop: `circuit_breaker::get_status()`
- Wait 24 hours or manual unpause
- Investigate cause of TVL drop

### "High slippage"
- Current price > 2% from TWAP
- Wait for price to stabilize
- Check if manipulation attempt

### "Insufficient insurance fund"
- Check balance: `perpetual_dex::get_insurance_fund()`
- Reduce leverage temporarily
- Wait for fees to accumulate

### "Burn cap exceeded"
- Supply approaching floor
- Burns automatically limited
- Normal behavior, not an error

---

## Performance Tips

### Gas Optimization
- Batch operations when possible
- Use view functions for reads
- Cache frequently accessed data
- Minimize storage writes

### Rate Limiting
- Max 1 borrow per block per user
- Max 1 buyback per hour
- Max 10 perp trades per block

### Monitoring
- Track utilization every block
- Update TWAP every hour
- Check circuit breaker every transaction
- Monitor insurance fund daily

---

## Security Best Practices

### Input Validation
```move
// Always validate inputs
assert!(amount > 0, ERROR_INVALID_AMOUNT);
assert!(duration >= MIN_LOCK_TIME, ERROR_DURATION_TOO_SHORT);
assert!(leverage <= max_leverage, ERROR_LEVERAGE_TOO_HIGH);
```

### Access Control
```move
// Restrict admin functions
assert!(signer::address_of(account) == @veil_hub, ERROR_UNAUTHORIZED);
```

### Reentrancy Protection
```move
// Update state before external calls
state.balance = state.balance - amount;
transfer_tokens(recipient, amount);
```

---

## Resources

- **Docs:** [docs.veilhub.finance](https://docs.veilhub.finance)
- **Discord:** [discord.gg/veilhub](https://discord.gg/veilhub)
- **GitHub:** [github.com/Thabiiey411beta/veil-hub-v2](https://github.com/Thabiiey411beta/veil-hub-v2)
- **Supra Docs:** [docs.supra.com](https://docs.supra.com)

---

🌑 **Happy building! Welcome to the darkness.**
