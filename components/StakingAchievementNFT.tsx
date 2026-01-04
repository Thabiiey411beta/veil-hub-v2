'use client'

import React, { useState, useEffect } from 'react'
import { GradientCard, RippleButton } from '@/components/EnhancedUI'

interface StakerInfo {
  address: string
  amount: number
  percentage: number
}

export function StakingAchievementNFT() {
  const [stakers, setStakers] = useState<StakerInfo[]>([])
  const [totalStaked, setTotalStaked] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch staker data from Move contract
    fetchStakerData()
  }, [])

  const fetchStakerData = async () => {
    try {
      // Call Move contract to get staker amounts
      // This would integrate with Aptos SDK
      setLoading(false)
    } catch (error) {
      console.error('Error fetching staker data:', error)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* NFT Achievement Card */}
      <GradientCard className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-2">
            🏆 Veil Staker Achievement NFT
          </h2>
          <p className="text-[#B0B0B0]">
            Commemorating the Veil Hub staking community
          </p>
        </div>

        {/* Tweet Content */}
        <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🌑</div>
            <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
              Veil Hub Staking Achievement
            </h3>
            <p className="text-[#B0B0B0] text-lg mb-6">
              Join the Veil Hub community and stake VEIL tokens to earn perpetual real yield
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1a1a2e] rounded-lg p-4">
                <div className="text-[#FFD700] font-bold text-2xl">
                  {stakers.length}
                </div>
                <div className="text-[#B0B0B0] text-sm">Total Stakers</div>
              </div>
              <div className="bg-[#1a1a2e] rounded-lg p-4">
                <div className="text-[#FFD700] font-bold text-2xl">
                  {(totalStaked / 1_000_000_000).toFixed(0)}M
                </div>
                <div className="text-[#B0B0B0] text-sm">VEIL Staked</div>
              </div>
              <div className="bg-[#1a1a2e] rounded-lg p-4">
                <div className="text-[#FFD700] font-bold text-2xl">
                  20.5%
                </div>
                <div className="text-[#B0B0B0] text-sm">APY</div>
              </div>
            </div>
            <p className="text-[#808080] text-sm">
              Zero-liquidation borrowing • Perpetual real yield • Privacy-first
            </p>
          </div>
        </div>

        {/* Mint NFT Button */}
        <div className="text-center mb-8">
          <RippleButton className="px-8 py-3">
            Mint Staking Achievement NFT
          </RippleButton>
        </div>
      </GradientCard>

      {/* Staker Leaderboard */}
      <GradientCard>
        <h3 className="text-2xl font-bold text-[#FFD700] mb-6">
          📊 Staker Leaderboard
        </h3>

        {loading ? (
          <div className="text-center text-[#B0B0B0]">Loading staker data...</div>
        ) : (
          <div className="space-y-3">
            {stakers.length === 0 ? (
              <div className="text-center text-[#B0B0B0] py-8">
                No stakers yet. Be the first to stake!
              </div>
            ) : (
              stakers.map((staker, index) => (
                <div
                  key={staker.address}
                  className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-[#FFD700] font-bold text-lg w-8">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="text-[#E0E0E0] font-mono text-sm">
                          {staker.address.slice(0, 6)}...{staker.address.slice(-4)}
                        </div>
                        <div className="text-[#808080] text-xs">
                          Staker Address
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#FFD700] font-bold text-lg">
                        {(staker.amount / 1_000_000_000).toFixed(2)} VEIL
                      </div>
                      <div className="text-[#808080] text-xs">
                        {staker.percentage.toFixed(2)}% of total
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#1a1a2e] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#FFD700] to-[#FFF700] h-2 rounded-full transition-all"
                      style={{ width: `${staker.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-8 pt-6 border-t border-[#FFD700]/10">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFD700]">
                {stakers.length}
              </div>
              <div className="text-[#B0B0B0] text-sm">Total Stakers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFD700]">
                {(totalStaked / 1_000_000_000).toFixed(0)}M
              </div>
              <div className="text-[#B0B0B0] text-sm">VEIL Staked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFD700]">
                {stakers.length > 0
                  ? (totalStaked / stakers.length / 1_000_000_000).toFixed(2)
                  : '0'}
                M
              </div>
              <div className="text-[#B0B0B0] text-sm">Avg Stake</div>
            </div>
          </div>
        </div>
      </GradientCard>
    </div>
  )
}
