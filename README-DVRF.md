# Supra dVRF Integration

## Overview
Veil Hub uses Supra's decentralized Verifiable Random Function (dVRF) for tamper-proof randomness in vault strategies.

## Why dVRF?

### Traditional VRF Problems
- **Centralized**: Single point of failure
- **Trust Required**: Must trust one entity
- **Vulnerable**: Private key exposure risk

### Supra dVRF Solution
- **Decentralized**: Private key split across N nodes
- **Byzantine Fault Tolerant**: Works with up to T malicious nodes
- **Verifiable**: Cryptographic proof of randomness
- **Threshold Security**: Any T+1 nodes can generate, T or fewer have zero knowledge

## Security Properties

1. **Consistency**: Same result regardless of which T+1 nodes participate
2. **Robustness**: Detects and discards illegitimate partial evaluations
3. **Availability**: Functions correctly even with T compromised nodes
4. **Strong Pseudorandomness**: Truly random even with T colluding nodes

## Contract Addresses

### Testnet
- **Supra L1**: `0x186ba2ba88f4a14ca51f6ce42702c7ebdf6bfcf738d897cc98b986ded6f1219e`
- **Ethereum Sepolia Router**: `0x7e0EA6e335EDA42f4c256246f62c6c3DCf4d4908`
- **Ethereum Sepolia Deposit**: `0x7d63aa8468e8c4c60395ad423271f45bb34df0fd`

### Mainnet
- **Supra L1**: `0x9672d46410f540b47d7e1f732640c776fa91ea1b909f871b9b2b7527b0ea90ae`
- **Ethereum Router**: `0x23726e27Ec79d421cf58C815D37748AfCaFeC9e4`
- **Ethereum Deposit**: `0xb63b8391e666d21958b8b3459840594A12055D2d`

## Setup (Supra L1)

1. **Create Subscription**: Visit https://supra.com/data/dvrf
2. **Connect StarKey Wallet**
3. **Set Max Transaction Fee** (e.g., 1,000,000 units)
4. **Receive Supra Credits**: Auto-granted for initial requests
5. **Deploy Module**: Auto-whitelists via `init_module()`
6. **Deposit $SUPRA**: When credits exhausted

## Usage (Supra L1 V3)

```move
// Request (returns nonce)
veil_dvrf::request_vault_randomness(
    1,  // rng_count
    0,  // client_seed
    6   // num_confirmations
);

// Callback auto-called by Supra
public entry fun vault_callback(
    nonce: u64,
    message: vector<u8>,
    signature: vector<u8>,
    caller_address: address,
    rng_count: u8,
    client_seed: u64
) {
    // Verifies and stores random numbers
}

// Get strategy by nonce
let strategy = veil_dvrf::get_random_strategy(nonce);
```

### Solidity (EVM)
```solidity
// Deposit funds
veilVRF.depositFunds{value: 0.1 ether}();

// Request
veilVRF.requestVaultRandomness(6);

// Get strategy
uint8 strategy = veilVRF.getRandomStrategy();

// Monitor balance
uint128 balance = veilVRF.getBalance();
```

## Use Cases in Veil Hub

1. **Vault Strategy Selection**: Random selection among 3 strategies
2. **Rebalancing Timing**: Unpredictable rebalance execution
3. **Whale Mode Access**: Fair lottery for limited slots
4. **LP VACUUM Distribution**: Random profit distribution timing

## Technical Details

- **GLOW Construction**: Uses BLS threshold signatures
- **Zero-Knowledge Proofs**: Verifies partial signatures
- **Threshold**: T+1 of N nodes required
- **Verification**: Same as centralized VRF (seamless upgrade)

## Configuration

**Supra L1 V3**
- Max Transaction Fee: Set at subscription creation
- Minimum Balance: max_txn_fee × 30 requests
- Supra Credits: Free grant covers initial usage
- Deposit: $SUPRA tokens after grant exhausted

**EVM Chains**
- Max Gas Price: 50 gwei
- Max Gas Limit: 500k
- Deposit: Native token (ETH, etc.)

## Monitoring

**Supra L1**
```move
// Check via subscription manager UI
// - Total balance (Credits + Deposits)
// - Minimum balance threshold
// - Alert at 300%, 100%, 25% levels
```

**EVM**
```solidity
uint128 balance = veilVRF.getBalance();
uint128 minBalance = veilVRF.getMinBalance();
```

## Best Practices
1. Maintain balance > 300% minimum
2. Use 6+ confirmations
3. Monitor balance alerts
4. Test callback gas usage
5. Update limits based on network
