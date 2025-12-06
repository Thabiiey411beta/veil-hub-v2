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

## Usage

### Move (Supra L1)
```move
// Request randomness
veil_dvrf::request_randomness(
    &signer,
    6,  // num_confirmations
    b"client_seed"
);

// Get random strategy (0-2)
let strategy = veil_dvrf::get_random_strategy();
```

### Solidity (EVM)
```solidity
// Request randomness
uint256 requestId = supraVRF.requestRandomness(6);

// Get random strategy in callback
uint8 strategy = supraVRF.getRandomStrategy();
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

## Gas Costs
- Request: ~100k gas (EVM)
- Callback: ~50k gas (EVM)
- Move: Minimal (native L1)

## Best Practices
1. Use sufficient confirmations (6+ recommended)
2. Include unique client seed per request
3. Handle callback asynchronously
4. Verify randomness in callback
5. Store nonce for request tracking
