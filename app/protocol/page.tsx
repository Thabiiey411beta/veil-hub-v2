'use client'

import { useAccount, useReadContract } from 'wagmi'
import { CONTRACTS, VEIL_TOKEN_ABI, IMMORTAL_RESERVE_ABI } from '@/lib/contracts'
import { formatEther } from 'viem'

export default function Protocol() {
  const { address } = useAccount()
  
  const { data: veilBalance } = useReadContract({
    address: CONTRACTS.VeilToken as `0x${string}`,
    abi: VEIL_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined
  })
  
  const { data: totalBurned } = useReadContract({
    address: CONTRACTS.ImmortalReserve as `0x${string}`,
    abi: IMMORTAL_RESERVE_ABI,
    functionName: 'totalVeilBurned'
  })
  
  const { data: burnBonus } = useReadContract({
    address: CONTRACTS.ImmortalReserve as `0x${string}`,
    abi: IMMORTAL_RESERVE_ABI,
    functionName: 'getBurnBonus'
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Protocol Overview
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">Your VEIL Balance</h3>
            <p className="text-3xl font-bold">{veilBalance ? formatEther(veilBalance as bigint) : '0'}</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">Total VEIL Burned</h3>
            <p className="text-3xl font-bold">{totalBurned ? formatEther(totalBurned as bigint) : '0'}</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">Current Burn Bonus</h3>
            <p className="text-3xl font-bold">{burnBonus ? `${Number(burnBonus) / 100}x` : '1.0x'}</p>
          </div>
        </div>

        <div className="space-y-8 text-gray-300">
          <div className="p-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">⚡ Powered by Supra Automation</h2>
            <p className="mb-4">Veil Hub runs autonomously using Supra's native automation engine:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Auto-Repay:</strong> Debt positions automatically repaid when collateral drops</li>
              <li><strong>Auto-Harvest:</strong> Vault yields harvested weekly without manual intervention</li>
              <li><strong>Auto-Rebalance:</strong> Withdrawal buffers maintained automatically</li>
              <li><strong>Zero Downtime:</strong> Executed directly by Supra validators</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">🛡️ Zero Liquidation</h2>
              <p>Borrow at 5.5% fixed APR with 180% minimum collateral. Auto-repay prevents liquidations.</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">💎 Perpetual Yield</h2>
              <p>Earn 12-25% USDC APY through Immortal Shares with progressive burn bonuses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
