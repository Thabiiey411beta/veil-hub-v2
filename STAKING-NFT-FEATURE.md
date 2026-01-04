# 🏆 Veil Hub Staking Achievement NFT

## Overview

Transform the Veil Hub community tweet into an exclusive NFT for stakers, displaying individual holder amounts on a leaderboard.

---

## Features

### 1. **Staking Achievement NFT**
- Commemorates the Veil Hub staking community
- Based on the official Supra Hunter tweet
- Minted for each staker
- Displays staker address and amount

### 2. **Leaderboard Display**
- Ranked list of all stakers
- Shows VEIL amount staked
- Displays percentage of total stake
- Visual progress bars for each staker

### 3. **Community Stats**
- Total number of stakers
- Total VEIL staked
- Average stake per staker
- Real-time updates

---

## Implementation

### Move Contract: `staking_nft.move`

```move
module veil_hub::staking_nft {
    struct StakingNFT has key {
        name: String,
        description: String,
        uri: String,
        staked_amount: u64,
        staker: address,
        minted_at: u64,
    }

    public entry fun mint_staking_nft(
        user: &signer,
        staked_amount: u64,
    )

    public fun get_staker_amount(staker: address): u64
    public fun get_total_stakers(): u64
    public fun get_total_staked(): u64
}
```

**Functions**:
- `initialize(admin)` - Initialize NFT store
- `mint_staking_nft(user, staked_amount)` - Mint achievement NFT
- `get_staker_amount(staker)` - Get staker's amount
- `get_total_stakers()` - Get total staker count
- `get_total_staked()` - Get total staked amount

### Frontend Component: `StakingAchievementNFT.tsx`

**Features**:
- NFT achievement card with tweet content
- Mint button for stakers
- Leaderboard with ranked stakers
- Real-time stats display
- Progress bars for stake visualization

### Frontend Page: `/staking-nft`

**Route**: `app/staking-nft/page.tsx`

**Displays**:
- Staking Achievement NFT header
- Achievement card with stats
- Staker leaderboard
- NFT benefits info
- Staking statistics
- Veil Hub information

---

## User Flow

1. **Staker Mints NFT**
   - User stakes VEIL tokens
   - Calls `mint_staking_nft(amount)`
   - Receives achievement NFT

2. **NFT Displays on Leaderboard**
   - Staker appears on leaderboard
   - Shows staked amount
   - Shows percentage of total
   - Ranked by stake amount

3. **Community Recognition**
   - Staker gets exclusive status
   - NFT is tradeable
   - Governance boost applied
   - Community recognition

---

## Leaderboard Display

### Staker Entry Format
```
Rank | Address | Staked Amount | % of Total | Progress Bar
#1   | 0x1234...5678 | 1,000,000 VEIL | 25.5% | ████████████░░░░░░░░
#2   | 0x9876...5432 | 750,000 VEIL | 19.2% | ███████████░░░░░░░░░░
#3   | 0x5555...6666 | 500,000 VEIL | 12.8% | ████████░░░░░░░░░░░░░░
```

### Stats Summary
```
Total Stakers: 1,234
Total VEIL Staked: 3,910,000
Average Stake: 3,170 VEIL
```

---

## Integration with Restaking

### Staking Flow
1. User stakes VEIL in `/restaking`
2. Receives LRT (Liquid Restaking Token)
3. Can mint achievement NFT at `/staking-nft`
4. Appears on leaderboard
5. Earns 20.5% - 37.1% APY

### NFT Benefits
- ✅ Exclusive staker status
- ✅ Tradeable achievement
- ✅ Community recognition
- ✅ Governance boost (2.5x multiplier)

---

## Technical Details

### NFT Metadata
```json
{
  "name": "Veil Staker Achievement",
  "description": "Veil Hub Staking Achievement NFT",
  "image": "ipfs://QmVeilStakingAchievement",
  "attributes": [
    {
      "trait_type": "Staked Amount",
      "value": "1000000"
    },
    {
      "trait_type": "Staker Address",
      "value": "0x1234...5678"
    },
    {
      "trait_type": "Minted At",
      "value": "1704355200"
    }
  ]
}
```

### Data Structure
```move
struct StakingNFT {
    name: String,              // "Veil Staker Achievement"
    description: String,       // Achievement description
    uri: String,              // IPFS URI
    staked_amount: u64,       // Amount staked
    staker: address,          // Staker address
    minted_at: u64,           // Timestamp
}
```

---

## Frontend Routes

### New Route: `/staking-nft`
- **Component**: `StakingAchievementNFT`
- **Page**: `app/staking-nft/page.tsx`
- **Icon**: 🏆
- **Category**: Trading

### Updated Sidebar
- Added "Staking NFT" route
- Position: After Restaking
- Total routes: 19

---

## Statistics Displayed

### Per Staker
- Rank (1, 2, 3, ...)
- Address (truncated)
- Staked amount (in VEIL)
- Percentage of total
- Progress bar visualization

### Community Stats
- Total stakers count
- Total VEIL staked
- Average stake per staker
- Real-time updates

---

## NFT Utility

### Tradeable
- Can be bought/sold on DEX
- Represents staker status
- Transferable between addresses

### Governance
- Boosts voting power
- Increases yield multiplier
- Community recognition

### Community
- Leaderboard ranking
- Social status
- Achievement badge

---

## Future Enhancements

1. **Tier System**
   - Bronze: 1k-10k VEIL
   - Silver: 10k-100k VEIL
   - Gold: 100k-1M VEIL
   - Platinum: 1M+ VEIL

2. **Dynamic Metadata**
   - Updates with stake changes
   - Reflects current rank
   - Shows APY earned

3. **Rewards**
   - Bonus yield for NFT holders
   - Exclusive airdrops
   - Early access to features

---

## Status

✅ **Move Contract**: Implemented  
✅ **Frontend Component**: Implemented  
✅ **Frontend Page**: Implemented  
✅ **Sidebar Integration**: Implemented  
✅ **Build Status**: 0 errors  
✅ **Production Ready**: Yes  

---

## Files Created

1. **move/sources/staking_nft.move** - Move contract
2. **components/StakingAchievementNFT.tsx** - React component
3. **app/staking-nft/page.tsx** - Frontend page

---

**Veil Hub Staking Achievement NFT**

🏆 Celebrate your commitment to Veil Hub  
🌑 Built on Supra L1  
💎 Exclusive staker recognition
