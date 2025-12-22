'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Lock, Shield, Zap, Target, DollarSign, Flame, Activity, ArrowRight, CheckCircle, Users, BarChart3, Layers } from 'lucide-react';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Lock,
      title: 'Zero-Liquidation Borrowing',
      description: 'Borrow USDC at 5.5% fixed APR with 180% collateral ratio. Auto-repay protects your position.',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: Flame,
      title: 'Immortal Reserve',
      description: 'Burn VEIL for permanent shares. Earn 12-25% APY in monthly USDC dividends.',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: Target,
      title: 'Immortal Vaults',
      description: 'Auto-compounding strategies with 60% performance fee burn. Set it and forget it.',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: BarChart3,
      title: 'Perpetual Trading',
      description: 'Trade BTC, ETH, and more with up to 50x leverage. 5bps fees, confidential orders.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Shield,
      title: 'Advanced Lending',
      description: 'Fixed/variable rates, P2P matching, and auto-optimizer for best yields.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: Zap,
      title: 'Dual Restaking',
      description: 'Earn on both EigenLayer and Symbiotic with flexible collateral options.',
      gradient: 'from-yellow-500 to-amber-600',
    },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$987.5M', change: '+12.3%' },
    { label: 'Monthly Revenue', value: '$4.2M', change: '+8.7%' },
    { label: 'Tokens Burned', value: '120M VEIL', change: '+2.1M' },
    { label: 'Active Users', value: '14,523', change: '+432' },
  ];

  const tokenomics = [
    { metric: 'Fixed Borrow Rate', value: '5.5% APR' },
    { metric: 'Immortal Yield', value: '12-25% APR' },
    { metric: 'veVEIL Max Boost', value: '2.5x' },
    { metric: 'Vault Fee Burn', value: '60%' },
    { metric: 'Total Supply', value: '1B VEIL' },
    { metric: 'Circulating', value: '580M' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* All your sections remain exactly the same */}
      {/* Hero, Features, Flywheel, Tokenomics, CTA, Footer – unchanged */}
      {/* ... (your full JSX from the original code) ... */}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at ${50 + scrollY * 0.05}% ${50 + scrollY * 0.03}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
              filter: 'blur(60px)'
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-sm text-violet-300">Live on Supra L1 Testnet</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Veil Hub
            </span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-200">
            The Final DeFi Organism
          </h2>

          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Real monthly USDC dividends. Permanent token burn. Privacy-protected everything. 
            <span className="text-violet-400 font-semibold"> One dApp to rule DeFi.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-xl font-bold text-lg transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105">
              Connect Wallet
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-violet-500/50 rounded-xl font-bold text-lg transition-all">
              Lock VEIL & Boost Yield
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 group-hover:border-violet-500/50 rounded-xl p-4 transition-all">
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
                  <div className="text-xs text-green-400 font-medium">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-violet-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* All other sections (Features, Flywheel, Tokenomics, CTA, Footer) remain unchanged – paste them here exactly as you had them */}

      {/* ... rest of your beautiful landing page ... */}

    </div>
  );
}
