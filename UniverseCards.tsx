'use client'

import { Users, Crown, Fish, ArrowRight } from 'lucide-react'

export function UniverseCards() {
  return (
    <section id="universes" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Three Universes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your path in the Veil Hub ecosystem. Each universe offers unique benefits tailored to different user types.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Universe B - Normies */}
          <div className="cyber-card group hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-400">Universe B</h3>
                <p className="text-gray-400">The Normie Path</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Zero $VEIL required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">ERC-4626 single-asset vaults</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">One-click leveraged vaults (up to 4.2x)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Instant withdrawals (10-15% buffer)</span>
              </div>
            </div>

            <div className="bg-cyber-bg/50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">6-18%</div>
                <div className="text-sm text-gray-400">APY Range</div>
              </div>
            </div>

            <button className="w-full cyber-button flex items-center justify-center space-x-2 group">
              <span>Enter Universe B</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Universe A - Immortals */}
          <div className="cyber-card group hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Crown className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-400">Universe A</h3>
                <p className="text-gray-400">The Immortal Path</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Burn $VEIL → Immortal Shares</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Lock $VEIL → veVEIL power</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Perpetual USDC dividends</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Governance voting power</span>
              </div>
            </div>

            <div className="bg-cyber-bg/50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">12-25%</div>
                <div className="text-sm text-gray-400">USDC APR Forever</div>
              </div>
            </div>

            <button className="w-full cyber-button flex items-center justify-center space-x-2 group">
              <span>Become Immortal</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Whale Mode */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="cyber-card bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-yellow-500/20 rounded-lg">
                  <Fish className="text-yellow-400" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">Whale Mode</h3>
                  <p className="text-gray-300 mb-2">Exclusive access for ≥$5M TVL</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-yellow-400">• 5% performance fee</span>
                    <span className="text-yellow-400">• Custom strategies</span>
                    <span className="text-yellow-400">• 15% dedicated buffer</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-yellow-400 mb-1">45%+</div>
                <div className="text-sm text-gray-400">Custom APY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}