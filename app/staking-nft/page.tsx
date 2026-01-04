'use client'

import React from 'react'
import { StakingAchievementNFT } from '@/components/StakingAchievementNFT'

export default function StakingNFTPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-[#FFD700]">🏆</span> Veil Staker Achievement NFT
          </h1>
          <p className="text-[#B0B0B0] text-lg">
            Celebrate your commitment to Veil Hub with an exclusive staking achievement NFT
          </p>
        </div>

        {/* Main Component */}
        <StakingAchievementNFT />

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#FFD700] mb-3">🎁 NFT Benefits</h3>
            <ul className="space-y-2 text-[#B0B0B0] text-sm">
              <li>✅ Exclusive staker status</li>
              <li>✅ Tradeable achievement</li>
              <li>✅ Community recognition</li>
              <li>✅ Governance boost</li>
            </ul>
          </div>

          <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#FFD700] mb-3">📊 Staking Stats</h3>
            <ul className="space-y-2 text-[#B0B0B0] text-sm">
              <li>Base APY: 12%</li>
              <li>Restaking APY: 8.5%</li>
              <li>Total APY: 20.5%</li>
              <li>With 2.5x Boost: 51.25%</li>
            </ul>
          </div>

          <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#FFD700] mb-3">🌑 Veil Hub</h3>
            <ul className="space-y-2 text-[#B0B0B0] text-sm">
              <li>Zero-liquidation borrowing</li>
              <li>Perpetual real yield</li>
              <li>Privacy-first architecture</li>
              <li>Built on Supra L1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
