'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACTS, VEIL_TOKEN_ABI, VEVEIL_ABI } from '@/lib/contracts'
import toast from 'react-hot-toast'

export default function Governance() {
  const { address } = useAccount()
  const [lockAmount, setLockAmount] = useState('')
  const [lockDuration, setLockDuration] = useState('365')
  const { writeContract } = useWriteContract()
  
  const { data: veilBalance } = useReadContract({
    address: CONTRACTS.VeilToken as `0x${string}`,
    abi: VEIL_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined
  })
  
  const { data: veVeilBalance } = useReadContract({
    address: CONTRACTS.VeVEIL as `0x${string}`,
    abi: VEVEIL_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined
  })
  
  const { data: boost } = useReadContract({
    address: CONTRACTS.VeVEIL as `0x${string}`,
    abi: VEVEIL_ABI,
    functionName: 'getBoost',
    args: address ? [address] : undefined
  })
  
  const handleLock = async () => {
    if (!lockAmount || !address) return
    
    try {
      await writeContract({
        address: CONTRACTS.VeilToken as `0x${string}`,
        abi: VEIL_TOKEN_ABI,
        functionName: 'approve',
        args: [CONTRACTS.VeVEIL, parseEther(lockAmount)]
      })
      
      const duration = parseInt(lockDuration) * 24 * 60 * 60
      
      await writeContract({
        address: CONTRACTS.VeVEIL as `0x${string}`,
        abi: VEVEIL_ABI,
        functionName: 'lock',
        args: [parseEther(lockAmount), BigInt(duration)]
      })
      
      toast.success('VEIL locked for veVEIL!')
      setLockAmount('')
    } catch (error) {
      toast.error('Lock failed')
    }
  }
  
  const handleUnlock = async () => {
    if (!address) return
    
    try {
      await writeContract({
        address: CONTRACTS.VeVEIL as `0x${string}`,
        abi: VEVEIL_ABI,
        functionName: 'unlock'
      })
      
      toast.success('VEIL unlocked!')
    } catch (error) {
      toast.error('Unlock failed')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          veVEIL Governance
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">VEIL Balance</h3>
            <p className="text-3xl font-bold">{veilBalance ? formatEther(veilBalance as bigint) : '0'}</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">veVEIL Balance</h3>
            <p className="text-3xl font-bold">{veVeilBalance ? formatEther(veVeilBalance as bigint) : '0'}</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl">
            <h3 className="text-sm text-gray-400 mb-2">Yield Boost</h3>
            <p className="text-3xl font-bold">{boost ? `${Number(boost) / 1e18}x` : '1.0x'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">🔒 Lock VEIL</h2>
            <p className="text-gray-400 mb-4">Lock VEIL to receive veVEIL and boost your yields up to 2.5x</p>
            
            <input
              type="number"
              value={lockAmount}
              onChange={(e) => setLockAmount(e.target.value)}
              placeholder="Amount to lock"
              className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-lg mb-4"
            />
            
            <select
              value={lockDuration}
              onChange={(e) => setLockDuration(e.target.value)}
              className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-lg mb-4"
            >
              <option value="7">1 Week</option>
              <option value="30">1 Month</option>
              <option value="90">3 Months</option>
              <option value="180">6 Months</option>
              <option value="365">1 Year</option>
              <option value="730">2 Years</option>
              <option value="1460">4 Years (Max Boost)</option>
            </select>
            
            <button
              onClick={handleLock}
              disabled={!address || !lockAmount}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold hover:opacity-80 disabled:opacity-50"
            >
              Lock for veVEIL
            </button>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">🔓 Unlock VEIL</h2>
            <p className="text-gray-400 mb-4">Unlock your VEIL after lock period expires</p>
            
            <div className="mb-4 p-4 bg-black/50 rounded-lg">
              <h3 className="text-sm text-gray-400 mb-2">Boost Benefits:</h3>
              <ul className="space-y-1 text-sm">
                <li>• 1 week lock: 1.1x boost</li>
                <li>• 6 months lock: 1.5x boost</li>
                <li>• 1 year lock: 2.0x boost</li>
                <li>• 4 years lock: 2.5x boost</li>
              </ul>
            </div>
            
            <button
              onClick={handleUnlock}
              disabled={!address || !veVeilBalance}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold hover:opacity-80 disabled:opacity-50"
            >
              Unlock VEIL
            </button>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">📊 Governance Power</h2>
          <p className="text-gray-400 mb-4">veVEIL holders can vote on:</p>
          <ul className="space-y-2 list-disc list-inside text-gray-300">
            <li>Protocol fee distribution</li>
            <li>New collateral asset additions</li>
            <li>Vault strategy approvals</li>
            <li>Emergency parameter changes</li>
            <li>Treasury fund allocation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
