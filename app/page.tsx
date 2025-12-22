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
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: Flame,
      title: 'Immortal Reserve',
      description: 'Burn VEIL for permanent shares. Earn 12-25% APY in monthly USDC dividends.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Target,
      title: 'Immortal Vaults',
      description: 'Auto-compounding strategies with 60% performance fee burn. Set it and forget it.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: BarChart3,
      title: 'Perpetual Trading',
      description: 'Trade BTC, ETH, and more with up to 50x leverage. 5bps fees, confidential orders.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Advanced Lending',
      description: 'Fixed/variable rates, P2P matching, and auto-optimizer for best yields.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Dual Restaking',
      description: 'Earn on both EigenLayer and Symbiotic with flexible collateral options.',
      gradient: 'from-yellow-500 to-amber-600'
    }
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$987.5M', change: '+12.3%' },
    { label: 'Monthly Revenue', value: '$4.2M', change: '+8.7%' },
    { label: 'Tokens Burned', value: '120M VEIL', change: '+2.1M' },
    { label: 'Active Users', value: '14,523', change: '+432' }
  ];

  const tokenomics = [
    { metric: 'Fixed Borrow Rate', value: '5.5% APR' },
    { metric: 'Immortal Yield', value: '12-25% APR' },
    { metric: 'veVEIL Max Boost', value: '2.5x' },
    { metric: 'Vault Fee Burn', value: '60%' },
    { metric: 'Total Supply', value: '1B VEIL' },
    { metric: 'Circulating', value: '580M' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Animated Background */}
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-sm text-violet-300">Live on Supra L1 Testnet</span>
          </div>

          {/* Main Headline */}
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-xl font-bold text-lg transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105">
              Connect Wallet
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-violet-500/50 rounded-xl font-bold text-lg transition-all">
              Lock VEIL & Boost Yield
            </button>
          </div>

          {/* Stats Grid */}
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-violet-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Complete DeFi <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Ecosystem</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Six core products working in harmony to maximize your yield and minimize your risk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
                  <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 group-hover:border-slate-700 rounded-2xl p-6 transition-all h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-6 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Black Hole</span> Flywheel
            </h2>
            <p className="text-xl text-slate-400">
              Revenue flows in. VEIL gets burned. Scarcity increases. Yields rise. Repeat.
            </p>
          </div>

          <div className="relative">
            {/* Flywheel Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Revenue Generated', desc: 'From borrowing, trading, vaults & more', icon: DollarSign, color: 'violet' },
                { step: 2, title: 'Dividends Paid', desc: 'USDC to Immortal Share holders', icon: Users, color: 'pink' },
                { step: 3, title: 'Tokens Burned', desc: '60% of vault fees + buyback', icon: Flame, color: 'orange' },
                { step: 4, title: 'Yields Increase', desc: 'Less supply = higher APY for holders', icon: TrendingUp, color: 'green' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="relative">
                    <div className={`bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 text-center hover:border-${item.color}-500/50 transition-all`}>
                      <div className={`w-12 h-12 rounded-full bg-${item.color}-500/20 text-${item.color}-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold`}>
                        {item.step}
                      </div>
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    {idx < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6">
                        <ArrowRight className="w-6 h-6 text-violet-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Bulletproof <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Tokenomics</span>
            </h2>
            <p className="text-xl text-slate-400">
              Designed for sustainability, scarcity, and long-term value accrual
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {tokenomics.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition-all">
                <div className="text-slate-400 text-sm mb-2">{item.metric}</div>
                <div className="text-2xl font-bold text-violet-400">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tokenomics Score: 9.5/10</h3>
                <p className="text-slate-300 leading-relaxed">
                  No pre-mine. Fair launch. Multiple burn mechanisms. Real yield. Progressive bonuses for early adopters. 
                  This is how sustainable DeFi should work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-20 blur-3xl" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Ascend</span>?
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Join 14,000+ users earning real yield in the final DeFi organism
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-xl font-bold text-lg transition-all shadow-lg shadow-violet-500/25">
                  Launch App
                </button>
                <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-violet-500/50 rounded-xl font-bold text-lg transition-all">
                  Read Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Borrowing</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Immortal Reserve</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Vaults</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Trading</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Governance</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Dark Gauges</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Proposals</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">veVEIL</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Forum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Developers</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Audits</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Bug Bounty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Medium</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400">
              © 2024 Veil Hub. Built on Supra L1. Immortal by design.
            </div>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="hover:text-violet-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}'use client'

import PremiumLanding from './PremiumLanding'

export default function Home() {
  return <PremiumLanding />
}// Build Sat Dec  6 07:06:34 UTC 2025
