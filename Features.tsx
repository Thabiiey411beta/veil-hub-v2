'use client'

import { Shield, Zap, TrendingUp, Lock, Eye, Coins } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Zero-Liquidation Borrowing',
      description: 'Borrow at 5.5% fixed APR with 180% minimum collateral. Auto-repay from vault yields prevents liquidations.',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      icon: Zap,
      title: 'Instant Withdrawals',
      description: '10-15% TVL buffer ensures immediate liquidity. No queues, no waiting periods, no exit fees.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: TrendingUp,
      title: 'Leveraged Vaults',
      description: 'One-click leverage up to 4.2x. Earn 9-18% net APY while borrowing at 5.5% fixed rate.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Lock,
      title: 'Perpetual Dividends',
      description: 'Immortal Shares earn 12-25% USDC dividends forever. Funded by protocol revenue streams.',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30'
    },
    {
      icon: Eye,
      title: 'LP VACUUM',
      description: 'Private cross-chain LP farming generates additional yield. 40% profits flow to Immortals.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Coins,
      title: 'veVEIL Governance',
      description: 'Lock $VEIL for voting power and vault boosts. Longer locks = exponentially more benefits.',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30'
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Core Innovations
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Revolutionary DeFi primitives that eliminate traditional pain points while maximizing yield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`cyber-card ${feature.bgColor} ${feature.borderColor} group hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 ${feature.bgColor} rounded-lg`}>
                  <feature.icon className={feature.color} size={24} />
                </div>
                <h3 className={`text-xl font-bold ${feature.color}`}>
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="cyber-card max-w-4xl mx-auto bg-gradient-to-r from-purple-900/20 to-teal-900/20 border-purple-500/30">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Built on SupraEVM</h3>
            <p className="text-gray-300 mb-6">
              Native account abstraction, confidential computing, HyperNova bridgeless swaps, 
              and sub-second DORA oracles provide the ultimate DeFi experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-purple-400 font-semibold">10x Cheaper</div>
                <div className="text-gray-400">Gas Fees</div>
              </div>
              <div className="text-center">
                <div className="text-teal-400 font-semibold">Anti-MEV</div>
                <div className="text-gray-400">By Default</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-semibold">1-Click</div>
                <div className="text-gray-400">Cross-Chain</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-semibold">Sub-Second</div>
                <div className="text-gray-400">Oracles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}