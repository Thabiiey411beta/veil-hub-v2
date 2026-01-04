'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { GradientCard, StatCounter, RippleButton, GradientText, AnimatedBadge } from '@/components/EnhancedUI'
import { SuggestionPanel } from '@/components/SuggestionPanel'

const PriceWidget = dynamic(() => import('@/components/PriceWidget'), { ssr: true })

export default function Home() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter'] overflow-hidden">
      {/* Galactic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/5 via-transparent to-transparent opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative p-8 border-b border-[#FFD700]/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-6xl font-bold mb-4">
              Welcome to <GradientText>Veil Hub v17</GradientText>
            </h2>
            <p className="text-xl text-[#B0B0B0] mb-4">
              The Final DeFi Organism - Lock VEIL, Earn Perpetually, Multiply Infinitely
            </p>
            <div className="flex gap-2 mb-8 justify-center">
              <AnimatedBadge variant="success">🌑 Live on Supra L1</AnimatedBadge>
              <AnimatedBadge>🚀 Testnet Ready</AnimatedBadge>
              <AnimatedBadge>⚡ Zero Liquidation</AnimatedBadge>
            </div>
          </div>

          {/* Live Price Feed */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span className="text-[#FFD700]">◆</span> Live Oracle Prices
            </h3>
            <PriceWidget />
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <GradientCard>
              <StatCounter value="$245M" label="Total Value Locked" />
            </GradientCard>
            <GradientCard>
              <StatCounter value="18.5" label="Average APY" suffix="%" />
            </GradientCard>
            <GradientCard>
              <StatCounter value="450M" label="Total Locked" />
            </GradientCard>
            <GradientCard>
              <StatCounter value="8.5K" label="Active Users" />
            </GradientCard>
          </div>
        </div>
      </div>

      {/* Galactic Black Hole - Earning Flywheels */}
      <div className="relative p-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            <span className="text-[#FFD700]">🌌</span> The Earning Flywheels
          </h3>

          {/* Central Black Hole */}
          <div className="relative mb-16 h-96 flex items-center justify-center">
            {/* Orbiting Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Ring 1 - Lock to Earn */}
              <div
                className="absolute w-64 h-64 border-2 border-[#FFD700]/30 rounded-full"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD700] text-[#0A0A0A] px-4 py-2 rounded-full font-bold text-sm">
                  🔒 Lock VEIL
                </div>
              </div>

              {/* Ring 2 - Yield */}
              <div
                className="absolute w-80 h-80 border-2 border-[#8b5cf6]/30 rounded-full"
                style={{ transform: `rotate(${-rotation * 0.7}deg)` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8b5cf6] text-white px-4 py-2 rounded-full font-bold text-sm">
                  💰 Earn Yield
                </div>
              </div>

              {/* Ring 3 - Boost */}
              <div
                className="absolute w-96 h-96 border-2 border-[#10b981]/30 rounded-full"
                style={{ transform: `rotate(${rotation * 0.5}deg)` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#10b981] text-white px-4 py-2 rounded-full font-bold text-sm">
                  ⚡ 2.5x Boost
                </div>
              </div>

              {/* Central Black Hole */}
              <div className="absolute w-32 h-32 bg-gradient-to-br from-[#FFD700] to-[#8b5cf6] rounded-full shadow-2xl flex items-center justify-center">
                <div className="w-28 h-28 bg-[#0A0A0A] rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FFD700]">∞</div>
                    <div className="text-xs text-[#B0B0B0]">Perpetual</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flywheel Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Lock to Earn */}
            <GradientCard>
              <div className="text-4xl mb-3">🔒</div>
              <h4 className="text-lg font-bold mb-2 text-[#FFD700]">Lock to Earn</h4>
              <p className="text-sm text-[#B0B0B0] mb-4">Lock VEIL for 1 week to 4 years and earn perpetual USDC yield</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>1 Week</span>
                  <span className="text-[#FFD700]">1.0x</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Month</span>
                  <span className="text-[#FFD700]">1.25x</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Year</span>
                  <span className="text-[#FFD700]">2.0x</span>
                </div>
                <div className="flex justify-between">
                  <span>4 Years</span>
                  <span className="text-[#FFD700]">2.5x</span>
                </div>
              </div>
            </GradientCard>

            {/* Perpetual Yield */}
            <GradientCard>
              <div className="text-4xl mb-3">💰</div>
              <h4 className="text-lg font-bold mb-2 text-[#8b5cf6]">Perpetual Yield</h4>
              <p className="text-sm text-[#B0B0B0] mb-4">Earn 12-25% APY from Immortal Reserve dividends</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Base Rate</span>
                  <span className="text-[#8b5cf6]">1.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekly Payout</span>
                  <span className="text-[#8b5cf6]">Automatic</span>
                </div>
                <div className="flex justify-between">
                  <span>Min Lock</span>
                  <span className="text-[#8b5cf6]">1 Week</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Lock</span>
                  <span className="text-[#8b5cf6]">4 Years</span>
                </div>
              </div>
            </GradientCard>

            {/* Boost Multiplier */}
            <GradientCard>
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-lg font-bold mb-2 text-[#10b981]">Boost Multiplier</h4>
              <p className="text-sm text-[#B0B0B0] mb-4">Multiply your yield with veVEIL governance locks</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>No Lock</span>
                  <span className="text-[#10b981]">1.0x</span>
                </div>
                <div className="flex justify-between">
                  <span>3 Month Lock</span>
                  <span className="text-[#10b981]">1.5x</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Year Lock</span>
                  <span className="text-[#10b981]">2.0x</span>
                </div>
                <div className="flex justify-between">
                  <span>4 Year Lock</span>
                  <span className="text-[#10b981]">2.5x</span>
                </div>
              </div>
            </GradientCard>
          </div>

          {/* Revenue Loops */}
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="text-[#FFD700]">♻️</span> Revenue Loops
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Borrow Interest Loop */}
            <GradientCard>
              <h4 className="text-lg font-bold mb-4 text-[#FFD700]">💳 Borrow Interest Loop</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">1️⃣</span>
                  <div>
                    <div className="font-bold">Borrow USDC</div>
                    <div className="text-xs text-[#B0B0B0]">5.5% fixed APR</div>
                  </div>
                </div>
                <div className="border-l-2 border-[#FFD700]/30 ml-4 pl-4">
                  <div className="text-xs text-[#B0B0B0]">↓</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">2️⃣</span>
                  <div>
                    <div className="font-bold">Interest Distribution</div>
                    <div className="text-xs text-[#B0B0B0]">50% Immortal, 30% Buyback, 20% veVEIL</div>
                  </div>
                </div>
                <div className="border-l-2 border-[#FFD700]/30 ml-4 pl-4">
                  <div className="text-xs text-[#B0B0B0]">↓</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">3️⃣</span>
                  <div>
                    <div className="font-bold">Yield Boost</div>
                    <div className="text-xs text-[#B0B0B0]">Locked holders earn more</div>
                  </div>
                </div>
              </div>
            </GradientCard>

            {/* Vault Fee Loop */}
            <GradientCard>
              <h4 className="text-lg font-bold mb-4 text-[#8b5cf6]">🏦 Vault Fee Loop</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">1️⃣</span>
                  <div>
                    <div className="font-bold">Deposit to Vault</div>
                    <div className="text-xs text-[#B0B0B0]">Earn 12-25% APY</div>
                  </div>
                </div>
                <div className="border-l-2 border-[#8b5cf6]/30 ml-4 pl-4">
                  <div className="text-xs text-[#B0B0B0]">↓</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">2️⃣</span>
                  <div>
                    <div className="font-bold">Performance Fee</div>
                    <div className="text-xs text-[#B0B0B0]">10% collected on gains</div>
                  </div>
                </div>
                <div className="border-l-2 border-[#8b5cf6]/30 ml-4 pl-4">
                  <div className="text-xs text-[#B0B0B0]">↓</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">3️⃣</span>
                  <div>
                    <div className="font-bold">Fee Distribution</div>
                    <div className="text-xs text-[#B0B0B0]">60% burn, 25% reserve, 15% veVEIL</div>
                  </div>
                </div>
              </div>
            </GradientCard>
          </div>

          {/* Buyback & Burn Loop */}
          <GradientCard className="mb-12">
            <h4 className="text-lg font-bold mb-4 text-[#10b981]">🔥 Buyback & Burn Loop</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-sm mb-1">Borrow Interest</div>
                <div className="text-xs text-[#B0B0B0]">30% allocated</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-2xl text-[#FFD700]">→</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-bold text-sm mb-1">Buy VEIL</div>
                <div className="text-xs text-[#B0B0B0]">Market purchase</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-2xl text-[#FFD700]">→</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔥</div>
                <div className="font-bold text-sm mb-1">Burn VEIL</div>
                <div className="text-xs text-[#B0B0B0]">Permanent removal</div>
              </div>
            </div>
          </GradientCard>

          {/* Features Grid */}
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="text-[#FFD700]">✨</span> Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: '5.5% APR', desc: 'Fixed Borrowing Rate', icon: '💳' },
              { title: '12-25% APY', desc: 'Immortal Yield', icon: '💎' },
              { title: '2.5x Boost', desc: 'veVEIL Lock', icon: '⚡' },
              { title: '60% Burn', desc: 'Vault Fees', icon: '🔥' },
              { title: '30% Buyback', desc: 'Borrow Interest', icon: '📈' },
              { title: 'Zero Liquidation', desc: 'Safe Borrowing', icon: '🛡️' },
            ].map((feature, i) => (
              <GradientCard key={i}>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="text-[#FFD700] font-bold mb-1">{feature.title}</div>
                <div className="text-xs text-[#808080]">{feature.desc}</div>
              </GradientCard>
            ))}
          </div>

          {/* Pages Grid */}
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="text-[#FFD700]">🚀</span> Explore Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { 
                title: 'Analytics', 
                desc: 'Protocol-wide performance and real-time metrics',
                icon: '📈',
                href: '/analytics'
              },
              { 
                title: 'Dashboard', 
                desc: 'Real-time metrics and portfolio tracking',
                icon: '📊',
                href: '/dashboard'
              },
              { 
                title: 'Perpetual DEX', 
                desc: 'Spot, Futures & Options Trading',
                icon: '💱',
                href: '/dex'
              },
              { 
                title: 'Tokenomics', 
                desc: 'Token distribution and revenue flows',
                icon: '💎',
                href: '/tokenomics'
              },
            ].map((page, i) => (
              <Link
                key={i}
                href={page.href}
                className="group"
              >
                <GradientCard className="h-full">
                  <div className="text-4xl mb-3">{page.icon}</div>
                  <h3 className="font-bold mb-2 group-hover:text-[#FFD700] transition-colors">{page.title}</h3>
                  <p className="text-sm text-[#808080]">{page.desc}</p>
                </GradientCard>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-[#B0B0B0] mb-6">Ready to enter the galactic earning ecosystem?</p>
            <RippleButton>
              <Link href="/dashboard">Launch Dashboard</Link>
            </RippleButton>
          </div>
        </div>
      </div>

      {/* AI Suggestion Panel */}
      <SuggestionPanel page="home" />
    </div>
  )
}
