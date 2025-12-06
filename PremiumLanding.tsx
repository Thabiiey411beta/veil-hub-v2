'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const AnimatedNumber = ({ value, suffix = '' }: { value: string; suffix?: string }) => (
  <motion.span
    className="gradient-text font-bold text-4xl md:text-5xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {value}{suffix}
  </motion.span>
)

const GlassCard = ({ children, className = '', delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => (
  <motion.div
    className={`glass-card p-8 transition-all duration-500 ${className}`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
  >
    {children}
  </motion.div>
)

const FeatureIcon = ({ type }: { type: 'shield' | 'lightning' | 'chart' }) => {
  const icons = {
    shield: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7V12C3 16.55 6.84 20.74 9.91 21.79C11.12 22.26 12.88 22.26 14.09 21.79C17.16 20.74 21 16.55 21 12V7L12 2Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    lightning: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chart: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9L12 6L16 10L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-300">
      {icons[type]}
    </div>
  )
}

export default function PremiumLanding() {
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setIsConnected(true)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="particles-bg">
        <div className="nebula-bg"></div>
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-6 md:p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-pulse"></div>
            <span className="text-2xl font-bold gradient-text">VEIL HUB</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['Protocol', 'Vaults', 'Governance', 'Docs'].map((item) => (
              <a key={item} href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-6 py-3 glass-card mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-purple-400 font-semibold mr-2">🌑 v14</span>
            <span className="text-gray-300">The Final DeFi Organism</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="gradient-text glow-text">Zero</span>
            <br />
            <span className="text-white">Liquidation</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            The most powerful DeFi super-protocol on <span className="text-cyan-400 font-semibold">SupraEVM</span>.
            <br />
            <span className="gradient-text font-semibold">No KYC. No liquidations. Pure yield.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <button className="neon-button text-lg px-8 py-4">
              Launch Protocol
            </button>
            <button className="px-8 py-4 glass-card text-gray-300 hover:text-white transition-colors duration-300">
              Read Documentation
            </button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <GlassCard delay={0.8}>
              <FeatureIcon type="shield" />
              <div className="mt-4">
                <AnimatedNumber value="5.5%" suffix=" APR" />
                <p className="text-gray-400 mt-2">Fixed Borrowing Rate</p>
              </div>
            </GlassCard>

            <GlassCard delay={0.9}>
              <FeatureIcon type="lightning" />
              <div className="mt-4">
                <AnimatedNumber value="4.2x" />
                <p className="text-gray-400 mt-2">Maximum Leverage</p>
              </div>
            </GlassCard>

            <GlassCard delay={1.0}>
              <FeatureIcon type="chart" />
              <div className="mt-4">
                <AnimatedNumber value="6-25%" suffix=" APY" />
                <p className="text-gray-400 mt-2">USDC Yield Range</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Floating Wallet Button */}
      <motion.div
        className="floating-wallet"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <button
          onClick={connectWallet}
          className="neon-button flex items-center space-x-2 shadow-2xl"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M21 12V7H5C3.89 7 3 6.11 3 5S3.89 3 5 3H16V1H5C2.79 1 1 2.79 1 5S2.79 9 5 9H19V12H21Z" fill="currentColor"/>
            <path d="M21 14H5C3.89 14 3 14.89 3 16S3.89 18 5 18H21V14Z" fill="currentColor"/>
          </svg>
          <span>{isConnected ? 'Connected' : 'Connect Wallet'}</span>
        </button>
      </motion.div>
    </div>
  )
}