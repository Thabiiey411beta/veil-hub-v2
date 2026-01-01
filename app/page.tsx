'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter']">
      {/* Navigation */}
      <nav className="border-b border-[#FFD700]/10 px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[#FFD700]">◆</span> VEIL HUB v17
          </h1>
          <div className="flex gap-6">
            <a href="/docs" className="hover:text-[#FFD700] transition-colors">Docs</a>
            <a href="/protocol" className="hover:text-[#FFD700] transition-colors">Protocol</a>
            <a href="/governance" className="hover:text-[#FFD700] transition-colors">Governance</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">
            Welcome to <span className="text-[#FFD700]">Veil Hub v17</span>
          </h2>
          
          <p className="text-lg text-[#B0B0B0] mb-12">
            The Final DeFi Organism - Zero-liquidation borrowing, perpetual real yield, privacy-first.
          </p>

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { 
                title: 'Analytics', 
                desc: 'Protocol-wide performance and real-time metrics',
                icon: '📈',
                file: 'analytics-premium'
              },
              { 
                title: 'Dashboard', 
                desc: 'Real-time metrics and portfolio tracking',
                icon: '📊',
                file: 'dashboard-updated'
              },
              { 
                title: 'Perpetual DEX', 
                desc: 'Advanced trading interface with LP VACUUM',
                icon: '💱',
                file: 'perpetual-dex-updated'
              },
              { 
                title: 'Tokenomics', 
                desc: 'Token distribution and revenue flows',
                icon: '💎',
                file: 'tokenomics-premium'
              },
            ].map((page, i) => (
              <div
                key={i}
                className="group border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all cursor-pointer"
                onClick={() => {
                  // Open component in new context
                  window.location.hash = `#${page.file}`;
                }}
              >
                <div className="text-3xl mb-3">{page.icon}</div>
                <h3 className="font-bold mb-2 group-hover:text-[#FFD700] transition-colors">{page.title}</h3>
                <p className="text-sm text-[#808080]">{page.desc}</p>
              </div>
            ))}
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
                <div key={i} className="border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/50 transition-all">
                  <div className="text-[#FFD700] font-bold mb-1">{feature.title}</div>
                  <div className="text-xs text-[#808080]">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
