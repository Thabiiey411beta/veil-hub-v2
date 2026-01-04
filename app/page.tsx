'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { GradientCard, StatCounter, RippleButton, GradientText, AnimatedBadge } from '@/components/EnhancedUI'
import { SuggestionPanel } from '@/components/SuggestionPanel'

const PriceWidget = dynamic(() => import('@/components/PriceWidget'), { ssr: true })

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter']">
      {/* Hero Section */}
      <div className="p-8 border-b border-[#FFD700]/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4">
              Welcome to <GradientText>Veil Hub v17</GradientText>
            </h2>
            <p className="text-lg text-[#B0B0B0] mb-4">
              The Final DeFi Organism - Zero-liquidation borrowing, perpetual real yield, privacy-first.
            </p>
            <div className="flex gap-2 mb-8">
              <AnimatedBadge variant="success">Live on Supra L1</AnimatedBadge>
              <AnimatedBadge>Testnet Ready</AnimatedBadge>
            </div>
          </div>

          {/* Live Price Feed */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
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
              <StatCounter value="8.5K" label="Active Users" />
            </GradientCard>
            <GradientCard>
              <StatCounter value="52M" label="Total Burned" />
            </GradientCard>
          </div>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">
            <span className="text-[#FFD700]">✨</span> Explore Features
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
                desc: 'Advanced trading interface with LP VACUUM',
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
            ))}\
          </div>

          {/* Features */}
          <div className="border-t border-[#FFD700]/10 pt-12">
            <h3 className="text-2xl font-bold mb-8">
              <span className="text-[#FFD700]">✨</span> Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: '5.5% APR', desc: 'Fixed Borrowing Rate' },
                { title: '12-25% APY', desc: 'Immortal Yield' },
                { title: '2.5x Boost', desc: 'veVEIL Lock' },
                { title: '60% Burn', desc: 'Vault Fees' },
                { title: '30% Buyback', desc: 'Borrow Interest' },
                { title: 'Zero Liquidation', desc: 'Safe Borrowing' },
              ].map((feature, i) => (
                <GradientCard key={i}>
                  <div className="text-[#FFD700] font-bold mb-1">{feature.title}</div>
                  <div className="text-xs text-[#808080]">{feature.desc}</div>
                </GradientCard>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-[#B0B0B0] mb-6">Ready to experience the future of DeFi?</p>
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
