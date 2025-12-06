'use client'

import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react'
import { memo } from 'react'

const Hero = memo(function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 glass-effect mb-8 animate-pulse">
            <span className="text-purple-400 text-sm font-semibold">🌑 VEIL HUB v14</span>
            <span className="ml-2 text-gray-400 text-sm">The Final DeFi Organism</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent neon-text">
              Zero Liquidation
            </span>
            <br />
            <span className="text-white">DeFi Protocol</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The most powerful DeFi super-protocol on SupraEVM. 
            <span className="text-cyan-400 font-semibold"> No KYC. No liquidations. Pure yield.</span>
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            {[
              { icon: Shield, text: '5.5% Fixed APR', color: 'text-green-400' },
              { icon: Zap, text: 'Up to 4.2x Leverage', color: 'text-purple-400' },
              { icon: TrendingUp, text: '6-25% USDC Yield', color: 'text-cyan-400' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-center space-x-2">
                <feature.icon size={18} className={feature.color} />
                <span className={`font-semibold ${feature.color}`}>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="cyber-button text-lg px-8 py-4 flex items-center space-x-2 group">
              <span>Launch App</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 glass-effect text-gray-300 rounded-xl hover:text-white transition-all duration-300">
              Read Docs
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: '$1B+', label: 'Target TVL', color: 'text-cyan-400' },
              { value: '180%', label: 'Min Collateral', color: 'text-purple-400' },
              { value: '0', label: 'Liquidations', color: 'text-green-400' },
              { value: '100%', label: 'Audited', color: 'text-yellow-400' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export { Hero }