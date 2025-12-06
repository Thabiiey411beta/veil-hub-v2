'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ConnectWallet from '../components/ConnectWallet'
import PriceWidget from '../components/PriceWidget'

export default function PremiumLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-pulse"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">VEIL HUB</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/protocol" className="text-gray-300 hover:text-white transition-colors duration-300">Protocol</a>
            <a href="/borrow" className="text-gray-300 hover:text-white transition-colors duration-300">Borrow</a>
            <a href="/vaults" className="text-gray-300 hover:text-white transition-colors duration-300">Vaults</a>
            <a href="/governance" className="text-gray-300 hover:text-white transition-colors duration-300">Governance</a>
            <a href="/docs" className="text-gray-300 hover:text-white transition-colors duration-300">Docs</a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-gray-900/50 backdrop-blur-lg rounded-lg">
            <nav className="flex flex-col space-y-4">
              <a href="/protocol" className="text-gray-300 hover:text-white transition-colors">Protocol</a>
              <a href="/borrow" className="text-gray-300 hover:text-white transition-colors">Borrow</a>
              <a href="/vaults" className="text-gray-300 hover:text-white transition-colors">Vaults</a>
              <a href="/governance" className="text-gray-300 hover:text-white transition-colors">Governance</a>
              <a href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full mb-8">
            <span className="text-purple-400 font-semibold mr-2">🌑 v14</span>
            <span className="text-gray-300">The Final DeFi Organism</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Zero
            </span>
            <br />
            <span className="text-white">Liquidation</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The most powerful DeFi super-protocol on <span className="text-cyan-400 font-semibold">Supra L1</span>.
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">No KYC. No liquidations. Pure yield.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <a href="/protocol" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
              Launch Protocol
            </a>
            <a href="/docs" className="px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 text-gray-300 hover:text-white rounded-xl transition-colors duration-300">
              Read Documentation
            </a>
          </div>

          {/* Live Prices */}
          <div className="mb-16">
            <PriceWidget />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: '5.5%', suffix: ' APR', label: 'Fixed Borrowing Rate', icon: '🛡️' },
              { value: '4.2x', suffix: '', label: 'Maximum Leverage', icon: '⚡' },
              { value: '6-25%', suffix: ' APY', label: 'USDC Yield Range', icon: '📈' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}