'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACTS, VEIL_TOKEN_ABI, IMMORTAL_RESERVE_ABI } from '@/lib/contracts'
import TechnicalIndicators from '@/components/TechnicalIndicators'
import toast from 'react-hot-toast'

export default function Vaults() {
  const { address } = useAccount()
  const [burnAmount, setBurnAmount] = useState('')
  const { writeContract } = useWriteContract()
  
  const { data: veilBalance } = useReadContract({
    address: CONTRACTS.VeilToken as `0x${string}`,
    abi: VEIL_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined
  })
  
  const { data: immortalShares } = useReadContract({
    address: CONTRACTS.ImmortalReserve as `0x${string}`,
    abi: IMMORTAL_RESERVE_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined
  })
  
  const { data: pendingDividends } = useReadContract({
    address: CONTRACTS.ImmortalReserve as `0x${string}`,
    abi: IMMORTAL_RESERVE_ABI,
    functionName: 'pendingDividends',
    args: address ? [address] : undefined
  })
  
  const handleBurn = async () => {
    if (!burnAmount || !address) return
    
    try {
      // Approve first
      await writeContract({
        address: CONTRACTS.VeilToken as `0x${string}`,
        abi: VEIL_TOKEN_ABI,
        functionName: 'approve',
        args: [CONTRACTS.ImmortalReserve, parseEther(burnAmount)]
      })
      
      // Then burn
      await writeContract({
        address: CONTRACTS.ImmortalReserve as `0x${string}`,
        abi: IMMORTAL_RESERVE_ABI,
        functionName: 'burnVeilForImmortalShares',
        args: [parseEther(burnAmount)]
      })
      
      toast.success('VEIL burned for Immortal Shares!')
      setBurnAmount('')
    } catch (error) {
      toast.error('Transaction failed')
    }
  }
  
  const handleClaim = async () => {
    if (!address) return
    
    try {
      await writeContract({
        address: CONTRACTS.ImmortalReserve as `0x${string}`,
        abi: IMMORTAL_RESERVE_ABI,
        functionName: 'claimDividends'
      })
      
      toast.success('Dividends claimed!')
    } catch (error) {
      toast.error('Claim failed')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Immortal Reserve
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">VEIL Balance</h3>
            <p className="text-3xl font-bold">{veilBalance ? formatEther(veilBalance as bigint) : '0'}</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">Immortal Shares</h3>
            <p className="text-3xl font-bold">{immortalShares ? formatEther(immortalShares as bigint) : '0'}</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">Pending USDC</h3>
            <p className="text-3xl font-bold">{pendingDividends ? formatEther(pendingDividends as bigint) : '0'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">🔥 Burn VEIL</h2>
            <p className="text-gray-400 mb-4">Burn VEIL to receive Immortal Shares with progressive bonuses</p>
            <input
              type="number"
              value={burnAmount}
              onChange={(e) => setBurnAmount(e.target.value)}
              placeholder="Amount to burn"
              className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-lg mb-4"
            />
            <button
              onClick={handleBurn}
              disabled={!address || !burnAmount}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold hover:opacity-80 disabled:opacity-50"
            >
              Burn for Immortal Shares
            </button>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">💰 Claim Dividends</h2>
            <p className="text-gray-400 mb-4">Claim your accumulated USDC dividends</p>
            <div className="mb-4">
              <p className="text-sm text-gray-400">Claimable:</p>
              <p className="text-2xl font-bold">{pendingDividends ? formatEther(pendingDividends as bigint) : '0'} USDC</p>
            </div>
            <button
              onClick={handleClaim}
              disabled={!address || !pendingDividends}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold hover:opacity-80 disabled:opacity-50"
            >
              Claim Dividends
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <TechnicalIndicators />
        </div>
      </div>
    </div>
  )
}
