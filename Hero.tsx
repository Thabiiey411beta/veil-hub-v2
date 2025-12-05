'use client'

import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-cyber-card border border-purple-500/50 rounded-full mb-8">
            <span className="text-purple-400 text-sm font-semibold">🌑 VEIL HUB v14</span>
            <span className="ml-2 text-gray-400 text-sm">The Final DeFi Organism</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-teal-400 to-purple-400 bg-clip-text text-transparent animate-glow">
              Zero Liquidation
            </span>
            <br />
            <span className="text-white">DeFi Protocol</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The most powerful, sustainable, user-aligned DeFi super-protocol ever built. 
            <span className="text-cyber-accent"> No KYC. No liquidations. Pure yield.</span>
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <Shield size={20} />
              <span className="font-semibold">5.5% Fixed APR</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-400">
              <Zap size={20} />
              <span className="font-semibold">Up to 4.2x Leverage</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-teal-400">
              <TrendingUp size={20} />
              <span className="font-semibold">6-25% USDC Yield</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="cyber-button text-lg px-8 py-4 flex items-center space-x-2 group">
              <span>Launch App</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-cyber-border text-gray-300 rounded-lg hover:border-purple-500/50 hover:text-white transition-all duration-300">
              Read Docs
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyber-accent mb-1">$1B+</div>
              <div className="text-sm text-gray-400">Target TVL</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">180%</div>
              <div className="text-sm text-gray-400">Min Collateral</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1">0</div>
              <div className="text-sm text-gray-400">Liquidations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">100%</div>
              <div className="text-sm text-gray-400">Audited</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}